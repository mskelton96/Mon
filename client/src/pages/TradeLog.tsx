import { useState } from 'react'

interface Trade {
  id: string
  pair: string
  direction: 'Long' | 'Short'
  entry: number
  exit: number
  size: string
  result: 'win' | 'loss' | 'pending'
  pnl: string
  rrr: string
  date: string
  tags: string[]
  notes: string
  chartUrl?: string
}

const initialTrades: Trade[] = [
  { id: '1', pair: 'EURUSD', direction: 'Short', entry: 1.0875, exit: 1.0820, size: '0.5 lot', result: 'win', pnl: '+$275', rrr: '1:2.2', date: '2026-06-15', tags: ['MSS', 'FVG'], notes: 'Clean break of structure on 1H', chartUrl: '' },
  { id: '2', pair: 'GBPUSD', direction: 'Long', entry: 1.2680, exit: 1.2710, size: '0.3 lot', result: 'win', pnl: '+$90', rrr: '1:1.5', date: '2026-06-14', tags: ['OB', 'Liquidity Sweep'], notes: 'Order block held perfectly', chartUrl: '' },
  { id: '3', pair: 'ES Futures', direction: 'Short', entry: 5560, exit: 5572, size: '2 micro', result: 'loss', pnl: '-$60', rrr: '1:1', date: '2026-06-13', tags: ['FVG'], notes: 'FVG not fully mitigated, premature entry', chartUrl: '' },
  { id: '4', pair: 'USDJPY', direction: 'Long', entry: 149.20, exit: 0, size: '0.2 lot', result: 'pending', pnl: 'Open', rrr: '1:3', date: '2026-06-16', tags: ['Silver Bullet', 'OTE'], notes: 'Awaiting take profit', chartUrl: '' },
]

const concepts = ['MSS', 'BOS', 'FVG', 'iFVG', 'OB', 'OTE', 'Liquidity Sweep', 'Silver Bullet', 'Premium', 'Discount']

export default function TradeLog() {
  const [trades, setTrades] = useState<Trade[]>(initialTrades)
  const [showForm, setShowForm] = useState(false)
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredTrades = filter === 'all' ? trades : trades.filter(t => t.result === filter)

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Trade Log</h1>
          <p className="page-subtitle">Track every trade, upload charts, and get AI-powered analysis</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Close' : '+ New Trade'}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Trades</span>
            <span className="stat-card-icon">📊</span>
          </div>
          <div className="stat-card-value">{trades.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Win Rate</span>
            <span className="stat-card-icon">🎯</span>
          </div>
          <div className="stat-card-value positive">67%</div>
          <div className="stat-card-sub">{trades.filter(t => t.result === 'win').length}/{trades.filter(t => t.result !== 'pending').length} trades</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Total P&L</span>
            <span className="stat-card-icon">💰</span>
          </div>
          <div className="stat-card-value positive">+$305</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Avg R:R</span>
            <span className="stat-card-icon">📐</span>
          </div>
          <div className="stat-card-value neutral">1:2.0</div>
        </div>
      </div>

      {/* New Trade Form */}
      {showForm && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">📝 Log New Trade</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Pair / Symbol</label>
              <input placeholder="e.g. EURUSD, ES, NQ" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Direction</label>
              <select>
                <option>Long</option>
                <option>Short</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Entry Price</label>
              <input type="number" step="0.0001" placeholder="1.0875" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Exit Price</label>
              <input type="number" step="0.0001" placeholder="1.0820" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Position Size</label>
              <input placeholder="e.g. 0.5 lot, 2 micro" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Concepts Used</label>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {concepts.slice(0, 5).map(c => (
                  <label key={c} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <input type="checkbox" /> {c}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Upload */}
          <div className="upload-zone mt-4" onClick={() => alert('📸 Chart upload would open file picker here')}>
            <div className="upload-icon">🖼️</div>
            <div className="upload-text">Upload chart screenshot for AI analysis</div>
            <div className="upload-hint">PNG, JPG or WebP • SMC/ICT feedback generated automatically</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => alert('✅ Trade logged! AI analysis queued.')}>Save Trade & Analyze</button>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['all', 'win', 'loss', 'pending'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              background: filter === f ? 'rgba(0,200,83,0.1)' : 'transparent',
              color: filter === f ? 'var(--accent-green)' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: filter === f ? 600 : 400,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {f} ({f === 'all' ? trades.length : trades.filter(t => t.result === f).length})
          </button>
        ))}
      </div>

      {/* Trade Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="trade-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Pair</th>
              <th>Direction</th>
              <th>Entry → Exit</th>
              <th>Size</th>
              <th>P&L</th>
              <th>R:R</th>
              <th>Concepts</th>
              <th>Result</th>
              <th>Chart</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map(trade => (
              <tr key={trade.id} onClick={() => setSelectedTrade(trade)} style={{ cursor: 'pointer' }}>
                <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{trade.date}</td>
                <td style={{ fontWeight: 600 }}>{trade.pair}</td>
                <td>
                  <span style={{ color: trade.direction === 'Long' ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>
                    {trade.direction === 'Long' ? '▲' : '▼'} {trade.direction}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{trade.entry} → {trade.exit || '—'}</td>
                <td style={{ fontSize: '13px' }}>{trade.size}</td>
                <td style={{ fontWeight: 600, color: trade.pnl.startsWith('+') ? 'var(--accent-green)' : trade.pnl.startsWith('-') ? 'var(--accent-red)' : 'var(--text-muted)' }}>
                  {trade.pnl}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{trade.rrr}</td>
                <td>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {trade.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '11px', padding: '2px 8px', background: 'var(--bg-input)', borderRadius: '10px', color: 'var(--accent-cyan)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`trade-tag ${trade.result}`}>
                    {trade.result === 'win' ? '✅ Win' : trade.result === 'loss' ? '❌ Loss' : '⏳ Open'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => { e.stopPropagation(); alert('📸 Chart upload for AI analysis') }}
                    title="Upload chart for analysis"
                  >
                    🖼️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected trade detail */}
      {selectedTrade && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">📋 Trade Details — {selectedTrade.pair}</h2>
            <button className="card-action" onClick={() => setSelectedTrade(null)}>✕ Close</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>NOTES</div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{selectedTrade.notes || 'No notes added.'}</p>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>AI COACH FEEDBACK</div>
              <p style={{ fontSize: '14px', color: 'var(--accent-green)' }}>
                {selectedTrade.result === 'win'
                  ? '✅ Strong setup. Clean MSS confirmation and FVG alignment. Keep executing like this.'
                  : selectedTrade.result === 'loss'
                  ? '⚠️ Entry was premature — wait for candle close confirmation below the FVG. Review your patience.'
                  : '⏳ Monitor for TP hit. Consider moving SL to breakeven if price retraces 50%.'}
              </p>
            </div>
          </div>
          <div className="upload-zone mt-4" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🖼️</span>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Attach chart screenshot for visual audit</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Get AI-powered SMC/ICT feedback on your entry, FVGs, and structure</div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}