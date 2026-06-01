'use client'

import { useEffect } from 'react'

type TimeTheme = 'dawn' | 'afternoon' | 'dusk' | 'midnight'

function getTimeTheme(date = new Date()): TimeTheme {
  const hour = date.getHours()

  if (hour >= 5 && hour < 9) return 'dawn'
  if (hour >= 9 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'dusk'
  return 'midnight'
}

export function TimeTheme() {
  useEffect(() => {
    const applyTheme = () => {
      document.documentElement.dataset.timeTheme = getTimeTheme()
    }

    applyTheme()

    const interval = window.setInterval(applyTheme, 60 * 1000)
    window.addEventListener('visibilitychange', applyTheme)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('visibilitychange', applyTheme)
    }
  }, [])

  return null
}
