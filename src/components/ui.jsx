export function PageHead({ eyebrow, title, sub, action }) {
  return (
    <div className="page-head">
      <div>
        <p className="eyebrow page-head__eyebrow">{eyebrow}</p>
        <h1 className="page-head__title">{title}</h1>
        {sub && <p className="page-head__sub">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={'switch' + (checked ? ' switch--on' : '')}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  )
}

export function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
    </label>
  )
}

export function Chips({ items, value, onChange }) {
  return (
    <div className="chips">
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          className={'chip' + (value === it.key ? ' chip--active' : '')}
          onClick={() => onChange(it.key)}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

export function Stat({ label, value, unit, note, tone }) {
  return (
    <div className="stat">
      <p className="stat__label">{label}</p>
      <p className="stat__value">{value}</p>
      {unit && <p className="stat__unit">{unit}</p>}
      <p className={'stat__note' + (tone ? ` stat__note--${tone}` : '')}>{note}</p>
    </div>
  )
}
