// Accessibility utilities for WCAG 2.2 AA compliance

export const A11Y = {
  // Screen reader only text
  srOnly: 'sr-only absolute h-px w-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0 p-0',

  // Focus visible utility
  focusVisible: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',

  // Touch target minimum size (48x48px)
  touchTarget: 'min-h-12 min-w-12',

  // Reduced motion
  prefersReducedMotion: '@media (prefers-reduced-motion: reduce)',

  // High contrast
  prefersHighContrast: '@media (prefers-contrast: more)',

  // Dark mode
  prefersDarkMode: '@media (prefers-color-scheme: dark)',
}

// ARIA attributes helper
export function createAriaAttributes(props: Record<string, any>) {
  const ariaAttrs: Record<string, any> = {}
  
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('aria')) {
      ariaAttrs[key] = value
    }
  })
  
  return ariaAttrs
}

// Keyboard navigation helper
export function isKeyboardEvent(event: React.KeyboardEvent): boolean {
  return event.key?.length === 1 || ['Enter', 'Space', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
}

// Skip link for keyboard navigation
export function createSkipLink(targetId: string): string {
  return `
    <a href="#${targetId}" class="sr-only focus:not-sr-only">
      Skip to main content
    </a>
  `
}

// Announce to screen readers
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const element = document.createElement('div')
  element.setAttribute('role', 'status')
  element.setAttribute('aria-live', priority)
  element.setAttribute('aria-atomic', 'true')
  element.className = A11Y.srOnly
  element.textContent = message
  document.body.appendChild(element)
  
  setTimeout(() => element.remove(), 1000)
}

// Color contrast checker (simple WCAG AA checker)
export function meetsWCAGAA(luminance1: number, luminance2: number): boolean {
  // Contrast ratio must be at least 4.5:1 for WCAG AA
  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)
  const ratio = (lighter + 0.05) / (darker + 0.05)
  return ratio >= 4.5
}
