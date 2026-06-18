import { useState, useEffect } from 'react'

interface CheatsheetSection {
  heading: string
  content: string
}

interface CheatsheetData {
  raw: string
  sections: CheatsheetSection[]
  totalChars: number
  loaded: boolean
}

// Quick Markdown → HTML converter for basic elements
function mdToHtml(text: string): string {
  return text
    .replace(/### (.*)/g, '<h4 style="color:var(--accent-gold);margin:16px 0 8px;font-size:15px;font-weight:600">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>')
    .replace(/\* (.*)/g, '<li style="margin:4px 0;color:var(--text-secondary);font-size:13px">$1</li>')
    .replace(/---/g, '<hr style="border:none;border-top:1px solid var(--border-color);margin:16px 0" />')
    .replace(/\n\n/g, '</p><p style="color:var(--text-secondary);font-size:13px;line-height:1.6;margin:8px 0">')
    .replace(/\n/g, '<br />')
    .replace(/<li>/g, '<ul style="margin:8px 0;padding-left:20px"><li>')
    .replace(/<\/li>\n<li>/g, '</li><li>')
    .replace(/<\/li>(?!.*<li>)/g, '</li></ul>')
}

// Comparison matrix parser
function parseMatrix(raw: string) {
  const lines = raw.split('\n')
  let inMatrix = false
  let headers: string[] = []
  const rows: string[][] = []
  
  for (const line of lines) {
    if (line.startsWith('| **Apex')) inMatrix = true
    if (!inMatrix) continue
    if (line.startsWith('| :---')) continue
    if (line.startsWith('---')) { inMatrix = false; break }
    
    const cells = line.split('|').map(c => c.trim()).filter(c => c)
    if (cells.length > 2 && !cells[0].startsWith('**')) {
      rows.push(cells)
    } else if (cells.length > 2) {
      headers = cells
    }
  }
  return { headers, rows }
}

export default function SetupGuide() {
  const [cheatsheet, setCheatsheet] = useState<CheatsheetData | null>(null)
  const [activeSection, setActiveSection] = useState('matrix')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/prop-cheatsheet')
      .then(r => r.json())
      .then(data => {
        setCheatsheet(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const matrix = cheatsheet ? parseMatrix(cheatsheet.raw) : { headers: [], rows: [] }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Setup Guide</h1>
        <p className="page-subtitle">Get your TradingView, broker, and prop firm accounts ready for the PropCoach program</p>
      </div>

      {/* Step 1: TradingView */}
      <div className="setup-section">
        <h3>📊 Step 1: TradingView Setup</h3>
        <div className="setup-steps">
          {[
            { num: 1, title: 'Create a TradingView Account', desc: 'Sign up at TradingView.com (free tier is sufficient). Use our referral link to support PropCoach AI.' },
            { num: 2, title: 'Configure Your Chart Layout', desc: 'Use a clean chart with no indicators. We recommend the 1-Hour timeframe for structure analysis and 1-Minute for Silver Bullet entries.' },
            { num: 3, title: 'Enable Key Drawing Tools', desc: 'Ensure you have access to: Rectangle tool (for FVGs), Fibonacci Retracement (for OTE), Ray tool (for trendlines), and Text/Label tool.' },
            { num: 4, title: 'Set Up Your Watchlist', desc: 'Add major Forex pairs (EURUSD, GBPUSD, USDJPY) and Futures (ES, NQ) to track institutional order flow.' },
          ].map(step => (
            <div key={step.num} className="setup-step">
              <div className="setup-step-number">{step.num}</div>
              <div className="setup-step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Broker Recommendations */}
      <div className="setup-section">
        <h3>🏦 Step 2: Broker Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { name: 'Tradovate', type: 'Futures', desc: 'Best for ES/NQ futures trading. Direct TradingView integration. $0 setup fee.', tag: 'Recommended' },
            { name: 'Pepperstone', type: 'Forex', desc: 'Low spreads on major Forex pairs. cTrader and MT5 platforms. Great for EURUSD trading.', tag: 'Forex Choice' },
            { name: 'OANDA', type: 'Forex', desc: 'Excellent API access and TradingView compatibility. Reliable execution for retail traders.', tag: 'Popular' },
            { name: 'AMP Futures', type: 'Futures', desc: 'Low commissions on micro futures. Perfect for small account prop firm preparation.', tag: 'Budget Option' },
          ].map(broker => (
            <div key={broker.name} className="card" style={{ padding: '16px', margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{broker.name}</h4>
                <span style={{ fontSize: '11px', padding: '2px 10px', borderRadius: '10px', background: 'rgba(0,200,83,0.1)', color: 'var(--accent-green)' }}>
                  {broker.tag}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--accent-cyan)', marginBottom: '6px', fontWeight: 500 }}>{broker.type}</div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{broker.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Prop Firm Cheatsheet */}
      <div className="setup-section">
        <h3>🏆 Step 3: Prop Firm Comparison & Cheatsheet</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Jake's comprehensive reference guide — compare firms, understand drawdown traps, and master consistency rules.
        </p>

        {loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Loading cheatsheet...</div>
          </div>
        ) : !cheatsheet?.loaded ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Cheatsheet not available</div>
          </div>
        ) : (
          <>
            {/* Section Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveSection('matrix')} style={{
                padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--border-color)',
                background: activeSection === 'matrix' ? 'rgba(0,200,83,0.1)' : 'transparent',
                color: activeSection === 'matrix' ? 'var(--accent-green)' : 'var(--text-secondary)',
                fontSize: '13px', fontWeight: activeSection === 'matrix' ? 600 : 400, cursor: 'pointer',
              }}>📊 Comparison Matrix</button>
              {cheatsheet.sections.map(s => (
                <button key={s.heading} onClick={() => setActiveSection(s.heading)} style={{
                  padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--border-color)',
                  background: activeSection === s.heading ? 'rgba(0,200,83,0.1)' : 'transparent',
                  color: activeSection === s.heading ? 'var(--accent-green)' : 'var(--text-secondary)',
                  fontSize: '13px', fontWeight: activeSection === s.heading ? 600 : 400, cursor: 'pointer',
                }}>{s.heading.includes('Deep') ? '🔍 Operational Rules' : s.heading.includes('Consistency') ? '📐 Consistency' : s.heading.includes('News') ? '📰 News Rules' : s.heading.includes('Payout') ? '💰 Payouts' : s.heading.includes('Readiness') ? '✅ Checklist' : `📋 ${s.heading}`}</button>
              ))}
            </div>

            {/* Comparison Matrix */}
            {activeSection === 'matrix' && matrix.rows.length > 0 && (
              <div className="card" style={{ padding: '0', overflow: 'auto' }}>
                <table className="trade-table" style={{ minWidth: '900px' }}>
                  <thead>
                    <tr>
                      {matrix.headers.map((h, i) => (
                        <th key={i} style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} style={{
                            fontSize: '12px',
                            fontWeight: j === 0 ? 600 : 400,
                            color: j === 0 ? 'var(--accent-green)' : 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                          }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Section Content */}
            {activeSection !== 'matrix' && cheatsheet.sections.filter(s => s.heading === activeSection).map((section, i) => (
              <div key={i} className="card">
                <div className="card-header">
                  <h2 className="card-title">{section.heading}</h2>
                </div>
                <div className="setup-step-content" dangerouslySetInnerHTML={{ __html: mdToHtml(section.content) }} />
              </div>
            ))}

            {/* Summary box */}
            <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent-green)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>💡</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-green)' }}>Key Insight</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Over <strong>90% of prop challenge participants fail</strong> — not because of bad setups, but because they don't understand the rulebooks. This cheatsheet is your daily armor.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Step 4: Connect & Sync */}
      <div className="setup-section">
        <h3>🔗 Step 4: Connect & Sync</h3>
        <div className="card">
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Seamlessly connect your TradingView and broker accounts to PropCoach AI for real-time analysis and trade auditing.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { name: 'TradingView', icon: '📈', status: 'Available' },
              { name: 'Tradovate', icon: '⚡', status: 'Coming Soon' },
              { name: 'Pepperstone', icon: '💰', status: 'Coming Soon' },
              { name: 'OANDA', icon: '🏦', status: 'Coming Soon' },
            ].map(service => (
              <div key={service.name} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{service.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{service.name}</span>
                </div>
                <span style={{ fontSize: '12px', color: service.status === 'Available' ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                  {service.status === 'Available' ? '✅ Connected' : '⏳ ' + service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-Challenge Checklist */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">✅ Pre-Challenge Readiness Checklist</h2>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>From the Prop Firm Cheatsheet</span>
        </div>
        {[
          { step: 'Step 1: Technical Strategy Backtesting', desc: 'Have you logged at least 50 simulated/demo trades using SMC/ICT methodology?' },
          { step: 'Step 2: Drawdown Mastery', desc: 'Do you know the exact drawdown type of your chosen firm? Daily vs Trailing?' },
          { step: 'Step 3: Risk Sizing Calculation', desc: 'Do you know your exact max risk per trade in dollar format?' },
          { step: 'Step 4: Consistency Rules Compliance', desc: 'Are you committed to a structured daily profit target (30% limit)?' },
          { step: 'Step 5: Behavioral & Psychological Discipline', desc: 'Are you ready to apply the Three Strikes rule after 2 losses?' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--border-color)' : 'none' }}>
            <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)' }} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.step}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}