'use client'

import { useEffect, useRef, useState } from 'react'

interface Trail {
  id: number
  x: number
  y: number
}

export function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null)
  const [pressed, setPressed] = useState(false)
  const [trails, setTrails] = useState<Trail[]>([])
  const lastTrail = useRef(0)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e: MouseEvent) => {
      if (curRef.current) {
        curRef.current.style.left = e.clientX + 'px'
        curRef.current.style.top = e.clientY + 'px'
      }
      const now = performance.now()
      if (now - lastTrail.current > 40) {
        lastTrail.current = now
        const id = now
        setTrails((t) => [...t, { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => setTrails((t) => t.filter((tr) => tr.id !== id)), 700)
      }
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div
        ref={curRef}
        id="cursor"
        style={{
          transform: `translate(-50%,-50%) scale(${pressed ? 1.6 : 1})`,
        }}
      />
      {trails.map((tr) => (
        <div
          key={tr.id}
          className="trail"
          style={{ left: tr.x, top: tr.y }}
        />
      ))}
    </>
  )
}