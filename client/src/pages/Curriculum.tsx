import { useState } from 'react'

const phases = [
  {
    id: 1,
    title: 'Market Structure & SMC/ICT Basics',
    days: 'Days 1–30',
    weeks: '4 weeks',
    color: 'p1',
    unlocked: true,
    progress: 65,
    tag: 'In Progress',
    description: 'Learn to identify market flow, draw structures accurately, and locate high-probability imbalances.',
    weeks_detail: [
      { name: 'Week 1: Foundations of Price Delivery', topics: ['Price Action vs Indicators', 'IPDA Introduction', 'Swing Highs & Swing Lows'] },
      { name: 'Week 2: Structure Shifts and Breaks', topics: ['BOS vs MSS', 'Multi-timeframe analysis', 'Structure drawing exercise'] },
      { name: 'Week 3: Fair Value Gaps (FVG)', topics: ['3-candle formation', 'Price magnets', 'Inversion FVGs'] },
      { name: 'Week 4: Order Blocks (OB)', topics: ['Institutional Order Blocks', 'Mean Threshold', 'Phase 1 Exam'] },
    ]
  },
  {
    id: 2,
    title: 'Risk Management & Advanced SMC',
    days: 'Days 31–60',
    weeks: '4 weeks',
    color: 'p2',
    unlocked: true,
    progress: 0,
    tag: 'Upcoming',
    description: 'Transition from patterns to advanced confluence frameworks and institutional risk models.',
    weeks_detail: [
      { name: 'Week 5: Liquidity Pools & Sweeps', topics: ['BSL/SSL', 'Equal Highs/Lows', 'Turtle Soup entry'] },
      { name: 'Week 6: Premium/Discount & OTE', topics: ['Fibonacci tool', 'Premium/Discount zones', 'Optimal Trade Entry 62-79%'] },
      { name: 'Week 7: Silver Bullet Model', topics: ['Trading windows', '1-min sweep setup', 'Backtesting'] },
      { name: 'Week 8: Core Risk Management', topics: ['0.5-1% risk rule', 'R:R ratios', 'Position sizing'] },
    ]
  },
  {
    id: 3,
    title: 'Prop Firm Rules & Simulation',
    days: 'Days 61–90',
    weeks: '4 weeks',
    color: 'p3',
    unlocked: false,
    progress: 0,
    tag: 'Locked',
    description: 'Adapt your strategy to strict prop firm evaluation guidelines and simulate passing.',
    weeks_detail: [
      { name: 'Week 9: Prop Firm Metrics', topics: ['Drawdown limits', 'Profit targets', 'Consistency rules'] },
      { name: 'Week 10: Risk Simulator', topics: ['Soft drawdown limits', 'Scaling down', 'Apex trailing drawdown'] },
      { name: 'Week 11: Trading Plan', topics: ['Rule book creation', 'Asset selection', 'Pre-trade checklist'] },
      { name: 'Week 12: Mock Evaluation', topics: ['$50k/$100k demo', 'Strict prop rules', 'Daily trade logs'] },
    ]
  },
  {
    id: 4,
    title: 'Psychology & Live Audits',
    days: 'Days 91–120',
    weeks: '4 weeks',
    color: 'p4',
    unlocked: false,
    progress: 0,
    tag: 'Locked',
    description: 'Master your mind, execute with cold discipline, and submit live audits.',
    weeks_detail: [
      { name: 'Week 13: Psychological Bias', topics: ['The Gap', 'FOMO & greed', 'Pre-market routine'] },
      { name: 'Week 14: Drawdown Traps', topics: ['Losing streaks', 'Revenge trading', 'Resilience Journal'] },
      { name: 'Week 15: Visual Chart Audits', topics: ['Daily trade reviews', 'AI analysis', 'Precise SMC feedback'] },
      { name: 'Week 16: Prop Challenge Launch', topics: ['Performance metrics', 'Firm selection', 'Funded trader mindset'] },
    ]
  }
]

export default function Curriculum() {
  const [expanded, setExpanded] = useState<number>(1)

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">90–120 Day Curriculum</h1>
        <p className="page-subtitle">Structured path from beginner to prop-firm funded professional</p>
      </div>

      {/* Overall Progress */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📊 Overall Progress</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div className="progress-bar" style={{ height: '12px' }}>
              <div className="progress-fill green" style={{ width: '16%' }}></div>
            </div>
          </div>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>Day 24 / 120</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--accent-green)' }}>✅ Phase 1: 65% complete</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>⏳ Phase 2: Locked</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔒 Phase 3: Locked</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔒 Phase 4: Locked</span>
        </div>
      </div>

      {/* Phase Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {phases.map((phase) => (
          <div
            key={phase.id}
            className={`phase-card ${!phase.unlocked ? 'locked' : ''}`}
            onClick={() => phase.unlocked && setExpanded(expanded === phase.id ? -1 : phase.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={`phase-number ${phase.color}`}>Phase {phase.id} • {phase.weeks}</div>
                <div className="phase-title">{phase.title}</div>
                <div className="phase-dates">{phase.days}</div>
                <div className="phase-week">{phase.description}</div>
                {phase.unlocked && (
                  <>
                    <div className="progress-bar">
                      <div className={`progress-fill ${phase.color === 'p1' ? 'green' : phase.color === 'p2' ? 'blue' : phase.color === 'p3' ? 'gold' : 'blue'}`} style={{ width: `${phase.progress}%` }}></div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{phase.progress}% complete</div>
                  </>
                )}
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '20px',
                background: phase.unlocked ? 'rgba(0,200,83,0.1)' : 'var(--bg-hover)',
                color: phase.unlocked ? 'var(--accent-green)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}>
                {phase.tag}
              </span>
            </div>

            {/* Expanded week details */}
            {expanded === phase.id && phase.unlocked && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {phase.weeks_detail.map((week, i) => (
                  <div key={i} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>{week.name}</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {week.topics.map((topic, j) => (
                        <span key={j} style={{ fontSize: '12px', padding: '2px 10px', background: 'var(--bg-input)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!phase.unlocked && (
              <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                🔒 Complete Phase {phase.id - 1} to unlock
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}