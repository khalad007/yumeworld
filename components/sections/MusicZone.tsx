'use client'

import { useState, useEffect, useRef } from 'react'
import { useAudio } from '@/lib/AudioContext'

const VIZ = [30, 60, 40, 80, 50, 90, 35, 70, 55, 85, 45, 75, 40, 65, 50, 90, 30, 60, 80, 45, 70, 55, 35, 85]

const TOGGLES = [
  { id: 'rain',   kanji: '雨', label: 'Rain ambience',           sub: 'soft tokyo downpour',         defaultOn: true  },
  { id: 'sakura', kanji: '桜', label: 'Sakura petals',           sub: '+ tiny chime each fall',      defaultOn: true  },
  { id: 'mochi',  kanji: '猫', label: 'Mochi-chan voice popups', sub: '"おかえり！" every 4 min',     defaultOn: false },
  { id: 'crt',    kanji: '星', label: 'CRT scanline filter',     sub: 'retro anime opening vibe',    defaultOn: false },
]

const MOCHI_MESSAGES = [
  'おかえり！ I saved your spot, senpai ✿',
  '今夜も一緒に… Tonight feels like rain and ramen ☔',
  'まだいるよ～ Still here. Soft hours only.',
  'あったかい？ Are you warm? Have some tea ♨',
  'ねぇ、聞いて… The sakura outside just winked at you.',
  'もうすぐ朝… It\'s almost dawn. One more song?',
]

function MoodToggle({
  id, kanji, label, sub, defaultOn, onChange,
}: {
  id: string; kanji: string; label: string; sub: string; defaultOn: boolean
  onChange: (id: string, on: boolean) => void
}) {
  const [on, setOn] = useState(defaultOn)

  const handleClick = () => {
    const next = !on
    setOn(next)
    onChange(id, next)
  }

  return (
    <div className="toggle" onClick={handleClick} style={{ cursor: 'none' }}>
      <div className="l">
        <div className="ic">{kanji}</div>
        <div className="nm">
          {label}
          <small>{sub}</small>
        </div>
      </div>
      <div className={`switch ${on ? 'on' : ''}`} />
    </div>
  )
}

function TokyoClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('ja-JP', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
}

function VolumeSlider() {
  const { volume, setVolume } = useAudio()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
      <span style={{ fontSize: 14 }}>🔈</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        style={{ flex: 1, accentColor: 'var(--pink)', cursor: 'none' }}
      />
      <span style={{ fontSize: 14 }}>🔊</span>
    </div>
  )
}

export function MusicZone() {
  const { playing, rainOn, streamError, togglePlay, toggleRain, playChime, playMochiVoice } = useAudio()

  const [mochiOn, setMochiOn] = useState(false)
  const [mochiMsg, setMochiMsg] = useState<string | null>(null)
  const mochiIdxRef = useRef(0)

  // Mochi-chan popup: fires 2 s after the toggle is switched on, then every 4 min
  useEffect(() => {
    if (!mochiOn) {
      setMochiMsg(null)
      return
    }

    let dismissTimer: ReturnType<typeof setTimeout>

    const show = () => {
      clearTimeout(dismissTimer)
      const i = mochiIdxRef.current
      const msg = MOCHI_MESSAGES[i % MOCHI_MESSAGES.length]
      mochiIdxRef.current++
      setMochiMsg(msg)
      playMochiVoice(i)
      dismissTimer = setTimeout(() => setMochiMsg(null), 7000)
    }

    const firstTimer = setTimeout(show, 2000)
    const interval = setInterval(show, 4 * 60 * 1000)

    return () => {
      clearTimeout(firstTimer)
      clearTimeout(dismissTimer)
      clearInterval(interval)
    }
  }, [mochiOn, playMochiVoice])

  const handleToggle = (id: string, on: boolean) => {
    if (id === 'rain') {
      toggleRain()
      if (on) playChime(440)
    }
    if (id === 'sakura' && on) playChime(660)
    if (id === 'mochi') setMochiOn(on)
  }

  return (
    <section className="zone music" id="music">
      <div className="section-head">
        <div className="left">
          <span className="kana">— ミュージック &amp; ムード · 02 —</span>
          <h2>
            A soundtrack for<br />your <em>feelings.exe</em>
          </h2>
        </div>
        <div className="right">
          Press play. The page will start raining gently, the lanterns will dim, and
          Mochi-chan will whisper &quot;おかえり&quot; the moment the bass drops.
          <div className="badge">
            {playing ? '♪ NOW STREAMING · LO-FI RADIO' : '♪ CLICK PLAY TO BEGIN'}
          </div>
          {streamError && (
            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--peach)', fontFamily: 'var(--font-pixel)', letterSpacing: '.1em', lineHeight: 1.6 }}>
              ⚠ Stream blocked. Try the YouTube embed below or disable your ad-blocker.
            </div>
          )}
        </div>
      </div>

      <div className="music-grid">

        {/* ── Player panel ── */}
        <div className="panel player">
          <span className="corner-tab">
            {playing ? 'ON AIR ⋆ LO-FI' : 'TRACK 06 / 12'}
          </span>

          <div className="vinyl" style={{ animationPlayState: playing ? 'running' : 'paused' }} />

          <div>
            <div className="meta-row">
              <span className="chip pink">ANIMENIGHT ⋆ LO-FI</span>
              <span className="chip cy">
                <TokyoClock /> JST
              </span>
            </div>

            <h3>midnight pocky, slowed &amp; reverbed</h3>
            <div className="artist">YUME × 夢ノイズ feat. ねこ</div>

            <div className="visualizer">
              {VIZ.map((h, i) => (
                <i
                  key={i}
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationPlayState: playing ? 'running' : 'paused',
                    opacity: playing ? 1 : 0.3,
                    transition: 'opacity .4s',
                  }}
                />
              ))}
            </div>

            <div className="timeline">
              <span>∞</span>
              <div className="track">
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg,var(--pink),var(--lav))',
                    borderRadius: 99,
                    animation: playing ? 'load 8s linear infinite' : 'none',
                    width: '42%',
                  }}
                />
              </div>
              <span>24/7</span>
            </div>

            <div className="controls">
              <button className="ctrl" title="Shuffle">⤺</button>
              <button className="ctrl" title="Previous">◄◄</button>
              <button
                className="ctrl play"
                onClick={togglePlay}
                title={playing ? 'Pause' : 'Play lo-fi radio'}
                style={{
                  boxShadow: playing
                    ? '0 0 30px var(--pink), 0 8px 24px rgba(255,122,182,.6)'
                    : '0 8px 24px rgba(255,122,182,.4)',
                  transition: 'box-shadow .4s',
                }}
              >
                {playing ? '❚❚' : '▶'}
              </button>
              <button className="ctrl" title="Next">►►</button>
              <button
                className="ctrl"
                title="Heart — plays a chime"
                onClick={() => playChime(880)}
              >
                ♡
              </button>
              <button className="ctrl" title="Loop">⤳</button>
            </div>

            <VolumeSlider />

            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: rainOn ? 'var(--cyan)' : 'rgba(255,255,255,.2)',
                  boxShadow: rainOn ? '0 0 10px var(--cyan)' : 'none',
                  transition: 'all .4s',
                }}
              />
              <span style={{ font: '600 10px/1 var(--font-pixel)', letterSpacing: '.18em', opacity: rainOn ? 0.9 : 0.35 }}>
                {rainOn ? 'RAIN · ON' : 'RAIN · OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Cassette / mood panel ── */}
        <div className="panel cassette">
          <span className="corner-tab">SIDE B · MIXTAPE</span>

          <div className="cassette-body">
            <div className="label">
              <div className="title">夢のテープ</div>
              <div className="row">
                <span>FOR: SENPAI</span>
                <span>90 MIN</span>
              </div>
              <div className="row">
                <span>SIDE B</span>
                <span>HI-FI ★★★</span>
              </div>
            </div>
            <div className="reels">
              <div className="reel" style={{ animationPlayState: playing ? 'running' : 'paused' }} />
              <div className="reel" style={{ animationPlayState: playing ? 'running' : 'paused' }} />
            </div>
          </div>

          <div className="mood-toggles">
            {TOGGLES.map((t) => (
              <MoodToggle key={t.id} {...t} onChange={handleToggle} />
            ))}
          </div>

          <div className="voice-popup">
            <div className="vc">夢</div>
            <div>
              <p>
                <b>Yume:</b>{' '}
                {playing
                  ? '"おかえり ✿ The rain is for you, senpai. Stay as long as you need."'
                  : '"Today\'s mood is… soft & sparkly ✿ Press play when you\'re ready."'}
              </p>
              <small>
                {playing ? 'NOW PLAYING · LO-FI RADIO · LIVE' : 'VOICE LINE · CUE 014 · 0.8s'}
              </small>
            </div>
          </div>

          {streamError && (
            <div style={{ marginTop: 12, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)' }}>
              <div style={{ font: '600 10px/1 var(--font-pixel)', letterSpacing: '.14em', padding: '8px 12px', opacity: .6 }}>
                ▸ OPEN STREAM DIRECTLY:
              </div>
              <iframe
                width="100%"
                height="80"
                src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0"
                title="Lofi Girl Radio"
                allow="autoplay"
                style={{ display: 'block', border: 'none' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Mochi-chan floating popup ── */}
      {mochiMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 200,
            maxWidth: 270,
            background: 'linear-gradient(135deg, rgba(26,18,53,0.96), rgba(36,24,72,0.96))',
            border: '1px solid var(--pink)',
            borderRadius: 18,
            padding: '14px 16px',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            boxShadow: '0 0 28px rgba(255,122,182,.4), 0 8px 32px rgba(0,0,0,.55)',
            animation: 'mochi-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div
            style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--pink), var(--lav))',
              display: 'grid', placeItems: 'center', fontSize: 20,
            }}
          >
            🐱
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 9px/1 var(--font-pixel)', letterSpacing: '.18em', color: 'var(--pink)', marginBottom: 6 }}>
              MOCHI-CHAN
            </div>
            <div style={{ font: '400 12px/1.6 var(--font-kawaii)', color: '#fff' }}>
              &ldquo;{mochiMsg}&rdquo;
            </div>
          </div>
          <button
            onClick={() => setMochiMsg(null)}
            style={{ opacity: 0.4, fontSize: 18, lineHeight: 1, flexShrink: 0, cursor: 'none', marginTop: 2 }}
            title="dismiss"
          >
            ×
          </button>
        </div>
      )}
    </section>
  )
}
