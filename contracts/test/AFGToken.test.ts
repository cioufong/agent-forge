import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import hre from 'hardhat';
import { parseEther, getAddress, zeroAddress } from 'viem';

describe('AFGToken', () => {
  let connection: any;
  let publicClient: any;
  let walletClients: any[];
  let deployer: any;
  let treasury: any;
  let minter: any;
  let user1: any;
  let user2: any;
  let dexPair: any;
  let afgToken: any;
  // Use a dummy router address for tests (no actual swap needed)
  const DUMMY_ROUTER = '0x0000000000000000000000000000000000000001';

  before(async () => {
    connection = await hre.network.connect();
    publicClient = await connection.viem.getPublicClient();
    walletClients = await connection.viem.getWalletClients();
    [deployer, treasury, minter, user1, user2, dexPair] = walletClients;

    afgToken = await connection.viem.deployContract('AFGToken', [
      treasury.account.address,
      DUMMY_ROUTER,
    ]);
  });

  // ──────────────────────────────────────────────
  // Deployment
  // ──────────────────────────────────────────────

  describe('Deployment', () => {
    it('should have correct name and symbol', async () => {
      const name = await afgToken.read.name();
      const symbol = await afgToken.read.symbol();
      assert.equal(name, 'AgentForge');
      assert.equal(symbol, 'AFG');
    });

    it('should pre-mint 10M to treasury', async () => {
      const balance = await afgToken.read.balanceOf([treasury.account.address]);
      assert.equal(balance, parseEther('10000000'));
    });

    it('should have total supply equal to pre-mint', async () => {
      const totalSupply = await afgToken.read.totalSupply();
      assert.equal(totalSupply, parseEther('10000000'));
    });

    it('should store treasury address as immutable', async () => {
      const storedTreasury = await afgToken.read.treasury();
      assert.equal(
        getAddress(storedTreasury),
        getAddress(treasury.account.address),
      );
    });

    it('should start paused', async () => {
      const paused = await afgToken.read.paused();
      assert.equal(paused, true);
    });

    it('should revert when deploying with zero address treasury', async () => {
      await assert.rejects(
        connection.viem.deployContract('AFGToken', [zeroAddress, DUMMY_ROUTER]),
        (err: any) => {
          assert.ok(
            err.message.includes('ZeroAddress'),
            `Expected ZeroAddress error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // Minting
  // ──────────────────────────────────────────────

  describe('Minting', () => {
    let mintableToken: any;

    before(async () => {
      // Deploy a fresh token for minting tests
      mintableToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
        DUMMY_ROUTER,
      ]);

      // Set minter and unpause
      await mintableToken.write.setMinter([minter.account.address], {
        account: deployer.account,
      });
      await mintableToken.write.unpause({ account: deployer.account });
    });

    it('should allow minter to mint tokens', async () => {
      const mintAmount = parseEther('1000');
      await mintableToken.write.mint([user1.account.address, mintAmount], {
        account: minter.account,
      });

      const balance = await mintableToken.read.balanceOf([
        user1.account.address,
      ]);
      assert.equal(balance, mintAmount);
    });

    it('should track totalMined', async () => {
      const totalMined = await mintableToken.read.totalMined();
      assert.equal(totalMined, parseEther('1000'));
    });

    it('should revert when non-minter calls mint', async () => {
      await assert.rejects(
        mintableToken.write.mint(
          [user1.account.address, parseEther('100')],
          { account: user1.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('0x9cdc2ed5') || err.message.includes('OnlyMinter'),
            `Expected OnlyMinter error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should revert when minting exceeds MINING_POOL cap', async () => {
      const miningPool = await mintableToken.read.MINING_POOL();

      await assert.rejects(
        mintableToken.write.mint(
          [user1.account.address, miningPool],
          { account: minter.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('ExceedsMiningPool'),
            `Expected ExceedsMiningPool error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should revert when setting zero address as minter', async () => {
      await assert.rejects(
        mintableToken.write.setMinter([zeroAddress], {
          account: deployer.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('ZeroAddress'),
            `Expected ZeroAddress error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // Transfer Tax (exempt-whitelist model)
  // ──────────────────────────────────────────────

  describe('Transfer Tax', () => {
    let taxToken: any;

    before(async () => {
      taxToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
        DUMMY_ROUTER,
      ]);

      // Set minter and unpause
      await taxToken.write.setMinter([minter.account.address], {
        account: deployer.account,
      });
      await taxToken.write.unpause({ account: deployer.account });

      // Mint tokens to user1 for transfer tests
      await taxToken.write.mint(
        [user1.account.address, parseEther('10000')],
        { account: minter.account },
      );
    });

    it('should apply 3% tax on non-exempt transfers', async () => {
      const transferAmount = parseEther('1000');
      const expectedTax = (transferAmount * 300n) / 10000n; // 3%
      const expectedNet = transferAmount - expectedTax;

      // Tax accumulates in the token contract itself
      const contractBefore = await taxToken.read.balanceOf([taxToken.address]);

      await taxToken.write.transfer(
        [user2.account.address, transferAmount],
        { account: user1.account },
      );

      const user2Balance = await taxToken.read.balanceOf([user2.account.address]);
      const contractAfter = await taxToken.read.balanceOf([taxToken.address]);

      assert.equal(user2Balance, expectedNet);
      assert.equal(contractAfter - contractBefore, expectedTax);
    });

    it('should NOT apply tax when sender is tax-exempt', async () => {
      // Treasury is tax-exempt by default
      const transferAmount = parseEther('500');

      // Transfer from treasury to user2
      const user2Before = await taxToken.read.balanceOf([user2.account.address]);
      const contractBefore = await taxToken.read.balanceOf([taxToken.address]);

      await taxToken.write.transfer(
        [user2.account.address, transferAmount],
        { account: treasury.account },
      );

      const user2After = await taxToken.read.balanceOf([user2.account.address]);
      const contractAfter = await taxToken.read.balanceOf([taxToken.address]);

      // User2 should receive the full amount (no tax)
      assert.equal(user2After - user2Before, transferAmount);
      // Contract balance unchanged (no tax collected)
      assert.equal(contractAfter, contractBefore);
    });

    it('should NOT apply tax when receiver is tax-exempt', async () => {
      // Set user2 as exempt, transfer from user1 (non-exempt) to user2 (exempt)
      await taxToken.write.setTaxExempt([user2.account.address, true], {
        account: deployer.account,
      });

      const transferAmount = parseEther('100');
      const user2Before = await taxToken.read.balanceOf([user2.account.address]);
      const contractBefore = await taxToken.read.balanceOf([taxToken.address]);

      await taxToken.write.transfer(
        [user2.account.address, transferAmount],
        { account: user1.account },
      );

      const user2After = await taxToken.read.balanceOf([user2.account.address]);
      const contractAfter = await taxToken.read.balanceOf([taxToken.address]);

      assert.equal(user2After - user2Before, transferAmount);
      assert.equal(contractAfter, contractBefore);

      // Remove exemption
      await taxToken.write.setTaxExempt([user2.account.address, false], {
        account: deployer.account,
      });
    });

    it('should revert when setting zero address as tax-exempt', async () => {
      await assert.rejects(
        taxToken.write.setTaxExempt([zeroAddress, true], {
          account: deployer.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('ZeroAddress'),
            `Expected ZeroAddress error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow owner to change tax rate', async () => {
      // Change to 5% (500 BPS)
      await taxToken.write.setTaxBps([500n], {
        account: deployer.account,
      });

      const transferAmount = parseEther('1000');
      const expectedTax = (transferAmount * 500n) / 10000n; // 5%
      const expectedNet = transferAmount - expectedTax;

      // Mint fresh tokens for test
      await taxToken.write.mint(
        [user1.account.address, transferAmount],
        { account: minter.account },
      );

      const user2Before = await taxToken.read.balanceOf([user2.account.address]);
      const contractBefore = await taxToken.read.balanceOf([taxToken.address]);

      await taxToken.write.transfer(
        [user2.account.address, transferAmount],
        { account: user1.account },
      );

      const user2After = await taxToken.read.balanceOf([user2.account.address]);
      const contractAfter = await taxToken.read.balanceOf([taxToken.address]);

      assert.equal(user2After - user2Before, expectedNet);
      assert.equal(contractAfter - contractBefore, expectedTax);

      // Reset to 3%
      await taxToken.write.setTaxBps([300n], {
        account: deployer.account,
      });
    });

    it('should revert when setting tax above MAX_TAX_BPS (10%)', async () => {
      await assert.rejects(
        taxToken.write.setTaxBps([1001n], {
          account: deployer.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('TaxTooHigh'),
            `Expected TaxTooHigh error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should revert when non-owner tries to set tax rate', async () => {
      await assert.rejects(
        taxToken.write.setTaxBps([500n], {
          account: user1.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('OwnableUnauthorizedAccount'),
            `Expected OwnableUnauthorizedAccount error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow setting tax to zero', async () => {
      await taxToken.write.setTaxBps([0n], {
        account: deployer.account,
      });

      const transferAmount = parseEther('100');
      await taxToken.write.mint(
        [user1.account.address, transferAmount],
        { account: minter.account },
      );

      const contractBefore = await taxToken.read.balanceOf([taxToken.address]);

      await taxToken.write.transfer(
        [user2.account.address, transferAmount],
        { account: user1.account },
      );

      const contractAfter = await taxToken.read.balanceOf([taxToken.address]);
      assert.equal(contractAfter, contractBefore); // no tax

      // Reset to 3%
      await taxToken.write.setTaxBps([300n], {
        account: deployer.account,
      });
    });
  });

  // ──────────────────────────────────────────────
  // Halving
  // ──────────────────────────────────────────────

  describe('Halving', () => {
    it('should return INITIAL_REWARD_PER_ROUND at deploy time', async () => {
      const freshToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
        DUMMY_ROUTER,
      ]);

      const reward = await freshToken.read.currentRewardPerRound();
      const initialReward = await freshToken.read.INITIAL_REWARD_PER_ROUND();
      assert.equal(reward, initialReward);
    });

    it('should have correct INITIAL_REWARD_PER_ROUND (MINING_POOL / ROUNDS_PER_HALVING)', async () => {
      const miningPool = await afgToken.read.MINING_POOL();
      const roundsPerHalving = await afgToken.read.ROUNDS_PER_HALVING();
      const initialReward = await afgToken.read.INITIAL_REWARD_PER_ROUND();

      assert.equal(initialReward, miningPool / roundsPerHalving);
    });

    it('should halve the reward after ROUNDS_PER_HALVING * ROUND_DURATION seconds', async () => {
      const freshToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
        DUMMY_ROUTER,
      ]);

      const initialReward = await freshToken.read.INITIAL_REWARD_PER_ROUND();
      const roundsPerHalving =
        await freshToken.read.ROUNDS_PER_HALVING();
      const roundDuration = await freshToken.read.ROUND_DURATION();

      // Advance time by one halving period
      const halvingPeriod = roundsPerHalving * roundDuration;
      await connection.networkHelpers.time.increase(halvingPeriod);

      const reward = await freshToken.read.currentRewardPerRound();
      assert.equal(reward, initialReward / 2n);
    });

    it('should return 0 after 21+ halvings', async () => {
      const freshToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
        DUMMY_ROUTER,
      ]);

      const roundsPerHalving =
        await freshToken.read.ROUNDS_PER_HALVING();
      const roundDuration = await freshToken.read.ROUND_DURATION();

      // Advance time by 21 halving periods
      const halvingPeriod = roundsPerHalving * roundDuration;
      await connection.networkHelpers.time.increase(halvingPeriod * 21n);

      const reward = await freshToken.read.currentRewardPerRound();
      assert.equal(reward, 0n);
    });
  });

  // ──────────────────────────────────────────────
  // Pausable
  // ──────────────────────────────────────────────

  describe('Pausable', () => {
    it('should block minting when paused', async () => {
      // afgToken is still paused from constructor, and has a minter set? No.
      // Use a fresh token that is paused but has a minter
      const pausedToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
        DUMMY_ROUTER,
      ]);
      await pausedToken.write.setMinter([minter.account.address], {
        account: deployer.account,
      });
      // Token starts paused from constructor

      await assert.rejects(
        pausedToken.write.mint(
          [user1.account.address, parseEther('100')],
          { account: minter.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('EnforcedPause'),
            `Expected EnforcedPause error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow minting after unpause', async () => {
      const pausedToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
        DUMMY_ROUTER,
      ]);
      await pausedToken.write.setMinter([minter.account.address], {
        account: deployer.account,
      });
      await pausedToken.write.unpause({ account: deployer.account });

      await pausedToken.write.mint(
        [user1.account.address, parseEther('100')],
        { account: minter.account },
      );

      const balance = await pausedToken.read.balanceOf([
        user1.account.address,
      ]);
      assert.equal(balance, parseEther('100'));
    });

    it('should only allow owner to pause/unpause', async () => {
      await assert.rejects(
        afgToken.write.unpause({ account: user1.account }),
        (err: any) => {
          assert.ok(
            err.message.includes('OwnableUnauthorizedAccount'),
            `Expected OwnableUnauthorizedAccount error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });
});
