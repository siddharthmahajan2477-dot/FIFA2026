'use client'

import { useEffect, useState, useCallback } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAsync<T>(
  fn: () => Promise<T>,
  deps?: React.DependencyList
): AsyncState<T> & { retry: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null })
    try {
      const result = await fn()
      setState({ data: result, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      })
    }
  }, deps ? [...deps] : [fn])

  useEffect(() => {
    execute()
  }, [execute])

  return {
    ...state,
    retry: execute,
  }
}
