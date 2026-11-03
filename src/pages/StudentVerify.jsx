import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Field } from '../components/ui.jsx'
import { universities } from '../data/listings.js'
import { readImage } from '../data/myPosts.js'

const KEY = 'studentVerify'
const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}
const write = (v) => {
  try {
    if (v) localStorage.setItem(KEY, JSON.stringify(v))
    else localStorage.removeItem(KEY)
  } catch {
    /* bỏ qua nếu trình duyệt chặn lưu trữ */
  }
}

const perks = [
  'Huy hiệu “Sinh viên đã xác minh” trên hồ sơ và tin đăng',
  'Bạn ở ghép và chủ trọ tin tưởng, phản hồi nhanh hơn',
  'Ưu tiên hiển thị khi đăng tin tìm bạn ở ghép',
  'Chỉ dùng để xác thực, không công khai thẻ sinh viên',
]

export default function StudentVerify() {
  const [record, setRecord] = useState(read)
  const [f, setF] = useState({ school: universities[0].name, name: '', mssv: '', email: '' })
  const [card, setCard] = useState('')
  const [busy, setBusy] = useState(false)
  const [touched, setTouched] = useState(false)
  const fileRef = useRef(null)

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))
  const emailOk = /^[^\s@]+@[^\s@]+\.edu\.vn$/i.test(f.email.trim())
  const errors = {
    name: f.name.trim().length < 2 && 'Nhập họ và tên đúng như trên thẻ sinh viên',
    mssv: f.mssv.trim().length < 5 && 'Mã sinh viên tối thiểu 5 ký tự',
    email: !emailOk && 'Dùng email trường có đuôi .edu.vn (VD: ten.mssv@student.humg.edu.vn)',
    card: !card && 'Tải lên ảnh mặt trước thẻ sinh viên',
  }
  const valid = !Object.values(errors).some(Boolean)

  const pickCard = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !file.type.startsWith('image/')) return
    setBusy(true)
    try {
      setCard(await readImage(file, 1100))
    } finally {
      setBusy(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    const r = {
      status: 'pending',
      school: f.school,
      name: f.name.trim(),
      mssv: f.mssv.trim(),
      email: f.email.trim(),
      at: new Date().toLocaleString('vi-VN'),
    }
    write(r)
    setRecord(r)
  }

  const approveDemo = () => {
    const r = { ...record, status: 'approved' }
    write(r)
    setRecord(r)
  }
  const reset = () => {
    write(null)
    setRecord(null)
    setCard('')
    setTouched(false)
  }

  return (
    <div className="page">
      <p className="rd__crumb"><Link to="/ho-so">← Hồ sơ của tôi</Link></p>
      <div className="sv">
        <div>
          {record ? (
            <div className="card sv__status">
              <span className={'sv__icon' + (record.status === 'approved' ? ' sv__icon--ok' : '')}>
                {record.status === 'approved' ? '✓' : '…'}
              </span>
              <h1>{record.status === 'approved' ? 'Đã xác minh là sinh viên' : 'Hồ sơ đang chờ xét duyệt'}</h1>
              <p>
                {record.status === 'approved'
                  ? 'Hồ sơ của bạn đã có huy hiệu “Sinh viên đã xác minh”.'
                  : 'Chúng tôi sẽ đối chiếu thông tin và thông báo kết quả trong vòng 24 giờ làm việc.'}
              </p>
              <dl className="sv__info">
                <div><dt>Trường</dt><dd>{record.school}</dd></div>
                <div><dt>Họ và tên</dt><dd>{record.name}</dd></div>
                <div><dt>Mã sinh viên</dt><dd>{record.mssv}</dd></div>
                <div><dt>Email trường</dt><dd>{record.email}</dd></div>
                <div><dt>Gửi lúc</dt><dd>{record.at}</dd></div>
              </dl>
              <div className="bk__actions">
                {record.status === 'pending' && (
                  <button type="button" className="btn btn-outline" onClick={approveDemo}>Demo: giả lập duyệt thành công</button>
                )}
                <Link className="btn btn-primary" to="/o-ghep">Tìm bạn ở ghép</Link>
                <button type="button" className="link-btn" onClick={reset}>Gửi lại hồ sơ khác</button>
              </div>
            </div>
          ) : (
            <form className="card bk__form" onSubmit={submit} noValidate>
              <h1>Xác minh sinh viên</h1>
              <p className="bk__sub">Xác nhận bạn đang là sinh viên để tăng độ tin cậy khi ở ghép và thuê phòng.</p>

              <Field label="Trường đại học / học viện">
                <select value={f.school} onChange={set('school')}>
                  {universities.map((u) => <option key={u.name}>{u.name}</option>)}
                  <option>Trường khác</option>
                </select>
              </Field>

              <div className="bk__row">
                <Field label="Họ và tên">
                  <input value={f.name} onChange={set('name')} placeholder="Nguyễn Văn A" />
                  {touched && errors.name && <small className="sv__err">{errors.name}</small>}
                </Field>
                <Field label="Mã sinh viên">
                  <input value={f.mssv} onChange={set('mssv')} placeholder="VD: 2021603456" />
                  {touched && errors.mssv && <small className="sv__err">{errors.mssv}</small>}
                </Field>
              </div>

              <Field label="Email của trường (.edu.vn)">
                <input type="email" value={f.email} onChange={set('email')} placeholder="ten.mssv@student.truong.edu.vn" />
                {touched && errors.email && <small className="sv__err">{errors.email}</small>}
              </Field>

              <div className="field">
                <span className="field__label">Ảnh thẻ sinh viên (mặt trước)</span>
                {card ? (
                  <div className="sv__card">
                    <img src={card} alt="Thẻ sinh viên" />
                    <button type="button" className="btn btn-outline" onClick={() => setCard('')}>Chọn ảnh khác</button>
                  </div>
                ) : (
                  <button type="button" className="sv__drop" onClick={() => fileRef.current?.click()} disabled={busy}>
                    <span>{busy ? '…' : '+'}</span>
                    <strong>{busy ? 'Đang xử lý ảnh' : 'Tải ảnh thẻ sinh viên'}</strong>
                    <small>Ảnh rõ nét, thấy đủ họ tên, mã sinh viên và tên trường</small>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickCard} />
                {touched && errors.card && <small className="sv__err">{errors.card}</small>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={busy}>Gửi hồ sơ xác minh</button>
            </form>
          )}
        </div>

        <aside className="card sv__side">
          <h3>Vì sao nên xác minh?</h3>
          <ul>{perks.map((p) => <li key={p}>{p}</li>)}</ul>
          <h3>Quy trình</h3>
          <ol>
            <li>Điền thông tin và tải ảnh thẻ sinh viên</li>
            <li>Hệ thống đối chiếu với email trường</li>
            <li>Nhận huy hiệu trong vòng 24 giờ</li>
          </ol>
          <p className="rd__warn">Ảnh thẻ chỉ dùng để xác minh và không hiển thị công khai.</p>
        </aside>
      </div>
    </div>
  )
}
