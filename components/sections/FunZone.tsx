'use client'

import { useState } from 'react'

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

  const reroll = () => {
    setFading(true)
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

export function FunZone() {
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
              <i />
              <i />
              <i />
              <i />
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
          <button className="btn">
            Pull once <span className="kbd">FREE</span>
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
        <div className="panel achievements">
          <h3>
            Badges <span className="ct">07 / 24</span>
          </h3>
          <div className="badge-row">
            <div className="badge gold">夢<span className="ribbon">!</span></div>
            <div className="badge pink">猫</div>
            <div className="badge cy">星</div>
            <div className="badge lav">桜</div>
            <div className="badge peach">麺</div>
            <div className="badge locked">?</div>
          </div>
          <div
            style={{
              font: '600 11px/1.4 var(--font-pixel)',
              letterSpacing: '.12em',
              opacity: 0.7,
            }}
          >
            ⋆ NEW! &nbsp;&quot;Stayed past midnight&quot; &nbsp;+ 1 chibi sticker
          </div>
        </div>
      </div>
    </section>
  )
}