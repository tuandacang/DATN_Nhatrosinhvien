const palette = [
  ['#ffdbd1', '#ab2e05'],
  ['#a2f6a9', '#002108'],
  ['#ffe3a8', '#785600'],
  ['#eae8e4', '#59413a'],
]

export default function Avatar({ name, size = 48, online }) {
  const code = [...name].reduce((s, c) => s + c.charCodeAt(0), 0)
  const [bg, fg] = palette[code % palette.length]
  const initial = name.trim().split(' ').pop()[0].toUpperCase()
  return (
    <span className="avatar-i" style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.4 }}>
      {initial}
      {online !== undefined && <i className={online ? 'avatar-i__dot avatar-i__dot--on' : 'avatar-i__dot'} />}
    </span>
  )
}
