'use client'

import { useState } from 'react'
import { useAudio } from '@/lib/AudioContext'

function playSound(src: string, volume = 0.82) {
  const a = new Audio(src)
  a.volume = volume
  a.play().catch(() => {})
}

const QUOTES = [
  'Even on the saddest day in Tokyo, the convenience store is still warm and the cat is still loud.」',
  "The petal that lands on your sleeve is choosing you. Don't brush it off.」",
  "Heaven is a 2am bowl of ramen with someone who doesn't need you to talk.」",
  "The arcade is closed but the neon is still on. That's the whole feeling.」",
  "You don't have to win the level. You can just sit in the save room a while.」",
]

function QuoteCard() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const { playChime } = useAudio()

  const reroll = () => {
    setFading(true)
    playChime(660 + idx * 40)
    setTimeout(() => {
      setIdx((i) => (i + 1) % QUOTES.length)
      setFading(false)
    }, 180)
  }

  return (
    <div className="panel quote">
      <div className="head">
        <h3>Daily anime quote</h3>
        <span className="kana">DAY 142</span>
      </div>
      <blockquote style={{ opacity: fading ? 0 : 1, transition: 'opacity .18s' }}>
        {QUOTES[idx]}
      </blockquote>
      <div className="by">
        <span>— YUME, EP. 06</span>
        <button className="reroll" onClick={reroll}>
          ⟳ RE-ROLL
        </button>
      </div>
    </div>
  )
}

const BADGES = [
  { cls: 'gold',   kanji: '夢', hasRibbon: true  },
  { cls: 'pink',   kanji: '猫', hasRibbon: false },
  { cls: 'cy',     kanji: '星', hasRibbon: false },
  { cls: 'lav',    kanji: '桜', hasRibbon: false },
  { cls: 'peach',  kanji: '麺', hasRibbon: false },
  { cls: 'locked', kanji: '?',  hasRibbon: false },
]

function Achievements() {
  const { playBadge } = useAudio()

  const handleBadgeClick = (cls: string) => {
    if (cls === 'locked') return
    if (cls === 'gold') {
      // Gold badge gets the Bankai treatment
      playSound('/music/bankai-byakuya.mp3', 0.8)
    } else {
      playBadge()
    }
  }

  return (
    <div className="panel achievements">
      <h3>
        Badges <span className="ct">07 / 24</span>
      </h3>
      <div className="badge-row">
        {BADGES.map((b) => (
          <div
            key={b.kanji + b.cls}
            className={`badge ${b.cls}`}
            onClick={() => handleBadgeClick(b.cls)}
            style={{ cursor: b.cls === 'locked' ? 'not-allowed' : 'none' }}
          >
            {b.kanji}
            {b.hasRibbon && <span className="ribbon">!</span>}
          </div>
        ))}
      </div>
      <div style={{ font: '600 11px/1.4 var(--font-pixel)', letterSpacing: '.12em', opacity: 0.7 }}>
        ⋆ NEW! &nbsp;&quot;Stayed past midnight&quot; &nbsp;+ 1 chibi sticker
        <br />
        <span style={{ opacity: 0.5 }}>⋆ tap 夢 for bankai · others for chime</span>
      </div>
    </div>
  )
}

export function FunZone() {
  const [pulled, setPulled] = useState(false)

  const handleGacha = () => {
    // Tuturu~ from Steins;Gate = perfect gacha pull sound
    playSound('/music/anime-tututru.mp3', 0.85)
    setPulled(true)
    setTimeout(() => setPulled(false), 3000)
  }

  return (
    <section className="zone fun" id="fun">
      <div className="section-head">
        <div className="left">
          <span className="kana">— ファンゾーン · 04 —</span>
          <h2>
            The <em>funzone</em>.<br />No goals. No grind.
          </h2>
        </div>
        <div className="right">
          Pull a gacha. Read your fortune. Move a pixel sprite around. Collect a sticker.
          The whole point of this room is to do nothing in particular.
          <div className="badge">◈ NO LEADERBOARD ON PURPOSE</div>
        </div>
      </div>

      <div className="fun-grid">
        {/* Gacha machine */}
        <div className="panel gacha crt-scan">
          <span className="corner-tab">★ DAILY GACHA</span>
          <div className="gacha-machine">
            <div className="dome" />
            <div className="balls">
              <i /><i /><i /><i />
            </div>
            <div className="base" />
            <div className="slot" />
            <div className="knob" />
          </div>
          <div className="title">
            Pull a <em>tiny friend</em> from<br />the dream capsule.
          </div>
          <div className="sub">
            One free pull every day at midnight Tokyo time. SSR cats are 0.3% — but the
            chibi ducks are everywhere.
          </div>
          <button
            className="btn"
            onClick={handleGacha}
            style={{
              boxShadow: pulled ? '0 0 24px var(--cyan)' : undefined,
              transition: 'box-shadow .4s',
            }}
          >
            {pulled ? '✿ TUTURU~! CONGRATS!' : <>Pull once <span className="kbd">FREE</span></>}
          </button>
          <div className="pity">
            ⋆ PITY ⋆ <i /><i /><i /><i /><i /><i /><i /><i /> ⋆ 14 / 90
          </div>
        </div>

        {/* Quote */}
        <QuoteCard />

        {/* Pixel game */}
        <div className="panel pixelgame">
          <div className="crt">
            <div className="hud">
              <span>1UP · 04200</span>
              <span>HI · 99999</span>
            </div>
            <div className="ground" />
            <div className="player" />
            <div className="star-p" />
            <div className="star-p" style={{ left: '20%', bottom: '60%', animationDelay: '.4s' }} />
            <div className="star-p" style={{ right: '30%', bottom: '35%', animationDelay: '.7s' }} />
          </div>
          <h3>PIXEL GARDEN</h3>
          <div className="row">
            <span>STAGE 1-2</span>
            <span>★★☆☆☆</span>
          </div>
          <div className="keys">
            <span>← →</span>
            <span>SPACE</span>
            <span>JUMP</span>
            <span>Z · CATCH</span>
          </div>
        </div>

        {/* Achievements */}
        <Achievements />
      </div>
    </section>
  )
}
