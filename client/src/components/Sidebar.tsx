import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', icon: '📊', label: 'Dashboard' },
  { path: '/chat', icon: '🤖', label: 'AI Coach Chat', badge: 'New' },
  { path: '/curriculum', icon: '📚', label: 'Curriculum' },
  { path: '/trades', icon: '📝', label: 'Trade Log' },
  { path: '/setup', icon: '⚙️', label: 'Setup Guide' },
  { path: '/pricing', icon: '⭐', label: 'Plans & Pricing' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">P</div>
        <div className="sidebar-logo-text">
          Prop<span>Coach</span> AI
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>CURRENT PLAN</div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-green)' }}>Prop Master 🏆</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
          Day 24 / 120
        </div>
        <div className="progress-bar" style={{ marginTop: '4px' }}>
          <div className="progress-fill green" style={{ width: '20%' }}></div>
        </div>
      </div>
    </aside>
  )
}