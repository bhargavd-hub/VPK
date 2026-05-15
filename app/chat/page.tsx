'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { Message } from '@/lib/types'

const SUGGESTIONS = [
  'How to unblock a toilet',
  'How to plaster a wall',
  'How to paint a wall',
  'How to wallpaper',
  'How to remove wallpaper',
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const productContext = MOCK_PRODUCTS.map(p => `- ${p.name} (Category: ${p.category}, Price: £${p.price})\n  ${p.description}`).join('\n')
      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history, productContext }),
      })

      const data = await res.json()
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', content: data.reply || 'Sorry, I could not process your request.' }])
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input) }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 flex flex-col min-h-[calc(100vh-180px)]">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-brand-offBlack mb-4">AI Assistance</h1>
        <div className="text-neutral-dark max-w-2xl mx-auto space-y-3 text-sm">
          <p>Your go-to AI assistant for everything. Get guidance on selecting the right products and get answers to your project questions—all in one place. With Hello VPK, you&apos;ve got this!</p>
          <p>I&apos;ll provide advice based on the details you share, so be sure to include information relevant to your project.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto mb-8 space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-orange text-white' : 'bg-brand-offBlack text-white'}`}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${msg.role === 'user' ? 'bg-brand-orange text-white rounded-tr-none' : 'bg-white border border-neutral-light text-brand-offBlack rounded-tl-none shadow-sm'}`}>
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 flex-row">
                <div className="w-10 h-10 rounded-full bg-brand-offBlack text-white flex items-center justify-center flex-shrink-0">
                  <Bot size={18} />
                </div>
                <div className="bg-white border border-neutral-light rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-brand-orange" />
                  <span className="text-sm text-neutral-dark">VPK is typing...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}

        {/* Input */}
        <div className="mt-auto flex flex-col items-center w-full">
          <form onSubmit={handleSubmit} className="w-full relative mb-6">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full pl-6 pr-16 py-4 border border-neutral-light rounded-lg focus:outline-none focus:border-brand-orange text-base shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-light hover:text-brand-orange disabled:opacity-50 transition-colors"
            >
              <Send size={24} className="rotate-45" />
            </button>
          </form>

          {messages.length === 0 && (
            <>
              <p className="text-brand-offBlack mb-4 text-center text-sm">Not sure where to start? Ask me something like this...</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {SUGGESTIONS.map(q => (
                  <button key={q} onClick={() => sendMessage(q)} className="px-5 py-2.5 border border-brand-offBlack rounded-lg text-brand-offBlack hover:bg-neutral-lightest transition-colors bg-white text-sm">
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}

          <p className="text-xs text-neutral-dark text-center max-w-2xl">
            Please note that the information provided is for general guidance only and not a substitute for professional advice. Always follow safety guidelines. <a href="#" className="underline font-bold">Read Full Disclaimer</a>
          </p>
        </div>
      </div>
    </div>
  )
}
