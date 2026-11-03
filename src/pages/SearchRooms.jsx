import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ListingCard from '../components/ListingCard.jsx'
import { amenityOptions, listings, priceOptions, roomTypes } from '../data/listings.js'
import { PageHead } from '../components/ui.jsx'

const schoolList = [...new Set(listings.map((r) => r.school))]
const sorts = [
  ['near', 'Gần trường nhất'],
  ['cheap', 'Giá thấp đến cao'],
  ['pricey', 'Giá cao đến thấp'],
]

export default function SearchRooms() {
  const [params] = useSearchParams()
  const fromUrl = params.get('truong')
  const [school, setSchool] = useState(schoolList.includes(fromUrl) ? fromUrl : '')
  const [type, setType] = useState('all')
  const [price, setPrice] = useState(0)
  const [amenities, setAmenities] = useState([])
  const [sort, setSort] = useState('near')
  const [q, setQ] = useState('')

  const toggleAmenity = (a) => setAmenities((l) => (l.includes(a) ? l.filter((x) => x !== a) : [...l, a]))
  const reset = () => { setSchool(''); setType('all'); setPrice(0); setAmenities([]); setQ('') }

  const shown = useMemo(() => {
    const list = listings.filter(
      (r) =>
        (!school || r.school === school) &&
        (type === 'all' || r.type === type) &&
        (!price || r.price < price) &&
        amenities.every((a) => r.amenities.includes(a)) &&
        (r.title + r.address).toLowerCase().includes(q.trim().toLowerCase()),
    )
    const by = { near: (a, b) => a.distance - b.distance, cheap: (a, b) => a.price - b.price, pricey: (a, b) => b.price - a.price }
    return [...list].sort(by[sort])
  }, [school, type, price, amenities, sort, q])

  return (
    <div className="page">
      <PageHead
        eyebrow="Tìm kiếm phòng"
        title="Phòng trọ quanh trường đại học"
        sub="Mọi phòng đều được xác thực thông tin, minh bạch chi phí điện nước."
      />

      <div className="srch">
        <aside className="card sf">
          <div className="sf__head">
            <h2>Bộ lọc</h2>
            <button type="button" className="sf__reset" onClick={reset}>Xoá bộ lọc</button>
          </div>

          <div className="sf__sec">
            <label className="sf__label" htmlFor="sf-q">Từ khóa</label>
            <input id="sf-q" className="sf__input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tên phố, ngõ, khu vực..." />
          </div>

          <div className="sf__sec">
            <label className="sf__label" htmlFor="sf-school">Trường đại học</label>
            <select id="sf-school" className="sf__input" value={school} onChange={(e) => setSchool(e.target.value)}>
              <option value="">Tất cả các trường</option>
              {schoolList.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="sf__sec">
            <span className="sf__label">Mức giá</span>
            <div className="sf__chips">
              {priceOptions.map((p) => (
                <button key={p.key} type="button" className={'sf__chip' + (price === p.key ? ' on' : '')} onClick={() => setPrice(p.key)}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sf__sec">
            <span className="sf__label">Loại phòng</span>
            <div className="sf__chips">
              {roomTypes.map((t) => (
                <button key={t.key} type="button" className={'sf__chip' + (type === t.key ? ' on' : '')} onClick={() => setType(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sf__sec">
            <span className="sf__label">Tiện nghi {amenities.length > 0 && <em>({amenities.length})</em>}</span>
            <div className="sf__chips">
              {amenityOptions.map((a) => (
                <button key={a} type="button" className={'sf__chip' + (amenities.includes(a) ? ' on' : '')} onClick={() => toggleAmenity(a)}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section>
          <div className="srch__bar">
            <p>Tìm thấy <strong>{shown.length}</strong> phòng phù hợp</p>
            <select className="srch__sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              {sorts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </div>
          {shown.length === 0 ? (
            <div className="card empty">Chưa có phòng phù hợp. Hãy thử nới bộ lọc hoặc <button className="link-btn" onClick={reset}>xoá bộ lọc</button>.</div>
          ) : (
            <div className="srch__grid">
              {shown.map((r) => <ListingCard key={r.id} room={r} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
