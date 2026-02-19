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

  before(async () => {
    connection = await hre.network.connect();
    publicClient = await connection.viem.getPublicClient();
    walletClients = await connection.viem.getWalletClients();
    [deployer, treasury, minter, user1, user2, dexPair] = walletClients;

    afgToken = await connection.viem.deployContract('AFGToken', [
      treasury.account.address,
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
        connection.viem.deployContract('AFGToken', [zeroAddress]),
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
  // DEX Tax
  // ──────────────────────────────────────────────

  describe('DEX Tax', () => {
    let taxToken: any;

    before(async () => {
      taxToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
      ]);

      // Set minter, unpause, register dex pair
      await taxToken.write.setMinter([minter.account.address], {
        account: deployer.account,
      });
      await taxToken.write.unpause({ account: deployer.account });
      await taxToken.write.setDexPair([dexPair.account.address, true], {
        account: deployer.account,
      });

      // Mint tokens to user1 for transfer tests
      await taxToken.write.mint(
        [user1.account.address, parseEther('10000')],
        { account: minter.account },
      );
    });

    it('should apply 2% tax when transferring TO a dex pair', async () => {
      const transferAmount = parseEther('1000');
      const expectedTax = (transferAmount * 200n) / 10000n; // 2%
      const expectedNet = transferAmount - expectedTax;

      const treasuryBefore = await taxToken.read.balanceOf([
        treasury.account.address,
      ]);

      await taxToken.write.transfer(
        [dexPair.account.address, transferAmount],
        { account: user1.account },
      );

      const dexBalance = await taxToken.read.balanceOf([
        dexPair.account.address,
      ]);
      const treasuryAfter = await taxToken.read.balanceOf([
        treasury.account.address,
      ]);

      assert.equal(dexBalance, expectedNet);
      assert.equal(treasuryAfter - treasuryBefore, expectedTax);
    });

    it('should apply 2% tax when transferring FROM a dex pair', async () => {
      // dexPair sends tokens to user2
      const dexBalance = await taxToken.read.balanceOf([
        dexPair.account.address,
      ]);
      const transferAmount = dexBalance; // send everything the pair has
      const expectedTax = (transferAmount * 200n) / 10000n;
      const expectedNet = transferAmount - expectedTax;

      const treasuryBefore = await taxToken.read.balanceOf([
        treasury.account.address,
      ]);

      await taxToken.write.transfer(
        [user2.account.address, transferAmount],
        { account: dexPair.account },
      );

      const user2Balance = await taxToken.read.balanceOf([
        user2.account.address,
      ]);
      const treasuryAfter = await taxToken.read.balanceOf([
        treasury.account.address,
      ]);

      assert.equal(user2Balance, expectedNet);
      assert.equal(treasuryAfter - treasuryBefore, expectedTax);
    });

    it('should NOT apply tax for non-dex transfers', async () => {
      const transferAmount = parseEther('500');

      const user1Before = await taxToken.read.balanceOf([
        user1.account.address,
      ]);
      const treasuryBefore = await taxToken.read.balanceOf([
        treasury.account.address,
      ]);

      await taxToken.write.transfer(
        [user2.account.address, transferAmount],
        { account: user1.account },
      );

      const user2After = await taxToken.read.balanceOf([
        user2.account.address,
      ]);
      const treasuryAfter = await taxToken.read.balanceOf([
        treasury.account.address,
      ]);

      // User2 should receive the full amount from this transfer
      // (in addition to what they already had from the previous test)
      const user1After = await taxToken.read.balanceOf([
        user1.account.address,
      ]);
      assert.equal(user1Before - user1After, transferAmount);
      // Treasury should not change
      assert.equal(treasuryAfter, treasuryBefore);
    });

    it('should revert when setting zero address as dex pair', async () => {
      await assert.rejects(
        taxToken.write.setDexPair([zeroAddress, true], {
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
  // Halving
  // ──────────────────────────────────────────────

  describe('Halving', () => {
    it('should return INITIAL_REWARD_PER_ROUND at deploy time', async () => {
      const freshToken = await connection.viem.deployContract('AFGToken', [
        treasury.account.address,
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
