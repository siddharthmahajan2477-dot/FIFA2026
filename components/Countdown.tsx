'use client'

import React, { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: Date
  onComplete?: () => void
}

export function Countdown({ targetDate, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const distance = target - now

      if (distance < 0) {
        onComplete?.()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  return (
    <div className="flex gap-2 text-center">
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-xs text-muted-foreground">Days</span>
      </div>
      <div className="text-2xl font-bold text-muted-foreground">:</div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-xs text-muted-foreground">Hours</span>
      </div>
      <div className="text-2xl font-bold text-muted-foreground">:</div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-xs text-muted-foreground">Mins</span>
      </div>
      <div className="text-2xl font-bold text-muted-foreground">:</div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-xs text-muted-foreground">Secs</span>
      </div>
    </div>
  )
}
