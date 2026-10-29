import { useState } from 'react'
import { Field, PageHead } from '../components/ui.jsx'

const perks = [
  'Nhãn “Chủ trọ đã xác thực” trên mọi tin đăng',
  'Tin đăng được ưu tiên hiển thị',
  'Tăng độ tin cậy với sinh viên',
  'Đăng tin không giới hạn',
]

export default function Verify() {
  const [form, setForm] = useState({ name: '', phone: '', cccd: '', email: '', address: '' })
  const [idDoc, setIdDoc] = useState(null)
  const [houseDoc, setHouseDoc] = useState(null)
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const infoDone = Object.values(form).every(Boolean)
  const docsDone = Boolean(idDoc && houseDoc)

  const submit = (e) => {
    e.preventDefault()
    if (!infoDone || !docsDone || !agree) {
      setError('Vui lòng điền đủ thông tin, tải giấy tờ và đồng ý cam kết.')
      return
    }
    setError('')
    setSent(true)
  }

  const steps = [
    { n: 1, label: 'Thông tin cá nhân', on: true },
    { n: 2, label: 'Giấy tờ xác minh', on: infoDone },
    { n: 3, label: 'Chờ duyệt', on: sent },
  ]

  return (
    <div className="page">
      <PageHead
        eyebrow="Xác minh chủ nhà"
        title="Xác minh tài khoản chủ trọ"
        sub="Xác minh giúp tin đăng có nhãn “Chủ trọ đã xác thực” và được sinh viên tin tưởng"
      />

      <ol className="steps">
        {steps.map((s) => (
          <li key={s.n} className={s.on ? 'steps__item steps__item--on' : 'steps__item'}>
            <span>{s.n}</span>
            {s.label}
          </li>
        ))}
      </ol>

      <div className="split">
        <form className="card form" onSubmit={submit}>
          <h2>Thông tin chủ trọ</h2>
          <div className="form__grid">
            <Field label="Họ và tên">
              <input value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A" />
            </Field>
            <Field label="Số điện thoại">
              <input value={form.phone} onChange={set('phone')} placeholder="09xx xxx xxx" />
            </Field>
            <Field label="Số CCCD/CMND">
              <input value={form.cccd} onChange={set('cccd')} placeholder="12 chữ số" />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" />
            </Field>
          </div>
          <Field label="Địa chỉ nhà trọ">
            <input value={form.address} onChange={set('address')} placeholder="Số nhà, ngõ, phường, quận, Hà Nội" />
          </Field>

          <h2>Giấy tờ xác minh</h2>
          <div className="form__grid">
            <label className="drop drop--sm">
              <input type="file" hidden accept="image/*,.pdf" onChange={(e) => setIdDoc(e.target.files[0] ?? null)} />
              <strong>CCCD/CMND (mặt trước & sau)</strong>
              <span>JPG, PNG hoặc PDF, tối đa 10MB</span>
              <em>{idDoc ? idDoc.name : 'Chọn tệp'}</em>
            </label>
            <label className="drop drop--sm">
              <input type="file" hidden accept="image/*,.pdf" onChange={(e) => setHouseDoc(e.target.files[0] ?? null)} />
              <strong>Giấy tờ nhà / hợp đồng thuê</strong>
              <span>JPG, PNG hoặc PDF, tối đa 10MB</span>
              <em>{houseDoc ? houseDoc.name : 'Chọn tệp'}</em>
            </label>
          </div>

          <label className="check">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>Tôi cam kết thông tin cung cấp là chính xác và đồng ý với Quy chế vận hành của TroGanTruong.vn.</span>
          </label>

          {error && <p className="form__error">{error}</p>}

          <div className="form__actions">
            <button type="button" className="btn btn-outline btn-lg">Lưu nháp</button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={sent}>
              {sent ? 'Đã gửi xác minh' : 'Gửi xác minh'}
            </button>
          </div>
        </form>

        <aside className="card side">
          <h3>Trạng thái xác minh</h3>
          <span className="tag tag--wait">
            {sent ? 'Chờ duyệt' : 'Chưa xác minh'}
          </span>
          <p>
            {sent
              ? 'Hồ sơ đã được gửi. Chúng tôi sẽ duyệt trong 1–2 ngày làm việc.'
              : 'Hoàn tất 2 bước đầu tiên để gửi hồ sơ. Tin đăng vẫn được đăng nhưng sẽ chưa có nhãn xác thực.'}
          </p>
          <h4>Sau khi xác minh bạn được:</h4>
          <ul className="side__perks">
            {perks.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p className="side__note">Thời gian duyệt 1–2 ngày làm việc. Giấy tờ được bảo mật và chỉ dùng để xác minh.</p>
        </aside>
      </div>
    </div>
  )
}
