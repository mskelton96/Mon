import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

// Middleware
app.use(cors({ origin: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ---------------------------------------------------------------------------
// Static frontend (served in production from client/dist)
// ---------------------------------------------------------------------------
const clientDistPath = path.resolve(__dirname, '../../client/dist')

// Check if the built frontend exists
if (fs.existsSync(clientDistPath)) {
  console.log(`[server] Serving static frontend from: ${clientDistPath}`)
  app.use(express.static(clientDistPath))
} else {
  console.log('[server] No built frontend found at client/dist — API only mode')
}

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------

// --- Health Check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'propcoach-ai', version: '1.0.0' })
})

// --- Chat / AI Coaching ---
app.post('/api/chat', (req, res) => {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  // Simulated AI coaching response based on keywords
  const lower = message.toLowerCase()
  let response = ''

  if (lower.includes('fvg') || lower.includes('fair value') || lower.includes('gap')) {
    response = "**Fair Value Gap (FVG) Analysis**\n\nA Fair Value Gap forms from a 3-candle sequence where the middle candle's range creates an imbalance. The gap between Candle 1's high and Candle 3's low (bullish) or Candle 1's low and Candle 3's high (bearish) acts as a price magnet.\n\n📌 The market returns to fill FVGs ~70% of the time. Look for FVG + Order Block + MSS confluence for high-probability entries."
  } else if (lower.includes('bos') || lower.includes('mss') || lower.includes('structure')) {
    response = "**Break of Structure (BOS) vs Market Structure Shift (MSS)**\n\n• **BOS** = Trend continuation — price breaks the previous swing point in the same direction (requires candle close)\n• **MSS** = Trend reversal — price breaks the most recent higher low (uptrend) or lower high (downtrend)\n\n🎯 Practice: On a 1H chart, label the last 5 structural transitions and identify which are continuations vs reversals."
  } else if (lower.includes('risk') || lower.includes('position') || lower.includes('rr') || lower.includes('size')) {
    response = "**Risk Management Calculator**\n\n• Max risk per trade: 0.5%–1.0% of account\n• Minimum R:R: 1:2 (prefer 1:3+)\n• Daily loss limit: Stop after 2 consecutive losers\n\nExample: $50k account → risk $250–$500 per trade. At 1:3 R:R, you need only a 25% win rate to break even."
  } else if (lower.includes('psychology') || lower.includes('fomo') || lower.includes('emotion') || lower.includes('revenge')) {
    response = "**Trading Psychology — The Gap**\n\nThe Gap is the distance between your trading plan and your actual execution. Common gaps:\n• Taking trades outside your plan (FOMO)\n• Moving stops (hope trading)\n• Overtrading after a loss (revenge)\n\n🔑 Solution: Write a pre-trade checklist. Every entry must check 3 boxes before you click buy/sell."
  } else if (lower.includes('order block') || lower.includes('ob')) {
    response = "**Order Block (OB) Analysis**\n\nAn institutional Order Block is the last candle before an impulsive move that breaks structure. \n• **Bullish OB:** Last down-close candle before a bullish MSS/BOS\n• **Bearish OB:** Last up-close candle before a bearish MSS/BOS\n\nKey level: The **Mean Threshold** (50% of the candle body) — if price closes beyond it, the OB is likely invalidated."
  } else if (lower.includes('silver bullet') || lower.includes('time')) {
    response = "**Silver Bullet Model** 🔫\n\nThe ICT Silver Bullet focuses on specific trading windows:\n• **Macro:** 10:00–11:00 AM EST (London/NY overlap)\n• Setup: Sweep → MSS → FVG → Target\n\nUse the 1-minute chart during these windows for precision entries. Backtest 20 setups before trading live."
  } else {
    response = "**Great question!** 🤔\n\nIn SMC/ICT trading, the foundation is always **market structure first**. Before looking at FVGs or Order Blocks, identify:\n1. Current trend direction (higher highs/lows or lower highs/lows)\n2. Key structural levels (previous month/week highs/lows)\n3. Premium vs Discount zones\n\nWhat specific concept would you like me to explain in more detail?"
  }

  // Simulate slight delay
  setTimeout(() => {
    res.json({
      response,
      context: { concepts: ['SMC', 'ICT', 'Market Structure'] }
    })
  }, 300)
})

// --- Curriculum Data ---
app.get('/api/curriculum', (_req, res) => {
  res.json({
    phases: [
      {
        id: 1,
        title: 'Market Structure & SMC/ICT Basics',
        days: 'Days 1–30',
        progress: 65,
        unlocked: true,
        weeks: [
          { name: 'Foundations of Price Delivery', topics: ['Price Action', 'IPDA', 'Swing Highs/Lows'] },
          { name: 'Structure Shifts and Breaks', topics: ['BOS vs MSS', 'Multi-timeframe', 'Structure Drawing'] },
          { name: 'Fair Value Gaps (FVG)', topics: ['3-Candle Formation', 'Price Magnets', 'iFVG'] },
          { name: 'Order Blocks (OB)', topics: ['Institutional OB', 'Mean Threshold', 'Phase 1 Exam'] },
        ]
      },
      {
        id: 2,
        title: 'Risk Management & Advanced SMC',
        days: 'Days 31–60',
        progress: 0,
        unlocked: false,
        weeks: [
          { name: 'Liquidity Pools & Sweeps', topics: ['BSL/SSL', 'Equal Highs/Lows', 'Turtle Soup'] },
          { name: 'Premium/Discount & OTE', topics: ['Fibonacci', 'Premium/Discount', 'OTE 62-79%'] },
          { name: 'Silver Bullet Model', topics: ['Trading Windows', '1-min Setup', 'Backtesting'] },
          { name: 'Core Risk Management', topics: ['0.5-1% Risk', 'R:R Ratios', 'Position Sizing'] },
        ]
      },
      {
        id: 3,
        title: 'Prop Firm Rules & Simulation',
        days: 'Days 61–90',
        progress: 0,
        unlocked: false,
        weeks: [
          { name: 'Prop Firm Metrics', topics: ['Drawdown Limits', 'Profit Targets', 'Consistency'] },
          { name: 'Risk Simulator', topics: ['Soft Limits', 'Scaling Down', 'Trailing Drawdown'] },
          { name: 'Trading Plan', topics: ['Rule Book', 'Asset Selection', 'Pre-Trade Checklist'] },
          { name: 'Mock Evaluation', topics: ['$50k Demo', 'Strict Rules', 'Daily Logs'] },
        ]
      },
      {
        id: 4,
        title: 'Psychology & Live Audits',
        days: 'Days 91–120',
        progress: 0,
        unlocked: false,
        weeks: [
          { name: 'Psychological Bias', topics: ['The Gap', 'FOMO & Greed', 'Pre-Market Routine'] },
          { name: 'Drawdown Traps', topics: ['Losing Streaks', 'Revenge Trading', 'Resilience Journal'] },
          { name: 'Visual Chart Audits', topics: ['Daily Reviews', 'AI Analysis', 'SMC Feedback'] },
          { name: 'Prop Challenge Launch', topics: ['Performance Metrics', 'Firm Selection', 'Funded Mindset'] },
        ]
      }
    ],
    totalDays: 120,
    currentDay: 24,
  })
})

// --- Trade Log ---
const trades: any[] = [
  { id: '1', pair: 'EURUSD', direction: 'Short', entry: 1.0875, exit: 1.0820, size: '0.5 lot', result: 'win', pnl: '+$275', rrr: '1:2.2', date: '2026-06-15', tags: ['MSS', 'FVG'], notes: 'Clean break of structure on 1H' },
  { id: '2', pair: 'GBPUSD', direction: 'Long', entry: 1.2680, exit: 1.2710, size: '0.3 lot', result: 'win', pnl: '+$90', rrr: '1:1.5', date: '2026-06-14', tags: ['OB', 'Liquidity Sweep'], notes: 'Order block held perfectly' },
  { id: '3', pair: 'ES Futures', direction: 'Short', entry: 5560, exit: 5572, size: '2 micro', result: 'loss', pnl: '-$60', rrr: '1:1', date: '2026-06-13', tags: ['FVG'], notes: 'FVG not fully mitigated' },
]

app.get('/api/trades', (_req, res) => {
  res.json({ trades, total: trades.length })
})

app.post('/api/trades', (req, res) => {
  const trade = {
    id: String(Date.now()),
    ...req.body,
    date: new Date().toISOString().split('T')[0],
    pnl: req.body.result === 'pending' ? 'Open' : req.body.pnl || '$0',
  }
  trades.unshift(trade)
  res.json({ success: true, trade })
})

// --- Trade Analysis (Mock AI Visual Audit) ---
app.post('/api/analyze-chart', (req, res) => {
  const { imageData } = req.body

  if (!imageData) {
    return res.status(400).json({ error: 'No image data provided' })
  }

  // Simulated AI visual analysis response
  const analysis = {
    summary: "📊 **Chart Analysis Complete** — SMC/ICT Assessment",
    confidence: 87,
    findings: [
      {
        type: 'market_structure',
        label: 'Market Structure',
        detail: 'Price is in a bullish trend with higher highs and higher lows on the 1H timeframe. Last structure shift occurred at the 1.0800 level.',
        status: 'pass'
      },
      {
        type: 'fvg',
        label: 'Fair Value Gap Detected',
        detail: 'Bullish FVG identified between 1.0820–1.0845. Price has not yet filled this gap — expect a retracement to this zone.',
        status: 'pass'
      },
      {
        type: 'order_block',
        label: 'Order Block',
        detail: 'Bullish Order Block found at 1.0780–1.0795. The Mean Threshold (50%) lines up with the current discount zone.',
        status: 'pass'
      },
      {
        type: 'liquidity',
        label: 'Liquidity Analysis',
        detail: 'Buy-side liquidity sitting above 1.0900 (equal highs). Price likely to sweep this level before any reversal.',
        status: 'info'
      },
      {
        type: 'suggestion',
        label: 'AI Suggestion',
        detail: 'Wait for the FVG to be mitigated before entering long. Confluence with OB + Discount zone makes this a high-probability setup if price reaches 1.0820.',
        status: 'action'
      }
    ],
    screenshotFeedback: '✅ Chart uploaded successfully. Drawing accurate structure and FVG zones.'
  }

  setTimeout(() => {
    res.json(analysis)
  }, 600)
})

// --- Subscription Plans ---
app.get('/api/plans', (_req, res) => {
  res.json({
    plans: [
      {
        name: 'Free',
        price: 0,
        interval: 'month',
        features: ['Basic Q&A', 'Broker recommendations', '5 intro lessons'],
        limitations: ['No chart analysis', 'No trade auditing', 'No risk simulator']
      },
      {
        name: 'Pro Coach',
        price: 29,
        interval: 'month',
        features: ['Unlimited AI Q&A', 'Full 90–120 day curriculum', 'Basic trade analysis', 'Phase milestone exams'],
        limitations: ['No real-time chart audits', 'No prop simulator']
      },
      {
        name: 'Prop Master',
        price: 59,
        interval: 'month',
        features: ['Everything in Pro', 'Real-time chart audits', 'ICT indicator setups', 'Risk simulator', 'Psychology guardrails'],
        limitations: []
      }
    ]
  })
})

// --- Dashboard Stats ---
app.get('/api/stats', (_req, res) => {
  res.json({
    progress: { currentDay: 24, totalDays: 120, phase: 1, phaseProgress: 65 },
    winRate: { value: 73, total: 30, profitableTrades: 22 },
    chartsAnalyzed: { weekly: 18, pending: 4 },
    propReadiness: { score: 65, type: 'Apex' }
  })
})

// ---------------------------------------------------------------------------
// SPA fallback — serve index.html for any non-API, non-static route
// ---------------------------------------------------------------------------
if (fs.existsSync(clientDistPath)) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
}

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] PropCoach AI API running on http://0.0.0.0:${PORT}`)
  console.log(`[server] API endpoints available at /api/*`)
})