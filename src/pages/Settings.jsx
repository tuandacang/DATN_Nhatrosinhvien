import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Field, PageHead, Switch } from '../components/ui.jsx'

const sections = [
  ['info', 'Thông tin cá nhân'],
  ['security', 'Bảo mật'],
  ['notify', 'Thông báo'],
  ['privacy', 'Quyền riêng tư'],
  ['delete', 'Xóa tài khoản'],
]

function ToggleRow({ title, desc, value, onChange }) {
  return (
    <div className="pref pref--lg">
      <div>
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
      <Switch label={title} checked={value} onChange={onChange} />
    </div>
  )
}

export default function Settings() {
  const { role } = useAuth()
  const [profile, setProfile] = useState({ name: 'Nguyễn Văn A', house: 'Nhà trọ Xuân Thủy', email: '', phone: '' })
  const [pw, setPw] = useState({ current: '', next: '', again: '' })
  const [notify, setNotify] = useState([true, true, true])
  const [privacy, setPrivacy] = useState([true, true])
  const [msg, setMsg] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const setP = (k) => (e) => setProfile({ ...profile, [k]: e.target.value })
  const flip = (setter) => (i) => (v) => setter((a) => a.map((x, j) => (j === i ? v : x)))

  const updatePw = () => {
    if (pw.next.length < 8) return setMsg('Mật khẩu mới cần tối thiểu 8 ký tự.')
    if (pw.next !== pw.again) return setMsg('Mật khẩu xác nhận chưa khớp.')
    setPw({ current: '', next: '', again: '' })
    setMsg('Đã cập nhật mật khẩu.')
  }

  return (
    <div className="page">
      <PageHead
        eyebrow="Tài khoản"
        title="Cài đặt tài khoản"
        sub="Quản lý thông tin cá nhân, bảo mật và thông báo của bạn."
      />

      <div className="settings">
        <nav className="card settings__nav">
          {sections.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className={i === 4 ? 'danger' : ''}>{label}</a>
          ))}
        </nav>

        <div className="settings__body">
          {msg && <p className="form__ok">{msg}</p>}

          <section id="info" className="card form">
            <h2>Thông tin cá nhân</h2>
            <div className="avatar-row">
              <span className="avatar">{role === 'landlord' ? 'C' : 'S'}</span>
              <button type="button" className="btn btn-outline">Đổi ảnh</button>
            </div>
            <div className="form__grid">
              <Field label="Họ và tên"><input value={profile.name} onChange={setP('name')} /></Field>
              {role === 'landlord' && (
                <Field label="Tên nhà trọ"><input value={profile.house} onChange={setP('house')} /></Field>
              )}
              <Field label="Email"><input type="email" value={profile.email} onChange={setP('email')} placeholder="email@example.com" /></Field>
              <Field label="Số điện thoại"><input value={profile.phone} onChange={setP('phone')} placeholder="09xx xxx xxx" /></Field>
            </div>
            <div className="form__actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={() => setMsg('Đã lưu thay đổi.')}>Lưu thay đổi</button>
            </div>
          </section>

          <section id="security" className="card form">
            <h2>Đổi mật khẩu</h2>
            <Field label="Mật khẩu hiện tại">
              <input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} placeholder="••••••••" />
            </Field>
            <div className="form__grid">
              <Field label="Mật khẩu mới">
                <input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} placeholder="Tối thiểu 8 ký tự" />
              </Field>
              <Field label="Xác nhận mật khẩu mới">
                <input type="password" value={pw.again} onChange={(e) => setPw({ ...pw, again: e.target.value })} placeholder="Nhập lại mật khẩu" />
              </Field>
            </div>
            <div className="form__actions">
              <button type="button" className="btn btn-outline btn-lg" onClick={updatePw}>Cập nhật mật khẩu</button>
            </div>
          </section>

          <section id="notify" className="card form">
            <h2>Thông báo</h2>
            <ToggleRow title="Thông báo qua email" desc="Nhận email khi có tin nhắn hoặc lịch xem phòng mới." value={notify[0]} onChange={flip(setNotify)(0)} />
            <ToggleRow title="Thông báo đẩy trên trình duyệt" desc="Hiển thị thông báo ngay cả khi bạn không mở trang." value={notify[1]} onChange={flip(setNotify)(1)} />
            <ToggleRow title="Yêu cầu liên hệ mới" desc="Nhận thông báo khi sinh viên gửi yêu cầu liên hệ hoặc đặt lịch." value={notify[2]} onChange={flip(setNotify)(2)} />
          </section>

          <section id="privacy" className="card form">
            <h2>Quyền riêng tư</h2>
            <ToggleRow title="Hiển thị số điện thoại trên hồ sơ" desc="Chỉ sinh viên đã đặt lịch hẹn mới thấy số của bạn." value={privacy[0]} onChange={flip(setPrivacy)(0)} />
            <ToggleRow title="Cho phép người khác nhắn tin" desc="Sinh viên và chủ trọ có thể gửi tin nhắn cho bạn." value={privacy[1]} onChange={flip(setPrivacy)(1)} />
          </section>

          <section id="delete" className="card form form--danger">
            <div className="pref pref--lg">
              <div>
                <h3>Xóa tài khoản</h3>
                <p>Toàn bộ dữ liệu, tin đăng và tin nhắn sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.</p>
              </div>
              <button type="button" className="btn btn-danger btn-outline" onClick={() => setConfirmDelete(true)}>
                {confirmDelete ? 'Bấm lần nữa để xác nhận' : 'Xóa tài khoản'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
