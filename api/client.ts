import { http } from './http'
import { API_ROUTES } from './routes'

export const apiClient = {
  getRoute: (path: string) => path,
  http,
  routes: API_ROUTES,
}
