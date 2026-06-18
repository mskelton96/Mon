import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import CoachChat from './pages/CoachChat'
import Curriculum from './pages/Curriculum'
import TradeLog from './pages/TradeLog'
import SetupGuide from './pages/SetupGuide'
import Pricing from './pages/Pricing'

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<CoachChat />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/trades" element={<TradeLog />} />
          <Route path="/setup" element={<SetupGuide />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}