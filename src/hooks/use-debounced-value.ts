import { useEffect, useState } from 'react'

export default function useDebouncedValue<T>(
  value: T,
  delay?: number,
  disableDebounce?: boolean
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    if (disableDebounce) {
      setDebouncedValue(value)

      return () => {}
    }

    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => clearTimeout(timer)
  }, [value, delay, disableDebounce])

  return debouncedValue
}
