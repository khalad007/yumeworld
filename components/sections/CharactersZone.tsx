interface Stat {
  label: string
  width: string
  c1?: string
  c2?: string
}

interface Character {
  tab: string
  num: string
  charClass: string
  miniClass: string
  reactionA: string
  reactionB: string
  name: string
  kanji: string
  role: string
  bio: string
  stats: Stat[]
}

const CHARACTERS: Character[] = [
  {
    tab: '★ 01 / GUIDE',
    num: 'char-1',
    charClass: 'char-1',
    miniClass: 'a',
    reactionA: 'きゃー♡',
    reactionB: 'LV.18',
    name: 'Yume',
    kanji: 'ゆめ',
    role: 'DREAM GUIDE · PISCES',
    bio: 'The hostess of Yumeworld. Speaks in soft sentences, always carries an umbrella "just in case."',
    stats: [
      { label: 'KIND',   width: '92%' },
      { label: 'SLEEPY', width: '78%', c1: 'var(--lav)',  c2: 'var(--pink)' },
      { label: 'MAGIC',  width: '65%', c1: 'var(--cyan)', c2: 'var(--lav)'  },
      { label: 'SNACKS', width: '88%', c1: 'var(--peach)',c2: 'var(--pink)' },
    ],
  },
  {
    tab: '★ 02 / HACKER',
    num: 'char-2',
    charClass: 'char-2',
    miniClass: 'b',
    reactionA: '!?',
    reactionB: 'LV.27',
    name: 'Rin',
    kanji: '凛',
    role: 'NETRUNNER · AQUARIUS',
    bio: 'Codes in the arcade alley. Owns nine monitors and exactly one houseplant. Says "lol" out loud.',
    stats: [
      { label: 'SMART',  width: '95%', c1: 'var(--cyan)', c2: 'var(--lav)'  },
      { label: 'CHAOS',  width: '72%', c1: 'var(--pink)', c2: 'var(--peach)'},
      { label: 'SLEEP',  width: '18%', c1: 'var(--lav)',  c2: 'var(--pink)' },
      { label: 'ENERGY', width: '84%', c1: 'var(--peach)',c2: 'var(--cyan)' },
    ],
  },
  {
    tab: '★ 03 / WITCH',
    num: 'char-3',
    charClass: 'char-3',
    miniClass: 'c',
    reactionA: '✦◡✦',
    reactionB: 'LV.99',
    name: 'Hoshi',
    kanji: '星',
    role: 'STAR WITCH · LIBRA',
    bio: 'Reads horoscopes for chibi cats. Brews tea that tastes like the smell of a thunderstorm.',
    stats: [
      { label: 'MAGIC',  width: '99%', c1: 'var(--lav)',  c2: 'var(--pink)' },
      { label: 'DREAMS', width: '90%', c1: 'var(--pink)', c2: 'var(--cyan)' },
      { label: 'VIBES',  width: '100%',c1: 'var(--peach)',c2: 'var(--lav)'  },
      { label: 'FOCUS',  width: '48%', c1: 'var(--cyan)', c2: 'var(--pink)' },
    ],
  },
  {
    tab: '★ 04 / CAT',
    num: 'char-4',
    charClass: 'char-4',
    miniClass: 'd',
    reactionA: 'にゃ〜',
    reactionB: 'LV.0.5',
    name: 'Mochi',
    kanji: 'もち',
    role: 'RAMEN CAT · TAURUS',
    bio: 'Lives inside a tiny ramen bowl. Says exactly one (1) word: "ふわ". Loud purr. Free hugs.',
    stats: [
      { label: 'SOFT',   width: '100%',c1: 'var(--peach)',c2: 'var(--pink)' },
      { label: 'HUNGRY', width: '95%', c1: 'var(--pink)', c2: 'var(--peach)'},
      { label: 'JUMP',   width: '35%', c1: 'var(--cyan)', c2: 'var(--lav)'  },
      { label: 'CHARM',  width: '96%', c1: 'var(--lav)',  c2: 'var(--pink)' },
    ],
  },
]

export function CharactersZone() {
  return (
    <section className="zone chars" id="chars">
      <div className="section-head">
        <div className="left">
          <span className="kana">— キャラクター紹介 · 03 —</span>
          <h2>
            Meet the <em>friends</em>
            <br />who live here.
          </h2>
        </div>
        <div className="right">
          A guide, a cat, a witch, and a programmer who lives in the arcade alley. Tap a
          card — each one has voice lines, idle animations, and a comically big reaction if
          you say something nice.
          <div className="badge">★ FOUR FRIENDS, ZERO DRAMA</div>
        </div>
      </div>

      <div className="char-grid">
        {CHARACTERS.map((c) => (
          <div key={c.name} className={`char ${c.charClass} panel`}>
            <span className="corner-tab">{c.tab}</span>
            <div className="portrait">
              <div className={`mini ${c.miniClass}`}>
                <div className="head">
                  <div className="hair" />
                  <div className="eye l" />
                  <div className="eye r" />
                  <div className="blush l" />
                  <div className="blush r" />
                  <div className="mouth" />
                </div>
                <div className="body" />
              </div>
              <span className="reaction">{c.reactionA}</span>
              <span className="reaction b">{c.reactionB}</span>
            </div>
            <div className="name">
              <h3>{c.name}</h3>
              <span className="id">{c.kanji}</span>
            </div>
            <div className="role">{c.role}</div>
            <p>{c.bio}</p>
            <div className="stats">
              {c.stats.map((s) => (
                <div key={s.label} className="stat">
                  {s.label}
                  <div
                    className="pip"
                    style={
                      {
                        '--w': s.width,
                        '--c1': s.c1 ?? 'var(--pink)',
                        '--c2': s.c2 ?? 'var(--cyan)',
                      } as React.CSSProperties
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}