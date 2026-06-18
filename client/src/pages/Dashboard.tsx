export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trader Dashboard</h1>
        <p className="page-subtitle">Your Prop Coach AI mission at a glance</p>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Program Progress</span>
            <span className="stat-card-icon">📈</span>
          </div>
          <div className="stat-card-value neutral">24 / 120</div>
          <div className="progress-bar">
            <div className="progress-fill green" style={{ width: '20%' }}></div>
          </div>
          <div className="stat-card-sub">Days completed — Phase 1 of 4</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Win Rate</span>
            <span className="stat-card-icon">🎯</span>
          </div>
          <div className="stat-card-value positive">73%</div>
          <div className="stat-card-sub">Last 30 trades • +$1,240 simulated</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Charts Analyzed</span>
            <span className="stat-card-icon">🖼️</span>
          </div>
          <div className="stat-card-value neutral">18</div>
          <div className="stat-card-sub">This week • 4 pending review</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Prop Readiness</span>
            <span className="stat-card-icon">🏆</span>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--accent-cyan)' }}>65%</div>
          <div className="progress-bar">
            <div className="progress-fill blue" style={{ width: '65%' }}></div>
          </div>
          <div className="stat-card-sub">Estimated score for Apex eval</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">⚡ Quick Actions</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => window.location.href = '/chat'}>
            🤖 Chat with Coach
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.href = '/trades'}>
            📝 Log a Trade
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.href = '/curriculum'}>
            📚 Continue Phase 1
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.href = '/setup'}>
            ⚙️ Setup TradingView
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📋 Recent Activity</h2>
          <button className="card-action" onClick={() => window.location.href = '/trades'}>View All</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[ 
            { type: 'chart', text: 'Uploaded EURUSD H1 chart for FVG analysis', time: '2h ago' },
            { type: 'chat', text: 'Completed MSS vs BOS lesson with AI Coach', time: '5h ago' },
            { type: 'trade', text: 'Logged EURUSD short — +2.3R winner ✅', time: '1d ago' },
            { type: 'progress', text: 'Week 3 Fair Value Gaps unlocked', time: '2d ago' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>
                  {item.type === 'chart' ? '🖼️' : item.type === 'chat' ? '💬' : item.type === 'trade' ? '💰' : '✅'}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.text}</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">🎯 Today's Focus</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '3px solid var(--accent-green)' }}>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Identify 3 Fair Value Gaps</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Week 3 • Day 3 of 5</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '3px solid var(--accent-blue)' }}>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Upload chart for AI grading</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Phase 1 milestone</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)' }}>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Review Order Block concepts</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Week 4 prep</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">🏆 Prop Firm Comparison</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '14px' }}>Apex Trader Funding</span>
              <span style={{ fontSize: '13px', color: 'var(--accent-green)', fontWeight: 600 }}>Recommended</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '14px' }}>FTMO</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Great for Forex</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '14px' }}>FundedNext</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Flexible rules</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ fontSize: '14px' }}>Earn2Trade</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Gauntlet Mini</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}