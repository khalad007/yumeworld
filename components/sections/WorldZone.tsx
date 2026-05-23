const worlds = [
  {
    num: '01 / 渋谷',
    scene: 'city',
    extra: 'crt-scan',
    sticker: 'NEON ✦ 渋谷',
    stickerClass: '',
    kana: 'YORU NO TOKYO',
    title: 'Midnight Shibuya crossing',
  },
  {
    num: '02 / 部屋',
    scene: 'bedroom',
    extra: '',
    sticker: 'LO-FI ☕',
    stickerClass: 'alt',
    kana: 'COZY ROOM',
    title: 'Lo-fi bedroom',
  },
  {
    num: '03 / 雨',
    scene: 'rain',
    extra: '',
    sticker: '☂ 18°C',
    stickerClass: 'pinkalt',
    kana: 'RAINY WINDOW',
    title: 'Rain-tap on glass',
  },
  {
    num: '04 / 桜',
    scene: 'sakura',
    extra: '',
    sticker: 'SPRING ✿',
    stickerClass: '',
    kana: 'SAKURA GARDEN',
    title: 'Petal storm hill',
  },
  {
    num: '05 / サイバー',
    scene: 'cyber',
    extra: 'crt-scan',
    sticker: 'CYBER ⚡',
    stickerClass: 'alt',
    kana: 'CYBER STREET',
    title: 'Neon arcade alley',
  },
]

export function WorldZone() {
  return (
    <section className="zone world" id="world">
      <div className="section-head">
        <div className="left">
          <span className="kana">— アニメワールド · 01 —</span>
          <h2>
            Five tiny <em>worlds</em>,<br />one big feeling.
          </h2>
        </div>
        <div className="right">
          Each room of Yumeworld has its own weather, soundtrack, and a friend who lives
          there. Hover a panel to peek inside. Click to step in.
          <div className="badge">⌖ EXPLORE THE MAP</div>
        </div>
      </div>

      <div className="panels">
        {worlds.map((w) => (
          <div key={w.num} className={`panel-card c${worlds.indexOf(w) + 1} ${w.extra}`}>
            <div className={`scene ${w.scene}`} />
            <span className="number">{w.num}</span>
            <span className="sticker">
              <span className={`sticker-blob ${w.stickerClass}`}>{w.sticker}</span>
            </span>
            <div className="label">
              <div>
                <div className="kana">{w.kana}</div>
                <h3>{w.title}</h3>
              </div>
              <div className="arrow">→</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}