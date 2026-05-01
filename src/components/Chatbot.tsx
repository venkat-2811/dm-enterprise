import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

const TO_EMAIL = 'contact@dmenterprises.in'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

interface ChatStep {
  question: string
  field: string
  type: 'text' | 'options'
  options?: string[]
  placeholder?: string
}

const chatFlow: ChatStep[] = [
  {
    question: "👋 Welcome to DM Enterprises! I'm here to help you find the perfect workspace solution. What's your name?",
    field: 'name',
    type: 'text',
    placeholder: 'Enter your name...',
  },
  {
    question: "Nice to meet you, {name}! What type of furniture or service are you looking for?",
    field: 'service',
    type: 'options',
    options: [
      '🖥️ Workstations',
      '🪑 Office Seating',
      '📦 Storage Solutions',
      '🏢 Complete Interior',
      '🛋️ Home Furniture',
      '🔧 Custom Solution',
    ],
  },
  {
    question: "Great choice! What's the estimated budget range for your project?",
    field: 'budget',
    type: 'options',
    options: [
      '₹1L – ₹5L',
      '₹5L – ₹15L',
      '₹15L – ₹50L',
      '₹50L+',
      'Not sure yet',
    ],
  },
  {
    question: "When are you looking to start the project?",
    field: 'timeline',
    type: 'options',
    options: [
      'Immediately',
      'Within 1 month',
      'Within 3 months',
      'Just exploring',
    ],
  },
  {
    question: "Could you share your email address so we can send you a detailed proposal?",
    field: 'email',
    type: 'text',
    placeholder: 'your@email.com',
  },
  {
    question: "And your phone number? (optional — helps us reach you faster)",
    field: 'phone',
    type: 'text',
    placeholder: '+91 98765 43210',
  },
  {
    question: "Anything else you'd like to tell us about your project?",
    field: 'notes',
    type: 'text',
    placeholder: 'Any additional details...',
  },
]

async function sendChatTranscript(answers: Record<string, string>) {
  const rows = Object.entries(answers)
    .map(
      ([key, val]) =>
        `<tr><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;text-transform:capitalize">${key}</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1f2937">${val}</td></tr>`
    )
    .join('')

  const html = `
    <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#F97316,#f59e0b);padding:32px 24px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:24px">💬 New Chatbot Conversation</h1>
        <p style="color:rgba(255,255,255,.8);margin:8px 0 0;font-size:14px">DM Enterprises Website</p>
      </div>
      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
          ${rows}
        </table>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:20px">Submitted on ${new Date().toLocaleString('en-IN')}</p>
      </div>
    </div>
  `

  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DM Chatbot <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: `Chatbot Lead: ${answers.name || 'Unknown'} — ${answers.service || 'General'}`,
      html,
    }),
  })

  if (!res.ok) throw new Error('Failed to send')
  return res.json()
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Show initial message when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
        setMessages([
          {
            id: Date.now(),
            text: chatFlow[0].question,
            sender: 'bot',
            timestamp: new Date(),
          },
        ])
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isOpen, messages.length])

  // Pulse animation for attention
  useEffect(() => {
    const timer = setTimeout(() => setHasNewMessage(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const processAnswer = (answer: string) => {
    const step = chatFlow[currentStep]
    const newAnswers = { ...answers, [step.field]: answer }
    setAnswers(newAnswers)

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: answer, sender: 'user', timestamp: new Date() },
    ])

    const nextStep = currentStep + 1

    if (nextStep < chatFlow.length) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        let q = chatFlow[nextStep].question
        // Replace template variables
        Object.entries(newAnswers).forEach(([key, val]) => {
          q = q.replace(`{${key}}`, val)
        })
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: q, sender: 'bot', timestamp: new Date() },
        ])
        setCurrentStep(nextStep)
      }, 1000)
    } else {
      // Conversation complete
      setIsTyping(true)
      setTimeout(async () => {
        setIsTyping(false)
        try {
          await sendChatTranscript(newAnswers)
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: `Thank you, ${newAnswers.name || ''}! 🎉 We've received your details and our team will get in touch with you soon. Have a great day!`,
              sender: 'bot',
              timestamp: new Date(),
            },
          ])
        } catch {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: `Thank you for your interest! We couldn't save your details automatically, but our team can be reached at contact@dmenterprises.in or +91 98765 43210.`,
              sender: 'bot',
              timestamp: new Date(),
            },
          ])
        }
        setIsComplete(true)
      }, 1200)
    }

    setInput('')
  }

  const handleSend = () => {
    if (!input.trim() || isComplete) return
    processAnswer(input.trim())
  }

  const handleReset = () => {
    setMessages([])
    setCurrentStep(0)
    setAnswers({})
    setIsComplete(false)
    setInput('')
  }

  const currentChatStep = currentStep < chatFlow.length ? chatFlow[currentStep] : null

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          setHasNewMessage(false)
        }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-[0_8px_30px_rgba(30,58,138,0.4)] flex items-center justify-center bg-primary text-white hover:bg-primary-light transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {hasNewMessage && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
          >
            <span className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75" />
            <span className="relative text-white text-[10px] font-bold">1</span>
          </motion.span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-4 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">DM Assistant</h3>
                <p className="text-white/70 text-xs">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      msg.sender === 'bot'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <Bot className="w-3.5 h-3.5" />
                    ) : (
                      <User className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'bot'
                        ? 'bg-grey text-text-dark rounded-tl-md'
                        : 'bg-primary text-white rounded-tr-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-grey rounded-2xl rounded-tl-md px-5 py-4">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 bg-text-muted/40 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Option Buttons */}
            {currentChatStep?.type === 'options' && !isTyping && !isComplete && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                {currentChatStep.options?.map((opt) => (
                  <motion.button
                    key={opt}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => processAnswer(opt)}
                    className="px-3.5 py-2 bg-primary/8 text-primary text-xs font-medium rounded-full hover:bg-primary/15 transition-colors"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 shrink-0">
              {isComplete ? (
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-primary/8 text-primary text-sm font-semibold rounded-xl hover:bg-primary/15 transition-colors"
                >
                  Start New Conversation
                </button>
              ) : currentChatStep?.type === 'text' || !currentChatStep ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={currentChatStep?.placeholder || 'Type your message...'}
                    disabled={isTyping}
                    className="flex-1 px-4 py-3 bg-grey rounded-xl text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 transition-all"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
