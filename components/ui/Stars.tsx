'use client'

import { useEffect, useState } from 'react'

interface StarStyle {
  left: string
  top: string
  animationDelay: string
  opacity: number
}

export function Stars() {
  const [stars, setStars] = useState<StarStyle[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 70 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 70}%`,
        animationDelay: `${Math.random() * 2.4}s`,
        opacity: 0.4 + Math.random() * 0.6,
      }))
    )
  }, [])

  return (
    <div className="stars" id="stars" aria-hidden="true">
      {stars.map((style, i) => (
        <i key={i} style={style} />
      ))}
    </div>
  )
}