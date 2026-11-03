// Ảnh phòng: nhận danh sách ảnh thật (chuỗi data URL) hoặc ảnh mẫu { label }
export default function RoomGallery({ photos = [], max = 3, big = false }) {
  const items = photos.map((p) => (typeof p === 'string' ? { src: p } : p))
  if (items.length === 0) return null
  const shown = items.slice(0, max)
  const more = items.length - shown.length

  return (
    <div className={'rg' + (big ? ' rg--big' : '')} style={{ '--cols': Math.min(shown.length, max) }}>
      {shown.map((p, i) => (
        <div key={i} className={'rg__item rg__item--' + (i % 3)}>
          {p.src ? <img src={p.src} alt={`Ảnh phòng ${i + 1}`} /> : <em>{p.label}</em>}
          {i === shown.length - 1 && more > 0 && <span className="rg__more">+{more}</span>}
        </div>
      ))}
    </div>
  )
}
