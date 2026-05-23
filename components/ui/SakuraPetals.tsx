'use client'

import { useEffect, useState } from 'react'

interface PetalStyle {
  left: string
  animationDuration: string
  animationDelay: string
  opacity: number
  transform: string
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<PetalStyle[]>([])

  useEffect(() => {
    setPetals(
      Array.from({ length: 24 }, () => {
        const d = 9 + Math.random() * 12
        return {
          left: `${Math.random() * 100}%`,
          animationDuration: `${d}s`,
          animationDelay: `${-Math.random() * d}s`,
          opacity: 0.5 + Math.random() * 0.5,
          transform: `scale(${0.6 + Math.random() * 1.1})`,
        }
      })
    )
  }, [])

  return (
    <div className="petals" id="petals" aria-hidden="true">
      {petals.map((style, i) => (
        <div key={i} className="petal" style={style} />
      ))}
    </div>
  )
}