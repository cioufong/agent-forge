import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import hre from 'hardhat';
import { parseEther, getAddress, zeroAddress, keccak256, toHex } from 'viem';

describe('RewardDistributor', () => {
  let connection: any;
  let publicClient: any;
  let walletClients: any[];
  let deployer: any;
  let oracle: any;
  let devWallet: any;
  let user1: any;
  let user2: any;
  let user3: any;
  let user4: any;
  let user5: any;

  let afgToken: any;
  let agentNFA: any;
  let problemManager: any;
  let rewardDistributor: any;

  const MINT_PRICE = parseEther('0.05');

  // Phase durations
  const SUBMIT_DURATION = 300n; // 5 minutes
  const REVEAL_DURATION = 120n; // 2 minutes
  const VERIFY_DURATION = 180n; // 3 minutes

  // Tier BPS
  const BRONZE_BPS = 2000n;
  const SILVER_BPS = 3000n;
  const GOLD_BPS = 5000n;

  // Within-tier BPS
  const FIRST_PLACE_BPS = 5000n;
  const RUNNERS_UP_BPS = 4000n;
  const DEV_BPS = 200n;
  const VERIFIERS_BPS = 800n;

  before(async () => {
    connection = await hre.network.connect();
    publicClient = await connection.viem.getPublicClient();
    walletClients = await connection.viem.getWalletClients();
    [deployer, oracle, devWallet, user1, user2, user3, user4, user5] =
      walletClients;

    // Deploy AFGToken with deployer as treasury (dummy router for tests)
    const DUMMY_ROUTER = '0x0000000000000000000000000000000000000001';
    afgToken = await connection.viem.deployContract('AFGToken', [
      deployer.account.address,
      DUMMY_ROUTER,
    ]);

    // Deploy AgentNFA
    agentNFA = await connection.viem.deployContract('AgentNFA', [MINT_PRICE]);

    // Deploy ProblemManager
    problemManager = await connection.viem.deployContract('ProblemManager', [
      agentNFA.address,
      oracle.account.address,
    ]);

    // Deploy RewardDistributor
    rewardDistributor = await connection.viem.deployContract('RewardDistributor', [
      afgToken.address,
      agentNFA.address,
      problemManager.address,
      devWallet.account.address,
    ]);

    // Wire up permissions
    await afgToken.write.setMinter([rewardDistributor.address], {
      account: deployer.account,
    });
    // RewardDistributor must be tax-exempt so rewards aren't taxed on claim
    await afgToken.write.setTaxExempt([rewardDistributor.address, true], {
      account: deployer.account,
    });
    await afgToken.write.unpause({ account: deployer.account });

    await agentNFA.write.setGameMaster([rewardDistributor.address, true], {
      account: deployer.account,
    });
    await agentNFA.write.unpause({ account: deployer.account });

    await problemManager.write.unpause({ account: deployer.account });

    await rewardDistributor.write.unpause({ account: deployer.account });

    // Mint NFAs for each user
    await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE }); // tokenId 1
    await agentNFA.write.mint({ account: user2.account, value: MINT_PRICE }); // tokenId 2
    await agentNFA.write.mint({ account: user3.account, value: MINT_PRICE }); // tokenId 3
    await agentNFA.write.mint({ account: user4.account, value: MINT_PRICE }); // tokenId 4
    await agentNFA.write.mint({ account: user5.account, value: MINT_PRICE }); // tokenId 5
  });

  /**
   * Helper: post a problem, go through the 4-phase lifecycle, and resolve.
   */
  async function postAndResolve(
    submitterAccounts: { tokenId: bigint; account: any }[],
  ): Promise<bigint> {
    const questionHash = keccak256(
      toHex(`problem-${Date.now()}-${Math.random()}`),
    );
    await problemManager.write.postProblem([questionHash], {
      account: oracle.account,
    });
    const count = await problemManager.read.problemCount();
    const problemId = count - 1n;

    const answer = 'correct-answer';
    const answerHash = keccak256(toHex(answer));

    // Phase 1: Submit
    for (const { tokenId, account } of submitterAccounts) {
      await problemManager.write.submitAnswer(
        [problemId, tokenId, answerHash],
        { account },
      );
    }

    // Advance past submit deadline into reveal phase
    await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

    // Phase 2: Reveal
    for (const { tokenId, account } of submitterAccounts) {
      await problemManager.write.revealAnswer(
        [problemId, tokenId, answer],
        { account },
      );
    }

    // Advance past reveal + verify deadlines
    await connection.networkHelpers.time.increase(REVEAL_DURATION + VERIFY_DURATION + 1n);

    // Phase 4: Oracle resolves
    await problemManager.write.resolveByOracle(
      [problemId, answerHash],
      { account: oracle.account },
    );

    return problemId;
  }

  // ──────────────────────────────────────────────
  // distributeRewards - tier pool calculations
  // ──────────────────────────────────────────────

  describe('distributeRewards', () => {
    it('should calculate Bronze tier pool correctly (20% of round reward)', async () => {
      const problemId = await postAndResolve(
        [{ tokenId: 1n, account: user1.account }],
      );

      const roundReward = await afgToken.read.currentRewardPerRound();
      const expectedBronzePool = (roundReward * BRONZE_BPS) / 10000n;
      const expectedDevFee = (expectedBronzePool * DEV_BPS) / 10000n;
      const expectedVerifierFee =
        (expectedBronzePool * VERIFIERS_BPS) / 10000n;

      const devBefore = await afgToken.read.balanceOf([
        devWallet.account.address,
      ]);

      // Only Bronze winners, Silver and Gold empty
      await rewardDistributor.write.distributeRewards(
        [problemId, [1n], [], []],
        { account: oracle.account },
      );

      const devAfter = await afgToken.read.balanceOf([
        devWallet.account.address,
      ]);
      const devReceived = devAfter - devBefore;

      // Dev wallet should receive dev fee + verifier fee (no verifiers set)
      assert.equal(devReceived, expectedDevFee + expectedVerifierFee);

      // totalDistributed should equal only the Bronze pool
      const totalDist = await rewardDistributor.read.totalDistributed();
      assert.equal(totalDist, expectedBronzePool);
    });

    it('should accumulate Silver and Gold pools when empty', async () => {
      // After the first distribution with only Bronze winners,
      // Silver and Gold pools should have accumulated
      const roundReward = await afgToken.read.currentRewardPerRound();
      const expectedSilverUnspent = (roundReward * SILVER_BPS) / 10000n;
      const expectedGoldUnspent = (roundReward * GOLD_BPS) / 10000n;

      const silverUnspent = await rewardDistributor.read.unspentPool([1]);
      const goldUnspent = await rewardDistributor.read.unspentPool([2]);

      assert.equal(silverUnspent, expectedSilverUnspent);
      assert.equal(goldUnspent, expectedGoldUnspent);
    });

    it('should distribute accumulated pool when tier gets winners', async () => {
      // Do a second round with only Bronze winners to accumulate more
      const problemId2 = await postAndResolve(
        [{ tokenId: 2n, account: user2.account }],
      );

      const roundReward = await afgToken.read.currentRewardPerRound();
      const silverPerRound = (roundReward * SILVER_BPS) / 10000n;

      const silverUnspentBefore = await rewardDistributor.read.unspentPool([1]);

      await rewardDistributor.write.distributeRewards(
        [problemId2, [2n], [], []],
        { account: oracle.account },
      );

      // Silver should have accumulated 2 rounds now
      const silverUnspentAfter = await rewardDistributor.read.unspentPool([1]);
      assert.equal(silverUnspentAfter, silverUnspentBefore + silverPerRound);

      // Now do a third round with Bronze + Silver winners
      const problemId3 = await postAndResolve(
        [
          { tokenId: 1n, account: user1.account },
          { tokenId: 3n, account: user3.account },
        ],
      );

      const totalDistBefore = await rewardDistributor.read.totalDistributed();
      const silverAccumulated = await rewardDistributor.read.unspentPool([1]);

      // Bronze: [1n], Silver: [3n], Gold: []
      await rewardDistributor.write.distributeRewards(
        [problemId3, [1n], [3n], []],
        { account: oracle.account },
      );

      // Silver unspent should be cleared
      const silverUnspentFinal = await rewardDistributor.read.unspentPool([1]);
      assert.equal(silverUnspentFinal, 0n);

      // totalDistributed should include the accumulated Silver pool
      const totalDistAfter = await rewardDistributor.read.totalDistributed();
      const bronzePool = (roundReward * BRONZE_BPS) / 10000n;
      const silverPool = silverPerRound + silverAccumulated; // current + accumulated
      assert.equal(
        totalDistAfter - totalDistBefore,
        bronzePool + silverPool,
      );
    });
  });

  // ──────────────────────────────────────────────
  // 1st place vs runners-up
  // ──────────────────────────────────────────────

  describe('1st place gets more than runners-up', () => {
    it('should allocate more to 1st place than each runner-up', async () => {
      const problemId = await postAndResolve(
        [
          { tokenId: 1n, account: user1.account },
          { tokenId: 2n, account: user2.account },
          { tokenId: 3n, account: user3.account },
        ],
      );

      const user1Before = await rewardDistributor.read.pendingRewards([
        user1.account.address,
      ]);
      const user2Before = await rewardDistributor.read.pendingRewards([
        user2.account.address,
      ]);

      await rewardDistributor.write.distributeRewards(
        [problemId, [1n, 2n, 3n], [], []],
        { account: oracle.account },
      );

      const user1After = await rewardDistributor.read.pendingRewards([
        user1.account.address,
      ]);
      const user2After = await rewardDistributor.read.pendingRewards([
        user2.account.address,
      ]);

      const firstPlaceReward = user1After - user1Before;
      const runnerUpReward = user2After - user2Before;

      assert.ok(
        firstPlaceReward > runnerUpReward,
        `1st place (${firstPlaceReward}) should be > runner-up (${runnerUpReward})`,
      );
    });
  });

  // ──────────────────────────────────────────────
  // Dev fee deduction
  // ──────────────────────────────────────────────

  describe('Dev fee deduction', () => {
    it('should mint dev fee to devWallet', async () => {
      const problemId = await postAndResolve(
        [{ tokenId: 4n, account: user4.account }],
      );

      const roundReward = await afgToken.read.currentRewardPerRound();
      const bronzePool = (roundReward * BRONZE_BPS) / 10000n;
      const expectedDevFee = (bronzePool * DEV_BPS) / 10000n;

      const devBefore = await afgToken.read.balanceOf([
        devWallet.account.address,
      ]);

      await rewardDistributor.write.distributeRewards(
        [problemId, [4n], [], []],
        { account: oracle.account },
      );

      const devAfter = await afgToken.read.balanceOf([
        devWallet.account.address,
      ]);
      const devReceived = devAfter - devBefore;

      // devWallet receives dev fee + verifier fee (no verifiers)
      const expectedVerifierFee = (bronzePool * VERIFIERS_BPS) / 10000n;
      assert.equal(devReceived, expectedDevFee + expectedVerifierFee);
      assert.ok(expectedDevFee > 0n, 'Dev fee should be > 0');
    });
  });

  // ──────────────────────────────────────────────
  // claimRewards
  // ──────────────────────────────────────────────

  describe('claimRewards', () => {
    it('should allow user to claim accumulated rewards', async () => {
      const pending = await rewardDistributor.read.pendingRewards([
        user1.account.address,
      ]);

      if (pending === 0n) {
        const problemId = await postAndResolve(
          [{ tokenId: 1n, account: user1.account }],
        );
        await rewardDistributor.write.distributeRewards(
          [problemId, [1n], [], []],
          { account: oracle.account },
        );
      }

      const pendingBefore = await rewardDistributor.read.pendingRewards([
        user1.account.address,
      ]);
      assert.ok(pendingBefore > 0n, 'User should have pending rewards');

      const balanceBefore = await afgToken.read.balanceOf([
        user1.account.address,
      ]);

      await rewardDistributor.write.claimRewards({
        account: user1.account,
      });

      const pendingAfter = await rewardDistributor.read.pendingRewards([
        user1.account.address,
      ]);
      assert.equal(pendingAfter, 0n);

      const balanceAfter = await afgToken.read.balanceOf([
        user1.account.address,
      ]);
      assert.equal(balanceAfter - balanceBefore, pendingBefore);
    });

    it('should revert when claiming with zero pending rewards', async () => {
      await assert.rejects(
        rewardDistributor.write.claimRewards({
          account: user5.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('NoRewards'),
            `Expected NoRewards error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should emit RewardsClaimed event', async () => {
      // Give user5 some rewards
      const problemId = await postAndResolve(
        [{ tokenId: 5n, account: user5.account }],
      );
      await rewardDistributor.write.distributeRewards(
        [problemId, [5n], [], []],
        { account: oracle.account },
      );

      const hash = await rewardDistributor.write.claimRewards({
        account: user5.account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected RewardsClaimed event');
    });
  });

  // ──────────────────────────────────────────────
  // XP granted to winners
  // ──────────────────────────────────────────────

  describe('XP granted to winners', () => {
    it('should grant XP to first place winner', async () => {
      const statsBefore = await agentNFA.read.getStats([1n]);
      const xpBefore = statsBefore.xp;

      const problemId = await postAndResolve(
        [{ tokenId: 1n, account: user1.account }],
      );

      await rewardDistributor.write.distributeRewards(
        [problemId, [1n], [], []],
        { account: oracle.account },
      );

      const statsAfter = await agentNFA.read.getStats([1n]);
      assert.ok(
        statsAfter.xp > xpBefore,
        `XP should increase: ${statsAfter.xp} > ${xpBefore}`,
      );
    });

    it('should grant XP to runners-up', async () => {
      const statsBefore = await agentNFA.read.getStats([2n]);
      const xpBefore = statsBefore.xp;

      const problemId = await postAndResolve(
        [
          { tokenId: 1n, account: user1.account },
          { tokenId: 2n, account: user2.account },
        ],
      );

      await rewardDistributor.write.distributeRewards(
        [problemId, [1n, 2n], [], []],
        { account: oracle.account },
      );

      const statsAfter = await agentNFA.read.getStats([2n]);
      assert.ok(
        statsAfter.xp > xpBefore,
        `Runner-up XP should increase: ${statsAfter.xp} > ${xpBefore}`,
      );
    });

    it('should record solve for all winners', async () => {
      const solvesBefore1 = (await agentNFA.read.getStats([1n]))
        .problemsSolved;
      const solvesBefore2 = (await agentNFA.read.getStats([2n]))
        .problemsSolved;

      const problemId = await postAndResolve(
        [
          { tokenId: 1n, account: user1.account },
          { tokenId: 2n, account: user2.account },
        ],
      );

      await rewardDistributor.write.distributeRewards(
        [problemId, [1n, 2n], [], []],
        { account: oracle.account },
      );

      const solvesAfter1 = (await agentNFA.read.getStats([1n]))
        .problemsSolved;
      const solvesAfter2 = (await agentNFA.read.getStats([2n]))
        .problemsSolved;

      assert.equal(solvesAfter1, solvesBefore1 + 1);
      assert.equal(solvesAfter2, solvesBefore2 + 1);
    });

    it('should grant more XP to first place than runners-up (Bronze tier)', async () => {
      const xpBefore1 = (await agentNFA.read.getStats([1n])).xp;
      const xpBefore2 = (await agentNFA.read.getStats([2n])).xp;

      const problemId = await postAndResolve(
        [
          { tokenId: 1n, account: user1.account },
          { tokenId: 2n, account: user2.account },
        ],
      );

      await rewardDistributor.write.distributeRewards(
        [problemId, [1n, 2n], [], []],
        { account: oracle.account },
      );

      const xpAfter1 = (await agentNFA.read.getStats([1n])).xp;
      const xpAfter2 = (await agentNFA.read.getStats([2n])).xp;

      const firstXPGain = xpAfter1 - xpBefore1;
      const runnerXPGain = xpAfter2 - xpBefore2;

      assert.ok(
        firstXPGain > runnerXPGain,
        `1st place XP (${firstXPGain}) should be > runner-up XP (${runnerXPGain})`,
      );
    });
  });

  // ──────────────────────────────────────────────
  // problemRewarded (double distribution prevention)
  // ──────────────────────────────────────────────

  describe('problemRewarded', () => {
    it('should prevent double distribution for the same problem', async () => {
      const problemId = await postAndResolve(
        [{ tokenId: 1n, account: user1.account }],
      );

      await rewardDistributor.write.distributeRewards(
        [problemId, [1n], [], []],
        { account: oracle.account },
      );

      await assert.rejects(
        rewardDistributor.write.distributeRewards(
          [problemId, [1n], [], []],
          { account: oracle.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('AlreadyRewarded'),
            `Expected AlreadyRewarded error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should mark problem as rewarded after distribution', async () => {
      const problemId = await postAndResolve(
        [{ tokenId: 2n, account: user2.account }],
      );

      const rewardedBefore = await rewardDistributor.read.problemRewarded([
        problemId,
      ]);
      assert.equal(rewardedBefore, false);

      await rewardDistributor.write.distributeRewards(
        [problemId, [2n], [], []],
        { account: oracle.account },
      );

      const rewardedAfter = await rewardDistributor.read.problemRewarded([
        problemId,
      ]);
      assert.equal(rewardedAfter, true);
    });

    it('should revert when non-oracle calls distributeRewards', async () => {
      const problemId = await postAndResolve(
        [{ tokenId: 3n, account: user3.account }],
      );

      await assert.rejects(
        rewardDistributor.write.distributeRewards(
          [problemId, [3n], [], []],
          { account: user1.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('OnlyOracle'),
            `Expected OnlyOracle error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should revert when problem is not resolved', async () => {
      const questionHash = keccak256(toHex('unresolved-problem'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const unresolvedId = count - 1n;

      await assert.rejects(
        rewardDistributor.write.distributeRewards(
          [unresolvedId, [1n], [], []],
          { account: oracle.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('ProblemNotResolved'),
            `Expected ProblemNotResolved error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });
});
