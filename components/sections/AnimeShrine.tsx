'use client'

import { useState } from 'react'

// encode only the filename so emoji/space filenames serve correctly
function photo(filename: string) {
  return `/photo/${encodeURIComponent(filename)}`
}
function music(filename: string) {
  return `/music/${filename}`
}

function playSound(src: string, volume = 0.82) {
  const a = new Audio(src)
  a.volume = volume
  a.play().catch(() => {})
}

// ── Character card data ────────────────────────────────────────────────────────
const CHARACTERS = [
  {
    name: 'Fern',
    series: 'Frieren: Beyond Journey\'s End',
    role: 'Mage Apprentice',
    quote: '"You\'re such a baka, Stark."',
    photo: photo('Fern - Pouting.jpg'),
    sound: music('baka-baka-baka.mp3'),
    soundLabel: 'BAKA BAKA BAKA!',
    accent: '#B8A4FF',
  },
  {
    name: 'Gojo Satoru',
    series: 'Jujutsu Kaisen',
    role: 'The Strongest',
    quote: '"I\'ll show you what the strongest looks like."',
    photo: photo('Gojo satoru cute♡.jpg'),
    sound: music('sukunas-ryoiki-tenkai.mp3'),
    soundLabel: 'RYOIKI TENKAI',
    accent: '#6EF2FF',
  },
  {
    name: 'Frieren',
    series: 'Frieren: Beyond Journey\'s End',
    role: 'Elven Mage · 1000+ yrs',
    quote: '"Humans are so fleeting... and so interesting."',
    photo: photo('Frieren 💫.jpg'),
    sound: music('a-kiss-from-frieren.mp3'),
    soundLabel: '♪ A KISS FROM FRIEREN',
    accent: '#FFB7D5',
  },
  {
    name: 'Yui Hirasawa',
    series: 'K-On!',
    role: 'Light Music Club · Guitar',
    quote: '"Let\'s go! After school tea time!"',
    photo: photo('Hirasawa.Yui.webp'),
    sound: music('mamboman-bo-shi-ge-ju-matikanetannhauser.mp3'),
    soundLabel: '♪ MAMBOMAN',
    accent: '#FFD4A8',
  },
  {
    name: 'Rikka Takanashi',
    series: 'Chūnibyō demo Koi ga Shitai!',
    role: 'Wielder of the Wicked Eye',
    quote: '"Servants of darkness, lend me your power!"',
    photo: photo('Rikka Takanashi.jpg'),
    sound: music('beam-fire.mp3'),
    soundLabel: '⚡ BEAM FIRE!',
    accent: '#FFB7D5',
  },
  {
    name: 'Shōko Komi',
    series: 'Komi Can\'t Communicate',
    role: 'Communication Disorder',
    quote: '"......"',
    photo: photo('Shouko Komi.jpg'),
    sound: music('ara-ara-mana-mature-female.mp3'),
    soundLabel: '～ ARA ARA',
    accent: '#A8D8FF',
  },
]

// ── Kuru kuru picker roster ────────────────────────────────────────────────────
const KURU_ROSTER = [
  { label: 'Herta',   src: photo('herta-kuru-kuru.png') },
  { label: 'Fern',    src: photo('Fern - Pouting.jpg') },
  { label: 'Frieren', src: photo('Frieren 💫.jpg') },
  { label: 'Frieren 2', src: photo('Frieren\'s Satisfied Face.jpg') },
  { label: 'Gojo',    src: photo('Gojo satoru cute♡.jpg') },
  { label: 'Yui',     src: photo('Hirasawa.Yui.webp') },
  { label: 'Rikka',   src: photo('Rikka Takanashi.jpg') },
  { label: 'Komi',    src: photo('Shouko Komi.jpg') },
]

// ── Extra one-shot sounds ──────────────────────────────────────────────────────
const EXTRA_SOUNDS = [
  { label: 'ARA ARA',  file: 'shinobu-ara-ara-sayonara.mp3' },
  { label: 'TUTURU~',  file: 'anime-tututru.mp3' },
  { label: 'BANKAI',   file: 'bankai-byakuya.mp3' },
  { label: 'ARIGATO',  file: 'arigato.mp3' },
  { label: 'BAKA~',   file: 'bakaaaaaa.mp3' },
  { label: 'HERTA',    file: 'herta.mp3' },
  { label: 'ARA MANA', file: 'ara-ara.mp3' },
  { label: 'SAYONARA', file: 'madeinabyss-small-sound-tone.mp3' },
]

// ── Individual character card ──────────────────────────────────────────────────
function CharCard({ c }: { c: typeof CHARACTERS[0] }) {
  const [active, setActive] = useState(false)

  const handle = () => {
    playSound(c.sound)
    setActive(true)
    setTimeout(() => setActive(false), 1600)
  }

  return (
    <div
      className="anime-card"
      onClick={handle}
      style={{
        borderColor: active ? c.accent : undefined,
        boxShadow: active ? `0 0 32px ${c.accent}55, 0 20px 60px rgba(0,0,0,.45)` : undefined,
        cursor: 'none',
      }}
    >
      <div className="anime-portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.photo} alt={c.name} className="anime-photo" />
        <div className="anime-shade" style={{ background: `linear-gradient(to top, ${c.accent}44 0%, transparent 55%)` }} />
        {active && (
          <div className="anime-flash" style={{ borderColor: c.accent, boxShadow: `inset 0 0 40px ${c.accent}33` }} />
        )}
      </div>
      <div className="anime-info">
        <div className="anime-series">{c.series}</div>
        <div className="anime-name">{c.name}</div>
        <div className="anime-role" style={{ color: c.accent }}>{c.role}</div>
        <div className="anime-quote">{c.quote}</div>
        <button
          className="anime-btn"
          style={{
            borderColor: c.accent,
            color: c.accent,
            background: active ? `${c.accent}22` : 'transparent',
          }}
        >
          {active ? '▶ PLAYING...' : `▶ ${c.soundLabel}`}
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Main section
// ══════════════════════════════════════════════════════════════════════════════
export function AnimeShrine() {
  const [current, setCurrent] = useState(KURU_ROSTER[0])
  const [flash, setFlash] = useState(false)

  const pick = (item: typeof KURU_ROSTER[0]) => {
    setCurrent(item)
    playSound('/music/herta-kuru-kuru.mp3', 0.75)
    setFlash(true)
    setTimeout(() => setFlash(false), 700)
  }

  return (
    <section className="zone shrine" id="shrine">

      {/* ── Section header ── */}
      <div className="section-head">
        <div className="left">
          <span className="kana">— アニメ聖地 · 05 —</span>
          <h2>
            Pocket shrine for your<br /><em>fictional obsessions.</em>
          </h2>
        </div>
        <div className="right">
          Click any card to hear their signature moment.
          Every character deserves at least one internet shrine.
          No gatekeeping. All welcome.
          <div className="badge">◈ FICTIONAL CHARACTERS ONLY · NO JUDGES HERE</div>
        </div>
      </div>

      {/* ── Character cards ── */}
      <div className="anime-grid">
        {CHARACTERS.map((c) => <CharCard key={c.name} c={c} />)}
      </div>

      {/* ── Kuru Kuru Studio ── */}
      <div className="kuru-studio">

        {/* Left — spinning stage */}
        <div className="kuru-stage-col">
          <div className="kuru-heading">
            <span className="kana" style={{ fontSize: 11 }}>— くるくるスタジオ —</span>
            <h3>Make anyone<br /><em>kuru kuru</em></h3>
            <p style={{ font: '400 12px/1.6 var(--font-kawaii)', opacity: .65, marginTop: 6 }}>
              Inspired by{' '}
              <a href="https://herta.qzz.io" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--lav)', textDecoration: 'underline' }}>
                herta.qzz.io
              </a>
              {' '}·{' '}
              <a href="https://github.com/sr229/kuru-kuru" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'underline', fontSize: 11 }}>
                GitHub ↗
              </a>
            </p>
          </div>

          <div className="kuru-ring" style={{ boxShadow: flash ? '0 0 50px var(--lav), 0 0 80px var(--pink)' : '0 0 24px rgba(184,164,255,.25)' }}>
            <div className="kuru-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={current.label} className="kuru-img" />
            </div>
          </div>

          <div className="kuru-tag">くるくる～</div>
          <div style={{ font: '700 9px/1 var(--font-pixel)', letterSpacing: '.2em', opacity: .4 }}>
            SPINNING: {current.label.toUpperCase()}
          </div>
        </div>

        {/* Right — picker + extras */}
        <div className="kuru-controls">
          <div className="kuru-section-label">▸ PICK A CHARACTER TO SPIN</div>
          <div className="kuru-picker">
            {KURU_ROSTER.map((item) => (
              <div
                key={item.src}
                className={`kuru-thumb${current.src === item.src ? ' active' : ''}`}
                onClick={() => pick(item)}
                style={{ cursor: 'none' }}
                title={item.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.label} className="kuru-thumb-img" />
                {current.src === item.src && <div className="kuru-active-ring" />}
              </div>
            ))}
          </div>

          <div className="kuru-section-label" style={{ marginTop: 20 }}>▸ SOUNDBOARD</div>
          <div className="soundboard">
            {EXTRA_SOUNDS.map((s) => (
              <button
                key={s.label}
                className="sb-btn"
                onClick={() => playSound(music(s.file))}
                style={{ cursor: 'none' }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div style={{
            marginTop: 20,
            padding: '14px 18px',
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 14,
            font: '400 11px/1.7 var(--font-kawaii)',
            opacity: .6,
          }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, letterSpacing: '.18em', opacity: .8 }}>
              ⋆ ABOUT KURU KURU
            </span>
            <br />
            Herta from Honkai: Star Rail spins in place and says "くるくる" (kuru kuru = spinning around).
            Someone turned it into a website. Someone else made a whole GitHub repo.
            We put it in a shrine. The internet is beautiful.
          </div>
        </div>

      </div>
    </section>
  )
}
