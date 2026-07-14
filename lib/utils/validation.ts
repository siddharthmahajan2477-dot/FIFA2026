export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return regex.test(phone.replace(/\s/g, ''))
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validatePassword(password: string): {
  isValid: boolean
  strength: 'weak' | 'fair' | 'good' | 'strong'
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) errors.push('At least 8 characters')
  if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter')
  if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter')
  if (!/[0-9]/.test(password)) errors.push('At least one number')
  if (!/[^a-zA-Z0-9]/.test(password)) errors.push('At least one special character')

  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  const checks = 5 - errors.length
  if (checks >= 4) strength = 'strong'
  else if (checks >= 3) strength = 'good'
  else if (checks >= 2) strength = 'fair'

  return {
    isValid: errors.length === 0,
    strength,
    errors,
  }
}
