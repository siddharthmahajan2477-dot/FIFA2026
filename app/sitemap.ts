import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fifa-world-cup-2026.vercel.app'
  
  const routes = [
    '',
    '/fan-dashboard',
    '/match-center',
    '/team-analytics',
    '/player-analytics',
    '/tournament-center',
    '/tickets',
    '/stadium-navigation',
    '/food-beverage',
    '/merchandise',
    '/fan-profile',
    '/operations',
    '/ai',
    '/infrastructure',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
