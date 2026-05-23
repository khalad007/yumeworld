'use client'

import { useEffect, useRef } from 'react'
import { Stars } from '@/components/ui/Stars'

export function Hero() {
  const moonRef = useRef<HTMLDivElement>(null)
  const chibiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      if (moonRef.current)
        moonRef.current.style.transform = `translate(${x * -20}px, ${y * -10}px)`
      if (chibiRef.current)
        chibiRef.current.style.translate = `${x * 14}px ${y * 8}px`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero">
      <Stars />
      <div ref={moonRef} className="moon" />
      <div className="skyline" />

      <div className="hero-grid">
        {/* Left — copy */}
        <div>
          <div className="eyebrow">
            <span className="jp">⋆˙⟡ ゆめの世界へようこそ</span>
            <span className="en">SEASON 02 · EP. 06</span>
          </div>

          <h1 className="h1">
            <span className="row1">Step into a</span>
            <span className="row2">dream you can</span>
            <span className="row1">
              never wake up<span style={{ color: 'var(--pink)' }}>.</span>
            </span>
            <span className="kanji">夢 ⋆ 永遠 ⋆ ゆめ</span>
          </h1>

          <p className="sub">
            Yumeworld is a cozy little corner of the internet — part visual novel, part Tokyo
            midnight, part sakura garden after the rain.{' '}
            <b>Press start</b>, meet the friends, spin the gacha, and stay as long as your
            heart needs.
          </p>

          <div className="cta-row">
            <button className="btn">
              Press to begin <span className="kbd">SPACE</span>
            </button>
            <button className="btn ghost">
              Watch the opening <span className="kbd">2:14</span>
            </button>
          </div>

          <div className="loading">
            <div className="lbl">
              <span>LOADING DREAM ⋆ 78%</span>
              <span>area_03 / sakura.glow</span>
            </div>
            <div className="bar" />
            <div className="meta">⋆ booting kawaii.exe ⋆ caching petals ⋆ tuning lo-fi ⋆ feeding cat</div>
          </div>
        </div>

        {/* Right — mascot stage */}
        <div className="stage">
          <div className="halo" />

          <div ref={chibiRef} className="chibi">
            <div className="hair">
              <div className="bow" />
            </div>
            <div className="head">
              <div className="lash l" />
              <div className="lash r" />
              <div className="eye l" />
              <div className="eye r" />
              <div className="blush l" />
              <div className="blush r" />
              <div className="mouth" />
            </div>
            <div className="collar" />
            <div className="body" />
          </div>

          {/* Floating UI cards */}
          <div
            className="ui ui-card"
            style={{ top: 30, left: -10, animationDelay: '.4s' }}
          >
            <div className="k">⋆ MOOD METER</div>
            <div className="v">Soft &amp; sparkly</div>
            <div className="b" />
          </div>
          <div
            className="ui ui-card"
            style={{ bottom: 80, right: -20, animationDelay: '1s' }}
          >
            <div className="k">⋆ NOW PLAYING</div>
            <div className="v">midnight pocky 🍡</div>
          </div>
          <div
            className="ui speech"
            style={{ top: 90, right: 0, animationDelay: '.2s' }}
          >
            Welcome back, senpai!
            <small>Yume · 18 · Dream Guide</small>
          </div>
          <div className="ui heart" style={{ top: 140, left: 30 }} />
          <div
            className="ui heart"
            style={{ bottom: 200, right: 20, animationDelay: '1s' }}
          />
          <div
            className="ui star-deco"
            style={{ top: 60, right: 60 }}
          >
            ✦
          </div>
          <div
            className="ui star-deco"
            style={{
              bottom: 140,
              left: 40,
              color: 'var(--pink)',
              textShadow: '0 0 14px var(--pink)',
            }}
          >
            ✧
          </div>
          <div
            className="ui floating-deco"
            style={{
              bottom: 60,
              left: -10,
              color: 'var(--cyan)',
              fontSize: 32,
              textShadow: '0 0 18px var(--cyan)',
            }}
          >
            ラーメン
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="hero-foot">
        <div className="ticker">
          <div className="num">12,482</div>
          <div className="lbl">friends online<br />right now</div>
        </div>
        <div className="ticker">
          <div className="num">5</div>
          <div className="lbl">anime worlds<br />to explore</div>
        </div>
        <div className="ticker">
          <div className="num">∞</div>
          <div className="lbl">cherry blossoms<br />shed today</div>
        </div>
        <div className="ticker">
          <div className="num">02:14</div>
          <div className="lbl">Tokyo local<br />time in-world</div>
        </div>
      </div>
    </section>
  )
}