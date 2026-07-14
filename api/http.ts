import { API_CONFIG } from './config'

export class ApiError extends Error {
  status: number
  info?: any

  constructor(message: string, status: number, info?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.info = info
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_CONFIG.apiUrl}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      let info
      try {
        info = await response.json()
      } catch (e) {
        // Response is not JSON
      }
      throw new ApiError(
        info?.message || response.statusText || 'Request failed',
        response.status,
        info
      )
    }

    if (response.status === 204) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      (error as Error).message || 'Network Error or Timeout',
      500
    )
  }
}

export const http = {
  get: <T>(url: string, headers?: HeadersInit) => request<T>(url, { method: 'GET', headers }),
  post: <T>(url: string, body?: any, headers?: HeadersInit) =>
    request<T>(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),
  put: <T>(url: string, body?: any, headers?: HeadersInit) =>
    request<T>(url, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),
  delete: <T>(url: string, headers?: HeadersInit) => request<T>(url, { method: 'DELETE', headers }),
}
