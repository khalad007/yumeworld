export function Notifications() {
  return (
    <>
      <div className="notif n1">
        <div className="ic">夢</div>
        <div>
          <div className="t">+1 sticker unlocked!</div>
          <div className="d">&quot;Stayed past midnight&quot; ⋆ rare</div>
        </div>
      </div>
      <div className="notif n2">
        <div
          className="ic"
          style={{
            background: 'linear-gradient(135deg,var(--cyan),var(--lav))',
          }}
        >
          猫
        </div>
        <div>
          <div className="t">Mochi wants to nap on you.</div>
          <div className="d">accept? &nbsp;[Y / N] ⋆ default Y</div>
        </div>
      </div>
    </>
  )
}