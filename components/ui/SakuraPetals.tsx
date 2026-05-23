'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAudio } from '@/lib/AudioContext'

interface PetalStyle {
  left: string
  animationDuration: string
  animationDelay: string
  opacity: number
  transform: string
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<PetalStyle[]>([])
  const { playPetalPop } = useAudio()

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

  // playPetalPop auto-inits the AudioContext on first call — no ready guard needed
  const handlePetalClick = useCallback(() => {
    playPetalPop()
  }, [playPetalPop])

  return (
    <div className="petals" id="petals" aria-hidden="true">
      {petals.map((style, i) => (
        <div
          key={i}
          className="petal"
          style={{ ...style, pointerEvents: 'auto', cursor: 'none' }}
          onClick={handlePetalClick}
        />
      ))}
    </div>
  )
}
