// ─── Firebase Admin SDK ───────────────────────────────────────────────────────
// Server-side only — used in API routes, middleware, and the Python backend.
// NEVER import this file in client components.
//
// Required env vars (server-side, no NEXT_PUBLIC_ prefix):
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY

import type { App } from 'firebase-admin/app'

let adminApp: App | undefined

/**
 * Returns a singleton Firebase Admin app.
 * Safe to call multiple times — only initializes once.
 */
export function getAdminApp(): App {
  if (adminApp) return adminApp

  // Lazy-require so this file is never bundled into the client
  const { initializeApp, getApps, cert } = require('firebase-admin/app')

  const existing = getApps()
  if (existing.length > 0) {
    adminApp = existing[0]
    return adminApp!
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })

  return adminApp!
}

/** Firebase Admin Firestore instance */
export function getAdminFirestore() {
  const { getFirestore } = require('firebase-admin/firestore')
  return getFirestore(getAdminApp())
}

/** Firebase Admin Auth instance */
export function getAdminAuth() {
  const { getAuth } = require('firebase-admin/auth')
  return getAuth(getAdminApp())
}

/** Firebase Admin Storage instance */
export function getAdminStorage() {
  const { getStorage } = require('firebase-admin/storage')
  return getStorage(getAdminApp())
}

/**
 * Verify a Firebase ID token (e.g. from an Authorization: Bearer header).
 * Returns the decoded token or throws if invalid.
 */
export async function verifyIdToken(token: string) {
  const adminAuth = getAdminAuth()
  return adminAuth.verifyIdToken(token)
}
