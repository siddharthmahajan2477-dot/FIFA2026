'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Bell, 
  Globe, 
  SunMoon, 
  User, 
  Menu, 
  X,
  Trophy,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react'

export function FloatingNavBar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Dropdown States
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser')
      setCurrentUser(null)
      setIsProfileOpen(false)
      window.location.href = '/auth'
    }
  }
  
  // Search Input State
  const [searchQuery, setSearchQuery] = useState('')

  const profileRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'modules', label: 'Modules' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'ai', label: 'AI Platform' },
    { id: 'operations', label: 'Operations' },
    { id: 'features', label: 'Features' },
  ]

  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    import('../services/notification.service').then(({ NotificationService }) => {
      NotificationService.getNotifications().then(data => {
        setNotifications(data)
      }).catch(console.error)
    })
  }, [])

  const searchCategories = [
    'Players', 'Teams', 'Matches', 'Tickets', 
    'Modules', 'Food', 'Merchandise', 'Facilities'
  ]

  // Handle closing dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Passive scroll listener for background styling threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // High-performance IntersectionObserver for scroll-tracking active state highlights
  useEffect(() => {
    const sections = [
      { id: 'modules', text: 'explore all modules' },
      { id: 'infrastructure', text: 'infrastructure management' },
      { id: 'ai', text: 'ai intelligence' },
      { id: 'operations', text: 'operations portal' },
      { id: 'features', text: 'platform features' }
    ]

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -75% 0px', // custom bounds for standard header transitions
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-nav-id')
          if (id) {
            setActiveSection(id)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const headers = Array.from(document.querySelectorAll('h2, section, h1'))
    
    sections.forEach(sec => {
      const target = headers.find(h => h.textContent?.toLowerCase().includes(sec.text))
      if (target) {
        target.setAttribute('data-nav-id', sec.id)
        observer.observe(target)
      }
    })

    // Observe root header title for home trigger
    const heroHeader = document.querySelector('h1')
    if (heroHeader) {
      heroHeader.setAttribute('data-nav-id', 'home')
      observer.observe(heroHeader)
    }

    return () => observer.disconnect()
  }, [])

  // Smooth scroll logic by finding elements containing text
  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false)
    
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    let targetElement: HTMLElement | null = null
    const headers = Array.from(document.querySelectorAll('h2, section'))
    
    for (const header of headers) {
      const text = header.textContent?.toLowerCase() || ''
      if (
        (id === 'modules' && text.includes('explore all modules')) ||
        (id === 'infrastructure' && text.includes('infrastructure management')) ||
        (id === 'ai' && text.includes('ai intelligence')) ||
        (id === 'operations' && text.includes('operations portal')) ||
        (id === 'features' && text.includes('platform features'))
      ) {
        targetElement = header as HTMLElement
        break
      }
    }

    if (targetElement) {
      const yOffset = -90 // Navbar offset
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })))
  }

  const getUnreadCount = () => {
    return notifications.filter(n => n.unread).length
  }

  return (
    <>
      {/* Outer Floating Capsule Navbar - Centered with absolute alignment */}
      <nav 
        className={`fixed top-4 left-0 right-0 mx-auto h-[56px] w-[95%] sm:w-[90%] md:w-[85%] max-w-[1200px] rounded-full px-5 flex items-center justify-between gap-4 z-50 transition-all duration-300 border
          ${isScrolled 
            ? 'bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-[24px] border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]' 
            : 'bg-slate-950/65 dark:bg-slate-950/70 backdrop-blur-[16px] border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]'
          }
        `}
      >
        {/* Left Section: Branding */}
        <Link 
          href="/" 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-1.5 cursor-pointer group hover:scale-105 transition-transform duration-200 select-none flex-shrink-0"
        >
          <div className="flex items-center justify-center h-7.5 w-7.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
            <Trophy className="h-4 w-4 animate-pulse-gentle" />
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-white tracking-wide leading-tight">FIFA World Cup 2026</span>
            <span className="text-[8px] text-slate-400 font-semibold tracking-wider uppercase -mt-0.5">Smart Stadium OS</span>
          </div>
        </Link>

        {/* Center Section: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-0.5 flex-grow justify-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] lg:text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-[1px]
                  ${isActive 
                    ? 'bg-white/10 text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-sm' 
                    : 'text-slate-400 font-normal hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Right Section: Action Buttons + Menus */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Search Button */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="h-7.5 w-7.5 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200 hover:-translate-y-[1px]" 
            title="Search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
          
          {/* Notification Center */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`h-7.5 w-7.5 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200 hover:-translate-y-[1px] relative
                ${isNotificationsOpen ? 'bg-white/5 text-white border-white/10' : ''}
              `} 
              title="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
              {getUnreadCount() > 0 && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>

            {/* Notification Glass Panel */}
            <div 
              className={`absolute top-[50px] right-0 w-[320px] rounded-xl border border-white/15 bg-slate-950/90 backdrop-blur-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.6)] p-3 z-50 flex flex-col gap-2 transition-all duration-200 origin-top-right
                ${isNotificationsOpen ? 'scale-100 opacity-100 pointer-events-auto blur-none' : 'scale-95 opacity-0 pointer-events-none blur-sm'}
              `}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  {getUnreadCount() > 0 && (
                    <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {getUnreadCount()} new
                    </span>
                  )}
                </div>
                <button onClick={markAllAsRead} className="text-[10px] text-primary hover:underline font-medium">
                  Mark all as read
                </button>
              </div>

              {/* Scrollable list */}
              <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/10">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-2 rounded-lg text-[11px] leading-normal transition-colors border
                      ${notif.unread 
                        ? 'bg-white/5 border-white/10 text-white' 
                        : 'bg-transparent border-transparent text-slate-400'
                      }
                    `}
                  >
                    <p>{notif.text}</p>
                    <span className="text-[9px] text-slate-500 mt-1 block font-medium">{notif.time}</span>
                  </div>
                ))}
              </div>

              <button className="w-full text-center py-2 text-[10px] font-bold text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
          
          {/* Globe & Theme Switchers */}
          <button className="hidden sm:flex h-7.5 w-7.5 rounded-full items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200 hover:-translate-y-[1px]" title="Language">
            <Globe className="h-3.5 w-3.5" />
          </button>
          <button className="hidden sm:flex h-7.5 w-7.5 rounded-full items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200 hover:-translate-y-[1px]" title="Theme">
            <SunMoon className="h-3.5 w-3.5" />
          </button>
          
          {/* User Profile Avatar / Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`h-7.5 w-7.5 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200 hover:-translate-y-[1px] overflow-hidden
                ${isProfileOpen ? 'border-primary/50 ring-1 ring-primary/30' : ''}
              `} 
              title="Profile"
            >
              {currentUser ? (
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                  {currentUser.avatarInitials || 'JD'}
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </button>

            {/* Profile Glass Menu */}
            <div 
              className={`absolute top-[50px] right-0 w-[200px] rounded-xl border border-white/15 bg-slate-950/90 backdrop-blur-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.6)] p-1.5 z-50 flex flex-col gap-0.5 transition-all duration-200 origin-top-right
                ${isProfileOpen ? 'scale-100 opacity-100 pointer-events-auto blur-none' : 'scale-95 opacity-0 pointer-events-none blur-sm'}
              `}
            >
              {currentUser ? (
                <>
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-[11px] font-bold text-white leading-tight">{currentUser.name}</p>
                    <p className="text-[9px] text-slate-500 truncate">{currentUser.email}</p>
                  </div>

                  {[
                    { label: 'My Profile', href: '/fan-profile' },
                    { label: 'Dashboard', href: currentUser.role === 'Fan' ? '/fan-dashboard' : currentUser.role === 'Volunteer' ? '/operations/volunteer' : currentUser.role === 'Security Manager' ? '/operations/security' : currentUser.role === 'Medical Officer' ? '/operations/medical' : currentUser.role === 'Operations Manager' ? '/operations/crowd-management' : currentUser.role === 'Infrastructure Manager' ? '/infrastructure' : '/operations/executive' },
                    { label: 'Tickets', href: '/tickets' },
                    { label: 'Orders', href: '/food-beverage' },
                    { label: 'Favorites', href: '/merchandise' }
                  ].map((item, idx) => (
                    <Link 
                      key={idx}
                      href={item.href}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150 flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}

                  <hr className="border-white/10 my-1" />

                  <button className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150 flex items-center gap-2">
                    <Settings className="h-3.5 w-3.5" />
                    Settings
                  </button>
                  <button className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150 flex items-center gap-2">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Help & Support
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150 flex items-center gap-2 mt-1"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-[11px] font-bold text-white leading-tight">Guest Mode</p>
                    <p className="text-[9px] text-slate-500 truncate">Limited access</p>
                  </div>
                  
                  <Link
                    href="/auth"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-center px-3 py-2 rounded-lg text-[11px] bg-primary text-primary-foreground hover:bg-primary/80 font-bold transition-all duration-150 block mb-1"
                  >
                    Sign In / Log In
                  </Link>

                  <hr className="border-white/10 my-1" />

                  <button className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150 flex items-center gap-2">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Help & Support
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger menu */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-7.5 w-7.5 rounded-full flex md:hidden items-center justify-center bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div 
          className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] rounded-2xl p-4 bg-slate-950/90 backdrop-blur-[24px] border border-white/15 shadow-[0_16px_48px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] z-50 flex flex-col gap-2 animate-fadeIn"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-xs transition-all duration-200
                  ${isActive 
                    ? 'bg-white/10 text-white font-medium border-l-2 border-primary' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </button>
            )
          })}
          
          <hr className="border-white/10 my-2" />
          
          {/* Quick Actions (Mobile) */}
          <div className="flex items-center justify-around py-1">
            <button onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }} className="h-7.5 w-7.5 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white"><Search className="h-3.5 w-3.5" /></button>
            <button onClick={() => { setIsMobileMenuOpen(false); setIsNotificationsOpen(true); }} className="h-7.5 w-7.5 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white relative">
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <button className="h-7.5 w-7.5 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white"><Globe className="h-3.5 w-3.5" /></button>
            <button className="h-7.5 w-7.5 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white"><SunMoon className="h-3.5 w-3.5" /></button>
            <button onClick={() => { setIsMobileMenuOpen(false); setIsProfileOpen(true); }} className="h-7.5 w-7.5 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white"><User className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      )}

      {/* Floating Search Overlay (Modal) */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-md z-[999999] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="w-full max-w-[550px] rounded-2xl border border-white/15 bg-slate-950/90 backdrop-blur-[24px] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-slate-300">
                <Search className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-white">Global Search</span>
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="h-7 w-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Input Field */}
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search players, matches, tickets, concessions, facilities..."
                className="w-full h-11 bg-white/5 rounded-xl border border-white/10 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Search Suggestions categories */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Search Scope Categories</span>
              <div className="flex flex-wrap gap-1.5">
                {searchCategories.map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSearchQuery(cat)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors"
                  >
                    #{cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results placeholder */}
            <div className="border-t border-white/10 pt-3">
              {searchQuery ? (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Results for &quot;{searchQuery}&quot;</span>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-slate-400 italic">
                    Searching database...
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Type query to search FIFA operating records.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
