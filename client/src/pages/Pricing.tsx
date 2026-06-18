export default function Pricing() {
  return (
    <div>
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title">Choose Your Trading Path</h1>
        <p className="page-subtitle">From absolute beginner to prop-firm funded professional</p>
      </div>

      <div className="tier-grid">
        {/* Free Tier */}
        <div className="tier-card">
          <div className="tier-name">Free</div>
          <div className="tier-price">$0 <span>/mo</span></div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Get started with basics
          </p>
          <ul className="tier-features">
            <li>✅ Basic Q&A with AI Coach</li>
            <li>✅ Broker recommendations</li>
            <li>✅ 5 intro lessons</li>
            <li>❌ Chart analysis</li>
            <li>❌ Trade auditing</li>
            <li>❌ Risk simulator</li>
          </ul>
          <button className="btn btn-secondary" style={{ width: '100%' }}>
            Get Started Free
          </button>
        </div>

        {/* Pro Coach */}
        <div className="tier-card featured">
          <div className="tier-name">Pro Coach</div>
          <div className="tier-price">$29 <span>/mo</span></div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Full training curriculum
          </p>
          <ul className="tier-features">
            <li>✅ Unlimited AI trading Q&A</li>
            <li>✅ Full 90–120 day curriculum</li>
            <li>✅ Basic trade analysis</li>
            <li>✅ Phase milestone exams</li>
            <li>❌ Real-time chart audits</li>
            <li>❌ Prop firm simulator</li>
          </ul>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Start Pro — $29/mo
          </button>
        </div>

        {/* Prop Master */}
        <div className="tier-card">
          <div className="tier-name">Prop Master</div>
          <div className="tier-price">$59 <span>/mo</span></div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Everything you need to get funded
          </p>
          <ul className="tier-features">
            <li>✅ Everything in Pro Coach</li>
            <li>✅ Real-time chart trade audits</li>
            <li>✅ ICT indicator setups</li>
            <li>✅ Prop firm risk simulator</li>
            <li>✅ Psychological guardrails</li>
            <li>✅ Weekly performance reviews</li>
          </ul>
          <button className="btn btn-primary" style={{ width: '100%', background: 'var(--accent-gold)', color: '#000' }}>
            Go Prop Master — $59/mo
          </button>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="card-title">📊 Full Feature Comparison</h2>
        </div>
        <table className="trade-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Free</th>
              <th>Pro Coach ($29)</th>
              <th>Prop Master ($59)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AI Trading Q&A', '✅ Basic', '✅ Unlimited', '✅ Unlimited'],
              ['90-Day Curriculum', '✅ 5 Lessons', '✅ Full Access', '✅ Full Access'],
              ['Trade Analysis', '❌', '✅ Basic', '✅ Advanced'],
              ['Chart Upload Analysis', '❌', '❌', '✅ Real-time'],
              ['ICT Indicator Setups', '❌', '❌', '✅ Custom'],
              ['Risk Simulator', '❌', '❌', '✅ Full'],
              ['Psychological Coaching', '❌', '✅ Weekly', '✅ Daily'],
              ['Prop Firm Strategy', '❌', '✅ Overview', '✅ Deep Dive'],
              ['Weekly Performance Reviews', '❌', '❌', '✅'],
              ['Priority Support', '❌', '❌', '✅ 24/7'],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    fontWeight: j === 0 ? 600 : 400,
                    color: cell.includes('❌') ? 'var(--text-muted)' : cell.includes('✅') ? 'var(--accent-green)' : 'var(--text-primary)',
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Guarantee */}
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛡️</div>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>7-Day Money-Back Guarantee</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          Not satisfied? Cancel within 7 days for a full refund. No questions asked.
          If you follow the full 120-day program and don't improve your trading, we'll extend your subscription free.
        </p>
      </div>

      {/* Affiliate Info */}
      <div className="card mt-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '28px' }}>🔗</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Affiliate & Partner Revenue</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              We earn commissions from recommended brokers (Tradovate, Pepperstone, OANDA) and TradingView referral links — helping us keep the platform affordable for you.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}