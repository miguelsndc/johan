import { useCallback, useEffect, useRef } from 'react'

export default function useMounted() {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  })

  return useCallback(() => mounted.current, [])
}
