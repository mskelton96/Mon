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
// Load curriculum assets
// ---------------------------------------------------------------------------
const clientDistPath = path.resolve(__dirname, '../../client/dist')

// Load mock trades
let mockTrades: any[] = []
const mockTradesPath = path.join(__dirname, 'mock_trades.json')
try {
  const raw = fs.readFileSync(mockTradesPath, 'utf-8')
  mockTrades = JSON.parse(raw)
  console.log(`[server] Loaded ${mockTrades.length} mock trades`)
} catch (e) {
  console.warn('[server] Could not load mock_trades.json, using fallback')
}

// Load AI coach guidelines
let aiCoachGuidelines = ''
const guidelinesPath = path.join(__dirname, 'ai_coach_guidelines.md')
try {
  aiCoachGuidelines = fs.readFileSync(guidelinesPath, 'utf-8')
  console.log(`[server] Loaded AI coach guidelines (${aiCoachGuidelines.length} chars)`)
} catch (e) {
  console.warn('[server] Could not load ai_coach_guidelines.md')
}

// Load prop firm cheatsheet
let propFirmCheatsheet = ''
const cheatsheetPath = path.join(__dirname, 'prop_firm_cheatsheet.md')
try {
  propFirmCheatsheet = fs.readFileSync(cheatsheetPath, 'utf-8')
  console.log(`[server] Loaded prop firm cheatsheet (${propFirmCheatsheet.length} chars)`)
} catch (e) {
  console.warn('[server] Could not load prop_firm_cheatsheet.md')
}

// Static frontend (served in production)
if (fs.existsSync(clientDistPath)) {
  console.log(`[server] Serving static frontend from: ${clientDistPath}`)
  app.use(express.static(clientDistPath))
} else {
  console.log('[server] No built frontend at client/dist — API only mode')
}

// ---------------------------------------------------------------------------
// Helper: compute stats from mock trades
// ---------------------------------------------------------------------------
function computeStats() {
  const completed = mockTrades.filter(t => t.status === 'Passed' || t.status === 'Failed')
  const wins = mockTrades.filter(t => t.status === 'Passed').length
  const losses = mockTrades.filter(t => t.status === 'Failed').length
  const winRate = completed.length > 0 ? Math.round((wins / completed.length) * 100) : 0

  return {
    progress: { currentDay: 24, totalDays: 120, phase: 1, phaseProgress: 65 },
    winRate: { value: winRate, total: completed.length, profitableTrades: wins, losingTrades: losses },
    chartsAnalyzed: { weekly: 18, pending: 4 },
    propReadiness: { score: 65, type: 'Apex' },
    totalPnL: '+$210', // simulated
    avgRRR: '1:2.1'
  }
}

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------

// Health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'propcoach-ai', version: '1.0.0' })
})

// Prop Firm Cheatsheet
app.get('/api/prop-cheatsheet', (_req, res) => {
  // Parse Markdown into sections for structured rendering
  const sections: { heading: string; content: string }[] = []
  const lines = propFirmCheatsheet.split('\n')
  let currentHeading = 'Overview'
  let currentContent: string[] = []

  for (const line of lines) {
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      if (currentContent.length > 0) {
        sections.push({ heading: currentHeading, content: currentContent.join('\n') })
        currentContent = []
      }
      currentHeading = line.replace('## ', '').trim()
    } else {
      currentContent.push(line)
    }
  }
  if (currentContent.length > 0) {
    sections.push({ heading: currentHeading, content: currentContent.join('\n') })
  }

  res.json({
    raw: propFirmCheatsheet,
    sections,
    totalChars: propFirmCheatsheet.length,
    loaded: propFirmCheatsheet.length > 0,
  })
})

// Chat / AI Coaching — powered by ai_coach_guidelines.md
app.post('/api/chat', (req, res) => {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  const lower = message.toLowerCase()
  let response = ''
  let grade = ''
  let evaluationPoints: string[] = []

  // Extract key evaluation framework from guidelines
  const evalFramework = aiCoachGuidelines.includes('Liquidity Sweep Check')
    ? `**SMC/ICT Evaluation Framework (per AI Coach Guidelines):**
1. ✅ Liquidity Sweep Check — Did you sweep BSL or SSL first?
2. ✅ Market Structure Shift (MSS) Check — Was there a clear candle close past the swing point?
3. ✅ Value Filter Check — Entry in Discount (long) or Premium (short)?
4. ✅ Execution Catalyst — Did you enter at an FVG or Order Block?
5. ✅ Risk Metrics — Stop loss valid? R:R at least 1:2?`
    : ''

  // Rich responses using the curriculum/guidelines
  if (lower.includes('fvg') || lower.includes('fair value') || lower.includes('gap')) {
    response = `**📊 Fair Value Gap (FVG) Analysis — Institutional Imbalance**

A Fair Value Gap is a **3-candle imbalance** left by aggressive institutional order flow. It forms when:

**Bullish FVG:**
• Candle 1: High sets the gap ceiling
• Candle 2: Large impulsive up-candle (the displacement)
• Candle 3: Low sets the gap floor
• **The Gap** = Area between Candle 1's high and Candle 3's low

**Inversion FVG (iFVG):**
When price closes completely through a FVG without filling it, the gap inverts polarity — a bullish FVG becomes bearish resistance.

**📌 Key Insight:** FVGs act as price magnets. Markets return to fill~70% of gaps. Look for FVG + Order Block + MSS confluence.

${evalFramework}

🎯 *Phase 1 Exercise:* Open a 1H EURUSD chart. Find and label 5 FVGs. Note which ones have been filled (mitigated).`
  } else if (lower.includes('bos') || lower.includes('mss') || lower.includes('structure') || lower.includes('shift')) {
    response = `**🔄 Market Structure: BOS vs MSS (Break of Structure vs Market Structure Shift)**

**Break of Structure (BOS)** — Trend CONTINUATION
• Price breaks the previous swing high/low in the same trend direction
• Requires a candle BODY close past the swing point (wicks don't count)
• Confirms the trend is still active

**Market Structure Shift (MSS)** — Trend REVERSAL (aka Change of Character)
• Price breaks and closes below the most recent Higher Low (in uptrend)
• OR breaks above the most recent Lower High (in downtrend)
• First sign of a potential trend reversal

**How to practice:**
1. Open a clean 1H chart
2. Label ALL swing highs and lows
3. Mark each BOS and MSS as they occur
4. Verify candle close past the structure point

${evalFramework}

📌 *Phase 1 Milestone:* Draw structure shifts on a raw chart and upload for AI grading!`
  } else if (lower.includes('order block') || lower.includes('ob') || lower.includes('institutional')) {
    response = `**🏦 Order Block (OB) Analysis — Institutional Footprint**

An Order Block is the **last candle before an impulsive move** that breaks structure (MSS/BOS), where institutions loaded their positions.

**Bullish Order Block:**
• Look for the last DOWN-closing candle before a strong UP move
• The low of that candle represents institutional buying interest
• **Mean Threshold:** 50% of the OB candle's body — if price closes below this, the OB is likely invalidated

**Bearish Order Block:**
• Look for the last UP-closing candle before a strong DOWN move
• The high represents institutional selling interest

**Confluence Framework (High Probability):**
✅ OB + FVG + Discount (for longs) / Premium (for shorts)
✅ OB + MSS confirmation
✅ OB + Liquidity Sweep

${evalFramework}

🎯 *Phase 1 Exercise:* Find 3 Bullish OBs on a 1H chart. Mark their Mean Threshold and observe price reaction.`
  } else if (lower.includes('liquidity') || lower.includes('sweep') || lower.includes('bsl') || lower.includes('ssl') || lower.includes('turtle')) {
    response = `**🎯 Liquidity Sweep (Turtle Soup) — The Institutional Trap**

Liquidity sits at obvious price levels where retail traders place their stops:
• **Buy-side Liquidity (BSL):** Above equal highs, double tops, old highs
• **Sell-side Liquidity (SSL):** Below equal lows, double bottoms, old lows

**How Institutions Use Sweeps:**
1. Price pushes past a visible high/low — retail chases
2. Institutions reverse price aggressively — trapping the chasers
3. Price moves in the OPPOSITE direction toward the real target

**The Turtle Soup Entry Model:**
1. Wait for a sweep of BSL (for shorts) or SSL (for longs)
2. Wait for an MSS on a lower timeframe
3. Enter at the FVG left by the displacement
4. Target the opposite liquidity pool

${evalFramework}

📌 *Scenario:* NQ sweeps NY Session High at 10:05 AM, drops back inside range. Drop to 1m chart for Silver Bullet entry.`
  } else if (lower.includes('silver bullet') || lower.includes('time') || lower.includes('macro')) {
    response = `**🔫 ICT Silver Bullet Model — Precision Timing**

The Silver Bullet focuses on specific **algorithmic trading windows**:

**Macro Window:** 10:00 AM – 11:00 AM EST (London/NY overlap)
• Highest institutional activity of the day
• Most reliable for the Silver Bullet setup

**Setup Steps:**
1. 📍 Wait for the 10:00 AM candle
2. 🔍 Identify a sweep of session liquidity (BSL or SSL)
3. 📉 Drop to the 1-minute chart
4. ⚡ Watch for a displacement + MSS + FVG formation
5. 🎯 Enter at the 1m FVG, stop beyond the sweep level

**Position Sizing (from the guidelines):**
$50k account, 1% risk ($500), 15-point stop on NQ Mini ($20/pt) = **1 Mini contract max**
Or use Micros: 15-point stop on MNQ ($2/pt) = **16 Micro contracts max**

---
💡 *Pro Tip:* The Silver Bullet works best on NQ and ES futures during high-volatility London/NY overlap.`
  } else if (lower.includes('risk') || lower.includes('position') || lower.includes('rr') || lower.includes('size') || lower.includes('drawdown')) {
    response = `**🛡️ Risk Management — The Professional's Edge**

**Core Rules:**
• Max Risk per Trade: **0.5% – 1.0%** of account
• Minimum R:R: **1:2** (target 1:3+)
• Daily Loss Limit: Stop after **2 consecutive losses**

**Position Sizing Math ($50k Account):**
• 1% risk = $500 max loss per trade
• If stop is 15 points on NQ ($20/pt Mini) → $300 risk → **1 Mini contract**
• If stop is 15 points on MNQ ($2/pt Micro) → $30 risk → **up to 16 Micros**

**Prop Firm Drawdown Rules (Critical):**
• **FTMO:** Daily drawdown is based on DAY'S STARTING balance (not initial)
  - Start $102k, 5% daily limit → threshold is **$97k**
• **Apex Futures:** Trailing drawdown trails your HIGHEST peak equity
  - If trade hits +$600 profit and reverses to -$800 loss → you've lost **$1,400 of drawdown room**

**The Three Strikes Rule:**
❌ 1 loss → review journal
❌ 2 losses → stop trading for the day
❌ 3rd trade out of revenge → catastrophic account breach

${evalFramework}

🎯 *Phase 2 Exercise:* Complete a risk model showing how a 40% win rate generates profits under 1:3 R:R.`
  } else if (lower.includes('psychology') || lower.includes('fomo') || lower.includes('emotion') || lower.includes('revenge') || lower.includes('fear') || lower.includes('greed')) {
    response = `**🧠 Trading Psychology — Breaking the Emotional Cycle**

**The Gap:** The distance between your trading plan and your actual execution.

**Common Psychological Hijacks:**
• **FOMO** (Fear Of Missing Out): Entering a trade because price is moving fast
  - *Reality:* Missing a trade costs $0; chasing one costs real money
• **Revenge Trading:** Doubling down after a loss to "make it back"
  - *Reality:* This is how blown accounts happen (see mock trade #005)
• **Greed / Moving Stops:** Letting a +12 point winner reverse to a full loss
  - *Reality:* You must secure partial profits or move to BE at 1:1 R:R

**Your Guardrails (from the guidelines):**
1. Pre-trade checklist — every entry checks 3 boxes
2. Three Strikes rule — 2 losses = stop for the day
3. Physical disconnect — close the laptop after a loss
4. Resilience Journal — write down what you felt

**Grade F Example (from mock trade #003):**
Bought EURUSD at extreme Premium with no MSS, no FVG, R:R of 1:0.67. The verdict: FOMO hijack. Your notes said "nervous about missing the trend" — that's the red flag. Missing a trade costs nothing.

${evalFramework}

📌 *Daily Practice:* Before every trade, write down: "Why am I entering? Is this in my plan? Am I emotional right now?"`
  } else if (lower.includes('prop') || lower.includes('apex') || lower.includes('ftmo') || lower.includes('funded') || lower.includes('challenge') || lower.includes('eval')) {
    response = `**🏆 Prop Firm Evaluation Guide**

**Recommended Firms:**
• **Apex Trader Funding** — Futures (ES, NQ). Trailing drawdown model. $50k+ accounts.
• **FTMO** — Forex (EURUSD, GBPUSD). Static drawdown. $10k-$200k.
• **FundedNext** — Flexible rules. Up to 90% profit split.

**Key Rules to Know:**
1. **Profit Targets:** 8%–10% of account
2. **Daily Drawdown:** Often 5% of day's starting balance
3. **Max Drawdown:** Usually 10%–12% total
4. **Minimum Trading Days:** Usually 10–15 days
5. **Consistency Rule:** No single day can exceed 30%–40% of total profit
6. **News Restriction:** No trading 2 min before/after major news

**❌ Failed Evaluation #1:** Not understanding daily drawdown resets
→ Start $100k. Day 2 balance = $102k. Daily 5% limit = $5k. Minimum threshold = **$97k** (NOT $95k!)

**❌ Failed Evaluation #2:** Trailing drawdown trap
→ Equity peaks at +$600 on a trade. Drawdown limit rises by $600. Letting trade reverse to -$800 means you burned $1,400 of room.

${evalFramework}

🎯 *Phase 3 Milestone:* Complete a 2-week mock eval with zero rule violations.`
  } else {
    response = `**🤔 Great question! Let's break it down using SMC/ICT principles.**

Before diving into specifics, always start with **market structure first**:
1. 📐 Identify the current trend (HH/HL or LH/LL)
2. 🎯 Mark key structural levels (weekly/monthly highs/lows)
3. 🔍 Locate visible liquidity pools (equal highs/lows)
4. ⚡ Look for displacement + MSS + FVG

**Key Concepts to Explore:**
• **Fair Value Gaps (FVG)** — The 3-candle imbalance
• **Order Blocks (OB)** — Institutional footprint candles
• **Market Structure Shift (MSS)** — Trend reversal signal
• **Liquidity Sweep / Turtle Soup** — The institutional trap
• **Optimal Trade Entry (OTE)** — 62%–79% Fibonacci zone
• **Silver Bullet Model** — 10:00–11:00 AM EST precision entries

*Which concept would you like me to dive deeper into?*

---
${evalFramework ? `**Quick Grade Framework (from AI Coach Guidelines):**
${evalFramework}` : ''}`
  }

  // Compute a mock grade based on the message
  if (lower.includes('pass') || lower.includes('win') || lower.includes('good setup')) {
    grade = 'A-'
  } else if (lower.includes('fail') || lower.includes('loss') || lower.includes('bad') || lower.includes('fomo')) {
    grade = 'F'
  } else if (lower.includes('review') || lower.includes('pending') || lower.includes('check')) {
    grade = 'B+'
  }

  // Evaluation points extracted from the guidelines' framework
  if (grade) {
    evaluationPoints = [
      grade.startsWith('A') ? '✅ Excellent technical alignment with SMC/ICT' : grade.startsWith('F') ? '❌ No SMC/ICT confluence detected' : '⚠️ Partial confluence — review needed',
      lower.includes('fvg') || lower.includes('ob') || lower.includes('order block') ? '✅ Execution catalyst identified (FVG/OB)' : '❌ Missing execution catalyst',
    ]
  }

  const responseObj: any = { response, grade: grade || undefined }
  if (evaluationPoints.length > 0) responseObj.evaluationPoints = evaluationPoints
  if (aiCoachGuidelines) responseObj.guidelinesLoaded = true

  setTimeout(() => {
    res.json(responseObj)
  }, 300)
})

// Curriculum data
app.get('/api/curriculum', (_req, res) => {
  res.json({
    phases: [
      {
        id: 1, title: 'Market Structure & SMC/ICT Basics',
        days: 'Days 1–30', progress: 65, unlocked: true,
        objective: 'Transition from lagging retail indicators to algorithmic price action and master core market structure concepts.',
        weeks: [
          { name: 'Algorithmic Price Delivery', topics: ['IPDA', 'Why indicators fail', 'Price Action fundamentals'] },
          { name: 'Defining Swing Points & Structure', topics: ['Swing Highs/Lows', 'BOS vs MSS', 'Multi-timeframe analysis'] },
          { name: 'Institutional Imbalances', topics: ['FVG Anatomy', 'Price Magnets', 'iFVG Inversion'] },
          { name: 'Institutional Order Blocks', topics: ['OB Identification', 'Mean Threshold', 'Phase 1 Exam'] },
        ]
      },
      {
        id: 2, title: 'Risk Management & Trade Log Integration',
        days: 'Days 31–60', progress: 0, unlocked: true,
        objective: 'Learn to select high-probability setups using filters and integrate a structured quantitative trading journal.',
        weeks: [
          { name: 'Premium vs Discount Zones', topics: ['Fibonacci Tool', 'Equilibrium', 'Buy/Sell Zones'] },
          { name: 'Advanced Entry Models', topics: ['OTE 62-79%', 'Liquidity Sweeps', 'Turtle Soup'] },
          { name: 'The Math of Risk', topics: ['0.5-1% Rule', 'R:R Mathematics', 'Position Sizing'] },
          { name: 'Trade Log Integration', topics: ['Quantitative Journal', 'Win Rate Tracking', '20-Trade Backtest'] },
        ]
      },
      {
        id: 3, title: 'Prop-Firm Rules & Evaluation Prep',
        days: 'Days 61–90', progress: 0, unlocked: false,
        objective: 'Align your strategy with strict institutional guidelines and practice passing simulated evaluations.',
        weeks: [
          { name: 'Deciphering Prop Firm Rules', topics: ['FTMO vs Apex', 'Profit Targets 8-10%', 'Min Trading Days'] },
          { name: 'Master Drawdown', topics: ['Daily Drawdown', 'Trailing Drawdown', 'The Peak Trap'] },
          { name: 'Trading Plan Constraints', topics: ['Consistency Rule 30%', 'News Restrictions', 'Rule Book'] },
          { name: 'Mock Evaluation Challenge', topics: ['$50k Paper Trade', 'Zero Violations', 'Positive Return'] },
        ]
      },
      {
        id: 4, title: 'Advanced Simulation & Psychology',
        days: 'Days 91–120', progress: 0, unlocked: false,
        objective: 'Overcome execution-destroying behavioral biases and undergo visual audits for real-money funding.',
        weeks: [
          { name: 'Neutralizing FOMO & Greed', topics: ['The Gap', 'FOMO Hijack', 'Pre-Trade Checklist'] },
          { name: 'Overcoming Drawdown Traps', topics: ['Revenge Trading', 'Three Strikes Rule', 'Physical Disconnect'] },
          { name: 'Visual Chart Audits', topics: ['Screenshot Upload', 'Technical Audit', 'Behavioral Check'] },
          { name: 'The Funded Mindset', topics: ['Funded vs Demo', 'Firm Selection', 'Launch Prop Challenge'] },
        ]
      }
    ],
    totalDays: 120, currentDay: 24,
  })
})

// Mock trades endpoint (from mock_trades.json)
app.get('/api/trades', (_req, res) => {
  // Return sanitized trades (strip the full aiFeedback for list view, keep for detail)
  const tradeList = mockTrades.map(t => ({
    id: t.id,
    asset: t.asset,
    type: t.type,
    date: t.date,
    timeframe: t.timeframe,
    phase: t.phase,
    status: t.status,
    riskMetrics: t.riskMetrics,
    traderNotes: t.traderNotes?.substring(0, 100) + '...',
  }))

  res.json({ trades: tradeList, total: mockTrades.length })
})

// Single trade detail with full AI feedback
app.get('/api/trades/:id', (req, res) => {
  const trade = mockTrades.find(t => t.id === req.params.id)
  if (!trade) return res.status(404).json({ error: 'Trade not found' })
  res.json(trade)
})

// Chart analysis / Visual Audit (using ai_coach_guidelines prompts)
app.post('/api/analyze-chart', (req, res) => {
  const { imageData } = req.body
  if (!imageData) return res.status(400).json({ error: 'No image data provided' })

  // Simulate visual audit using the guidelines framework
  const analysis = {
    summary: "📊 **PropCoach AI Visual Trade Audit** — SMC/ICT Assessment",
    confidence: 87,
    grade: 'B+',
    findings: [
      {
        type: 'market_structure',
        label: '1. Market Structure',
        detail: 'Swing highs and lows appear to be accurately drawn. However, the most recent swing low break needs a candle body close to confirm the MSS — the wick alone is insufficient.',
        status: 'pass'
      },
      {
        type: 'fvg',
        label: '2. Fair Value Gap Check',
        detail: 'The highlighted rectangle shows a potential FVG. Verifying the 3-candle formation: Candle 1 and Candle 3 have overlap, meaning this is NOT a valid FVG. The gap is too narrow to be institutional.',
        status: 'warn'
      },
      {
        type: 'order_block',
        label: '3. Order Block Analysis',
        detail: 'Bullish OB identified at the swing low. The Mean Threshold (50%) aligns with the current discount zone. This is a valid institutional footprint.',
        status: 'pass'
      },
      {
        type: 'liquidity',
        label: '4. Liquidity Sweep Detection',
        detail: 'Buy-side liquidity sits above the recent equal highs at 1.0900. The market likely swept this level before reversing. Valid sweep detected.',
        status: 'pass'
      },
      {
        type: 'risk_metrics',
        label: '5. Risk-to-Reward Calculation',
        detail: 'Visible stop-loss is placed 12 pips below entry. Take-profit is at 24 pips. R:R = 1:2 — meets the minimum requirement.',
        status: 'pass'
      },
      {
        type: 'psychological',
        label: '6. Psychological Guardrail',
        detail: 'Entry shows discipline — you waited for a pullback into discount. However, the position size (2 lots) represents 1.2% risk on a $50k account, slightly above the 1% ceiling. Consider reducing to 1.5 lots.',
        status: 'info'
      }
    ],
    reportFooter: `**Visual Grade: B+**
    
**Technical Confluences Identified:**
✅ Valid Order Block with Mean Threshold alignment
✅ Liquidity sweep detected at resistance
✅ R:R meets 1:2 minimum standard

**Areas for Improvement:**
⚠️ FVG not fully valid — Candle 1 and 3 overlap substantially
⚠️ Position size slightly exceeds 1% risk rule

**Recommendation:** The trade setup is viable but the FVG needs to be re-drawn. Focus on identifying 3-candle imbalances with NO overlap between candle 1 and 3 wicks.`
  }

  setTimeout(() => {
    res.json(analysis)
  }, 500)
})

// Stats (computed from mock data)
app.get('/api/stats', (_req, res) => {
  res.json(computeStats())
})

// Subscription plans
app.get('/api/plans', (_req, res) => {
  res.json({
    plans: [
      { name: 'Free', price: 0, interval: 'month', features: ['Basic Q&A', 'Broker recommendations', '5 intro lessons'], limitations: ['No chart analysis', 'No trade auditing', 'No risk simulator'] },
      { name: 'Pro Coach', price: 29, interval: 'month', features: ['Unlimited AI Q&A', 'Full 90–120 day curriculum', 'Basic trade analysis', 'Phase milestone exams'], limitations: ['No real-time chart audits', 'No prop simulator'] },
      { name: 'Prop Master', price: 59, interval: 'month', features: ['Everything in Pro', 'Real-time chart audits', 'ICT indicator setups', 'Risk simulator', 'Psychology guardrails'], limitations: [] }
    ]
  })
})

// ---------------------------------------------------------------------------
// SPA fallback
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
  console.log(`[server] API endpoints: /api/health, /api/chat, /api/trades, /api/analyze-chart, /api/stats, /api/curriculum, /api/plans`)
})
