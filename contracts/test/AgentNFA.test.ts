import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import hre from 'hardhat';
import { parseEther, getAddress, zeroAddress, keccak256, toHex } from 'viem';

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
});
