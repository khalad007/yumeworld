'use client'

import { useState } from 'react'

const VISUALIZER_HEIGHTS = [
  30, 60, 40, 80, 50, 90, 35, 70, 55, 85, 45, 75, 40, 65, 50, 90, 30, 60, 80, 45, 70, 55, 35, 85,
]

const MOOD_TOGGLES = [
  { kanji: '雨', label: 'Rain ambience', sub: 'soft tokyo downpour', defaultOn: true },
  { kanji: '桜', label: 'Sakura petals', sub: '+ tiny chime each fall', defaultOn: true },
  { kanji: '猫', label: 'Mochi-chan voice popups', sub: '"おかえり！" every 4 min', defaultOn: false },
  { kanji: '星', label: 'CRT scanline filter', sub: 'retro anime opening vibe', defaultOn: false },
]

function MoodToggle({
  kanji,
  label,
  sub,
  defaultOn = false,
}: {
  kanji: string
  label: string
  sub: string
  defaultOn?: boolean
}) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="toggle" onClick={() => setOn((v) => !v)}>
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

function PlayButton() {
  const [playing, setPlaying] = useState(false)
  return (
    <button className={`ctrl play`} onClick={() => setPlaying((v) => !v)}>
      {playing ? '❚❚' : '▶'}
    </button>
  )
}

export function MusicZone() {
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
          <div className="badge">♪ FAKE PLAYER · NO AUDIO</div>
        </div>
      </div>

      <div className="music-grid">
        {/* Player */}
        <div className="panel player">
          <span className="corner-tab">TRACK 06 / 12</span>
          <div className="vinyl" />
          <div>
            <div className="meta-row">
              <span className="chip pink">ANIMENIGHT ⋆ LO-FI</span>
              <span className="chip cy">128 BPM</span>
            </div>
            <h3>midnight pocky, slowed &amp; reverbed</h3>
            <div className="artist">YUME × 夢ノイズ feat. ねこ</div>

            <div className="visualizer">
              {VISUALIZER_HEIGHTS.map((h, i) => (
                <i
                  key={i}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            <div className="timeline">
              <span>1:24</span>
              <div className="track" />
              <span>3:18</span>
            </div>

            <div className="controls">
              <button className="ctrl">⤺</button>
              <button className="ctrl">◄◄</button>
              <PlayButton />
              <button className="ctrl">►►</button>
              <button className="ctrl">♡</button>
              <button className="ctrl">⤳</button>
            </div>
          </div>
        </div>

        {/* Cassette */}
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
              <div className="reel" />
              <div className="reel" />
            </div>
          </div>

          <div className="mood-toggles">
            {MOOD_TOGGLES.map((t) => (
              <MoodToggle key={t.kanji} {...t} />
            ))}
          </div>

          <div className="voice-popup">
            <div className="vc">夢</div>
            <div>
              <p>
                <b>Yume:</b> &quot;Today&apos;s mood is… soft &amp; sparkly ✿ I picked the
                rainy track for you, senpai.&quot;
              </p>
              <small>VOICE LINE · CUE 014 · 0.8s</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}