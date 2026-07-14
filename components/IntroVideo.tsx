'use client'

import React, { useState, useEffect, useRef } from 'react'

export function IntroVideo() {
  const [showIntro, setShowIntro] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Only play intro once per session and only on the landing page (/)
    const hasPlayed = sessionStorage.getItem('stadium_os_intro_played')
    const isHomePage = window.location.pathname === '/'

    if (!hasPlayed && isHomePage) {
      setShowIntro(true)
      document.documentElement.classList.add('intro-active')
      
      // Auto-play safety fallback in case autoplay fails
      const playTimeout = setTimeout(() => {
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(err => {
            
          })
        }
      }, 100)

      return () => clearTimeout(playTimeout)
    } else {
      document.documentElement.classList.add('intro-complete')
    }
  }, [])

  const handleVideoEnded = () => {
    // 1. Hold the final frame for 250ms
    setTimeout(() => {
      // 2. Start the smooth crossfade transition (1000ms CSS transition duration)
      setFadeOut(true)
      
      // Trigger the page entrance animations at the start of the crossfade
      document.documentElement.classList.remove('intro-active')
      document.documentElement.classList.add('intro-complete')

      // 3. Fully remove from DOM after the fade animation completes (1000ms)
      setTimeout(() => {
        setShowIntro(false)
        sessionStorage.setItem('stadium_os_intro_played', 'true')
      }, 1000)
    }, 250)
  }

  if (!showIntro) return null

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen bg-black z-[99999] pointer-events-none select-none transition-opacity duration-1000 ease-in-out
        ${fadeOut ? 'opacity-0' : 'opacity-105'}
      `}
    >
      <video
        ref={videoRef}
        src="/Football2026.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
