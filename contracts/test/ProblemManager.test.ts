import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import hre from 'hardhat';
import { parseEther, keccak256, toHex } from 'viem';

describe('ProblemManager', () => {
  let connection: any;
  let publicClient: any;
  let walletClients: any[];
  let deployer: any;
  let oracle: any;
  let user1: any;
  let user2: any;
  let user3: any;
  let agentNFA: any;
  let problemManager: any;

  const MINT_PRICE = parseEther('0.05');
  const SUBMIT_DURATION = 5n * 60n;   // 5 minutes
  const REVEAL_DURATION = 2n * 60n;   // 2 minutes
  const VERIFY_DURATION = 3n * 60n;   // 3 minutes

  before(async () => {
    connection = await hre.network.connect();
    publicClient = await connection.viem.getPublicClient();
    walletClients = await connection.viem.getWalletClients();
    [deployer, oracle, user1, user2, user3] = walletClients;

    // Deploy AgentNFA
    agentNFA = await connection.viem.deployContract('AgentNFA', [MINT_PRICE]);
    await agentNFA.write.unpause({ account: deployer.account });

    // Deploy ProblemManager
    problemManager = await connection.viem.deployContract('ProblemManager', [
      agentNFA.address,
      oracle.account.address,
    ]);
    await problemManager.write.unpause({ account: deployer.account });

    // Mint NFAs for users
    await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE }); // tokenId 1
    await agentNFA.write.mint({ account: user1.account, value: MINT_PRICE }); // tokenId 2
    await agentNFA.write.mint({ account: user2.account, value: MINT_PRICE }); // tokenId 3
    await agentNFA.write.mint({ account: user3.account, value: MINT_PRICE }); // tokenId 4
  });

  // ──────────────────────────────────────────────
  // postProblem
  // ──────────────────────────────────────────────

  describe('postProblem', () => {
    it('should allow oracle to post a problem', async () => {
      const questionHash = keccak256(toHex('What is 2+2?'));

      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });

      const problem = await problemManager.read.getProblem([0n]);
      assert.equal(problem.questionHash, questionHash);
      assert.equal(problem.resolved, false);
      assert.equal(problem.oracleFallback, false);
    });

    it('should return incrementing problemId', async () => {
      const questionHash = keccak256(toHex('What is 3+3?'));

      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });

      const count = await problemManager.read.problemCount();
      assert.equal(count, 2n);

      const problem = await problemManager.read.getProblem([1n]);
      assert.equal(problem.questionHash, questionHash);
    });

    it('should set correct deadlines (submitDeadline, revealDeadline, verifyDeadline)', async () => {
      const questionHash = keccak256(toHex('Deadline test'));

      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });

      const count = await problemManager.read.problemCount();
      const problem = await problemManager.read.getProblem([count - 1n]);

      // submitDeadline = createdAt + 5min
      assert.equal(
        problem.submitDeadline - problem.createdAt,
        SUBMIT_DURATION,
      );
      // revealDeadline = createdAt + 5min + 2min = 7min
      assert.equal(
        problem.revealDeadline - problem.createdAt,
        SUBMIT_DURATION + REVEAL_DURATION,
      );
      // verifyDeadline = createdAt + 5min + 2min + 3min = 10min
      assert.equal(
        problem.verifyDeadline - problem.createdAt,
        SUBMIT_DURATION + REVEAL_DURATION + VERIFY_DURATION,
      );
    });

    it('should emit ProblemPosted event', async () => {
      const questionHash = keccak256(toHex('Event test'));

      const hash = await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected ProblemPosted event');
    });

    it('should revert when non-oracle posts a problem', async () => {
      const questionHash = keccak256(toHex('hacked'));

      await assert.rejects(
        problemManager.write.postProblem([questionHash], {
          account: user1.account,
        }),
        (err: any) => {
          assert.ok(
            err.message.includes('OnlyOracle'),
            `Expected OnlyOracle error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // submitAnswer
  // ──────────────────────────────────────────────

  describe('submitAnswer', () => {
    let activeProblemId: bigint;

    before(async () => {
      const questionHash = keccak256(toHex('Submit test problem'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      activeProblemId = count - 1n;
    });

    it('should allow NFA owner to submit an answer', async () => {
      const answerHash = keccak256(toHex('answer-1'));

      await problemManager.write.submitAnswer(
        [activeProblemId, 1n, answerHash],
        { account: user1.account },
      );

      const submissionCount = await problemManager.read.getSubmissionCount([
        activeProblemId,
      ]);
      assert.equal(submissionCount, 1n);

      const submission = await problemManager.read.getSubmission([
        activeProblemId,
        0n,
      ]);
      assert.equal(submission.tokenId, 1n);
      assert.equal(submission.answerHash, answerHash);
      assert.equal(submission.revealed, false);
    });

    it('should verify token ownership (reject non-owner)', async () => {
      const answerHash = keccak256(toHex('answer-stolen'));

      // user2 tries to submit with tokenId 1 (owned by user1)
      await assert.rejects(
        problemManager.write.submitAnswer(
          [activeProblemId, 1n, answerHash],
          { account: user2.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('NotTokenOwner'),
            `Expected NotTokenOwner error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should prevent same tokenId from submitting twice', async () => {
      const answerHash = keccak256(toHex('duplicate'));

      await assert.rejects(
        problemManager.write.submitAnswer(
          [activeProblemId, 1n, answerHash],
          { account: user1.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('AlreadySubmitted'),
            `Expected AlreadySubmitted error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should allow same wallet to submit with different tokenIds', async () => {
      // user1 owns tokenId 1 (already submitted) and tokenId 2
      const answer2 = keccak256(toHex('answer-token-2'));

      await problemManager.write.submitAnswer(
        [activeProblemId, 2n, answer2],
        { account: user1.account },
      );

      const submissionCount = await problemManager.read.getSubmissionCount([
        activeProblemId,
      ]);
      assert.equal(submissionCount, 2n);
    });

    it('should emit AnswerSubmitted event', async () => {
      const answerHash = keccak256(toHex('answer-event'));

      const hash = await problemManager.write.submitAnswer(
        [activeProblemId, 3n, answerHash],
        { account: user2.account },
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected AnswerSubmitted event');
    });

    it('should reject submission after submit phase ends (NotInSubmitPhase)', async () => {
      const questionHash = keccak256(toHex('Late submit test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      // Advance past submit deadline (5 min + 1 sec)
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      const answerHash = keccak256(toHex('late-answer'));
      await assert.rejects(
        problemManager.write.submitAnswer(
          [pid, 4n, answerHash],
          { account: user3.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('NotInSubmitPhase'),
            `Expected NotInSubmitPhase error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // revealAnswer
  // ──────────────────────────────────────────────

  describe('revealAnswer', () => {
    let revealProblemId: bigint;
    const answer1 = '42';
    const answer2 = '42';   // same answer from different token
    const answer3 = 'wrong';
    const answerHash1 = keccak256(toHex(answer1));
    const answerHash2 = keccak256(toHex(answer2));
    const answerHash3 = keccak256(toHex(answer3));

    before(async () => {
      // Post a fresh problem
      const questionHash = keccak256(toHex('Reveal test problem'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      revealProblemId = count - 1n;

      // Submit answers from 3 tokens during submit phase
      await problemManager.write.submitAnswer(
        [revealProblemId, 1n, answerHash1],
        { account: user1.account },
      );
      await problemManager.write.submitAnswer(
        [revealProblemId, 2n, answerHash2],
        { account: user1.account },
      );
      await problemManager.write.submitAnswer(
        [revealProblemId, 3n, answerHash3],
        { account: user2.account },
      );

      // Advance into reveal phase (past submit deadline)
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);
    });

    it('should allow reveal with correct plaintext during reveal phase', async () => {
      await problemManager.write.revealAnswer(
        [revealProblemId, 1n, answer1],
        { account: user1.account },
      );

      const submission = await problemManager.read.getSubmission([
        revealProblemId,
        0n,
      ]);
      assert.equal(submission.revealed, true);
      assert.equal(submission.revealedAnswerHash, answerHash1);
    });

    it('should track revealedAnswerCount', async () => {
      // tokenId 1 already revealed '42', now tokenId 2 reveals '42' too
      await problemManager.write.revealAnswer(
        [revealProblemId, 2n, answer2],
        { account: user1.account },
      );

      const count = await problemManager.read.revealedAnswerCount([
        revealProblemId,
        answerHash1,
      ]);
      assert.equal(count, 2n);
    });

    it('should emit AnswerRevealed event', async () => {
      const hash = await problemManager.write.revealAnswer(
        [revealProblemId, 3n, answer3],
        { account: user2.account },
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected AnswerRevealed event');
    });

    it('should reject reveal with wrong plaintext (HashMismatch)', async () => {
      // Post a new problem for this test
      const questionHash = keccak256(toHex('Hash mismatch test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      const correctAnswer = 'correct';
      const correctHash = keccak256(toHex(correctAnswer));

      await problemManager.write.submitAnswer(
        [pid, 4n, correctHash],
        { account: user3.account },
      );

      // Advance to reveal phase
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      // Try to reveal with wrong answer
      await assert.rejects(
        problemManager.write.revealAnswer(
          [pid, 4n, 'WRONG_ANSWER'],
          { account: user3.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('HashMismatch'),
            `Expected HashMismatch error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should reject reveal before submit phase ends (NotInRevealPhase)', async () => {
      // Post a new problem (we are currently in the future, so this creates a fresh one)
      const questionHash = keccak256(toHex('Too early reveal'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      const ans = 'early';
      const ansHash = keccak256(toHex(ans));
      await problemManager.write.submitAnswer(
        [pid, 1n, ansHash],
        { account: user1.account },
      );

      // Try to reveal immediately (still in submit phase)
      await assert.rejects(
        problemManager.write.revealAnswer(
          [pid, 1n, ans],
          { account: user1.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('NotInRevealPhase'),
            `Expected NotInRevealPhase error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should reject reveal after reveal phase ends (NotInRevealPhase)', async () => {
      // Use the problem from the previous test - advance past reveal phase
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      // Advance past reveal deadline (submit + reveal = 7 min total)
      await connection.networkHelpers.time.increase(
        SUBMIT_DURATION + REVEAL_DURATION + 1n,
      );

      await assert.rejects(
        problemManager.write.revealAnswer(
          [pid, 1n, 'early'],
          { account: user1.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('NotInRevealPhase'),
            `Expected NotInRevealPhase error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should reject reveal if token did not submit (NotSubmitted)', async () => {
      // Post a new problem
      const questionHash = keccak256(toHex('Not submitted reveal'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      // Advance to reveal phase (without submitting anything for tokenId 4)
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      await assert.rejects(
        problemManager.write.revealAnswer(
          [pid, 4n, 'anything'],
          { account: user3.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('NotSubmitted'),
            `Expected NotSubmitted error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should reject double reveal (AlreadyRevealed)', async () => {
      // Post a new problem
      const questionHash = keccak256(toHex('Double reveal test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      const ans = 'onlyonce';
      const ansHash = keccak256(toHex(ans));
      await problemManager.write.submitAnswer(
        [pid, 1n, ansHash],
        { account: user1.account },
      );

      // Advance to reveal phase
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      // First reveal succeeds
      await problemManager.write.revealAnswer(
        [pid, 1n, ans],
        { account: user1.account },
      );

      // Second reveal should fail
      await assert.rejects(
        problemManager.write.revealAnswer(
          [pid, 1n, ans],
          { account: user1.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('AlreadyRevealed'),
            `Expected AlreadyRevealed error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // resolveByOracle
  // ──────────────────────────────────────────────

  describe('resolveByOracle', () => {
    let resolveProblemId: bigint;
    const correctAnswer = 'the-answer';
    const correctHash = keccak256(toHex(correctAnswer));
    const wrongAnswer = 'not-correct';
    const wrongHash = keccak256(toHex(wrongAnswer));

    before(async () => {
      // Post problem
      const questionHash = keccak256(toHex('Resolve oracle test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      resolveProblemId = count - 1n;

      // Submit answers: tokenId 1 and 2 with correct hash, tokenId 3 with wrong hash
      await problemManager.write.submitAnswer(
        [resolveProblemId, 1n, correctHash],
        { account: user1.account },
      );
      await problemManager.write.submitAnswer(
        [resolveProblemId, 2n, correctHash],
        { account: user1.account },
      );
      await problemManager.write.submitAnswer(
        [resolveProblemId, 3n, wrongHash],
        { account: user2.account },
      );

      // Advance to reveal phase
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      // Reveal answers
      await problemManager.write.revealAnswer(
        [resolveProblemId, 1n, correctAnswer],
        { account: user1.account },
      );
      await problemManager.write.revealAnswer(
        [resolveProblemId, 2n, correctAnswer],
        { account: user1.account },
      );
      await problemManager.write.revealAnswer(
        [resolveProblemId, 3n, wrongAnswer],
        { account: user2.account },
      );

      // Advance past verify deadline (reveal + verify = 2 + 3 = 5 min more)
      await connection.networkHelpers.time.increase(
        REVEAL_DURATION + VERIFY_DURATION + 1n,
      );
    });

    it('should allow oracle to resolve after verifyDeadline', async () => {
      await problemManager.write.resolveByOracle(
        [resolveProblemId, correctHash],
        { account: oracle.account },
      );

      const problem = await problemManager.read.getProblem([resolveProblemId]);
      assert.equal(problem.resolved, true);
      assert.equal(problem.correctAnswerHash, correctHash);
      assert.equal(problem.oracleFallback, true);
    });

    it('should determine winners from revealed answers matching correctAnswerHash', async () => {
      const winnerList = await problemManager.read.getWinners([resolveProblemId]);
      // tokenId 1 and 2 revealed correctAnswer, tokenId 3 revealed wrong
      assert.equal(winnerList.length, 2);
      // Order depends on speed trait (tiebreaker) — just check both are present
      const winnerSet = new Set(winnerList.map((w: bigint) => w));
      assert.ok(winnerSet.has(1n), 'Expected tokenId 1 in winners');
      assert.ok(winnerSet.has(2n), 'Expected tokenId 2 in winners');
    });

    it('should emit ProblemResolved event with oracleFallback=true', async () => {
      // Post + submit + reveal + resolve a new problem to capture the event
      const questionHash = keccak256(toHex('Event resolve test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      const ans = 'event-ans';
      const ansHash = keccak256(toHex(ans));
      await problemManager.write.submitAnswer(
        [pid, 4n, ansHash],
        { account: user3.account },
      );

      // Advance to reveal
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);
      await problemManager.write.revealAnswer(
        [pid, 4n, ans],
        { account: user3.account },
      );

      // Advance past verify deadline
      await connection.networkHelpers.time.increase(
        REVEAL_DURATION + VERIFY_DURATION + 1n,
      );

      const hash = await problemManager.write.resolveByOracle(
        [pid, ansHash],
        { account: oracle.account },
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      assert.ok(receipt.logs.length > 0, 'Expected ProblemResolved event');
    });

    it('should revert when resolving before verifyDeadline (VerifyPhaseNotOver)', async () => {
      // Post a new problem
      const questionHash = keccak256(toHex('Too early resolve'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      // Try to resolve immediately (still in submit phase)
      await assert.rejects(
        problemManager.write.resolveByOracle(
          [pid, keccak256(toHex('x'))],
          { account: oracle.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('VerifyPhaseNotOver'),
            `Expected VerifyPhaseNotOver error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should revert when non-oracle tries to resolve', async () => {
      // Post a new problem and advance past all deadlines
      const questionHash = keccak256(toHex('Non-oracle resolve'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      await connection.networkHelpers.time.increase(
        SUBMIT_DURATION + REVEAL_DURATION + VERIFY_DURATION + 1n,
      );

      await assert.rejects(
        problemManager.write.resolveByOracle(
          [pid, keccak256(toHex('x'))],
          { account: user1.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('OnlyOracle') || err.message.includes('0x80fee105'),
            `Expected OnlyOracle error, got: ${err.message}`,
          );
          return true;
        },
      );
    });

    it('should revert when resolving an already-resolved problem', async () => {
      // resolveProblemId is already resolved from the first test
      await assert.rejects(
        problemManager.write.resolveByOracle(
          [resolveProblemId, keccak256(toHex('x'))],
          { account: oracle.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('ProblemAlreadyResolved'),
            `Expected ProblemAlreadyResolved error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // resolveByVerifiers
  // ──────────────────────────────────────────────

  describe('resolveByVerifiers', () => {
    let verifierProblemId: bigint;
    const ans = 'verifier-answer';
    const ansHash = keccak256(toHex(ans));

    before(async () => {
      // Set deployer as resolver
      await problemManager.write.setResolver([deployer.account.address], {
        account: deployer.account,
      });

      // Post problem
      const questionHash = keccak256(toHex('Verifier resolve test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      verifierProblemId = count - 1n;

      // Submit and reveal
      await problemManager.write.submitAnswer(
        [verifierProblemId, 1n, ansHash],
        { account: user1.account },
      );

      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      await problemManager.write.revealAnswer(
        [verifierProblemId, 1n, ans],
        { account: user1.account },
      );
    });

    it('should allow resolver to resolve', async () => {
      await problemManager.write.resolveByVerifiers(
        [verifierProblemId, ansHash],
        { account: deployer.account },
      );

      const problem = await problemManager.read.getProblem([verifierProblemId]);
      assert.equal(problem.resolved, true);
      assert.equal(problem.correctAnswerHash, ansHash);
      assert.equal(problem.oracleFallback, false);
    });

    it('should allow oracle to call resolveByVerifiers', async () => {
      // Post another problem
      const questionHash = keccak256(toHex('Oracle calls resolveByVerifiers'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      const a = 'oracle-verifier';
      const ah = keccak256(toHex(a));
      await problemManager.write.submitAnswer(
        [pid, 2n, ah],
        { account: user1.account },
      );

      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      await problemManager.write.revealAnswer(
        [pid, 2n, a],
        { account: user1.account },
      );

      await problemManager.write.resolveByVerifiers(
        [pid, ah],
        { account: oracle.account },
      );

      const problem = await problemManager.read.getProblem([pid]);
      assert.equal(problem.resolved, true);
      assert.equal(problem.oracleFallback, false);
    });

    it('should revert when unauthorized address calls resolveByVerifiers', async () => {
      const questionHash = keccak256(toHex('Unauth verifier'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const pid = count - 1n;

      await assert.rejects(
        problemManager.write.resolveByVerifiers(
          [pid, keccak256(toHex('x'))],
          { account: user2.account },
        ),
        (err: any) => {
          assert.ok(
            err.message.includes('OnlyOracle') || err.message.includes('0x80fee105'),
            `Expected OnlyOracle error, got: ${err.message}`,
          );
          return true;
        },
      );
    });
  });

  // ──────────────────────────────────────────────
  // Phase transitions (getPhase)
  // ──────────────────────────────────────────────

  describe('Phase transitions', () => {
    let phaseProblemId: bigint;

    before(async () => {
      const questionHash = keccak256(toHex('Phase transition test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      phaseProblemId = count - 1n;
    });

    it('should return Submit (0) during submit phase', async () => {
      const phase = await problemManager.read.getPhase([phaseProblemId]);
      assert.equal(phase, 0); // Phase.Submit
    });

    it('should return Reveal (1) after submit deadline', async () => {
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      const phase = await problemManager.read.getPhase([phaseProblemId]);
      assert.equal(phase, 1); // Phase.Reveal
    });

    it('should return Verify (2) after reveal deadline', async () => {
      await connection.networkHelpers.time.increase(REVEAL_DURATION);

      const phase = await problemManager.read.getPhase([phaseProblemId]);
      assert.equal(phase, 2); // Phase.Verify
    });

    it('should return Verify (2) after verify deadline if not resolved', async () => {
      // Contract returns Verify when past verifyDeadline but not resolved
      await connection.networkHelpers.time.increase(VERIFY_DURATION + 1n);

      const phase = await problemManager.read.getPhase([phaseProblemId]);
      assert.equal(phase, 2); // Still Phase.Verify (waiting for resolution)
    });

    it('should return Resolved (3) after problem is resolved', async () => {
      // Resolve the problem via oracle
      await problemManager.write.resolveByOracle(
        [phaseProblemId, keccak256(toHex('resolved'))],
        { account: oracle.account },
      );

      const phase = await problemManager.read.getPhase([phaseProblemId]);
      assert.equal(phase, 3); // Phase.Resolved
    });
  });

  // ──────────────────────────────────────────────
  // View functions
  // ──────────────────────────────────────────────

  describe('View functions', () => {
    let viewProblemId: bigint;
    const ans1 = 'view-answer-a';
    const ans2 = 'view-answer-b';
    const ansHash1 = keccak256(toHex(ans1));
    const ansHash2 = keccak256(toHex(ans2));

    before(async () => {
      // Post problem
      const questionHash = keccak256(toHex('View functions test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      viewProblemId = count - 1n;

      // Submit from tokenId 1, 2, 3
      await problemManager.write.submitAnswer(
        [viewProblemId, 1n, ansHash1],
        { account: user1.account },
      );
      await problemManager.write.submitAnswer(
        [viewProblemId, 2n, ansHash1],
        { account: user1.account },
      );
      await problemManager.write.submitAnswer(
        [viewProblemId, 3n, ansHash2],
        { account: user2.account },
      );

      // Advance to reveal and reveal
      await connection.networkHelpers.time.increase(SUBMIT_DURATION + 1n);

      await problemManager.write.revealAnswer(
        [viewProblemId, 1n, ans1],
        { account: user1.account },
      );
      await problemManager.write.revealAnswer(
        [viewProblemId, 2n, ans1],
        { account: user1.account },
      );
      await problemManager.write.revealAnswer(
        [viewProblemId, 3n, ans2],
        { account: user2.account },
      );
    });

    it('isParticipant should return true for submitted tokens', async () => {
      const is1 = await problemManager.read.isParticipant([viewProblemId, 1n]);
      const is3 = await problemManager.read.isParticipant([viewProblemId, 3n]);
      assert.equal(is1, true);
      assert.equal(is3, true);
    });

    it('isParticipant should return false for non-submitted tokens', async () => {
      const is4 = await problemManager.read.isParticipant([viewProblemId, 4n]);
      assert.equal(is4, false);
    });

    it('isActive should return true during submit phase', async () => {
      // Post a fresh problem to test isActive
      const questionHash = keccak256(toHex('isActive test'));
      await problemManager.write.postProblem([questionHash], {
        account: oracle.account,
      });
      const count = await problemManager.read.problemCount();
      const freshPid = count - 1n;

      const active = await problemManager.read.isActive([freshPid]);
      assert.equal(active, true);
    });

    it('isActive should return false after submit deadline', async () => {
      // viewProblemId is past submit deadline
      const active = await problemManager.read.isActive([viewProblemId]);
      assert.equal(active, false);
    });

    it('getSubmissionCount should return correct count', async () => {
      const count = await problemManager.read.getSubmissionCount([viewProblemId]);
      assert.equal(count, 3n);
    });

    it('getRevealedAnswers should return unique answer hashes', async () => {
      const revealed = await problemManager.read.getRevealedAnswers([viewProblemId]);
      assert.equal(revealed.length, 2);
      // Should contain both ansHash1 and ansHash2
      assert.ok(
        revealed.includes(ansHash1),
        'Expected ansHash1 in revealed answers',
      );
      assert.ok(
        revealed.includes(ansHash2),
        'Expected ansHash2 in revealed answers',
      );
    });

    it('getAnswerTokenIds should return token IDs that revealed a specific answer', async () => {
      const tokens1 = await problemManager.read.getAnswerTokenIds([
        viewProblemId,
        ansHash1,
      ]);
      assert.equal(tokens1.length, 2);
      assert.equal(tokens1[0], 1n);
      assert.equal(tokens1[1], 2n);

      const tokens2 = await problemManager.read.getAnswerTokenIds([
        viewProblemId,
        ansHash2,
      ]);
      assert.equal(tokens2.length, 1);
      assert.equal(tokens2[0], 3n);
    });

    it('revealedAnswerCount should return correct counts', async () => {
      const count1 = await problemManager.read.revealedAnswerCount([
        viewProblemId,
        ansHash1,
      ]);
      assert.equal(count1, 2n);

      const count2 = await problemManager.read.revealedAnswerCount([
        viewProblemId,
        ansHash2,
      ]);
      assert.equal(count2, 1n);
    });

    it('hasSubmitted should return correct status', async () => {
      const has1 = await problemManager.read.hasSubmitted([viewProblemId, 1n]);
      const has4 = await problemManager.read.hasSubmitted([viewProblemId, 4n]);
      assert.equal(has1, true);
      assert.equal(has4, false);
    });
  });

  // ──────────────────────────────────────────────
  // setResolver
  // ──────────────────────────────────────────────

  describe('setResolver', () => {
    it('should allow owner to set resolver', async () => {
      await problemManager.write.setResolver([user3.account.address], {
        account: deployer.account,
      });

      const resolver = await problemManager.read.resolver();
      assert.equal(
        resolver.toLowerCase(),
        user3.account.address.toLowerCase(),
      );
    });

    it('should revert when non-owner sets resolver', async () => {
      await assert.rejects(
        problemManager.write.setResolver([user1.account.address], {
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
  });
});
