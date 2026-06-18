import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: "👋 Welcome to PropCoach AI! I'm your personal trading mentor. I can help you with:\n\n• **Market Structure (SMC/ICT)** — Identify BOS, MSS, FVG, Order Blocks\n• **Trade Review** — Upload charts for AI visual analysis\n• **Prop Firm Strategy** — Apex, FTMO, FundedNext rules\n• **Psychology Coaching** — Overcome FOMO, revenge trading\n\nWhat would you like to work on today?"
  }
]

const demoResponses: Record<string, string> = {
  'fvg': "**Fair Value Gap Analysis** 📊\n\nA Fair Value Gap (FVG) forms when a 3-candle sequence leaves an imbalance. Here's how to identify one:\n\n1. **Candle 1** — Initial move (wicks create the gap boundaries)\n2. **Candle 2** — Large impulsive candle (breakout)\n3. **Candle 3** — Continuation with range overlapping\n\n**The Gap** = Area between Candle 1's high and Candle 3's low (bullish) or Candle 1's low and Candle 3's high (bearish).\n\n📌 *Pro Tip: FVGs act as price magnets. Markets return to fill them ~70% of the time.*\n\nWant me to analyze a specific chart for FVGs? Upload one in the Trade Log tab!",
  'bos': "**Break of Structure (BOS) vs Market Structure Shift (MSS)** 🔄\n\n**BOS** = Trend continuation. Price breaks the previous swing high/low in the same direction.\n• Candle must **close** past the swing point\n\n**MSS** = Trend reversal. Price breaks the *most recent* higher low (in uptrend) or lower high (in downtrend).\n• First sign of directional change\n\n```\nUptrend: HH → HL → HH → HL → [MSS if HL broken]\n```\n\nTry drawing these on a 1H chart and share a screenshot!",
  'risk': "**Risk Management Fundamentals** 🛡️\n\nProfessional traders follow these rules:\n\n• **Max Risk per Trade:** 0.5% – 1.0% of account\n• **Minimum R:R:** 1:2 (target double your risk)\n• **Daily Loss Limit:** Stop after 2 consecutive losses\n\n**Example:** $50k account = risk $250–$500 per trade.\n\nWant me to calculate position sizes for a specific account balance?",
  'psychology': "**Trading Psychology: The Gap** 🧠\n\nThe 'Gap' is the space between what your plan says and what you actually do.\n\n**Common gaps:**\n• Taking a trade outside your setup criteria (FOMO)\n• Moving your stop loss (hope trading)\n• Overtrading after a loss (revenge trading)\n\n**Solution:** Pre-trade checklist + trade journal. Every trade must check 3 boxes before entry.\n\nTell me which psychological challenge you're facing!",
}

function getDemoResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('fvg') || lower.includes('fair value') || lower.includes('gap')) return demoResponses['fvg']
  if (lower.includes('bos') || lower.includes('structure') || lower.includes('mss') || lower.includes('shift')) return demoResponses['bos']
  if (lower.includes('risk') || lower.includes('position size') || lower.includes('rr') || lower.includes('money')) return demoResponses['risk']
  if (lower.includes('psychology') || lower.includes('fomo') || lower.includes('emotion') || lower.includes('revenge') || lower.includes('fear')) return demoResponses['psychology']
  
  return "**Great question!** 🤔\n\nHere's my SMC/ICT trading insight: Market structure is the foundation of all institutional trading. Focus on identifying the **current trend** first (swing highs/lows), then look for **confluence** — FVGs + Order Blocks + Liquidity sweeps all aligning.\n\n📌 **Daily Practice:** Open a clean 1H chart and label: trend direction → key levels → visible FVGs → potential Order Blocks.\n\nWhat specific aspect would you like me to dive deeper into?"
}

export default function CoachChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getDemoResponse(input)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <h1 className="page-title">AI Trading Coach</h1>
        <p className="page-subtitle">Your personal SMC/ICT mentor — ask anything about trading, markets, or psychology</p>
      </div>

      <div className="chat-container" style={{ flex: 1 }}>
        <div className="chat-header">
          <div className="chat-header-avatar">PC</div>
          <div className="chat-header-info">
            <div className="chat-header-name">PropCoach AI</div>
            <div className="chat-header-status">● Online • SMC/ICT Specialist</div>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '4px 10px', borderRadius: '6px' }}>
            Prop Master 🏆
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              <div className="chat-message-avatar">
                {msg.role === 'assistant' ? 'PC' : '👤'}
              </div>
              <div className="chat-message-bubble" style={{ whiteSpace: 'pre-wrap' }}>
                {msg.content.split('\n').map((line, j) => (
                  <span key={j}>
                    {line.startsWith('**') && line.endsWith('**') ? (
                      <strong>{line.slice(2, -2)}</strong>
                    ) : line.startsWith('**') ? (
                      <>
                        <strong>{line.slice(2)}</strong>
                        <br />
                      </>
                    ) : (
                      <>
                        {line}
                        {j < msg.content.split('\n').length - 1 && <br />}
                      </>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message assistant">
              <div className="chat-message-avatar">PC</div>
              <div className="chat-message-bubble" style={{ color: 'var(--text-muted)' }}>
                Analyzing market data...
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <div className="chat-input-row">
            <textarea
              className="chat-input"
              placeholder="Ask about SMC/ICT, risk management, psychology, or upload a chart..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <button className="chat-send-btn" onClick={handleSend} disabled={isTyping || !input.trim()}>
              ➤
            </button>
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
            {['FVG Analysis', 'BOS vs MSS', 'Risk Calc', 'Psychology'].map((chip) => (
              <button
                key={chip}
                onClick={() => setInput(chip)}
                style={{
                  padding: '4px 12px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}