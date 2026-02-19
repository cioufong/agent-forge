import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import { initializeDatabase, getAgent, getLeaderboard, getCurrentProblem as getDBCurrentProblem, getRecentProblems, getSubmissionsForProblem, getRewardHistory } from './services/database.js'
import { initContracts, getContracts, getAgentNFAData } from './services/blockchain.js'
import { startProblemGenerator, getCurrentProblem } from './services/problem-generator.js'
import { startEventListener } from './services/event-listener.js'

const PORT = Number(process.env.PORT ?? 3001)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'
const allowedOrigins = CLIENT_ORIGIN.split(',').map((o) => o.trim())

const app = express()
app.use(express.json())
app.use(cors({ origin: allowedOrigins, credentials: true }))

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true },
})

// ============ Health ============

app.get('/health', (_req, res) => {
  res.json({ ok: true, timestamp: Date.now() })
})

// ============ API Routes ============

// Contract addresses config
app.get('/api/config', (_req, res) => {
  try {
    const contracts = getContracts()
    res.json({ contracts })
  } catch {
    res.json({ contracts: null })
  }
})

// Agent details
app.get('/api/agents/:tokenId', async (req, res) => {
  try {
    const tokenId = parseInt(req.params.tokenId, 10)
    let agent = getAgent(tokenId)

    if (!agent) {
      try {
        const onChainData = await getAgentNFAData(BigInt(tokenId))
        agent = {
          tokenId,
          traits: onChainData.traits,
          stats: onChainData.stats,
          experience: onChainData.experience,
          tier: onChainData.tier,
        }
      } catch {
        res.status(404).json({ error: 'Agent not found' })
        return
      }
    }

    res.json(agent)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Current problem (with phase deadlines)
// Optional ?tokenId=N for future per-NFA question variants (Phase 2)
app.get('/api/problems/current', (_req, res) => {
  const problem = getCurrentProblem()
  if (!problem) {
    res.status(404).json({ error: 'No active problem' })
    return
  }

  const tokenId = _req.query.tokenId ? parseInt(_req.query.tokenId as string, 10) : undefined

  // Determine current phase based on time
  const now = Math.floor(Date.now() / 1000)
  const dbProblem = getDBCurrentProblem()

  let phase: string = 'submit'
  if (dbProblem) {
    const submitDeadline = dbProblem.submit_deadline || dbProblem.deadline
    const revealDeadline = dbProblem.reveal_deadline
    const verifyDeadline = dbProblem.verify_deadline

    if (dbProblem.resolved) phase = 'resolved'
    else if (verifyDeadline && now > verifyDeadline) phase = 'resolving'
    else if (revealDeadline && now > revealDeadline) phase = 'verify'
    else if (submitDeadline && now > submitDeadline) phase = 'reveal'
  }

  // MVP: same question for everyone. Phase 2 will use tokenId for per-NFA variants
  res.json({
    id: problem.id,
    questionText: problem.questionText,
    category: problem.category,
    difficulty: problem.difficulty,
    questionHash: problem.questionHash,
    phase,
    tokenId: tokenId ?? null,
    submitDeadline: dbProblem?.submit_deadline || dbProblem?.deadline,
    revealDeadline: dbProblem?.reveal_deadline,
    verifyDeadline: dbProblem?.verify_deadline,
  })
})

// Problem history
app.get('/api/problems', (_req, res) => {
  const problems = getRecentProblems()
  res.json(problems)
})

// Problem detail by ID
app.get('/api/problems/:id', (req, res) => {
  const problemId = parseInt(req.params.id, 10)
  const submissions = getSubmissionsForProblem(problemId)
  res.json({ problemId, submissions })
})

// Submissions for a problem
app.get('/api/problems/:id/submissions', (req, res) => {
  const problemId = parseInt(req.params.id, 10)
  const submissions = getSubmissionsForProblem(problemId)
  res.json(submissions)
})

// Leaderboard
app.get('/api/leaderboard', (_req, res) => {
  const leaderboard = getLeaderboard()
  res.json(leaderboard)
})

// Reward history for an agent
app.get('/api/rewards/:tokenId', (req, res) => {
  const tokenId = parseInt(req.params.tokenId, 10)
  const history = getRewardHistory(tokenId)
  res.json(history)
})

// ============ Socket.IO ============

io.on('connection', (socket) => {
  console.log(`[ws] Client connected: ${socket.id}`)

  // Send current problem + phase on connect
  const problem = getCurrentProblem()
  if (problem) {
    const dbProblem = getDBCurrentProblem()
    socket.emit('current-problem', {
      id: problem.id,
      category: problem.category,
      difficulty: problem.difficulty,
      questionHash: problem.questionHash,
      submitDeadline: dbProblem?.submit_deadline || dbProblem?.deadline,
      revealDeadline: dbProblem?.reveal_deadline,
      verifyDeadline: dbProblem?.verify_deadline,
    })
  }

  socket.on('disconnect', () => {
    console.log(`[ws] Client disconnected: ${socket.id}`)
  })
})

// ============ Bootstrap ============

async function bootstrap() {
  initializeDatabase()

  try {
    initContracts()
  } catch (err: any) {
    console.warn(`[init] Blockchain init failed (dev mode OK): ${err.message}`)
  }

  try {
    await startEventListener(io)
  } catch (err: any) {
    console.warn(`[init] Event listener failed (dev mode OK): ${err.message}`)
  }

  await startProblemGenerator(io)

  server.listen(PORT, () => {
    console.log(`\n🚀 AgentForge server running on http://localhost:${PORT}`)
    console.log(`   Client origin: ${CLIENT_ORIGIN}`)
    console.log(`   Lifecycle: Submit(5min) → Reveal(2min) → Verify(3min) → Resolve`)
  })
}

bootstrap().catch(console.error)
