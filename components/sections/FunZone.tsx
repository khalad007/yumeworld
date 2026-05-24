'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/lib/AudioContext'

function playSound(src: string, volume = 0.82) {
  const a = new Audio(src)
  a.volume = volume
  a.play().catch(() => {})
}

// ─── Gacha types & data ───────────────────────────────────────────────────────

type Rarity = 'SSR' | 'SR' | 'R' | 'N'

interface GachaItem {
  id: string
  name: string
  kanji: string
  rarity: Rarity
  pulledAt: number
}

interface GachaState {
  pulled: GachaItem[]
  pity: number
}

const GACHA_POOL: Omit<GachaItem, 'id' | 'pulledAt'>[] = [
  { name: 'Dream Witch',   kanji: '夢魔', rarity: 'SSR' },
  { name: 'Moon Cat',      kanji: '月猫', rarity: 'SSR' },
  { name: 'Yume-chan',     kanji: '夢子', rarity: 'SSR' },
  { name: 'Sakura Spirit', kanji: '桜霊', rarity: 'SR'  },
  { name: 'Star Bunny',    kanji: '星兎', rarity: 'SR'  },
  { name: 'Lav Fairy',     kanji: '花精', rarity: 'SR'  },
  { name: 'Rain Girl',     kanji: '雨女', rarity: 'SR'  },
  { name: 'Cozy Duck',     kanji: '鴨',   rarity: 'R'   },
  { name: 'Cloud Cat',     kanji: '雲猫', rarity: 'R'   },
  { name: 'Konbini Fox',   kanji: '狐',   rarity: 'R'   },
  { name: 'Pixel Frog',    kanji: '蛙',   rarity: 'R'   },
  { name: 'Boba Witch',    kanji: '茶魔', rarity: 'R'   },
  { name: 'Plain Bread',   kanji: '麦',   rarity: 'N'   },
  { name: 'Mystery Bean',  kanji: '豆',   rarity: 'N'   },
  { name: 'Tiny Rock',     kanji: '石',   rarity: 'N'   },
  { name: 'Soggy Fern',    kanji: '草',   rarity: 'N'   },
  { name: 'Old Stamp',     kanji: '印',   rarity: 'N'   },
]

const RARITY_CONFIG: Record<Rarity, { starLabel: string; badgeCls: string }> = {
  SSR: { starLabel: '✦✦✦ SSR', badgeCls: 'gold' },
  SR:  { starLabel: '✦✦☆ SR',  badgeCls: 'lav'  },
  R:   { starLabel: '✦☆☆ R',   badgeCls: 'pink' },
  N:   { starLabel: '☆☆☆ N',   badgeCls: 'n'    },
}

const STORAGE_KEY = 'yumeworld-gacha'

function loadGachaState(): GachaState {
  if (typeof window === 'undefined') return { pulled: [], pity: 0 }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as GachaState) : { pulled: [], pity: 0 }
  } catch {
    return { pulled: [], pity: 0 }
  }
}

function saveGachaState(state: GachaState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function doRoll(pity: number): { item: GachaItem; newPity: number } {
  let rarity: Rarity
  if (pity >= 89) {
    rarity = 'SSR'
  } else {
    const r = Math.random() * 100
    if (r < 3)       rarity = 'SSR'
    else if (r < 15) rarity = 'SR'
    else if (r < 50) rarity = 'R'
    else              rarity = 'N'
  }
  const candidates = GACHA_POOL.filter(i => i.rarity === rarity)
  const base = candidates[Math.floor(Math.random() * candidates.length)]
  return {
    item: { ...base, id: `${Date.now()}-${Math.random()}`, pulledAt: Date.now() },
    newPity: rarity === 'SSR' ? 0 : pity + 1,
  }
}

// ─── Quote card ───────────────────────────────────────────────────────────────

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

// ─── Achievements ─────────────────────────────────────────────────────────────

const STATIC_BADGES = [
  { cls: 'gold',  kanji: '夢', hasRibbon: true  },
  { cls: 'pink',  kanji: '猫', hasRibbon: false },
  { cls: 'cy',    kanji: '星', hasRibbon: false },
  { cls: 'lav',   kanji: '桜', hasRibbon: false },
  { cls: 'peach', kanji: '麺', hasRibbon: false },
]

function Achievements({ gachaItems }: { gachaItems: GachaItem[] }) {
  const { playBadge } = useAudio()

  const handleBadgeClick = (cls: string) => {
    if (cls === 'locked') return
    if (cls === 'gold') {
      playSound('/music/bankai-byakuya.mp3', 0.8)
    } else {
      playBadge()
    }
  }

  const totalUnlocked = STATIC_BADGES.length + gachaItems.length
  const showGacha = gachaItems.slice(0, 13)
  const lockedCount = Math.max(0, 1 - showGacha.length)

  return (
    <div className="panel achievements">
      <h3>
        Badges <span className="ct">{String(totalUnlocked).padStart(2, '0')} / 24</span>
      </h3>
      <div className="badge-row">
        {STATIC_BADGES.map((b) => (
          <div
            key={b.kanji + b.cls}
            className={`badge ${b.cls}`}
            onClick={() => handleBadgeClick(b.cls)}
            style={{ cursor: 'none' }}
          >
            {b.kanji}
            {b.hasRibbon && <span className="ribbon">!</span>}
          </div>
        ))}
        {showGacha.map((item) => (
          <motion.div
            key={item.id}
            className={`badge ${RARITY_CONFIG[item.rarity].badgeCls}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => playBadge()}
            style={{ cursor: 'none' }}
            title={`${item.name} (${item.rarity})`}
          >
            {item.kanji}
          </motion.div>
        ))}
        {Array.from({ length: lockedCount }).map((_, i) => (
          <div key={`locked-${i}`} className="badge locked" style={{ cursor: 'not-allowed' }}>?</div>
        ))}
      </div>
      <div style={{ font: '600 11px/1.4 var(--font-pixel)', letterSpacing: '.12em', opacity: 0.7 }}>
        ⋆ NEW! &nbsp;&quot;Stayed past midnight&quot; &nbsp;+ 1 chibi sticker
        <br />
        <span style={{ opacity: 0.5 }}>⋆ tap 夢 for bankai · pull gacha to earn more badges</span>
      </div>
    </div>
  )
}

// ─── Gacha result modal ───────────────────────────────────────────────────────

function GachaModal({ item, onClose }: { item: GachaItem; onClose: () => void }) {
  const cfg = RARITY_CONFIG[item.rarity]

  return (
    <motion.div
      className="gacha-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className={`gacha-result gacha-result--${item.rarity.toLowerCase()}`}
        initial={{ scale: 0.4, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 220, delay: 0.05 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gacha-shine" />

        <div className={`gacha-rarity-chip gacha-rarity-chip--${item.rarity.toLowerCase()}`}>
          {cfg.starLabel}
        </div>

        <motion.div
          className={`badge ${cfg.badgeCls} gacha-item-icon`}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.2 }}
        >
          {item.kanji}
        </motion.div>

        <motion.div
          className="gacha-item-name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          {item.name}
        </motion.div>

        <button className="gacha-close-btn btn ghost" onClick={onClose}>
          ✕ NICE
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Pixel Mini-Game ─────────────────────────────────────────────────────────

const PIXEL_KEY = 'yumeworld-pixelgame'

function PixelGame() {
  const panelRef      = useRef<HTMLDivElement>(null)
  const crtRef        = useRef<HTMLDivElement>(null)
  const scoreSpanRef  = useRef<HTMLSpanElement>(null)
  const hiSpanRef     = useRef<HTMLSpanElement>(null)
  const activeRef     = useRef(false)
  const savedHiRef    = useRef(0)
  const [active, setActive] = useState(false)

  // Load hi-score from localStorage on mount
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(PIXEL_KEY) || '{}')
      savedHiRef.current = d.hiScore || 0
    } catch {}
    if (hiSpanRef.current) {
      hiSpanRef.current.textContent = `HI · ${String(savedHiRef.current).padStart(5, '0')}`
    }
  }, [])

  // Deactivate on click outside
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (activeRef.current && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        activeRef.current = false
        setActive(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Game loop — runs only while active
  useEffect(() => {
    if (!active) return
    const crt = crtRef.current
    if (!crt) return

    const PW = 24, PH = 24, SW = 10, SH = 10
    const SPEED = 2.5, JUMP = 7, GRAV = 0.42

    const W  = crt.clientWidth
    const H  = crt.clientHeight
    const GH = H * 0.3   // ground height in px (matches CSS bottom: 30%)
    if (W === 0 || H === 0) return

    // ── player element ──
    const pEl = document.createElement('div')
    pEl.className = 'player'
    pEl.style.animation = 'none'
    crt.appendChild(pEl)

    let px = W * 0.3, py = GH, vy = 0, grounded = true
    let score = 0, hiScore = savedHiRef.current

    // ── stars ──
    interface Star { el: HTMLDivElement; x: number; y: number }
    const stars: Star[] = []
    const spawnTimers: ReturnType<typeof setTimeout>[] = []

    const spawnStar = () => {
      const el = document.createElement('div')
      el.className = 'star-p'
      el.style.right = 'auto'                           // override CSS `right: 20%`
      const x = 10 + Math.random() * (W - SW - 20)
      el.style.left   = x + 'px'
      el.style.bottom = GH + 'px'
      crt.appendChild(el)
      stars.push({ el, x, y: GH })
    }

    const scheduleSpawn = () => {
      const id = setTimeout(() => {
        if (activeRef.current) spawnStar()
      }, 1200 + Math.random() * 1800)
      spawnTimers.push(id)
    }

    for (let i = 0; i < 3; i++) spawnStar()

    const updateHUD = () => {
      if (scoreSpanRef.current) scoreSpanRef.current.textContent = `1UP · ${String(score).padStart(5, '0')}`
      if (hiSpanRef.current)    hiSpanRef.current.textContent    = `HI · ${String(hiScore).padStart(5, '0')}`
    }
    updateHUD()

    // ── keyboard state ──
    const keys: Record<string, boolean> = {}
    const onKeyDown = (e: KeyboardEvent) => {
      if (!activeRef.current) return
      keys[e.key] = true
      if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault()
    }
    const onKeyUp = (e: KeyboardEvent) => { keys[e.key] = false }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup',   onKeyUp)

    // ── RAF loop ──
    let raf: number
    const loop = () => {
      if (!activeRef.current) return

      // horizontal movement
      if (keys['ArrowLeft']  || keys['a']) px = Math.max(0,        px - SPEED)
      if (keys['ArrowRight'] || keys['d']) px = Math.min(W - PW,   px + SPEED)

      // jump
      if ((keys[' '] || keys['ArrowUp'] || keys['w']) && grounded) {
        vy = JUMP; grounded = false
      }

      // gravity & vertical position
      if (!grounded) { vy -= GRAV; py += vy }
      if (py <= GH)  { py = GH; vy = 0; grounded = true }

      pEl.style.left   = px + 'px'
      pEl.style.bottom = py + 'px'

      // star collision (AABB in bottom-coord space)
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        if (px < s.x + SW && px + PW > s.x && py < s.y + SH && py + PH > s.y) {
          s.el.remove()
          stars.splice(i, 1)
          score++
          if (score > hiScore) {
            hiScore = score
            savedHiRef.current = hiScore
            try { localStorage.setItem(PIXEL_KEY, JSON.stringify({ hiScore })) } catch {}
          }
          updateHUD()
          scheduleSpawn()
        }
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup',   onKeyUp)
      spawnTimers.forEach(clearTimeout)
      pEl.remove()
      stars.forEach(s => s.el.remove())
    }
  }, [active])

  const activate = () => {
    if (!activeRef.current) {
      activeRef.current = true
      setActive(true)
    }
  }

  return (
    <div className="panel pixelgame" ref={panelRef} onClick={activate}>
      <div className="crt" ref={crtRef}>
        <div className="hud">
          <span ref={scoreSpanRef}>1UP · 00000</span>
          <span ref={hiSpanRef}>HI · 00000</span>
        </div>
        <div className="ground" />
        {!active && (
          <>
            <div className="player" />
            <div className="star-p" />
            <div className="star-p" style={{ left: '20%', bottom: '60%', animationDelay: '.4s' }} />
            <div className="star-p" style={{ right: '30%', bottom: '35%', animationDelay: '.7s' }} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              font: '700 9px/1 var(--font-arcade)', color: 'var(--pink)',
              letterSpacing: '.14em', background: 'rgba(7,3,20,0.6)',
            }}>
              CLICK TO PLAY
            </div>
          </>
        )}
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
  )
}

// ─── FunZone ──────────────────────────────────────────────────────────────────

export function FunZone() {
  const [pulling, setPulling]               = useState(false)
  const [capsuleVisible, setCapsuleVisible] = useState(false)
  const [pullResult, setPullResult]         = useState<GachaItem | null>(null)
  const [pityCount, setPityCount]           = useState(0)
  const [pulledHistory, setPulledHistory]   = useState<GachaItem[]>([])

  useEffect(() => {
    const state = loadGachaState()
    setPityCount(state.pity)
    setPulledHistory(state.pulled)
  }, [])

  const handleGacha = () => {
    if (pulling) return
    playSound('/music/anime-tututru.mp3', 0.85)
    setPulling(true)

    const currentState = loadGachaState()
    const { item, newPity } = doRoll(currentState.pity)

    // Phase 1: machine shakes (900ms)
    setTimeout(() => {
      setCapsuleVisible(true)

      // Phase 2: capsule drops (600ms)
      setTimeout(() => {
        setCapsuleVisible(false)
        const newPulled = [item, ...currentState.pulled]
        const newState: GachaState = { pulled: newPulled, pity: newPity }
        saveGachaState(newState)
        setPulledHistory(newPulled)
        setPityCount(newPity)
        setPullResult(item)
        setPulling(false)
      }, 600)
    }, 900)
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
        {/* ── Gacha panel ── */}
        <div className="panel gacha crt-scan">
          <span className="corner-tab">★ DAILY GACHA</span>

          <motion.div
            className="gacha-machine"
            animate={pulling ? { x: [0, -10, 10, -8, 8, -5, 5, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
          >
            <motion.div
              className="dome"
              animate={
                pulling
                  ? {
                      boxShadow: [
                        '0 20px 50px rgba(255,122,182,.4), inset 0 -10px 30px rgba(0,0,0,.2)',
                        '0 20px 90px rgba(255,183,213,.9), 0 0 60px rgba(255,183,213,.7), inset 0 -10px 30px rgba(0,0,0,.2)',
                        '0 20px 50px rgba(255,122,182,.4), inset 0 -10px 30px rgba(0,0,0,.2)',
                        '0 20px 80px rgba(184,164,255,.8), 0 0 50px rgba(184,164,255,.6), inset 0 -10px 30px rgba(0,0,0,.2)',
                        '0 20px 50px rgba(255,122,182,.4), inset 0 -10px 30px rgba(0,0,0,.2)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.9 }}
            />
            <div className="balls">
              <i /><i /><i /><i />
            </div>
            <div className="base" />
            <div className="slot" />
            <div className="knob" />

            <AnimatePresence>
              {capsuleVisible && (
                <motion.div
                  key="capsule"
                  className="gacha-capsule"
                  style={{ position: 'absolute', left: '50%', top: 215 }}
                  initial={{ y: -10, x: '-50%', opacity: 0, scale: 0.4 }}
                  animate={{ y: 50, x: '-50%', opacity: 1, scale: 1 }}
                  exit={{ y: 110, x: '-50%', opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.55, ease: 'easeIn' }}
                />
              )}
            </AnimatePresence>
          </motion.div>

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
            disabled={pulling}
            style={{
              position: 'relative', zIndex: 1,
              opacity: pulling ? 0.7 : 1,
              transition: 'opacity .2s',
            }}
          >
            {pulling ? '✿ PULLING...' : <>Pull once <span className="kbd">FREE</span></>}
          </button>
          <div className="pity">
            ⋆ PITY ⋆ <i /><i /><i /><i /><i /><i /><i /><i /> ⋆ {pityCount} / 90
          </div>
        </div>

        {/* ── Quote ── */}
        <QuoteCard />

        {/* ── Pixel game ── */}
        <PixelGame />

        {/* ── Achievements ── */}
        <Achievements gachaItems={pulledHistory} />
      </div>

      {/* ── Gacha result modal ── */}
      <AnimatePresence>
        {pullResult && (
          <GachaModal item={pullResult} onClose={() => setPullResult(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
