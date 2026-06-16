export default function SetupGuide() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Setup Guide</h1>
        <p className="page-subtitle">Get your TradingView, broker, and prop firm accounts ready for the PropCoach program</p>
      </div>

      {/* Step-by-step Setup */}
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
              <button className="btn btn-secondary btn-sm mt-4">View Details</button>
            </div>
          ))}
        </div>
      </div>

      <div className="setup-section">
        <h3>🏆 Step 3: Prop Firm Selection</h3>
        <div className="setup-steps">
          {[
            { num: 1, title: 'Apex Trader Funding', desc: 'Best for Futures traders. Trailing drawdown model. $50k-$300k accounts. 80% profit split after passing.' },
            { num: 2, title: 'FTMO', desc: 'Best for Forex traders. Static drawdown (easier to manage). $10k-$200k accounts. 80% profit split.' },
            { num: 3, title: 'FundedNext', desc: 'Flexible evaluation rules. Scaling plan available. $5k-$200k accounts. Up to 90% profit split.' },
            { num: 4, title: 'Choose Your Challenge', desc: 'We recommend starting with a $50k Apex account (Futures) or a $50k FTMO account (Forex) after completing the 120-day program.' },
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

      {/* Quick Checklist */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">✅ Getting Started Checklist</h2>
        </div>
        {[
          'Create TradingView account',
          'Set up clean 1H chart layout',
          'Open demo account (Tradovate or Pepperstone)',
          'Practice drawing BOS/MSS/FVG on live charts',
          'Upload your first chart to PropCoach AI for grading',
          'Set up your 90-day curriculum tracker',
          'Join the PropCoach trading community',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 6 ? '1px solid var(--border-color)' : 'none' }}>
            <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)' }} />
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}