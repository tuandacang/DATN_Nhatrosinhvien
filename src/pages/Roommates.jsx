import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import { budgetOptions, lifestyleFilters, roommates, safetyTips } from '../data/social.js'

const genders = ['Tất cả', 'Nữ', 'Nam']
const schoolOptions = [...new Set(roommates.map((r) => r.school))]

export default function Roommates() {
  const navigate = useNavigate()
  const [gender, setGender] = useState('Tất cả')
  const [school, setSchool] = useState('')
  const [budget, setBudget] = useState('all')
  const [flags, setFlags] = useState([])
  const [saved, setSaved] = useState([])

  const toggle = (key) => setFlags((f) => (f.includes(key) ? f.filter((x) => x !== key) : [...f, key]))
  const toggleSave = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const clear = () => {
    setGender('Tất cả')
    setSchool('')
    setBudget('all')
    setFlags([])
  }

  const test = budgetOptions.find((b) => b.key === budget).test
  const list = roommates.filter(
    (r) =>
      (gender === 'Tất cả' || r.gender === gender) &&
      (!school || r.school === school) &&
      test(r.budget) &&
      flags.every((f) => r.flags.includes(f)),
  )

  return (
    <div className="page rm">
      <div className="rm__hero">
        <div>
          <h1 className="rm__title">Tìm bạn ở ghép cùng trường &amp; khu vực</h1>
          <p className="rm__sub">
            Kết nối bạn cùng phòng tin cậy, chung nhịp sống và tối ưu chi phí sinh hoạt ngay tại giảng đường.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-lg">+ Đăng tin tìm bạn</button>
      </div>

      <section className="rm__filters">
        <div className="rm__filter-row">
          <div className="rm__ctl">
            <span className="rm__ctl-label">GIỚI TÍNH CẦN TÌM</span>
            <div className="rm__seg">
              {genders.map((g) => (
                <button key={g} type="button" className={gender === g ? 'on' : ''} onClick={() => setGender(g)}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <label className="rm__ctl">
            <span className="rm__ctl-label">TRƯỜNG ĐẠI HỌC / HỌC VIỆN</span>
            <select value={school} onChange={(e) => setSchool(e.target.value)}>
              <option value="">Tất cả các trường</option>
              {schoolOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="rm__ctl">
            <span className="rm__ctl-label">NGÂN SÁCH SHARE PHÒNG</span>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              {budgetOptions.map((b) => <option key={b.key} value={b.key}>{b.label}</option>)}
            </select>
          </label>
        </div>

        <div className="rm__chips">
          <span className="rm__chips-label">Tiêu chí lối sống:</span>
          {lifestyleFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={'rm__chip' + (flags.includes(f.key) ? ' rm__chip--on' : '')}
              onClick={() => toggle(f.key)}
            >
              {f.label}
            </button>
          ))}
          <button type="button" className="rm__clear" onClick={clear}>Xoá bộ lọc</button>
        </div>
      </section>

      <div className="rm__meta">
        <p>
          Hiện có <strong>{list.length} bạn sinh viên</strong> đang mở tìm người ở ghép
          <span className="rm__dot" /> <em>Cập nhật 10 phút trước</em>
        </p>
        <p className="rm__sort">Sắp xếp theo: <strong>Phù hợp nhất</strong></p>
      </div>

      {list.length === 0 ? (
        <div className="card rm__empty">Chưa có bạn nào phù hợp với bộ lọc. Hãy thử bỏ bớt tiêu chí.</div>
      ) : (
        <div className="rm__grid">
          {list.map((r) => (
            <article key={r.id} className="card rm-card">
              <div className="rm-card__top">
                <Avatar name={r.name} size={56} online />
                <div className="rm-card__who">
                  <h3>{r.name}</h3>
                  <p>{r.gender} • Năm {r.year} {r.school}</p>
                </div>
                <button
                  type="button"
                  className={'rm-card__save' + (saved.includes(r.id) ? ' on' : '')}
                  aria-label="Lưu"
                  onClick={() => toggleSave(r.id)}
                >
                  {saved.includes(r.id) ? '♥' : '♡'}
                </button>
              </div>

              <div className="rm-card__badges">
                <span className="tag tag--ok">✓ {r.badge}</span>
                {r.hasRoom ? <span className="tag rm-card__room">Đã có sẵn phòng</span> : <span className="tag tag--muted">{r.area}</span>}
              </div>

              <div className="rm-card__budget">
                <small>{r.hasRoom ? 'Ngân sách share phòng:' : 'Ngân sách mong muốn:'}</small>
                <p><strong>{r.budget.toFixed(1)}</strong> triệu / tháng / người</p>
              </div>

              <div>
                <small className="rm-card__label">Lối sống &amp; Tiêu chí:</small>
                <div className="rm-card__tags">
                  {r.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>

              <p className="rm-card__bio">“{r.bio}”</p>

              <div className="rm-card__actions">
                <button type="button" className="btn btn-outline">Xem chi tiết</button>
                <button type="button" className="btn btn-primary" onClick={() => navigate(`/tin-nhan?with=${r.id}`)}>
                  Nhắn tin
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="rm__pager">
        <p>Hiển thị {list.length} trên tổng số 28 bài đăng ở ghép</p>
        <div>
          <button type="button" className="on">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
        </div>
      </div>

      <section className="rm__tips">
        <p className="eyebrow">Cẩm nang TroGanTruong.vn</p>
        <h2>3 Nguyên tắc vàng khi tìm bạn ở ghép an toàn</h2>
        <p className="rm__tips-sub">
          Ở ghép giúp tiết kiệm 40% - 50% chi phí hàng tháng, nhưng sự an toàn và minh bạch từ ngày đầu tiên luôn là ưu tiên số một.
        </p>
        <div className="rm__tips-grid">
          {safetyTips.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="rm__tips-foot">Mọi bài đăng đều được kiểm duyệt tự động để ngăn chặn lừa đảo cọc ảo.</p>
      </section>
    </div>
  )
}
