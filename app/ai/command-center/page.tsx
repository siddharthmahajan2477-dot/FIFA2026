'use client'

import React, { useState, useEffect } from 'react'
import { Search, Send, Settings, Maximize2, AlertCircle } from 'lucide-react'
import { ChatBubble } from '@/components/ai/ChatBubble'
import { AIService } from '../../../services/ai.service'

export default function AICommandCenter() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant' as const,
      content: 'Welcome to the AI Command Center. I can help you monitor operations, analyze data, and optimize stadium performance. What would you like to know?',
      timestamp: '10:30 AM',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessage = {
      id: messages.length + 1,
      role: 'user' as const,
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newMessage])
    const promptText = input
    setInput('')

    try {
      const response = await AIService.generateText(promptText)
      const aiResponse = {
        id: messages.length + 2,
        role: 'assistant' as const,
        content: response || 'Command processed successfully. Connected to AI backend.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiResponse])
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-32 bg-card/50 rounded-xl" />
          <div className="h-64 bg-card/50 rounded-xl" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI Command Center</h1>
          <p className="text-lg text-muted-foreground">
            Real-time insights, recommendations, and automated actions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card h-[600px] flex flex-col shadow-lg">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="font-semibold text-foreground">AI Assistant</h2>
                <div className="flex gap-2">
                  <button disabled className="p-2 hover:bg-muted rounded-lg transition-colors cursor-not-allowed opacity-50">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <button disabled className="p-2 hover:bg-muted rounded-lg transition-colors cursor-not-allowed opacity-50">
                    <Maximize2 className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <ChatBubble key={message.id} {...message} />
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about stadium operations..."
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-4">Quick Status</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">System Health</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-900" style={{ width: '0%' }} />
                    </div>
                    <span className="text-sm font-semibold text-neutral-450">0%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">AI Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-900" style={{ width: '0%' }} />
                    </div>
                    <span className="text-sm font-semibold text-neutral-450">0%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Processing</p>
                  <p className="text-sm font-semibold text-foreground">Offline</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-3">Top Alerts</h3>
              <p className="text-xs text-muted-foreground">No active system alerts</p>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Live Insights</h2>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No active insights logged</p>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">AI Recommendations</h2>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No AI recommendations generated</p>
          </div>
        </div>

        {/* Automated Actions Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Automated Actions</h2>
          <div className="rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8 opacity-35" />
            <p className="font-bold">No automated actions scheduled</p>
          </div>
        </div>
      </div>
    </main>
  )
}
