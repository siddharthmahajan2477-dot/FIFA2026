'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Trophy,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  Loader2,
  ShieldAlert,
  Info,
  ChevronRight,
} from 'lucide-react'
import { useAuthContext } from '@/context/AuthProvider'
import { auth } from '@/lib/firebase'
import { AuthService } from '../../services/auth.service'

// --- Official Logos SVGs ---
const GoogleLogo = ({ className = "w-5 h-5 mr-3 flex-shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.51l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
  </svg>
)

const MicrosoftLogo = () => (
  <svg viewBox="0 0 23 23" className="w-5 h-5 flex-shrink-0" fill="none">
    <path fill="#f25022" d="M1 1h10v10H1z"/>
    <path fill="#7fba00" d="M12 1h10v10H12z"/>
    <path fill="#00a4ef" d="M1 12h10v10H1z"/>
    <path fill="#ffb900" d="M12 12h10v10H12z"/>
  </svg>
)

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const DiscordLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#5865F2">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.172-.386-.412-.875-.623-1.25a.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.078.078 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
  </svg>
)

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const YahooLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#6001d2">
    <path d="M12.923 13.918l4.47-8.918h3.346l-6.289 11.233v6.767h-3.008v-6.758L5.167 5h3.359l4.397 8.918zM2.617 2.222C1.724 1.333 1.724 0 2.617 0c.892 0 .892 1.333 0 2.222z"/>
  </svg>
)

type AuthScreen =
  | 'landing'
  | 'fan-login'
  | 'fan-signup'
  | 'forgot-password'
  | 'forgot-username'
  | 'verification'
  | 'staff-login'
  | 'reset-success'
  | 'verify-email'

export default function AuthPage() {
  const {
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    sendPasswordReset,
    resendVerificationEmail,
    checkEmailVerification
  } = useAuthContext()
  const router = useRouter()
  const [screen, setScreen] = useState<AuthScreen>('landing')
  const [loading, setLoading] = useState(false)
  const [capsLock, setCapsLock] = useState(false)

  // Google OAuth Modal state
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Form Fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Sign Up Fields
  const [signUpName, setSignUpName] = useState('')
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')
  const [signUpCountry, setSignUpCountry] = useState('')
  const [signUpFavTeam, setSignUpFavTeam] = useState('')
  const [signUpFavClub, setSignUpFavClub] = useState('')
  const [signUpLanguage, setSignUpLanguage] = useState('en')
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Staff Fields
  const [companyId, setCompanyId] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [staffRole, setStaffRole] = useState('Volunteer')
  const [otpCode, setOtpCode] = useState('')
  const [otpTimer, setOtpTimer] = useState(0)

  // Recovery / Verification Fields
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [recoveryPhone, setRecoveryPhone] = useState('')
  const [recoveredUsernames, setRecoveredUsernames] = useState<string[]>([])
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone' | 'google'>('email')

  // UI status feedbacks
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [otpTimer])

  // Caps lock listener helper
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLock(true)
    } else {
      setCapsLock(false)
    }
  }

  // Password Strength Estimator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-neutral-850' }
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[a-z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++

    const config = [
      { score: 0, label: 'Very Weak', color: 'bg-neutral-600 w-1/5' },
      { score: 1, label: 'Weak', color: 'bg-neutral-500 w-2/5' },
      { score: 2, label: 'Fair', color: 'bg-neutral-400 w-3/5' },
      { score: 3, label: 'Good', color: 'bg-neutral-300 w-4/5' },
      { score: 4, label: 'Strong', color: 'bg-neutral-200 w-full' },
      { score: 5, label: 'Excellent', color: 'bg-white w-full shadow-[0_0_8px_rgba(255,255,255,0.4)]' },
    ]
    return config[score]
  }

  // Redirect user based on role helper
  const redirectUser = (role: string) => {
    if (role === 'Volunteer') {
      router.push('/operations/volunteer')
    } else if (role === 'Security Manager' || role === 'Security') {
      router.push('/operations/security')
    } else if (role === 'Medical Officer' || role === 'Medical') {
      router.push('/operations/medical')
    } else if (role === 'Operations Manager' || role === 'Operations') {
      router.push('/operations/crowd-management')
    } else if (role === 'Infrastructure Manager' || role === 'Infrastructure') {
      router.push('/infrastructure')
    } else if (role === 'Administrator' || role === 'Executive') {
      router.push('/operations/executive')
    } else {
      router.push('/fan-dashboard')
    }
  }

  // Real Google Auth Flow trigger
  const triggerGoogleOAuth = () => {
    setLoading(true)
    setErrorMsg('')
    signInWithGoogle()
      .then((userProfile) => {
        redirectUser(userProfile.role)
      })
      .catch((err) => {
        setLoading(false)
        if (err.code !== 'auth/popup-closed-by-user') {
          setErrorMsg(err.message || 'Google Authentication failed')
        }
      })
  }

  // Social Login Simulator (other providers)
  const handleSocialLogin = (provider: string) => {
    setErrorMsg(`${provider} login is not configured. Please use Google Sign In or Email.`)
  }

  // Guest Access
  const handleGuestAccess = () => {
    setLoading(true)
    setTimeout(() => {
      const userProfile = {
        name: 'Guest User',
        email: 'guest@worldcup2026.com',
        role: 'Guest',
        avatarInitials: 'GU',
        country: 'United States',
        favTeam: 'None',
        favClub: 'None',
        membership: 'Guest',
        language: 'en',
      }
      localStorage.setItem('currentUser', JSON.stringify(userProfile))
      router.push('/')
    }, 1000)
  }

  // Sign In submit
  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.')
      return
    }

    setLoading(true)
    signInWithEmail(email, password)
      .then((userProfile) => {
        const fbUser = auth.currentUser
        if (fbUser && !fbUser.emailVerified) {
          setLoading(false)
          setScreen('verify-email')
          return
        }
        redirectUser(userProfile.role)
      })
      .catch((err) => {
        setLoading(false)
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
          setErrorMsg('Invalid email or password. Please try again.')
        } else if (err.code === 'auth/too-many-requests') {
          setErrorMsg('Too many failed login attempts. Please try again later.')
        } else {
          setErrorMsg(err.message || 'Login failed')
        }
      })
  }

  // Staff Sign In submit
  const handleStaffSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email || !password || !companyId || !employeeId) {
      setErrorMsg('Please fill in all the enterprise fields.')
      return
    }

    setLoading(true)
    AuthService.requestOtp(email)
      .then(() => {
        setLoading(false)
        setScreen('verification')
        setOtpTimer(30)
      })
      .catch((err) => {
        setLoading(false)
        setErrorMsg(err.message || 'Request OTP failed')
      })
  }

  // MFA verification submit
  const handleMfaVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!otpCode) {
      setErrorMsg('Please enter the OTP verification code.')
      return
    }

    setLoading(true)
    AuthService.verifyOtp(otpCode)
      .then((success) => {
        if (success) {
          const userProfile = {
            name: 'Staff Member',
            email,
            role: staffRole,
            avatarInitials: staffRole.substring(0, 2).toUpperCase(),
            country: 'USA',
            favTeam: 'None',
            favClub: 'None',
            membership: 'Enterprise',
            language: 'en',
          }
          localStorage.setItem('currentUser', JSON.stringify(userProfile))
          
          if (staffRole === 'Volunteer') {
            router.push('/operations/volunteer')
          } else if (staffRole === 'Security Manager') {
            router.push('/operations/security')
          } else if (staffRole === 'Medical Officer') {
            router.push('/operations/medical')
          } else if (staffRole === 'Operations Manager') {
            router.push('/operations/crowd-management')
          } else if (staffRole === 'Infrastructure Manager') {
            router.push('/infrastructure')
          } else {
            router.push('/operations/executive')
          }
        } else {
          setLoading(false)
          setErrorMsg('MFA Verification failed. Invalid code.')
        }
      })
      .catch((err) => {
        setLoading(false)
        setErrorMsg(err.message || 'Verification error')
      })
  }

  // Sign Up Submit
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setErrorMsg('Please complete all mandatory sign-up fields.')
      return
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }
    if (!acceptTerms) {
      setErrorMsg('You must accept the terms & conditions.')
      return
    }

    setLoading(true)
    signUpWithEmail(signUpEmail, signUpPassword, {
      username: signUpUsername || signUpEmail.split('@')[0],
      display_name: signUpName,
      country: signUpCountry || 'United States',
      favorite_team: signUpFavTeam || 'None',
      favorite_club: signUpFavClub || 'None',
      language: signUpLanguage || 'en',
      role: 'Fan',
    })
      .then(() => {
        setLoading(false)
        setSuccessMsg('Account created successfully! Check your email to verify.')
        setScreen('verify-email')
      })
      .catch((err) => {
        setLoading(false)
        if (err.code === 'auth/email-already-in-use') {
          setErrorMsg('An account with this email address already exists.')
        } else if (err.code === 'auth/weak-password') {
          setErrorMsg('The password is too weak. Please use at least 8 characters.')
        } else {
          setErrorMsg(err.message || 'Registration failed')
        }
      })
  }

  // Forgot password flow
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!recoveryEmail) {
      setErrorMsg('Please enter your registered email address.')
      return
    }
    setLoading(true)
    sendPasswordReset(recoveryEmail)
      .then(() => {
        setLoading(false)
        setScreen('reset-success')
      })
      .catch((err) => {
        setLoading(false)
        setErrorMsg(err.message || 'Recovery failed')
      })
  }

  // Forgot username flow
  const handleForgotUsername = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!recoveryEmail && !recoveryPhone) {
      setErrorMsg('Please fill in your registered email or phone number.')
      return
    }
    setLoading(true)
    AuthService.recoverUsername(recoveryEmail || recoveryPhone)
      .then((usernames) => {
        setLoading(false)
        setRecoveredUsernames(usernames)
      })
      .catch((err) => {
        setLoading(false)
        setErrorMsg(err.message || 'Recovery failed')
      })
  }

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col md:flex-row relative overflow-hidden font-sans select-none antialiased text-neutral-200">
      
      {/* Background Soft Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 z-0" />
      <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-neutral-100/5 blur-[130px] pointer-events-none z-0" />
      <div className="absolute -bottom-[45%] -right-[10%] w-[70%] h-[70%] rounded-full bg-neutral-200/5 blur-[120px] pointer-events-none z-0" />

      {/* LEFT PANEL: Monochrome Stadium & Network Wireframe Illustration */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative flex-col justify-between p-12 border-r border-neutral-800 bg-neutral-900/10 backdrop-blur-md overflow-hidden z-10">
        
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700 text-white shadow-md">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide leading-tight">FIFA World Cup 2026</h2>
            <p className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Smart Stadium OS</p>
          </div>
        </Link>

        {/* Thematic Content with SVG Stadium Wireframe */}
        <div className="my-auto space-y-8 relative max-w-lg">
          <span className="inline-flex items-center rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-300">
            🏟 Enterprise Operations Center
          </span>
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              SaaS Stadium Command Console
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Access the secure dashboard management platform. Monitor stadium facilities, telemetry streams, dynamic capacity loads, and emergency systems across MetLife World Cup Operations.
            </p>
          </div>

          {/* Stadium Wireframe Vector Illustration */}
          <div className="relative border border-neutral-800 bg-neutral-950/40 rounded-2xl p-6 overflow-hidden flex justify-center items-center h-48">
            <svg viewBox="0 0 200 100" className="w-full h-full text-neutral-700 opacity-60" fill="none" stroke="currentColor" strokeWidth="0.75">
              <ellipse cx="100" cy="50" rx="90" ry="40" />
              <ellipse cx="100" cy="50" rx="70" ry="30" />
              <rect x="55" y="32" width="90" height="36" rx="4" />
              <line x1="100" y1="32" x2="100" y2="68" />
              <circle cx="100" cy="50" r="10" />
              <line x1="10" y1="10" x2="190" y2="90" strokeDasharray="3 3" opacity="0.3" />
              <line x1="10" y1="90" x2="190" y2="10" strokeDasharray="3 3" opacity="0.3" />
              <circle cx="45" cy="20" r="2" fill="currentColor" className="animate-pulse" />
              <circle cx="155" cy="80" r="2" fill="currentColor" className="animate-pulse" />
              <circle cx="100" cy="15" r="2" fill="currentColor" />
              <circle cx="100" cy="85" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-neutral-500 flex justify-between">
          <span>© 2026 FIFA. All Rights Reserved.</span>
          <span>Security Protocol v4.8</span>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 z-10 overflow-y-auto max-h-screen">
        
        {/* Glassmorphic Container Card */}
        <div className="w-full max-w-[480px] rounded-3xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-[24px] shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 sm:p-8 flex flex-col relative transition-all duration-300">
          
          {/* Mobile Header Branding */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-8 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700 text-white shadow-md">
              <Trophy className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xs font-bold text-white tracking-wide">FIFA World Cup 2026</h2>
              <p className="text-[9px] text-neutral-400 font-semibold uppercase tracking-wider">Smart Stadium OS</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-[380px] justify-between">
            
            {/* SCREEN 1: Landing Select (Fan vs Staff) */}
            {screen === 'landing' && (
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Welcome to Smart Stadium OS</h2>
                  <p className="text-sm text-neutral-400 mt-2">Sign in to continue your enterprise World Cup session.</p>
                </div>

                <div className="space-y-4 my-8">
                  {/* Fan Login Button */}
                  <button
                    onClick={() => setScreen('fan-login')}
                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 text-left transition-all hover:bg-neutral-900/60 hover:border-neutral-700 hover:-translate-y-0.5 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-neutral-850 flex items-center justify-center text-white border border-neutral-850 group-hover:scale-105 transition-transform duration-200">
                        ⚽
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Continue as Fan</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">Tickets, match tracking, food delivery & fan dashboard.</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-500 group-hover:text-white transition-colors" />
                  </button>

                  {/* Staff Login Button */}
                  <button
                    onClick={() => setScreen('staff-login')}
                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 text-left transition-all hover:bg-neutral-900/60 hover:border-neutral-700 hover:-translate-y-0.5 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-neutral-850 flex items-center justify-center text-white border border-neutral-850 group-hover:scale-105 transition-transform duration-200">
                        🏟
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Stadium Staff Login</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">Security, operations, cleaning, medical & enterprise tools.</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-500 group-hover:text-white transition-colors" />
                  </button>
                </div>

                <div className="text-center">
                  <button onClick={handleGuestAccess} className="text-xs text-neutral-400 hover:text-white transition-colors underline font-medium cursor-pointer">
                    Or browse as Guest instead
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: Fan Log In */}
            {screen === 'fan-login' && (
              <form onSubmit={handleEmailSignIn} className="flex-grow flex flex-col justify-between" onKeyDown={handleKeyDown}>
                <div>
                  <button type="button" onClick={() => setScreen('landing')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <h2 className="text-2xl font-black text-white tracking-tight">Fan Sign In</h2>
                  <p className="text-xs text-neutral-400 mt-1">Enter your credentials or choose a social provider.</p>
                </div>

                <div className="space-y-4 my-6">
                  {errorMsg && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-400 flex gap-2">
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-400">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-neutral-400">Password</label>
                      <button type="button" onClick={() => setScreen('forgot-password')} className="text-[10px] text-neutral-400 hover:underline cursor-pointer">
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-10 pr-10 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-neutral-500 hover:text-white cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {capsLock && (
                      <p className="text-[10px] text-amber-400 mt-1 flex items-center gap-1 font-semibold animate-pulse">
                        ⚠️ Caps Lock is ON
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-neutral-800 bg-neutral-900 text-neutral-400 focus:ring-0 cursor-pointer h-4 w-4"
                      />
                      Remember Me
                    </label>
                    <button type="button" onClick={() => setScreen('forgot-username')} className="text-[10px] text-neutral-400 hover:underline cursor-pointer">
                      Forgot Username?
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-xl bg-[#00e676] font-semibold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 disabled:bg-neutral-900 disabled:text-white/55 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" /> Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-neutral-850"></div>
                    <span className="flex-shrink mx-4 text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">Or Connect With</span>
                    <div className="flex-grow border-t border-neutral-850"></div>
                  </div>

                  {/* Brand Marks social buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={triggerGoogleOAuth}
                      className="h-10 rounded-lg border border-neutral-800 bg-neutral-900/30 flex items-center justify-center gap-2 hover:bg-neutral-900/60 transition-all cursor-pointer"
                      title="Google"
                    >
                      <GoogleLogo className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-semibold text-white">Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Apple')}
                      className="h-10 rounded-lg border border-neutral-800 bg-neutral-900/30 flex items-center justify-center hover:bg-neutral-900/60 transition-all text-white cursor-pointer"
                      title="Apple"
                    >
                      <AppleLogo />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Microsoft')}
                      className="h-10 rounded-lg border border-neutral-800 bg-neutral-900/30 flex items-center justify-center hover:bg-neutral-900/60 transition-all cursor-pointer"
                      title="Microsoft"
                    >
                      <MicrosoftLogo />
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {[
                      { name: 'GitHub', cmp: <GitHubLogo />, fn: () => handleSocialLogin('GitHub') },
                      { name: 'X', cmp: <XLogo />, fn: () => handleSocialLogin('X') },
                      { name: 'LinkedIn', cmp: <LinkedInLogo />, fn: () => handleSocialLogin('LinkedIn') },
                      { name: 'Discord', cmp: <DiscordLogo />, fn: () => handleSocialLogin('Discord') },
                      { name: 'Facebook', cmp: <FacebookLogo />, fn: () => handleSocialLogin('Facebook') },
                      { name: 'Yahoo', cmp: <YahooLogo />, fn: () => handleSocialLogin('Yahoo') },
                    ].map((btn) => (
                      <button
                        key={btn.name}
                        type="button"
                        onClick={btn.fn}
                        className="h-10 rounded-lg border border-neutral-800 bg-neutral-900/30 flex items-center justify-center hover:bg-neutral-900/60 transition-all cursor-pointer"
                        title={btn.name}
                      >
                        {btn.cmp}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2">
                    <button type="button" onClick={() => setScreen('fan-signup')} className="text-neutral-400 hover:text-white transition-colors cursor-pointer">
                      Don't have an account? <span className="text-[#00e676] font-semibold">Sign Up</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* SCREEN 3: Fan Sign Up */}
            {screen === 'fan-signup' && (
              <form onSubmit={handleSignUp} className="flex-grow flex flex-col justify-between" onKeyDown={handleKeyDown}>
                <div>
                  <button type="button" onClick={() => setScreen('fan-login')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                  </button>
                  <h2 className="text-2xl font-black text-white tracking-tight">Create Fan Account</h2>
                  <p className="text-xs text-neutral-400 mt-1">Select a signup method below to create your account.</p>
                </div>

                <div className="space-y-4 my-6">
                  {errorMsg && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-400 flex gap-2">
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Primary Google Signup Option */}
                  <button
                    type="button"
                    onClick={triggerGoogleOAuth}
                    className="w-full h-11 rounded-xl border border-neutral-700 bg-neutral-900/50 text-white font-bold text-sm hover:bg-neutral-800 flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <GoogleLogo className="w-5 h-5 flex-shrink-0 ml-2" />
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative flex items-center py-1">
                    <div className="flex-grow border-t border-neutral-800"></div>
                    <span className="flex-shrink mx-3 text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">Or</span>
                    <div className="flex-grow border-t border-neutral-800"></div>
                  </div>

                  <p className="text-[11px] text-neutral-400 font-bold text-center">Create your account using email</p>

                  {/* Scrollable Email form fields */}
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold text-neutral-400 uppercase">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Johnson"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        className="w-full rounded-lg border border-neutral-850 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold text-neutral-400 uppercase">Username</label>
                      <input
                        type="text"
                        placeholder="e.g. alex_fan"
                        value={signUpUsername}
                        onChange={(e) => setSignUpUsername(e.target.value)}
                        className="w-full rounded-lg border border-neutral-850 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold text-neutral-400 uppercase">Email Address *</label>
                      <input
                        type="email"
                        placeholder="e.g. alex@example.com"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="w-full rounded-lg border border-neutral-855 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold text-neutral-400 uppercase">Password *</label>
                      <input
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="w-full rounded-lg border border-neutral-850 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        required
                      />
                      {signUpPassword && (
                        <div className="mt-1 space-y-1">
                          <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-300 ${getPasswordStrength(signUpPassword).color}`} />
                          </div>
                          <p className="text-[9px] text-neutral-450">
                            Password: <span className="font-bold text-white">{getPasswordStrength(signUpPassword).label}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold text-neutral-400 uppercase">Confirm Password *</label>
                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        className="w-full rounded-lg border border-neutral-850 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold text-neutral-400 uppercase">Country</label>
                      <input
                        type="text"
                        placeholder="e.g. Canada"
                        value={signUpCountry}
                        onChange={(e) => setSignUpCountry(e.target.value)}
                        className="w-full rounded-lg border border-neutral-850 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-semibold text-neutral-400 uppercase">Fav National Team</label>
                        <input
                          type="text"
                          placeholder="e.g. USA"
                          value={signUpFavTeam}
                          onChange={(e) => setSignUpFavTeam(e.target.value)}
                          className="w-full rounded-lg border border-neutral-850 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-semibold text-neutral-400 uppercase">Fav Club</label>
                        <input
                          type="text"
                          placeholder="e.g. Real Madrid"
                          value={signUpFavClub}
                          onChange={(e) => setSignUpFavClub(e.target.value)}
                          className="w-full rounded-lg border border-neutral-850 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold text-neutral-400 uppercase">Preferred Language</label>
                      <select
                        value={signUpLanguage}
                        onChange={(e) => setSignUpLanguage(e.target.value)}
                        className="w-full rounded-lg border border-neutral-850 bg-neutral-900 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>

                    <label className="flex items-start gap-2 text-[10px] text-neutral-450 cursor-pointer pt-2">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="rounded border-neutral-800 bg-neutral-900 text-neutral-400 focus:ring-0 cursor-pointer h-4 w-4 mt-0.5"
                      />
                      <span>I accept the Terms & Conditions.</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-xl bg-[#00e676] font-semibold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2 disabled:bg-neutral-900 disabled:text-white/55 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" /> Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            )}

            {/* SCREEN 4: Staff Sign In */}
            {screen === 'staff-login' && (
              <form onSubmit={handleStaffSignIn} className="flex-grow flex flex-col justify-between" onKeyDown={handleKeyDown}>
                <div>
                  <button type="button" onClick={() => setScreen('landing')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <h2 className="text-2xl font-black text-white tracking-tight">Staff Enterprise Portal</h2>
                  <p className="text-xs text-neutral-400 mt-1">Authenticate using your credentials.</p>
                </div>

                <div className="space-y-3.5 my-4 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  {errorMsg && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-400 flex gap-2">
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-neutral-400">Stadium ID *</label>
                      <input
                        type="text"
                        placeholder="e.g. WC-STADIUM-2026"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-neutral-400">Employee ID *</label>
                      <input
                        type="text"
                        placeholder="e.g. EMP-1020"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-400">Select Operating Role *</label>
                    <select
                      value={staffRole}
                      onChange={(e) => setStaffRole(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-700"
                    >
                      <option value="Volunteer">Volunteer</option>
                      <option value="Security Manager">Security Manager</option>
                      <option value="Medical Officer">Medical Officer</option>
                      <option value="Operations Manager">Operations Manager</option>
                      <option value="Infrastructure Manager">Infrastructure Manager</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-400">Enterprise Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="email"
                        placeholder="Enter work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-neutral-700"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-400">Enterprise Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-9 pr-10 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-neutral-700"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-neutral-500 hover:text-white cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-neutral-800 bg-neutral-900 text-neutral-400 focus:ring-0 cursor-pointer h-4 w-4"
                    />
                    Remember Device
                  </label>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-xl bg-[#00e676] font-semibold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 disabled:bg-neutral-900 disabled:text-white/55 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" /> Verifying...
                      </>
                    ) : (
                      'Request OTP Code'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* SCREEN 5: MFA OTP Verification */}
            {screen === 'verification' && (
              <form onSubmit={handleMfaVerify} className="flex-grow flex flex-col justify-between">
                <div>
                  <button type="button" onClick={() => setScreen('staff-login')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
                  </button>
                  <h2 className="text-2xl font-black text-white tracking-tight">Two-Factor Authentication</h2>
                  <p className="text-xs text-neutral-400 mt-2">
                    Enter the verification OTP code sent to your registered device.
                  </p>
                </div>

                <div className="space-y-4 my-8">
                  {errorMsg && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-400 flex gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex gap-2 justify-between">
                      {['email', 'phone', 'google'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setVerificationMethod(method as any)}
                          className={`flex-1 py-1.5 rounded-lg border text-center text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer
                            ${
                              verificationMethod === method
                                ? 'bg-white/10 text-white border-neutral-700 shadow-md'
                                : 'bg-neutral-900/30 text-neutral-500 border-neutral-850 hover:text-neutral-300'
                            }
                          `}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 text-center">
                    <label className="text-xs font-semibold text-neutral-400 block text-left">Verification Code (OTP)</label>
                    <input
                      type="text"
                      placeholder="6-digit code"
                      value={otpCode}
                      maxLength={6}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full text-center rounded-lg border border-neutral-800 bg-neutral-900/50 py-3 text-lg font-mono font-bold text-white tracking-widest focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-xl bg-[#00e676] font-semibold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 disabled:bg-neutral-900 disabled:text-white/55 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" /> Verifying...
                      </>
                    ) : (
                      'Verify & Access Console'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    disabled={otpTimer > 0}
                    onClick={() => {
                      setSuccessMsg('A new OTP code has been dispatched to your device.')
                      setOtpTimer(30)
                      setTimeout(() => setSuccessMsg(''), 4000)
                    }}
                    className={`w-full text-center text-xs py-2 rounded-lg font-semibold transition-all cursor-pointer
                      ${
                        otpTimer > 0
                          ? 'bg-neutral-900/50 text-white/55 cursor-not-allowed opacity-70'
                          : 'bg-neutral-800 text-white hover:bg-neutral-700 active:scale-[0.98]'
                      }
                    `}
                  >
                    {otpTimer > 0 ? `Resend OTP (${otpTimer}s)` : 'Resend OTP'}
                  </button>
                  {successMsg && (
                    <p className="text-[10px] text-emerald-400 text-center font-bold">{successMsg}</p>
                  )}
                </div>
              </form>
            )}

            {/* SCREEN 6: Forgot Password */}
            {screen === 'forgot-password' && (
              <form onSubmit={handleForgotPassword} className="flex-grow flex flex-col justify-between">
                <div>
                  <button type="button" onClick={() => setScreen('fan-login')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                  </button>
                  <h2 className="text-2xl font-black text-white tracking-tight">Forgot Password?</h2>
                  <p className="text-xs text-neutral-400 mt-2">
                    Enter your email. We will send a secure reset link to recover your account.
                  </p>
                </div>

                <div className="space-y-4 my-8">
                  {errorMsg && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-400 flex gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-400">Registered Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-700"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-xl bg-neutral-800 font-semibold text-white text-sm hover:bg-neutral-750 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-900 disabled:text-white/55 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" /> Sending Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            )}

            {/* SCREEN 7: Forgot Username */}
            {screen === 'forgot-username' && (
              <form onSubmit={handleForgotUsername} className="flex-grow flex flex-col justify-between">
                <div>
                  <button type="button" onClick={() => setScreen('fan-login')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                  </button>
                  <h2 className="text-2xl font-black text-white tracking-tight">Forgot Username?</h2>
                  <p className="text-xs text-neutral-400 mt-2">
                    Recover your username using your registered email or phone number.
                  </p>
                </div>

                <div className="space-y-4 my-6">
                  {errorMsg && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-400 flex gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-400">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-700"
                    />
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-neutral-900"></div>
                    <span className="flex-shrink mx-3 text-[9px] text-neutral-500 font-semibold tracking-wider">OR</span>
                    <div className="flex-grow border-t border-neutral-900"></div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-400">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={recoveryPhone}
                      onChange={(e) => setRecoveryPhone(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-700"
                    />
                  </div>

                  {recoveredUsernames.length > 0 && (
                    <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/40 mt-4 animate-fadeIn">
                      <p className="text-[10px] text-white font-semibold uppercase tracking-wider mb-2">Associated Username Found:</p>
                      <ul className="space-y-1.5">
                        {recoveredUsernames.map((u) => (
                          <li key={u} className="text-xs text-white font-mono flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-xl bg-neutral-800 font-semibold text-white text-sm hover:bg-neutral-750 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-900 disabled:text-white/55 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" /> Searching Accounts...
                    </>
                  ) : (
                    'Recover Username'
                  )}
                </button>
              </form>
            )}

            {/* SCREEN 8: Password Reset Success */}
            {screen === 'reset-success' && (
              <div className="flex-grow flex flex-col justify-between text-center">
                <div>
                  <div className="h-14 w-14 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center text-white mx-auto mb-6">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Recovery Link Dispatched</h2>
                  <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                    A password recovery email has been sent to <strong className="text-white">{recoveryEmail}</strong>. Please check your inbox.
                  </p>
                </div>

                <div className="space-y-4 my-8">
                  <button
                    type="button"
                    onClick={() => {
                      setScreen('fan-login')
                      setRecoveryEmail('')
                    }}
                    className="w-full h-10 rounded-xl bg-[#00e676] font-semibold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 9: Verify Email */}
            {screen === 'verify-email' && (
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <button type="button" onClick={() => setScreen('fan-login')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-6 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                  </button>
                  <h2 className="text-2xl font-black text-white tracking-tight">Verify Your Email</h2>
                  <p className="text-xs text-neutral-400 mt-2">
                    We have dispatched a verification email to your registered inbox. Please verify your email address to activate your stadium profile.
                  </p>
                </div>

                <div className="space-y-4 my-8">
                  {errorMsg && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-400 flex gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  {successMsg && (
                    <p className="text-xs text-emerald-400 text-center font-bold">{successMsg}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true)
                      setErrorMsg('')
                      setSuccessMsg('')
                      try {
                        const verified = await checkEmailVerification()
                        if (verified) {
                          setSuccessMsg('Email verified successfully! Redirecting...')
                          setTimeout(() => {
                            const cur = auth.currentUser
                            if (cur) {
                              const role = cur.email?.toLowerCase().includes('volunteer') ? 'Volunteer' : 'Fan'
                              redirectUser(role)
                            }
                          }, 1500)
                        } else {
                          setErrorMsg('Email is not verified yet. Please click the verification link sent to your email.')
                        }
                      } catch (err: any) {
                        setErrorMsg(err.message || 'Verification check failed')
                      } finally {
                        setLoading(false)
                      }
                    }}
                    className="w-full h-10 rounded-xl bg-[#00e676] font-semibold text-white text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : 'Check Verification Status'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={async () => {
                      setErrorMsg('')
                      setSuccessMsg('')
                      try {
                        await resendVerificationEmail()
                        setSuccessMsg('Verification email has been resent to your inbox.')
                      } catch (err: any) {
                        setErrorMsg(err.message || 'Failed to resend verification email')
                      }
                    }}
                    className="w-full text-center text-xs py-2 rounded-lg font-semibold bg-neutral-800 text-white hover:bg-neutral-750 cursor-pointer"
                  >
                    Resend Verification Email
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Guest browsing capability note */}
          {screen === 'landing' && (
            <div className="mt-8 pt-4 border-t border-neutral-900 text-[10px] text-neutral-500 leading-normal flex items-start gap-2 bg-neutral-900/10 rounded-xl p-3 border border-neutral-850">
              <Info className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-400">💡 Guest Access capabilities</p>
                <p className="mt-1">Guests can browse matches, teams, and stadium merchandise, but cannot purchase tickets, place food orders, or configure personalized alerts.</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* --- SIMULATED GOOGLE OAUTH POPUP MODAL OVERLAY --- */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[380px] rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl relative animate-scaleUp">
            
            {/* Modal close */}
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white text-xs font-semibold cursor-pointer"
              disabled={googleLoading}
            >
              Cancel
            </button>

            {/* Google Header */}
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <GoogleLogo className="w-10 h-10 flex-shrink-0" />
              <h3 className="text-base font-bold text-white mt-3">Sign in with Google</h3>
              <p className="text-xs text-neutral-400 mt-1">to continue to Smart Stadium OS</p>
            </div>

            {googleLoading ? (
              <div className="py-10 flex flex-col items-center justify-center gap-4 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-300" />
                <p className="text-xs text-neutral-400">
                  Authenticating profile with Google Account...
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const target = e.target as any
                  const selectedEmail = target.email.value || 'google.user@gmail.com'
                  setGoogleLoading(true)
                  setTimeout(() => {
                    setShowGoogleModal(false)
                    setGoogleLoading(false)
                    const userProfile = {
                      name: selectedEmail.split('@')[0],
                      email: selectedEmail,
                      role: 'Fan',
                      avatarInitials: selectedEmail.substring(0, 2).toUpperCase(),
                      country: 'United States',
                      favTeam: 'None',
                      favClub: 'None',
                      membership: 'Premium',
                      language: 'en',
                    }
                    localStorage.setItem('currentUser', JSON.stringify(userProfile))
                    router.push('/fan-dashboard')
                  }, 1500)
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400 block text-left">Google Account Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Google email address"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-700"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-100 transition-colors flex items-center justify-center cursor-pointer"
                >
                  Continue to Smart Stadium OS
                </button>
                <p className="text-[9px] text-neutral-500 text-center mt-4">
                  By continuing, Google will share your name, email address, and profile picture with Smart Stadium OS.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
      
    </main>
  )
}
