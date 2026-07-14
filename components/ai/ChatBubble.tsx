'use client'

import { User, Bot } from 'lucide-react'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

export function ChatBubble({ role, content, timestamp }: ChatBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
        </div>
      )}
      <div className={`max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground border border-border'
          }`}
        >
          <p className="text-sm">{content}</p>
        </div>
        {timestamp && (
          <p className="mt-1 text-xs text-muted-foreground">{timestamp}</p>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 order-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
            <User className="h-5 w-5 text-secondary-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}
