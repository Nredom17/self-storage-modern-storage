'use client'

// Floating bottom-right chat widget.
//
// Safety model: answers come ONLY from lib/chat-faqs.ts via answerFor().
// There is no generative model — the bot can only return an approved answer
// or the single fallback line, so it cannot invent pricing, policies, or
// promises. Edit the Q&A in lib/chat-faqs.ts.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CHAT_CONFIG, answerFor } from '@/lib/chat-faqs'

type Msg = { role: 'bot' | 'user'; text: string }
type View = 'prompt' | 'launcher' | 'chat'

export default function ChatWidget({
  phoneDisplay = '501-910-0096',
  phoneHref = 'tel:+15019100096',
}: {
  phoneDisplay?: string
  phoneHref?: string
}) {
  const [view, setView] = useState<View>('prompt')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: CHAT_CONFIG.greeting }])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll to the newest message.
  useEffect(() => {
    if (view === 'chat' && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, view])

  function ask(question: string) {
    const q = question.trim()
    if (!q) return
    setShowSuggestions(false)
    setMessages((m) => [...m, { role: 'user', text: q }])
    // Small delay so the reply feels conversational, not instant.
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: answerFor(q) }])
    }, 350)
    setInput('')
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    ask(input)
  }

  // ── Collapsed launcher (after the prompt is dismissed) ──
  if (view === 'launcher') {
    return (
      <button
        type="button"
        onClick={() => setView('chat')}
        aria-label="Open chat — can I help you?"
        className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 rounded-full bg-modern-red hover:bg-modern-red-hover text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center justify-center transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.4-3.6A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    )
  }

  // ── "Can I help you?" prompt bubble (matches the old popup) ──
  if (view === 'prompt') {
    return (
      <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50">
        <div className="relative flex items-center gap-3 bg-white rounded-full pl-5 pr-2 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.2)] border border-gray-100">
          <button
            type="button"
            onClick={() => setView('launcher')}
            aria-label="Dismiss chat prompt"
            className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-charcoal shadow-sm flex items-center justify-center"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500 leading-none mb-1.5">{CHAT_CONFIG.prompt}</span>
            <button
              type="button"
              onClick={() => setView('chat')}
              className="bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-4 py-2 rounded-full transition-colors"
            >
              Start Chat
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CHAT_CONFIG.avatar}
            alt=""
            aria-hidden="true"
            className="w-12 h-12 rounded-full object-cover border border-gray-100 shrink-0"
          />
        </div>
      </div>
    )
  }

  // ── Open chat panel ──
  return (
    <div
      role="dialog"
      aria-label="Chat with Modern Storage"
      className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden"
      style={{ height: 'min(32rem, 70vh)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-charcoal text-white px-4 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CHAT_CONFIG.avatar} alt="" aria-hidden="true" className="w-9 h-9 rounded-full object-cover border border-white/20" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black leading-tight truncate">{CHAT_CONFIG.agentName}</p>
          <p className="text-[11px] text-gray-400 leading-tight">Typically replies in a moment</p>
        </div>
        <button
          type="button"
          onClick={() => setView('launcher')}
          aria-label="Close chat"
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={
                m.role === 'user'
                  ? 'bg-modern-red text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%]'
                  : 'bg-white text-charcoal text-sm rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[85%] border border-gray-200'
              }
            >
              {m.text}
            </div>
          </div>
        ))}

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-1">
            {CHAT_CONFIG.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="text-xs font-semibold text-modern-red border border-modern-red/40 hover:bg-modern-red hover:text-white rounded-full px-3 py-1.5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Talk-to-team strip */}
      <div className="px-4 py-2 border-t border-gray-100 bg-white flex items-center justify-between gap-2 text-xs">
        <Link href="/contact" className="font-bold text-charcoal hover:text-modern-red transition-colors">
          Contact our team →
        </Link>
        <a href={phoneHref} className="font-bold text-modern-red hover:text-modern-red-hover transition-colors">
          {phoneDisplay}
        </a>
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          aria-label="Type your question"
          className="flex-1 text-sm rounded-full border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-modern-red"
        />
        <button
          type="submit"
          aria-label="Send"
          className="w-10 h-10 rounded-full bg-modern-red hover:bg-modern-red-hover text-white flex items-center justify-center transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  )
}
