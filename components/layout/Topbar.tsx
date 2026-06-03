export function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="logomark" />
        <div>
          Yumeworld
          <small>ゆめワールド ⋆ v2.6</small>
        </div>
      </div>

      <nav className="nav">
        <a href="#world">World</a>
        <a href="#music">Music</a>
        <a href="#chars">Friends</a>
        <a href="#fun">Funzone</a>
        <a href="#ending">Goodbye</a>
      </nav>

      <div className="right">
        <span className="chip cy">JP / EN</span>
        <span className="live">ON-AIR ⋆ 2500 dreaming</span>
      </div>
    </header>
  )
}