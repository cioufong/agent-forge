import {describe, it, before} from 'node:test';
import assert from 'node:assert/strict';
import hre from 'hardhat';
import {parseEther, keccak256, toHex} from 'viem';

describe('Integration: Full Flow', () => {
  const MINT_PRICE = parseEther('0.01');

  // Phase durations (must match ProblemManager constants)
  const SUBMIT_DURATION = 5n * 60n;  // 5 minutes
  const REVEAL_DURATION = 2n * 60n;  // 2 minutes
  const VERIFY_DURATION = 3n * 60n;  // 3 minutes

  let connection: any;
  let publicClient: any;
  let walletClients: any[];
  let deployer: any, oracle: any, devWallet: any, user1: any, user2: any;

  let afgToken: any;
  let agentNFA: any;
  let renderer: any;
  let problemManager: any;
  let rewardDistributor: any;
  let verifierElection: any;

  before(async () => {
    connection = await hre.network.connect();
    publicClient = await connection.viem.getPublicClient();
    walletClients = await connection.viem.getWalletClients();
    [deployer, oracle, devWallet, user1, user2] = walletClients;

    // Deploy all contracts
    const DUMMY_ROUTER = '0x0000000000000000000000000000000000000001';
    afgToken = await connection.viem.deployContract('AFGToken', [deployer.account.address, DUMMY_ROUTER]);
    agentNFA = await connection.viem.deployContract('AgentNFA', [MINT_PRICE]);
    renderer = await connection.viem.deployContract('AgentNFARenderer', [agentNFA.address]);
    problemManager = await connection.viem.deployContract('ProblemManager', [
      agentNFA.address, oracle.account.address,
    ]);
    rewardDistributor = await connection.viem.deployContract('RewardDistributor', [
      afgToken.address, agentNFA.address, problemManager.address, devWallet.account.address,
    ]);

    // Deploy VerifierElection
    verifierElection = await connection.viem.deployContract('VerifierElection', [
      afgToken.address, agentNFA.address, problemManager.address,
    ]);

    // Wire: set VerifierElection as resolver on ProblemManager
    await problemManager.write.setResolver([verifierElection.address], {account: deployer.account});

    // Wire: set VerifierElection on RewardDistributor
    await rewardDistributor.write.setVerifierElection([verifierElection.address], {account: deployer.account});

    // Wire remaining contracts
    await afgToken.write.setMinter([rewardDistributor.address], {account: deployer.account});
    await agentNFA.write.setMetadataRenderer([renderer.address], {account: deployer.account});
    await agentNFA.write.setGameMaster([rewardDistributor.address, true], {account: deployer.account});

    // Unpause all
    await afgToken.write.unpause({account: deployer.account});
    await agentNFA.write.unpause({account: deployer.account});
    await problemManager.write.unpause({account: deployer.account});
    await rewardDistributor.write.unpause({account: deployer.account});
  });

  it('full flow: mint NFA -> post problem -> submit -> reveal -> resolve -> distribute -> claim -> verify XP', async () => {
    // ──────────────────────────────────────────────
    // 1. Mint NFA agents
    // ──────────────────────────────────────────────
    const hash1 = await agentNFA.write.mint({account: user1.account, value: MINT_PRICE});
    await publicClient.waitForTransactionReceipt({hash: hash1});
    const tokenId1 = 1n;

    const hash2 = await agentNFA.write.mint({account: user2.account, value: MINT_PRICE});
    await publicClient.waitForTransactionReceipt({hash: hash2});
    const tokenId2 = 2n;

    // Verify agents exist and ownership
    const owner1 = await agentNFA.read.ownerOf([tokenId1]);
    assert.equal(owner1.toLowerCase(), user1.account.address.toLowerCase());

    const owner2 = await agentNFA.read.ownerOf([tokenId2]);
    assert.equal(owner2.toLowerCase(), user2.account.address.toLowerCase());

    // Verify initial stats
    const stats1 = await agentNFA.read.getStats([tokenId1]);
    assert.equal(stats1.level, 1);
    assert.equal(stats1.xp, 0n);

    // Verify traits are in valid range
    const traits1 = await agentNFA.read.getTraits([tokenId1]);
    assert.ok(traits1.intelligence >= 8 && traits1.intelligence <= 18);
    assert.ok(traits1.speed >= 8 && traits1.speed <= 18);

    // Verify tokenURI works (renderer is linked)
    const uri1 = await agentNFA.read.tokenURI([tokenId1]);
    assert.ok(uri1.startsWith('data:application/json;base64,'));

    // ──────────────────────────────────────────────
    // 2. Oracle posts a problem
    // ──────────────────────────────────────────────
    const questionHash = keccak256(toHex('What is 2 + 2?'));
    await problemManager.write.postProblem([questionHash], {account: oracle.account});

    const problemCount = await problemManager.read.problemCount();
    assert.equal(problemCount, 1n);
    const problemId = 0n;

    // Verify problem is active (in submit phase)
    const isActive = await problemManager.read.isActive([problemId]);
    assert.equal(isActive, true);

    // Verify problem has 3 deadlines
    const prob = await problemManager.read.getProblem([problemId]);
    assert.ok(prob.submitDeadline > 0n, 'submitDeadline should be set');
    assert.ok(prob.revealDeadline > prob.submitDeadline, 'revealDeadline > submitDeadline');
    assert.ok(prob.verifyDeadline > prob.revealDeadline, 'verifyDeadline > revealDeadline');
    assert.equal(prob.revealDeadline - prob.submitDeadline, REVEAL_DURATION);
    assert.equal(prob.verifyDeadline - prob.revealDeadline, VERIFY_DURATION);

    // ──────────────────────────────────────────────
    // 3. Both users submit answer hashes during submit phase
    //    user1 submits correct answer hash, user2 submits wrong
    // ──────────────────────────────────────────────
    const answer1Hash = keccak256(toHex('4'));  // correct
    await problemManager.write.submitAnswer([problemId, tokenId1, answer1Hash], {account: user1.account});

    const answer2Hash = keccak256(toHex('5'));  // wrong
    await problemManager.write.submitAnswer([problemId, tokenId2, answer2Hash], {account: user2.account});

    // Verify submissions recorded
    const submitted1 = await problemManager.read.hasSubmitted([problemId, tokenId1]);
    assert.equal(submitted1, true);

    const submitted2 = await problemManager.read.hasSubmitted([problemId, tokenId2]);
    assert.equal(submitted2, true);

    const submissionCount = await problemManager.read.getSubmissionCount([problemId]);
    assert.equal(submissionCount, 2n);

    // ──────────────────────────────────────────────
    // 4. Advance to reveal phase (past 5 min submit deadline)
    // ──────────────────────────────────────────────
    await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

    // Verify problem is no longer in submit phase (isActive checks submitDeadline)
    const isActiveAfter = await problemManager.read.isActive([problemId]);
    assert.equal(isActiveAfter, false);

    // Verify we are in Reveal phase
    const phaseAfterSubmit = await problemManager.read.getPhase([problemId]);
    assert.equal(phaseAfterSubmit, 1);  // Phase.Reveal = 1

    // ──────────────────────────────────────────────
    // 5. Both users reveal their plaintext answers
    // ──────────────────────────────────────────────
    await problemManager.write.revealAnswer([problemId, tokenId1, '4'], {account: user1.account});
    await problemManager.write.revealAnswer([problemId, tokenId2, '5'], {account: user2.account});

    // Verify reveals recorded
    const sub1 = await problemManager.read.getSubmission([problemId, 0n]);
    assert.equal(sub1.revealed, true);
    assert.equal(sub1.revealedAnswerHash, keccak256(toHex('4')));

    const sub2 = await problemManager.read.getSubmission([problemId, 1n]);
    assert.equal(sub2.revealed, true);
    assert.equal(sub2.revealedAnswerHash, keccak256(toHex('5')));

    // Verify answer counts
    const count4 = await problemManager.read.revealedAnswerCount([problemId, keccak256(toHex('4'))]);
    assert.equal(count4, 1n);
    const count5 = await problemManager.read.revealedAnswerCount([problemId, keccak256(toHex('5'))]);
    assert.equal(count5, 1n);

    // Verify answer token mapping
    const tokensFor4 = await problemManager.read.getAnswerTokenIds([problemId, keccak256(toHex('4'))]);
    assert.equal(tokensFor4.length, 1);
    assert.equal(tokensFor4[0], tokenId1);

    // ──────────────────────────────────────────────
    // 6. Advance past verify deadline (reveal + verify = 2 + 3 = 5 more min)
    // ──────────────────────────────────────────────
    await connection.networkHelpers.time.increase(REVEAL_DURATION + VERIFY_DURATION + 1n);

    // ──────────────────────────────────────────────
    // 7. Oracle resolves via resolveByOracle with the correct answer hash
    //    Winners are auto-determined: tokenIds that revealed matching hash
    // ──────────────────────────────────────────────
    const correctAnswerHash = keccak256(toHex('4'));
    await problemManager.write.resolveByOracle(
      [problemId, correctAnswerHash],
      {account: oracle.account},
    );

    const problem = await problemManager.read.getProblem([problemId]);
    assert.equal(problem.resolved, true);
    assert.equal(problem.correctAnswerHash, correctAnswerHash);
    assert.equal(problem.oracleFallback, true);  // resolveByOracle sets oracleFallback=true

    // ──────────────────────────────────────────────
    // 8. Verify winners (only user1 who revealed '4')
    // ──────────────────────────────────────────────
    const winners = await problemManager.read.getWinners([problemId]);
    assert.equal(winners.length, 1);
    assert.equal(winners[0], tokenId1);

    // ──────────────────────────────────────────────
    // 9. Distribute rewards (Bronze winners only)
    // ──────────────────────────────────────────────
    const user1BalanceBefore = await afgToken.read.balanceOf([user1.account.address]);

    await rewardDistributor.write.distributeRewards(
      [problemId, [tokenId1], [], []],  // bronzeWinners, silverWinners, goldWinners
      {account: oracle.account},
    );

    // Verify pending rewards
    const pending1 = await rewardDistributor.read.pendingRewards([user1.account.address]);
    assert.ok(pending1 > 0n, 'User1 should have pending rewards');

    // ──────────────────────────────────────────────
    // 10. Claim rewards, verify balances
    // ──────────────────────────────────────────────
    await rewardDistributor.write.claimRewards({account: user1.account});

    const pendingAfterClaim = await rewardDistributor.read.pendingRewards([user1.account.address]);
    assert.equal(pendingAfterClaim, 0n);

    const user1BalanceAfter = await afgToken.read.balanceOf([user1.account.address]);
    assert.ok(user1BalanceAfter > user1BalanceBefore, 'User1 balance should increase after claim');

    // ──────────────────────────────────────────────
    // 11. Verify XP granted
    // ──────────────────────────────────────────────
    const stats1After = await agentNFA.read.getStats([tokenId1]);
    assert.ok(stats1After.xp > 0n, 'User1 NFA should have XP');
    assert.ok(stats1After.problemsSolved > 0, 'User1 NFA should have problems solved');

    // ──────────────────────────────────────────────
    // 12. Verify dev wallet fees
    // ──────────────────────────────────────────────
    const devBalance = await afgToken.read.balanceOf([devWallet.account.address]);
    assert.ok(devBalance > 0n, 'Dev wallet should have fees');

    // Verify total distributed
    const totalDist = await rewardDistributor.read.totalDistributed();
    assert.ok(totalDist > 0n, 'Total distributed should be > 0');

    // ──────────────────────────────────────────────
    // 13. Test double distribution prevention
    // ──────────────────────────────────────────────
    await assert.rejects(
      rewardDistributor.write.distributeRewards(
        [problemId, [tokenId1], [], []],
        {account: oracle.account},
      ),
      (err: any) => {
        assert.ok(err.message.includes('AlreadyRewarded'));
        return true;
      },
    );

    console.log('  Full integration test passed');
    console.log(`   User1 AFG balance: ${user1BalanceAfter}`);
    console.log(`   User1 NFA XP: ${stats1After.xp}, Level: ${stats1After.level}`);
    console.log(`   Dev wallet balance: ${devBalance}`);
    console.log(`   Total distributed: ${totalDist}`);
  });

  it('multi-NFA submission: same wallet uses multiple NFAs, both win', async () => {
    // ──────────────────────────────────────────────
    // 1. user1 mints a second NFA
    // ──────────────────────────────────────────────
    await agentNFA.write.mint({account: user1.account, value: MINT_PRICE});
    const tokenId3 = 3n;

    const owner3 = await agentNFA.read.ownerOf([tokenId3]);
    assert.equal(owner3.toLowerCase(), user1.account.address.toLowerCase());

    // ──────────────────────────────────────────────
    // 2. Post a new problem
    // ──────────────────────────────────────────────
    const questionHash = keccak256(toHex('What is 3 * 3?'));
    await problemManager.write.postProblem([questionHash], {account: oracle.account});
    const problemId = 1n;

    // ──────────────────────────────────────────────
    // 3. Both NFAs submit same correct answer hash
    // ──────────────────────────────────────────────
    const answerHash = keccak256(toHex('9'));
    await problemManager.write.submitAnswer([problemId, 1n, answerHash], {account: user1.account});
    await problemManager.write.submitAnswer([problemId, tokenId3, answerHash], {account: user1.account});

    // Both submissions recorded
    assert.equal(await problemManager.read.hasSubmitted([problemId, 1n]), true);
    assert.equal(await problemManager.read.hasSubmitted([problemId, tokenId3]), true);

    // ──────────────────────────────────────────────
    // 4. Advance to reveal phase, reveal both, advance past verify, oracle resolves
    // ──────────────────────────────────────────────

    // Advance past submit deadline into reveal phase
    await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

    // Verify we are in Reveal phase
    const phase = await problemManager.read.getPhase([problemId]);
    assert.equal(phase, 1);  // Phase.Reveal

    // Reveal both with same plaintext answer '9'
    await problemManager.write.revealAnswer([problemId, 1n, '9'], {account: user1.account});
    await problemManager.write.revealAnswer([problemId, tokenId3, '9'], {account: user1.account});

    // Verify both revealed
    const sub0 = await problemManager.read.getSubmission([problemId, 0n]);
    assert.equal(sub0.revealed, true);
    const sub1 = await problemManager.read.getSubmission([problemId, 1n]);
    assert.equal(sub1.revealed, true);

    // Verify answer count for '9' is 2
    const countNine = await problemManager.read.revealedAnswerCount([problemId, keccak256(toHex('9'))]);
    assert.equal(countNine, 2n);

    // Advance past reveal + verify deadlines
    await connection.networkHelpers.time.increase(REVEAL_DURATION + VERIFY_DURATION + 1n);

    // Oracle resolves with correct answer hash
    const correctHash = keccak256(toHex('9'));
    await problemManager.write.resolveByOracle(
      [problemId, correctHash],
      {account: oracle.account},
    );

    // ──────────────────────────────────────────────
    // 5. Both NFAs are winners
    // ──────────────────────────────────────────────
    const winners = await problemManager.read.getWinners([problemId]);
    assert.equal(winners.length, 2);
    // Winners are the tokenIds that revealed keccak256('9')
    assert.ok(
      (winners[0] === 1n && winners[1] === tokenId3) ||
      (winners[0] === tokenId3 && winners[1] === 1n),
      'Both tokenId 1 and tokenId 3 should be winners',
    );

    // ──────────────────────────────────────────────
    // 6. Distribute and verify
    // ──────────────────────────────────────────────
    await rewardDistributor.write.distributeRewards(
      [problemId, [1n, tokenId3], [], []],
      {account: oracle.account},
    );

    // user1 should have rewards accumulated (owns both winning NFAs)
    const pending = await rewardDistributor.read.pendingRewards([user1.account.address]);
    assert.ok(pending > 0n, 'User1 should have rewards from both NFAs');

    // Verify XP granted to both NFAs
    const stats1 = await agentNFA.read.getStats([1n]);
    const stats3 = await agentNFA.read.getStats([tokenId3]);
    assert.ok(stats1.problemsSolved > 0, 'TokenId 1 should have problems solved');
    assert.ok(stats3.problemsSolved > 0, 'TokenId 3 should have problems solved');

    console.log('  Multi-NFA submission test passed');
    console.log(`   Winners: [${winners.join(', ')}]`);
    console.log(`   Pending rewards: ${pending}`);
  });
});
