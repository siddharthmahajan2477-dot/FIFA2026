// ─── Leaflet CDN Loader ───────────────────────────────────────────────────────
// Loads Leaflet JS + CSS from unpkg CDN at runtime.
// This avoids any npm install requirement and works in Next.js App Router.
// Singleton promise — only loads once per page lifetime.

const LEAFLET_VERSION = '1.9.4'
const LEAFLET_JS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`
const LEAFLET_CSS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`

let loadPromise: Promise<any> | null = null

export function loadLeaflet(): Promise<any> {
  if (typeof window === 'undefined') {
    return Promise.resolve(null)
  }

  // Already loaded
  if ((window as any).L) {
    injectCSS()
    return Promise.resolve((window as any).L)
  }

  // Return in-flight promise
  if (loadPromise) return loadPromise

  loadPromise = new Promise<any>((resolve, reject) => {
    injectCSS()

    if (document.getElementById('leaflet-js')) {
      // Script tag exists but L not yet set — wait for onload
      const existing = document.getElementById('leaflet-js') as HTMLScriptElement
      existing.addEventListener('load', () => resolve((window as any).L))
      existing.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.id = 'leaflet-js'
    script.src = LEAFLET_JS_URL
    script.crossOrigin = ''
    script.onload = () => resolve((window as any).L)
    script.onerror = () =>
      reject(new Error(`Failed to load Leaflet from ${LEAFLET_JS_URL}`))
    document.head.appendChild(script)
  })

  return loadPromise
}

function injectCSS(): void {
  if (document.getElementById('leaflet-css')) return
  const link = document.createElement('link')
  link.id = 'leaflet-css'
  link.rel = 'stylesheet'
  link.href = LEAFLET_CSS_URL
  document.head.appendChild(link)
}
