import { useEffect, useMemo, useRef, useState } from 'react'
import { roomBg } from '../data/roomPhotos.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom'
import { useLoginPrompt } from '../context/LoginPrompt.jsx'
import useFavorites from '../hooks/useFavorites.js'
import { listings, universities } from '../data/listings.js'

const tiers = [
  { key: 'low', label: 'Dưới 2.5 triệu', test: (p) => p < 2.5 },
  { key: 'mid', label: '2.5 - 3.5 triệu', test: (p) => p >= 2.5 && p <= 3.5 },
  { key: 'high', label: 'Trên 3.5 triệu', test: (p) => p > 3.5 },
]
const radii = [
  { m: 500, label: '500m' },
  { m: 1000, label: '1 km' },
  { m: 2000, label: '2 km' },
  { m: 3000, label: '3 km' },
]
const tierOf = (p) => tiers.find((t) => t.test(p)).key
const fmtDist = (m) => (m < 1000 ? `${Math.round(m)}m` : `${(m / 1000).toFixed(1)}km`)

// Khoảng cách giữa 2 toạ độ (mét)
const meters = (a, b) => {
  const R = 6371000
  const rad = (d) => (d * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export default function MapView() {
  const mapEl = useRef(null)
  const mapRef = useRef(null)
  const markers = useRef({})
  const schoolLayer = useRef(null)
  const { isRoom, toggleRoom } = useFavorites()
  const { requireLogin } = useLoginPrompt()
  const [uni, setUni] = useState(universities[0])
  const [query, setQuery] = useState(universities[0].name)
  const [openList, setOpenList] = useState(false)
  const [radius, setRadius] = useState(2000)
  const [tier, setTier] = useState('all')
  const [activeId, setActiveId] = useState(null)

  const suggestions = universities.filter((u) => u.name.toLowerCase().includes(query.trim().toLowerCase()))

  const rooms = useMemo(
    () =>
      listings
        .map((r) => ({ ...r, far: meters(uni, r) }))
        .filter((r) => r.far <= radius && (tier === 'all' || tierOf(r.price) === tier))
        .sort((a, b) => a.far - b.far),
    [uni, radius, tier],
  )
  const active = rooms.find((r) => r.id === activeId)

  // Trang bản đồ phủ kín màn hình: khoá cuộn trang
  useEffect(() => {
    window.scrollTo(0, 0)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Khởi tạo bản đồ một lần
  useEffect(() => {
    const map = L.map(mapEl.current, { zoomControl: false }).setView([uni.lat, uni.lng], 15)
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Nền bản đồ: OpenStreetMap (chính) -> Esri (dự phòng nếu OSM không tải được)
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      referrerPolicy: 'strict-origin-when-cross-origin',
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    const esri = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19, attribution: 'Tiles © Esri' },
    )
    let errors = 0
    osm.on('tileerror', () => {
      errors += 1
      if (errors === 4 && map.hasLayer(osm)) {
        map.removeLayer(osm)
        esri.addTo(map)
      }
    })
    osm.addTo(map)
    setTimeout(() => map.invalidateSize(), 200)

    schoolLayer.current = L.layerGroup().addTo(map)
    map.on('click', () => setActiveId(null))
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
      markers.current = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Vẽ trường + vòng bán kính, bay tới trường khi đổi trường/bán kính
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const layer = schoolLayer.current
    layer.clearLayers()
    L.marker([uni.lat, uni.lng], {
      icon: L.divIcon({ className: '', html: `<div class="mp-school">${uni.name}</div>`, iconSize: [0, 0] }),
      zIndexOffset: 1000,
    }).addTo(layer)
    const ring = L.circle([uni.lat, uni.lng], {
      radius,
      color: '#ab2e05',
      weight: 1.5,
      dashArray: '5 6',
      fillColor: '#ab2e05',
      fillOpacity: 0.05,
    }).addTo(layer)
    map.flyToBounds(ring.getBounds(), { padding: [60, 60], duration: 0.8 })
  }, [uni, radius])

  // Vẽ lại ghim giá khi đổi bộ lọc hoặc phòng đang chọn
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    Object.values(markers.current).forEach((m) => m.remove())
    markers.current = {}
    rooms.forEach((r) => {
      const on = r.id === activeId ? ' mp-pin--on' : ''
      const m = L.marker([r.lat, r.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div class="mp-pin mp-pin--${tierOf(r.price)}${on}">${r.price} tr</div>`,
          iconSize: [0, 0],
        }),
        zIndexOffset: r.id === activeId ? 500 : 0,
      }).addTo(map)
      m.on('click', (e) => {
        L.DomEvent.stopPropagation(e)
        setActiveId(r.id)
        map.panTo([r.lat, r.lng], { animate: true })
      })
      markers.current[r.id] = m
    })
  }, [rooms, activeId])

  const pick = (u) => {
    setUni(u)
    setQuery(u.name)
    setOpenList(false)
    setActiveId(null)
  }

  return (
    <div className="mapfull">
      <div ref={mapEl} className="mapfull__map" />

      <div className="mapfull__panel">
        <h1>Tìm phòng quanh trường</h1>

        <div className="mapfull__search">
          <input
            value={query}
            placeholder="Nhập tên trường đại học..."
            onFocus={(e) => { e.target.select(); setOpenList(true) }}
            onChange={(e) => { setQuery(e.target.value); setOpenList(true) }}
            onBlur={() => setTimeout(() => setOpenList(false), 150)}
          />
          {openList && (
            <ul className="mapfull__suggest">
              {suggestions.length === 0 && <li className="mapfull__none">Không tìm thấy trường</li>}
              {suggestions.map((u) => (
                <li key={u.name}>
                  <button type="button" onMouseDown={() => pick(u)}>{u.name}</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mapfull__group">
          <span>Bán kính quanh trường</span>
          <div className="chips">
            {radii.map((r) => (
              <button key={r.m} type="button" className={'chip' + (radius === r.m ? ' chip--active' : '')} onClick={() => setRadius(r.m)}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mapfull__group">
          <span>Mức giá</span>
          <div className="chips">
            <button type="button" className={'chip' + (tier === 'all' ? ' chip--active' : '')} onClick={() => setTier('all')}>Tất cả</button>
            {tiers.map((t) => (
              <button key={t.key} type="button" className={'chip' + (tier === t.key ? ' chip--active' : '')} onClick={() => setTier(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mapfull__count">
          <strong>{rooms.length}</strong> phòng trong bán kính {fmtDist(radius)} quanh {uni.name}
        </p>
      </div>

      {active && (
        <aside className="mapfull__card">
          <button type="button" className="mapfull__close" aria-label="Đóng" onClick={() => setActiveId(null)}>×</button>
          <div className={'mapfull__pic lc__photo--' + (active.id % 4)} style={roomBg(active.id)}>
            <span className="badge">Còn phòng</span>
          </div>
          <div className="mapfull__body">
            <p className="lc__dist">Cách {uni.name} {fmtDist(active.far)} · {active.area}m²</p>
            <h2>{active.title}</h2>
            <p className="lc__addr">{active.address}</p>
            <div className="lc__tags">
              {active.amenities.slice(0, 4).map((a) => <span key={a}>{a}</span>)}
            </div>
            <p className="mapfull__price"><strong>{active.price}</strong> triệu/tháng <small>★ {active.rating}</small></p>
            <div className="mapfull__actions">
              <Link className="btn btn-primary" to={`/phong/${active.id}`}>Xem chi tiết</Link>
              <Link className="btn btn-outline" to={`/dat-lich/${active.id}`} onClick={(e) => { if (requireLogin('Đăng nhập để đặt lịch xem phòng.')) e.preventDefault() }}>Đặt lịch xem</Link>
              <button type="button" className="btn btn-outline" onClick={() => !requireLogin('Đăng nhập để lưu phòng vào mục Yêu thích.') && toggleRoom(active.id)} aria-label="Lưu phòng">
                {isRoom(active.id) ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
