import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Field } from '../components/ui.jsx'
import { readImage, saveMyPost } from '../data/myPosts.js'
import { lifestyleFilters, roommates } from '../data/social.js'

const schoolList = [...new Set(roommates.map((r) => r.school))]
const MAX_PHOTOS = 6

export default function PostRoommate() {
  const [f, setF] = useState({ school: schoolList[0], gender: 'Nữ', budget: '2', area: '', hasRoom: 'no', address: '', bio: '' })
  const [flags, setFlags] = useState([])
  const [photos, setPhotos] = useState([])
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const fileRef = useRef(null)

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))
  const toggle = (k) => setFlags((l) => (l.includes(k) ? l.filter((x) => x !== k) : [...l, k]))
  const hasRoom = f.hasRoom === 'yes'
  const valid = f.area.trim() && f.bio.trim().length >= 20 && (!hasRoom || photos.length > 0)

  const addPhotos = async (e) => {
    const files = [...e.target.files].filter((x) => x.type.startsWith('image/')).slice(0, MAX_PHOTOS - photos.length)
    e.target.value = ''
    if (files.length === 0) return
    setBusy(true)
    try {
      const urls = await Promise.all(files.map((x) => readImage(x)))
      setPhotos((p) => [...p, ...urls].slice(0, MAX_PHOTOS))
    } finally {
      setBusy(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    const post = {
      id: Date.now(),
      mine: true,
      name: 'Bạn (tin mới đăng)',
      gender: f.gender,
      year: '',
      school: f.school,
      badge: 'Tin mới đăng',
      area: hasRoom && f.address.trim() ? f.address.trim() : f.area.trim(),
      budget: Number(f.budget) || 0,
      hasRoom,
      flags,
      tags: lifestyleFilters.filter((l) => flags.includes(l.key)).map((l) => l.label),
      bio: f.bio.trim(),
      photos: hasRoom ? photos : [],
    }
    setDone({ saved: saveMyPost(post) })
  }

  if (done) {
    return (
      <div className="page page--narrow">
        <div className="card bk__done">
          <span className="bk__tick">✓</span>
          <h1>Đã đăng tin tìm bạn ở ghép</h1>
          <p>
            {done.saved
              ? 'Tin của bạn đã xuất hiện ở đầu danh sách bạn ở ghép.'
              : 'Tin đã được gửi nhưng ảnh quá nặng nên chưa lưu được trên trình duyệt này.'}
          </p>
          <div className="bk__actions">
            <Link className="btn btn-primary" to="/o-ghep">Xem danh sách bạn ở ghép</Link>
            <Link className="btn btn-outline" to="/tin-nhan">Mở tin nhắn</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page page--narrow">
      <p className="rd__crumb"><Link to="/o-ghep">← Tìm bạn ở ghép</Link></p>
      <form className="card bk__form" onSubmit={submit}>
        <h1>Đăng tin tìm bạn ở ghép</h1>
        <p className="bk__sub">Mô tả rõ nhu cầu để tìm được người phù hợp. <Link className="link-red" to="/xac-minh-sinh-vien">Xác minh sinh viên</Link> để nhận huy hiệu tin cậy.</p>

        <div className="bk__row">
          <Field label="Trường đại học">
            <select value={f.school} onChange={set('school')}>{schoolList.map((s) => <option key={s}>{s}</option>)}</select>
          </Field>
          <Field label="Giới tính">
            <select value={f.gender} onChange={set('gender')}><option>Nữ</option><option>Nam</option></select>
          </Field>
        </div>
        <div className="bk__row">
          <Field label="Khu vực mong muốn"><input value={f.area} onChange={set('area')} placeholder="VD: Cầu Giấy, Tạ Quang Bửu" /></Field>
          <Field label="Ngân sách (triệu/tháng)"><input type="number" min="0.5" step="0.1" value={f.budget} onChange={set('budget')} /></Field>
        </div>
        <Field label="Tình trạng phòng">
          <select value={f.hasRoom} onChange={set('hasRoom')}>
            <option value="no">Chưa có phòng, cần tìm cùng</option>
            <option value="yes">Đã có phòng, tìm thêm bạn</option>
          </select>
        </Field>

        {hasRoom && (
          <>
            <Field label="Địa chỉ phòng (không bắt buộc)">
              <input value={f.address} onChange={set('address')} placeholder="VD: Ngõ 25 Tạ Quang Bửu, Hai Bà Trưng" />
            </Field>

            <div className="field">
              <span className="field__label">Ảnh phòng (tối đa {MAX_PHOTOS} ảnh)</span>
              <div className="up">
                {photos.map((src, i) => (
                  <div key={i} className="up__item">
                    <img src={src} alt={`Ảnh phòng ${i + 1}`} />
                    <button type="button" aria-label="Xoá ảnh" onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}>×</button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <button type="button" className="up__add" onClick={() => fileRef.current?.click()} disabled={busy}>
                    <span>{busy ? '…' : '+'}</span>
                    <small>{busy ? 'Đang xử lý' : 'Thêm ảnh'}</small>
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={addPhotos} />
              {photos.length === 0 && <small className="bk__hint">Cần ít nhất 1 ảnh để bạn khác thấy phòng của bạn.</small>}
            </div>
          </>
        )}

        <div className="field">
          <span className="field__label">Thói quen sinh hoạt</span>
          <div className="chips">
            {lifestyleFilters.map((l) => (
              <button key={l.key} type="button" className={'chip' + (flags.includes(l.key) ? ' chip--active' : '')} onClick={() => toggle(l.key)}>{l.label}</button>
            ))}
          </div>
        </div>

        <Field label="Giới thiệu bản thân (tối thiểu 20 ký tự)">
          <textarea rows={4} value={f.bio} onChange={set('bio')} placeholder="Ngành học, tính cách, giờ giấc sinh hoạt, mong muốn với bạn cùng phòng..." />
        </Field>

        <button type="submit" className="btn btn-primary btn-lg" disabled={!valid || busy}>Đăng tin</button>
        {!valid && <small className="bk__hint">Điền khu vực, phần giới thiệu{hasRoom ? ' và thêm ít nhất 1 ảnh phòng' : ''} để đăng tin.</small>}
      </form>
    </div>
  )
}
