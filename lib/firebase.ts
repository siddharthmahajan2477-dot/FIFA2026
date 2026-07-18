// ─── Firebase App Initialization ──────────────────────────────────────────────
// FIFA World Cup 2026 Smart Stadium Operating System

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const isConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId)

let appInstance: any = null
let authInstance: any = null
let dbInstance: any = null
let storageInstance: any = null

if (isConfigured) {
  try {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    authInstance = getAuth(appInstance)
    dbInstance = getFirestore(appInstance)
    storageInstance = getStorage(appInstance)
  } catch (err) {
    console.error('[Firebase] Initialization failed:', err)
  }
} else {
  console.warn('[Firebase] Environment variables are missing or incomplete. Using null initializers.')
}

export const app = appInstance
export const auth = authInstance
export const db = dbInstance
export const storage = storageInstance
export const googleProvider = new GoogleAuthProvider()

export { GoogleAuthProvider, EmailAuthProvider }

// ── Analytics — client-only, returns null on server ──────────────────────────
export function getFirebaseAnalytics() {
  if (typeof window === 'undefined' || !app) return null
  const { getAnalytics, isSupported } = require('firebase/analytics')
  return isSupported().then((yes: boolean) =>
    yes ? getAnalytics(app) : null
  )
}

// ── Messaging — client-only, returns null on server ──────────────────────────
export function getFirebaseMessaging() {
  if (typeof window === 'undefined' || !app) return null
  const { getMessaging, isSupported } = require('firebase/messaging')
  return isSupported().then((yes: boolean) =>
    yes ? getMessaging(app) : null
  )
}
