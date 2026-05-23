'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAudio } from '@/lib/AudioContext'

const KURU_LABELS = ['くるくる～', 'キラキラ✿', 'ふわふわ♪', 'くるくる！']

export function HertaFloat() {
  const { playKuruKuru } = useAudio()
  const [bubble, setBubble] = useState<string | null>(null)
  const [labelIdx, setLabelIdx] = useState(0)

  const handleClick = () => {
    // Use the real Herta MP3; fall back to synthesized if it errors
    const a = new Audio('/music/herta-kuru-kuru.mp3')
    a.volume = 0.8
    a.play().catch(() => playKuruKuru())
    const next = (labelIdx + 1) % KURU_LABELS.length
    setLabelIdx(next)
    setBubble(KURU_LABELS[next])
    setTimeout(() => setBubble(null), 1800)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 150,
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        userSelect: 'none',
      }}
    >
      {/* Speech bubble — pops up on click */}
      {bubble && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, rgba(26,18,53,0.95), rgba(36,24,72,0.95))',
            border: '1px solid var(--lav)',
            borderRadius: 12,
            padding: '6px 14px',
            font: '600 10px/1.5 var(--font-pixel)',
            letterSpacing: '.14em',
            color: 'var(--lav)',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 16px rgba(138,107,255,.45)',
            animation: 'mochi-pop 0.3s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
          }}
        >
          {bubble}
          {/* Bubble tail */}
          <span
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid var(--lav)',
            }}
          />
        </div>
      )}

      {/* Spinning chibi image */}
      <div
        style={{
          width: 68,
          height: 68,
          animation: 'spin 2.2s linear infinite',
          filter: 'drop-shadow(0 0 10px rgba(138,107,255,.65)) drop-shadow(0 0 22px rgba(255,183,213,.35))',
        }}
      >
        <Image
          src="/photo/herta-kuru-kuru.png"
          alt="Herta kuru kuru"
          width={68}
          height={68}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          priority
        />
      </div>

      {/* Label */}
      <div
        style={{
          font: '600 8px/1 var(--font-pixel)',
          letterSpacing: '.2em',
          color: 'rgba(184,164,255,.6)',
          textShadow: '0 0 8px rgba(138,107,255,.5)',
        }}
      >
        HERTA
      </div>
    </div>
  )
}
