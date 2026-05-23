const LANTERNS = [
  { top: '18%', left: '8%',   delay: 0   },
  { top: '30%', left: '22%',  delay: 0.5 },
  { top: '14%', left: '46%',  delay: 1   },
  { top: '36%', left: '68%',  delay: 1.5 },
  { top: '20%', right: '8%',  delay: 2   },
  { top: '42%', right: '22%', delay: 2.5 },
]

export function Ending() {
  return (
    <section className="ending" id="ending">
      {/* Lanterns */}
      <div className="lanterns">
        {LANTERNS.map((l, i) => (
          <div
            key={i}
            className="lantern"
            style={{
              top: l.top,
              left: (l as { left?: string }).left,
              right: (l as { right?: string }).right,
              animationDelay: `${l.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="skyline-2" />

      <div className="ending-inner">
        <span className="stamp">⋆ FINAL EP. ⋆ FADE TO PINK ⋆</span>
        <h2 style={{ marginTop: 20 }}>
          Until next time,<br />
          stay{' '}
          <em
            style={{
              fontStyle: 'normal',
              background: 'linear-gradient(120deg,#fff,#FFD4A8)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            soft
          </em>
          , senpai.
        </h2>

        <div className="kana">またね ⋆ MATA NE ⋆ SEE YOU SOON</div>

        <p>
          Yumeworld will be here when you come back — same petals, same cat, same lo-fi.
          Leave the tab open. Don&apos;t say goodbye, say &quot;また明日.&quot;
        </p>

        {/* Waving mascot */}
        <div className="mascot-wave">
          <div className="head">
            <div className="eyes">
              <i />
              <i />
            </div>
            <div className="hand" />
          </div>
        </div>

        <div className="signoff">
          <span className="jp">ありがとう ⋆ また会おうね</span>
          <span className="en">THANK YOU FOR DREAMING WITH US</span>
        </div>
      </div>
    </section>
  )
}