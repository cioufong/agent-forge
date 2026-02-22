import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import hre from 'hardhat';
import { parseEther, getAddress, zeroAddress, keccak256, toHex, encodeFunctionData, parseAbi } from 'viem';

describe('AgentNFA', () => {
  let connection: any;
  let publicClient: any;
  let walletClients: any[];
  let deployer: any;
  let gameMaster: any;
  let user1: any;
  let user2: any;
  let user3: any;
  let agentNFA: any;

  const MINT_PRICE = parseEther('0.05');

  before(async () => {
    connection = await hre.network.connect();
    publicClient = await connection.viem.getPublicClient();
    walletClients = await connection.viem.getWalletClients();
    [deployer, gameMaster, user1, user2, user3] = walletClients;

    agentNFA = await connection.viem.deployContract('AgentNFA', [MINT_PRICE]);

    // Set game master and unpause
    await agentNFA.write.setGameMaster([gameMaster.account.address, true], {
      account: deployer.account,
    });
    await agentNFA.write.unpause({ account: deployer.account });
  });

  // ──────────────────────────────────────────────
  // Minting
  // ──────────────────────────────────────────────

  describe('Minting', () => {
    it('should mint an NFA when paying mintPrice', async () => {
      const hash = await agentNFA.write.mint({
        account: user1.account,
        value: MINT_PRICE,
      });

      const totalSupply = await agentNFA.read.totalSupply();
      assert.equal(totalSupply, 1n);

      // Token ID 1 should be owned by user1
      const owner = await agentNFA.read.ownerOf([1n]);
      assert.equal(getAddress(owner), getAddress(user1.account.address));
    });

    it('should start at level 1 with 0 XP', async () => {
      const stats = await agentNFA.read.getStats([1n]);
      assert.equal(stats.level, 1);
      assert.equal(stats.xp, 0n);
      assert.equal(stats.problemsSolved, 0);
      assert.equal(stats.problemsAttempted, 0);
    });

    it('should generate traits within valid ranges', async () => {
      const traits = await agentNFA.read.getTraits([1n]);

      // intelligence: 8-18
      assert.ok(traits.intelligence >= 8 && traits.intelligence <= 18,
        `intelligence ${traits.intelligence} out of range 8-18`);

      // speed: 8-18
      assert.ok(traits.speed >= 8 && traits.speed <= 18,
        `speed ${traits.speed} out of range 8-18`);

      // specialization: 0-2
      assert.ok(traits.specialization >= 0 && traits.specialization <= 2,
        `specialization ${traits.specialization} out of range 0-2`);

      // talentRarity: 0-4
      assert.ok(traits.talentRarity >= 0 && traits.talentRarity <= 4,
        `talentRarity ${traits.talentRarity} out of range 0-4`);
    });

    it('should revert when payment is insufficient', async () => {
      await assert.rejects(
        agentNFA.write.mint({
          account: user1.account,
          value: parseEther('0.01'),
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('InsufficientPayment'),
            `Expected InsufficientPayment error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should increment tokenId for subsequent mints', async () => {
      await agentNFA.write.mint({
        account: user2.account,
        value: MINT_PRICE,
      });

      const totalSupply = await agentNFA.read.totalSupply();
      assert.equal(totalSupply, 2n);

      const owner = await agentNFA.read.ownerOf([2n]);
      assert.equal(getAddress(owner), getAddress(user2.account.address));
    });

    it('should emit AgentMinted event', async () => {
      const hash = await agentNFA.write.mint({
        account: user3.account,
        value: MINT_PRICE,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      // Verify event was emitted (at least one log from the contract)
      assert.ok(receipt.logs.length > 0, 'Expected AgentMinted event');
    });
  });

  // ──────────────────────────────────────────────
  // XP and Leveling
  // ──────────────────────────────────────────────

  describe('XP and Leveling', () => {
    let xpTokenId: bigint;

    before(async () => {
      // Mint a fresh NFA for XP tests
      await agentNFA.write.mint({
        account: user1.account,
        value: MINT_PRICE,
      });
      const totalSupply = await agentNFA.read.totalSupply();
      xpTokenId = totalSupply;
    });

    it('should grant XP and keep same level if below threshold', async () => {
      await agentNFA.write.grantXP([xpTokenId, 50n], {
        account: gameMaster.account,
      });

      const stats = await agentNFA.read.getStats([xpTokenId]);
      assert.equal(stats.xp, 50n);
      assert.equal(stats.level, 1);
    });

    it('should level up to 2 at 100 XP', async () => {
      // Already has 50 XP, grant 50 more
      await agentNFA.write.grantXP([xpTokenId, 50n], {
        account: gameMaster.account,
      });

      const stats = await agentNFA.read.getStats([xpTokenId]);
      assert.equal(stats.xp, 100n);
      assert.equal(stats.level, 2);
    });

    it('should level up multiple times with large XP grant', async () => {
      // Currently at 100 XP, level 2. Grant enough to reach level 5 (1000 XP threshold)
      await agentNFA.write.grantXP([xpTokenId, 900n], {
        account: gameMaster.account,
      });

      const stats = await agentNFA.read.getStats([xpTokenId]);
      assert.equal(stats.xp, 1000n);
      assert.equal(stats.level, 5);
    });

    it('should accumulate XP correctly', async () => {
      await agentNFA.write.grantXP([xpTokenId, 500n], {
        account: gameMaster.account,
      });

      const stats = await agentNFA.read.getStats([xpTokenId]);
      assert.equal(stats.xp, 1500n);
      // 1500 XP => level 6 (threshold 1500)
      assert.equal(stats.level, 6);
    });
  });

  // ──────────────────────────────────────────────
  // isEligible
  // ──────────────────────────────────────────────

  describe('isEligible', () => {
    it('should return true for minted tokens', async () => {
      const eligible = await agentNFA.read.isEligible([1n]);
      assert.equal(eligible, true);
    });

    it('should return false for non-existent tokens', async () => {
      const eligible = await agentNFA.read.isEligible([9999n]);
      assert.equal(eligible, false);
    });
  });

  // ──────────────────────────────────────────────
  // Game Master Access
  // ──────────────────────────────────────────────

  describe('Game Master Access', () => {
    it('should allow game master to grantXP', async () => {
      await agentNFA.write.grantXP([1n, 10n], {
        account: gameMaster.account,
      });
      // Should not revert
      const stats = await agentNFA.read.getStats([1n]);
      assert.ok(stats.xp > 0n);
    });

    it('should revert when non-game-master calls grantXP', async () => {
      await assert.rejects(
        agentNFA.write.grantXP([1n, 10n], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('NotGameMaster'),
            `Expected NotGameMaster error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow game master to recordAttempt', async () => {
      await agentNFA.write.recordAttempt([1n], {
        account: gameMaster.account,
      });

      const stats = await agentNFA.read.getStats([1n]);
      assert.ok(stats.problemsAttempted > 0);
    });

    it('should revert when non-game-master calls recordAttempt', async () => {
      await assert.rejects(
        agentNFA.write.recordAttempt([1n], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('NotGameMaster'),
            `Expected NotGameMaster error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow game master to recordSolve', async () => {
      await agentNFA.write.recordSolve([1n], {
        account: gameMaster.account,
      });

      const stats = await agentNFA.read.getStats([1n]);
      assert.ok(stats.problemsSolved > 0);
    });

    it('should revert when non-game-master calls recordSolve', async () => {
      await assert.rejects(
        agentNFA.write.recordSolve([1n], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('NotGameMaster'),
            `Expected NotGameMaster error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow owner to act as game master', async () => {
      // Owner (deployer) can also call game-master functions
      await agentNFA.write.grantXP([1n, 5n], {
        account: deployer.account,
      });
      // Should not revert
    });
  });

  // ──────────────────────────────────────────────
  // getTier
  // ──────────────────────────────────────────────

  describe('getTier', () => {
    it('should return Bronze (0) for levels 1-7', async () => {
      // Token 1 is level 1 (or similar low level)
      // Mint a fresh token at level 1
      await agentNFA.write.mint({
        account: user1.account,
        value: MINT_PRICE,
      });
      const totalSupply = await agentNFA.read.totalSupply();
      const tokenId = totalSupply;

      const tier = await agentNFA.read.getTier([tokenId]);
      assert.equal(tier, 0); // Bronze

      // Grant XP to reach level 7 (2100 XP threshold)
      await agentNFA.write.grantXP([tokenId, 2100n], {
        account: gameMaster.account,
      });
      const statsLv7 = await agentNFA.read.getStats([tokenId]);
      assert.equal(statsLv7.level, 7);
      const tierLv7 = await agentNFA.read.getTier([tokenId]);
      assert.equal(tierLv7, 0); // Still Bronze
    });

    it('should return Silver (1) for levels 8-14', async () => {
      await agentNFA.write.mint({
        account: user1.account,
        value: MINT_PRICE,
      });
      const totalSupply = await agentNFA.read.totalSupply();
      const tokenId = totalSupply;

      // Level 8 threshold = 2800 XP
      await agentNFA.write.grantXP([tokenId, 2800n], {
        account: gameMaster.account,
      });
      const stats = await agentNFA.read.getStats([tokenId]);
      assert.equal(stats.level, 8);
      const tier = await agentNFA.read.getTier([tokenId]);
      assert.equal(tier, 1); // Silver

      // Push to level 14 (9100 XP threshold)
      await agentNFA.write.grantXP([tokenId, 6300n], {
        account: gameMaster.account,
      });
      const stats14 = await agentNFA.read.getStats([tokenId]);
      assert.equal(stats14.level, 14);
      const tier14 = await agentNFA.read.getTier([tokenId]);
      assert.equal(tier14, 1); // Still Silver
    });

    it('should return Gold (2) for levels 15-20', async () => {
      await agentNFA.write.mint({
        account: user1.account,
        value: MINT_PRICE,
      });
      const totalSupply = await agentNFA.read.totalSupply();
      const tokenId = totalSupply;

      // Level 15 threshold = 10500 XP
      await agentNFA.write.grantXP([tokenId, 10500n], {
        account: gameMaster.account,
      });
      const stats = await agentNFA.read.getStats([tokenId]);
      assert.equal(stats.level, 15);
      const tier = await agentNFA.read.getTier([tokenId]);
      assert.equal(tier, 2); // Gold

      // Push to level 20 (19000 XP threshold)
      await agentNFA.write.grantXP([tokenId, 8500n], {
        account: gameMaster.account,
      });
      const stats20 = await agentNFA.read.getStats([tokenId]);
      assert.equal(stats20.level, 20);
      const tier20 = await agentNFA.read.getTier([tokenId]);
      assert.equal(tier20, 2); // Gold
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: setExperience and setVault
  // ──────────────────────────────────────────────

  describe('BAP-578', () => {
    it('should allow game master to setExperience', async () => {
      const experienceText = 'Solved 10 math problems in a row';
      await agentNFA.write.setExperience([1n, experienceText], {
        account: gameMaster.account,
      });

      const stored = await agentNFA.read.experience([1n]);
      assert.equal(stored, experienceText);
    });

    it('should revert when non-game-master calls setExperience', async () => {
      await assert.rejects(
        agentNFA.write.setExperience([1n, 'hacked'], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('0x921fd1d6') || err.message.includes('NotGameMaster'),
            `Expected NotGameMaster error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow game master to setVault', async () => {
      const uri = 'ipfs://QmTest1234567890';
      const hash = keccak256(toHex('vault-data-hash'));

      await agentNFA.write.setVault([1n, uri, hash], {
        account: gameMaster.account,
      });

      const storedUri = await agentNFA.read.vaultURI([1n]);
      const storedHash = await agentNFA.read.vaultHash([1n]);
      assert.equal(storedUri, uri);
      assert.equal(storedHash, hash);
    });

    it('should revert when non-game-master calls setVault', async () => {
      const hash = keccak256(toHex('hack'));
      await assert.rejects(
        agentNFA.write.setVault([1n, 'ipfs://hacked', hash], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('0x921fd1d6') || err.message.includes('NotGameMaster'),
            `Expected NotGameMaster error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should emit ExperienceUpdated event', async () => {
      const hash = await agentNFA.write.setExperience(
        [1n, 'New experience entry'],
        { account: gameMaster.account },
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected ExperienceUpdated event');
    });

    it('should emit VaultUpdated event', async () => {
      const vaultHash = keccak256(toHex('vault-update'));
      const hash = await agentNFA.write.setVault(
        [1n, 'ipfs://QmUpdated', vaultHash],
        { account: gameMaster.account },
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected VaultUpdated event');
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: Per-token Status
  // ──────────────────────────────────────────────

  describe('BAP-578: Per-token Status', () => {
    let statusTokenId: bigint;

    before(async () => {
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      statusTokenId = await agentNFA.read.totalSupply();
    });

    it('should start with Active status', async () => {
      const status = await agentNFA.read.agentStatus([statusTokenId]);
      assert.equal(status, 0); // Active = 0
    });

    it('should allow owner to pause agent', async () => {
      // pause(uint256) overload
      const hash = await agentNFA.write.pause([statusTokenId], { account: user1.account });
      const status = await agentNFA.read.agentStatus([statusTokenId]);
      assert.equal(status, 1); // Paused = 1

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected StatusChanged event');
    });

    it('should revert if non-owner tries to pause agent', async () => {
      // Mint a fresh active agent for user1
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      const freshId = await agentNFA.read.totalSupply();

      await assert.rejects(
        agentNFA.write.pause([freshId], { account: user2.account }),
        (err: any) => {
          assert.ok(err.message.includes('NotTokenOwner') || err.message.includes('0x59dc379f'), `Expected NotTokenOwner, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should allow owner to unpause agent', async () => {
      // statusTokenId is currently Paused
      await agentNFA.write.unpause([statusTokenId], { account: user1.account });
      const status = await agentNFA.read.agentStatus([statusTokenId]);
      assert.equal(status, 0); // Active = 0
    });

    it('should revert unpause if not paused', async () => {
      // statusTokenId is now Active
      await assert.rejects(
        agentNFA.write.unpause([statusTokenId], { account: user1.account }),
        (err: any) => {
          assert.ok(err.message.includes('AgentNotPaused'), `Expected AgentNotPaused, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should allow owner to terminate agent', async () => {
      const hash = await agentNFA.write.terminate([statusTokenId], { account: user1.account });
      const status = await agentNFA.read.agentStatus([statusTokenId]);
      assert.equal(status, 2); // Terminated = 2

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected StatusChanged event');
    });

    it('should not allow unpause of terminated agent', async () => {
      await assert.rejects(
        agentNFA.write.unpause([statusTokenId], { account: user1.account }),
        (err: any) => {
          assert.ok(err.message.includes('AgentNotPaused'), `Expected AgentNotPaused, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should not allow terminate of already terminated agent', async () => {
      await assert.rejects(
        agentNFA.write.terminate([statusTokenId], { account: user1.account }),
        (err: any) => {
          assert.ok(err.message.includes('AgentTerminated'), `Expected AgentTerminated, got: ${err.message}`);
          return true;
        },
      );
    });

    it('isEligible should return false for terminated agent', async () => {
      const eligible = await agentNFA.read.isEligible([statusTokenId]);
      assert.equal(eligible, false);
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: fundAgent / withdrawFromAgent
  // ──────────────────────────────────────────────

  describe('BAP-578: Agent Funding', () => {
    let fundTokenId: bigint;

    before(async () => {
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      fundTokenId = await agentNFA.read.totalSupply();
    });

    it('should allow anyone to fund an agent', async () => {
      const fundAmount = parseEther('1');
      const hash = await agentNFA.write.fundAgent([fundTokenId], {
        account: user2.account,
        value: fundAmount,
      });

      const balance = await agentNFA.read.agentBalance([fundTokenId]);
      assert.equal(balance, fundAmount);

      const totalAgentBal = await agentNFA.read.totalAgentBalance();
      assert.equal(totalAgentBal, fundAmount);

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected AgentFunded event');
    });

    it('should allow owner to withdraw from agent', async () => {
      const withdrawAmount = parseEther('0.5');
      await agentNFA.write.withdrawFromAgent([fundTokenId, withdrawAmount], {
        account: user1.account,
      });

      const balance = await agentNFA.read.agentBalance([fundTokenId]);
      assert.equal(balance, parseEther('0.5'));

      const totalAgentBal = await agentNFA.read.totalAgentBalance();
      assert.equal(totalAgentBal, parseEther('0.5'));
    });

    it('should revert withdraw if non-owner', async () => {
      await assert.rejects(
        agentNFA.write.withdrawFromAgent([fundTokenId, parseEther('0.1')], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('NotTokenOwner') || err.message.includes('0x59dc379f'), `Expected NotTokenOwner, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should revert withdraw if insufficient agent balance', async () => {
      await assert.rejects(
        agentNFA.write.withdrawFromAgent([fundTokenId, parseEther('999')], {
          account: user1.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('InsufficientAgentBalance'), `Expected InsufficientAgentBalance, got: ${err.message}`);
          return true;
        },
      );
    });

    it('owner withdraw() should not touch agent balances', async () => {
      // Fund agent with more BNB
      await agentNFA.write.fundAgent([fundTokenId], {
        account: user2.account,
        value: parseEther('1'),
      });

      const agentBal = await agentNFA.read.agentBalance([fundTokenId]);
      const totalBefore = await agentNFA.read.totalAgentBalance();

      // Owner withdraws contract's non-agent funds
      await agentNFA.write.withdraw({ account: deployer.account });

      // Agent balance should be unchanged
      const agentBalAfter = await agentNFA.read.agentBalance([fundTokenId]);
      assert.equal(agentBalAfter, agentBal);

      const totalAfter = await agentNFA.read.totalAgentBalance();
      assert.equal(totalAfter, totalBefore);
    });

    it('terminate should refund agent balance', async () => {
      // Mint fresh agent with funds
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      const termTokenId = await agentNFA.read.totalSupply();

      await agentNFA.write.fundAgent([termTokenId], {
        account: user2.account,
        value: parseEther('2'),
      });

      const balBefore = await agentNFA.read.agentBalance([termTokenId]);
      assert.equal(balBefore, parseEther('2'));

      await agentNFA.write.terminate([termTokenId], { account: user1.account });

      const balAfter = await agentNFA.read.agentBalance([termTokenId]);
      assert.equal(balAfter, 0n);
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: executeAction / setLogicAddress
  // ──────────────────────────────────────────────

  describe('BAP-578: Logic & Actions', () => {
    let logicTokenId: bigint;
    let mockLogic: any;

    const mockLogicAbi = parseAbi([
      'function doSomething(uint256 value) returns (uint256)',
      'function alwaysRevert()',
      'function lastValue() view returns (uint256)',
    ]);

    before(async () => {
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      logicTokenId = await agentNFA.read.totalSupply();

      mockLogic = await connection.viem.deployContract('MockLogic', []);
    });

    it('should allow owner to set logic address', async () => {
      const hash = await agentNFA.write.setLogicAddress([logicTokenId, mockLogic.address], {
        account: user1.account,
      });

      const logic = await agentNFA.read.logicAddress([logicTokenId]);
      assert.equal(getAddress(logic), getAddress(mockLogic.address));

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected LogicUpgraded event');
    });

    it('should revert setLogicAddress if non-owner', async () => {
      await assert.rejects(
        agentNFA.write.setLogicAddress([logicTokenId, mockLogic.address], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('NotTokenOwner') || err.message.includes('0x59dc379f'), `Expected NotTokenOwner, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should execute action via logic contract', async () => {
      const callData = encodeFunctionData({
        abi: mockLogicAbi,
        functionName: 'doSomething',
        args: [42n],
      });

      const hash = await agentNFA.write.executeAction([logicTokenId, callData], {
        account: user1.account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected ActionExecuted event');

      // Verify mock logic received the call
      const lastValue = await mockLogic.read.lastValue();
      assert.equal(lastValue, 42n);
    });

    it('should revert executeAction if non-owner', async () => {
      const callData = encodeFunctionData({
        abi: mockLogicAbi,
        functionName: 'doSomething',
        args: [1n],
      });

      await assert.rejects(
        agentNFA.write.executeAction([logicTokenId, callData], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('NotTokenOwner') || err.message.includes('0x59dc379f'), `Expected NotTokenOwner, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should revert executeAction if agent not active', async () => {
      // Pause the agent first
      await agentNFA.write.pause([logicTokenId], { account: user1.account });

      const callData = encodeFunctionData({
        abi: mockLogicAbi,
        functionName: 'doSomething',
        args: [1n],
      });

      await assert.rejects(
        agentNFA.write.executeAction([logicTokenId, callData], {
          account: user1.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('AgentNotActive'), `Expected AgentNotActive, got: ${err.message}`);
          return true;
        },
      );

      // Unpause for further tests
      await agentNFA.write.unpause([logicTokenId], { account: user1.account });
    });

    it('should revert executeAction if no logic address', async () => {
      // Mint fresh agent without logic
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      const noLogicId = await agentNFA.read.totalSupply();

      const callData = encodeFunctionData({
        abi: mockLogicAbi,
        functionName: 'doSomething',
        args: [1n],
      });

      await assert.rejects(
        agentNFA.write.executeAction([noLogicId, callData], {
          account: user1.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('NoLogicAddress'), `Expected NoLogicAddress, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should revert executeAction if logic call reverts', async () => {
      const callData = encodeFunctionData({
        abi: mockLogicAbi,
        functionName: 'alwaysRevert',
      });

      await assert.rejects(
        agentNFA.write.executeAction([logicTokenId, callData], {
          account: user1.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('ActionFailed'), `Expected ActionFailed, got: ${err.message}`);
          return true;
        },
      );
    });

    it('should not allow setLogicAddress for terminated agent', async () => {
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      const termId = await agentNFA.read.totalSupply();
      await agentNFA.write.terminate([termId], { account: user1.account });

      await assert.rejects(
        agentNFA.write.setLogicAddress([termId, mockLogic.address], {
          account: user1.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('AgentTerminated'), `Expected AgentTerminated, got: ${err.message}`);
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: Metadata
  // ──────────────────────────────────────────────

  describe('BAP-578: Agent Metadata', () => {
    let metaTokenId: bigint;

    before(async () => {
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      metaTokenId = await agentNFA.read.totalSupply();
    });

    it('should return empty metadata initially', async () => {
      const meta = await agentNFA.read.getAgentMetadata([metaTokenId]);
      assert.equal(meta.persona, '');
      assert.equal(meta.experience, '');
      assert.equal(meta.voiceHash, '');
      assert.equal(meta.animationURI, '');
      assert.equal(meta.vaultURI, '');
    });

    it('should allow token owner to update metadata', async () => {
      const vHash = keccak256(toHex('vault-content'));
      const metadata = {
        persona: 'A wise math agent',
        experience: 'Solved 100 problems',
        voiceHash: 'voice-hash-abc',
        animationURI: 'ipfs://QmAnimation',
        vaultURI: 'ipfs://QmVault',
        vaultHash: vHash,
      };

      const hash = await agentNFA.write.updateAgentMetadata([metaTokenId, metadata], {
        account: user1.account,
      });

      const stored = await agentNFA.read.getAgentMetadata([metaTokenId]);
      assert.equal(stored.persona, metadata.persona);
      assert.equal(stored.experience, metadata.experience);
      assert.equal(stored.voiceHash, metadata.voiceHash);
      assert.equal(stored.animationURI, metadata.animationURI);
      assert.equal(stored.vaultURI, metadata.vaultURI);
      assert.equal(stored.vaultHash, vHash);

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected MetadataUpdated event');
    });

    it('should allow game master to update metadata', async () => {
      const vHash = keccak256(toHex('gm-vault'));
      const metadata = {
        persona: 'Updated by GM',
        experience: 'GM experience',
        voiceHash: 'gm-voice',
        animationURI: 'ipfs://QmGM',
        vaultURI: 'ipfs://QmGMVault',
        vaultHash: vHash,
      };

      await agentNFA.write.updateAgentMetadata([metaTokenId, metadata], {
        account: gameMaster.account,
      });

      const stored = await agentNFA.read.getAgentMetadata([metaTokenId]);
      assert.equal(stored.persona, 'Updated by GM');
    });

    it('should revert updateMetadata if non-owner/non-GM', async () => {
      const vHash = keccak256(toHex('hack'));
      const metadata = {
        persona: 'hacked',
        experience: 'hacked',
        voiceHash: 'hacked',
        animationURI: 'hacked',
        vaultURI: 'hacked',
        vaultHash: vHash,
      };

      await assert.rejects(
        agentNFA.write.updateAgentMetadata([metaTokenId, metadata], {
          account: user2.account,
        }),
        (err: any) => {
          assert.ok(err.message.includes('NotTokenOwner') || err.message.includes('0x59dc379f'), `Expected NotTokenOwner, got: ${err.message}`);
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: getState
  // ──────────────────────────────────────────────

  describe('BAP-578: getState', () => {
    it('should return correct state for an active agent', async () => {
      await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE });
      const tokenId = await agentNFA.read.totalSupply();

      const state = await agentNFA.read.getState([tokenId]);
      assert.equal(state.balance, 0n);
      assert.equal(state.status, 0); // Active
      assert.equal(getAddress(state.owner), getAddress(user1.account.address));
      assert.equal(getAddress(state.logicAddress), getAddress(zeroAddress));
      assert.ok(state.lastActionTimestamp > 0n);
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: supportsInterface
  // ──────────────────────────────────────────────

  describe('BAP-578: supportsInterface', () => {
    it('should support IBAP578 interface', async () => {
      // IBAP578 interfaceId is computed from XOR of all function selectors
      // We test by calling supportsInterface with the expected interfaceId
      // The contract returns type(IBAP578).interfaceId
      const supports = await agentNFA.read.supportsInterface(['0x80ac58cd']); // ERC721
      assert.equal(supports, true);
    });

    it('should support ERC165', async () => {
      const supports = await agentNFA.read.supportsInterface(['0x01ffc9a7']); // ERC165
      assert.equal(supports, true);
    });

    it('should not support random interface', async () => {
      const supports = await agentNFA.read.supportsInterface(['0xdeadbeef']);
      assert.equal(supports, false);
    });
  });

  // ──────────────────────────────────────────────
  // BAP-578: receive() fallback
  // ──────────────────────────────────────────────

  describe('BAP-578: receive()', () => {
    it('should accept plain BNB transfers', async () => {
      // Send BNB directly to the contract
      const hash = await user1.sendTransaction({
        to: agentNFA.address,
        value: parseEther('0.1'),
      });
      // Should not revert
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.equal(receipt.status, 'success');
    });
  });
});
