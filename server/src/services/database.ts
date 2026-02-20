/**
 * SQLite Database Service
 * Caches on-chain data, stores problem history, answer records, leaderboard
 * Updated for 4-phase problem lifecycle
 */

import Database from 'better-sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_DIR = process.env.DB_DIR || path.resolve(__dirname, '../../data')
const DB_FILE = path.join(DB_DIR, 'agent-forge.db')

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

let db: Database.Database | null = null

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(DB_FILE)
    db.pragma('journal_mode = WAL')
    console.log('✅ SQLite database connected:', DB_FILE)
  }
  return db
}

export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
    console.log('✅ SQLite database closed')
  }
}

export function initializeDatabase(): void {
  const database = getDatabase()

  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_version (
      version INTEGER PRIMARY KEY,
      applied_at INTEGER NOT NULL
    )
  `)

  const currentVersion =
    (database.prepare('SELECT MAX(version) as version FROM schema_version').get() as { version: number | null })
      ?.version || 0

  console.log(`📊 Current database schema version: ${currentVersion}`)
  runMigrations(database, currentVersion)
  console.log('✅ Database schema initialized')
}

function runMigrations(database: Database.Database, currentVersion: number): void {
  const migrations: Array<{ version: number; name: string; up: string }> = [
    {
      version: 1,
      name: 'create_problems_table',
      up: `
        CREATE TABLE IF NOT EXISTS problems (
          id INTEGER PRIMARY KEY,
          question_hash TEXT NOT NULL,
          question_text TEXT,
          difficulty TEXT NOT NULL DEFAULT 'easy',
          category TEXT NOT NULL DEFAULT 'math',
          created_at INTEGER NOT NULL,
          deadline INTEGER NOT NULL,
          resolved INTEGER NOT NULL DEFAULT 0,
          correct_answer_hash TEXT,
          correct_answer TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_problems_resolved ON problems(resolved);
        CREATE INDEX IF NOT EXISTS idx_problems_created ON problems(created_at);
      `,
    },
    {
      version: 2,
      name: 'create_submissions_table',
      up: `
        CREATE TABLE IF NOT EXISTS submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          problem_id INTEGER NOT NULL,
          token_id INTEGER NOT NULL,
          answer_hash TEXT NOT NULL,
          answer_text TEXT,
          is_correct INTEGER DEFAULT 0,
          submitted_at INTEGER NOT NULL,
          FOREIGN KEY (problem_id) REFERENCES problems(id),
          UNIQUE(problem_id, token_id)
        );

        CREATE INDEX IF NOT EXISTS idx_submissions_problem ON submissions(problem_id);
        CREATE INDEX IF NOT EXISTS idx_submissions_token ON submissions(token_id);
      `,
    },
    {
      version: 3,
      name: 'create_agents_table',
      up: `
        CREATE TABLE IF NOT EXISTS agents (
          token_id INTEGER PRIMARY KEY,
          owner TEXT NOT NULL,
          intelligence INTEGER NOT NULL,
          speed INTEGER NOT NULL,
          specialization INTEGER NOT NULL,
          talent_rarity INTEGER NOT NULL,
          level INTEGER NOT NULL DEFAULT 1,
          xp INTEGER NOT NULL DEFAULT 0,
          problems_solved INTEGER NOT NULL DEFAULT 0,
          problems_attempted INTEGER NOT NULL DEFAULT 0,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_agents_owner ON agents(owner);
        CREATE INDEX IF NOT EXISTS idx_agents_level ON agents(level);
      `,
    },
    {
      version: 4,
      name: 'create_leaderboard_table',
      up: `
        CREATE TABLE IF NOT EXISTS leaderboard (
          token_id INTEGER PRIMARY KEY,
          owner TEXT NOT NULL,
          total_rewards REAL NOT NULL DEFAULT 0,
          problems_solved INTEGER NOT NULL DEFAULT 0,
          level INTEGER NOT NULL DEFAULT 1,
          xp INTEGER NOT NULL DEFAULT 0,
          updated_at INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_leaderboard_rewards ON leaderboard(total_rewards DESC);
        CREATE INDEX IF NOT EXISTS idx_leaderboard_solved ON leaderboard(problems_solved DESC);
      `,
    },
    {
      version: 5,
      name: 'create_reward_history_table',
      up: `
        CREATE TABLE IF NOT EXISTS reward_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          problem_id INTEGER NOT NULL,
          token_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          tier INTEGER NOT NULL,
          placement INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (problem_id) REFERENCES problems(id)
        );

        CREATE INDEX IF NOT EXISTS idx_rewards_token ON reward_history(token_id);
        CREATE INDEX IF NOT EXISTS idx_rewards_problem ON reward_history(problem_id);
      `,
    },
    {
      version: 6,
      name: 'add_4phase_columns',
      up: `
        ALTER TABLE problems ADD COLUMN submit_deadline INTEGER;
        ALTER TABLE problems ADD COLUMN reveal_deadline INTEGER;
        ALTER TABLE problems ADD COLUMN verify_deadline INTEGER;
        ALTER TABLE problems ADD COLUMN oracle_fallback INTEGER NOT NULL DEFAULT 0;

        ALTER TABLE submissions ADD COLUMN revealed INTEGER NOT NULL DEFAULT 0;
        ALTER TABLE submissions ADD COLUMN revealed_answer_hash TEXT;
      `,
    },
    {
      version: 7,
      name: 'create_events_table',
      up: `
        CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL,
          data TEXT NOT NULL DEFAULT '{}',
          created_at INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);
        CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
      `,
    },
  ]

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      console.log(`🔄 Running migration ${migration.version}: ${migration.name}`)
      database.exec(migration.up)
      database.prepare('INSERT INTO schema_version (version, applied_at) VALUES (?, ?)').run(
        migration.version,
        Date.now(),
      )
    }
  }
}

// ============ Query Helpers ============

export function insertProblem(
  id: number,
  questionHash: string,
  questionText: string,
  difficulty: string,
  category: string,
  createdAt: number,
  submitDeadline: number,
  revealDeadline: number,
  verifyDeadline: number,
): void {
  const database = getDatabase()
  database.prepare(`
    INSERT OR REPLACE INTO problems (id, question_hash, question_text, difficulty, category, created_at, deadline, submit_deadline, reveal_deadline, verify_deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, questionHash, questionText, difficulty, category, createdAt, submitDeadline, submitDeadline, revealDeadline, verifyDeadline)
}

export function resolveProblem(
  id: number,
  correctAnswerHash: string,
  correctAnswer: string,
  oracleFallback: boolean = false,
): void {
  const database = getDatabase()
  database.prepare(`
    UPDATE problems SET resolved = 1, correct_answer_hash = ?, correct_answer = ?, oracle_fallback = ? WHERE id = ?
  `).run(correctAnswerHash, correctAnswer, oracleFallback ? 1 : 0, id)
}

export function insertSubmission(
  problemId: number,
  tokenId: number,
  answerHash: string,
  answerText: string,
  submittedAt: number,
): void {
  const database = getDatabase()
  database.prepare(`
    INSERT OR REPLACE INTO submissions (problem_id, token_id, answer_hash, answer_text, submitted_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(problemId, tokenId, answerHash, answerText, submittedAt)
}

export function markSubmissionRevealed(
  problemId: number,
  tokenId: number,
  revealedAnswerHash: string,
): void {
  const database = getDatabase()
  database.prepare(`
    UPDATE submissions SET revealed = 1, revealed_answer_hash = ? WHERE problem_id = ? AND token_id = ?
  `).run(revealedAnswerHash, problemId, tokenId)
}

export function markSubmissionCorrect(problemId: number, tokenId: number): void {
  const database = getDatabase()
  database.prepare(`
    UPDATE submissions SET is_correct = 1 WHERE problem_id = ? AND token_id = ?
  `).run(problemId, tokenId)
}

export function upsertAgent(agent: {
  tokenId: number
  owner: string
  intelligence: number
  speed: number
  specialization: number
  talentRarity: number
  level: number
  xp: number
  problemsSolved: number
  problemsAttempted: number
  createdAt: number
}): void {
  const database = getDatabase()
  const now = Date.now()
  database.prepare(`
    INSERT INTO agents (token_id, owner, intelligence, speed, specialization, talent_rarity, level, xp, problems_solved, problems_attempted, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(token_id) DO UPDATE SET
      owner = excluded.owner,
      level = excluded.level,
      xp = excluded.xp,
      problems_solved = excluded.problems_solved,
      problems_attempted = excluded.problems_attempted,
      updated_at = ?
  `).run(
    agent.tokenId, agent.owner, agent.intelligence, agent.speed,
    agent.specialization, agent.talentRarity, agent.level, agent.xp,
    agent.problemsSolved, agent.problemsAttempted, agent.createdAt, now, now,
  )
}

export function getAgent(tokenId: number): any {
  const database = getDatabase()
  return database.prepare('SELECT * FROM agents WHERE token_id = ?').get(tokenId)
}

export function getLeaderboard(limit = 50): any[] {
  const database = getDatabase()
  return database.prepare('SELECT * FROM leaderboard ORDER BY total_rewards DESC LIMIT ?').all(limit)
}

export function getCurrentProblem(): any {
  const database = getDatabase()
  return database.prepare('SELECT * FROM problems WHERE resolved = 0 ORDER BY created_at DESC LIMIT 1').get()
}

export function getRecentProblems(limit = 20): any[] {
  const database = getDatabase()
  return database.prepare('SELECT * FROM problems ORDER BY created_at DESC LIMIT ?').all(limit)
}

export function getSubmissionsForProblem(problemId: number): any[] {
  const database = getDatabase()
  return database.prepare('SELECT * FROM submissions WHERE problem_id = ? ORDER BY submitted_at ASC').all(problemId)
}

export function getRewardHistory(tokenId: number, limit = 50): any[] {
  const database = getDatabase()
  return database.prepare('SELECT * FROM reward_history WHERE token_id = ? ORDER BY created_at DESC LIMIT ?').all(tokenId, limit)
}

export function insertRewardHistory(
  problemId: number,
  tokenId: number,
  amount: number,
  tier: number,
  placement: number,
): void {
  const database = getDatabase()
  database.prepare(`
    INSERT INTO reward_history (problem_id, token_id, amount, tier, placement, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(problemId, tokenId, amount, tier, placement, Date.now())
}

export function upsertLeaderboard(entry: {
  tokenId: number
  owner: string
  rewardAmount: number
  problemsSolved: number
  level: number
  xp: number
}): void {
  const database = getDatabase()
  const now = Date.now()
  database.prepare(`
    INSERT INTO leaderboard (token_id, owner, total_rewards, problems_solved, level, xp, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(token_id) DO UPDATE SET
      owner = excluded.owner,
      total_rewards = leaderboard.total_rewards + excluded.total_rewards,
      problems_solved = excluded.problems_solved,
      level = excluded.level,
      xp = excluded.xp,
      updated_at = ?
  `).run(entry.tokenId, entry.owner, entry.rewardAmount, entry.problemsSolved, entry.level, entry.xp, now, now)
}

export function updateAgentStats(tokenId: number, xp: number, level: number): void {
  const database = getDatabase()
  database.prepare(`
    UPDATE agents SET xp = ?, level = ?, updated_at = ? WHERE token_id = ?
  `).run(xp, level, Date.now(), tokenId)
}

export function incrementAgentSolved(tokenId: number): void {
  const database = getDatabase()
  database.prepare(`
    UPDATE agents SET problems_solved = problems_solved + 1, updated_at = ? WHERE token_id = ?
  `).run(Date.now(), tokenId)
}

// ============ Events ============

export function insertEvent(type: string, data: Record<string, unknown> = {}): void {
  const database = getDatabase()
  database.prepare(`
    INSERT INTO events (type, data, created_at) VALUES (?, ?, ?)
  `).run(type, JSON.stringify(data), Date.now())
}

export function getRecentEvents(since: number = 0, limit: number = 100): any[] {
  const database = getDatabase()
  return database.prepare(
    'SELECT id, type, data, created_at FROM events WHERE created_at > ? ORDER BY id ASC LIMIT ?'
  ).all(since, limit)
}
