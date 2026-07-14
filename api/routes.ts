export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    otpRequest: '/auth/otp/request',
    otpVerify: '/auth/otp/verify',
    recoverPassword: '/auth/recover/password',
    recoverUsername: '/auth/recover/username',
  },
  user: {
    profile: '/user/profile',
    preferences: '/user/preferences',
  },
  matches: {
    list: '/matches',
    details: (id: string) => `/matches/${id}`,
    live: '/matches/live',
  },
  infrastructure: {
    stats: '/infra/stats',
    parking: '/infra/parking',
    water: '/infra/water',
    energy: '/infra/energy',
    sewage: '/infra/sewage',
    help: '/infra/help',
  },
  operations: {
    stats: '/ops/stats',
    volunteers: '/ops/volunteers',
    medical: '/ops/medical',
    security: '/ops/security',
    crowd: '/ops/crowd',
    sanitation: '/ops/sanitation',
  },
  tickets: {
    list: '/tickets',
    purchase: '/tickets/purchase',
  },
  orders: {
    food: '/orders/food',
    merchandise: '/orders/merchandise',
  },
  notifications: '/notifications',
  ai: {
    insights: '/ai/insights',
    predictions: '/ai/predictions',
  },
}
