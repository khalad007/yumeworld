'use client'

import { useState, useEffect } from 'react'

export interface MousePosition {
  x: number
  y: number
}

/**
 * Returns normalized mouse position offset from center:
 *   x ∈ [-0.5, 0.5], y ∈ [-0.5, 0.5]
 *
 * Usage:
 *   const { x, y } = useMouseParallax()
 *   <motion.div animate={{ x: x * -20, y: y * -10 }} />
 */
export function useMouseParallax(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}