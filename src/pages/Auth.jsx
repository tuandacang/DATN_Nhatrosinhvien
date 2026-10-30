import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const svg = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const IconUser = () => <svg {...svg}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
const IconPhone = () => <svg {...svg}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>
const IconLock = () => <svg {...svg}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
const IconEye = ({ off }) => (
  <svg {...svg}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />{off && <path d="M4 4l16 16" />}</svg>
)
const IconArrow = () => <svg {...svg} width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
const IconShield = () => <svg {...svg}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
const IconCheck = () => <svg {...svg} width="14" height="14"><path d="M5 12l5 5 9-10" /></svg>
const IconHeadset = () => <svg {...svg}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1" /><rect x="17" y="14" width="4" height="6" rx="1" /></svg>

const homeOf = (role) => (role === 'landlord' ? '/chu-tro' : '/trang-chu')
const phoneOk = (v) => /^0\d{9}$/.test(v.replace(/\s/g, ''))

function Brand() {
  return (
    <div className="auth__brand">
      TroGanTruong<span>.vn</span>
    </div>
  )
}

function PasswordInput({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <div className="auth__input">
      <span className="auth__icon"><IconLock /></span>
      <input type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder} />
      <button type="button" className="auth__eye" aria-label="Ẩn/hiện mật khẩu" onClick={() => setShow(!show)}>
        <IconEye off={show} />
      </button>
    </div>
  )
}

export function Login() {
  const { role, setRole } = useAuth()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!phoneOk(phone)) return setError('Số điện thoại gồm 10 số, bắt đầu bằng 0')
    if (password.length < 6) return setError('Mật khẩu tối thiểu 6 ký tự')
    const next = role === 'landlord' ? 'landlord' : 'student'
    setRole(next)
    navigate(homeOf(next))
  }

  return (
    <div className="auth">
      <div className="auth__wrap">
        <div className="auth__card auth__card--pad">
          <header className="auth__head">
            <Brand />
            <h1 className="auth__title">Chào mừng bạn quay lại</h1>
            <p className="auth__sub">Đăng nhập để tìm phòng trọ hoặc quản lý tin đăng của bạn</p>
          </header>

          <form className="auth__form" onSubmit={onSubmit}>
            <label className="auth__field">
              <span className="auth__label">Số điện thoại</span>
              <div className="auth__input">
                <span className="auth__icon"><IconPhone /></span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xx xxx xxx" inputMode="numeric" />
              </div>
            </label>

            <div className="auth__field">
              <div className="auth__label-row">
                <span className="auth__label">Mật khẩu</span>
                <Link to="/dang-nhap" className="auth__link">Quên mật khẩu?</Link>
              </div>
              <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu của bạn" />
            </div>

            {error && <p className="auth__error">{error}</p>}

            <button type="submit" className="auth__submit">
              Đăng nhập <IconArrow />
            </button>
          </form>

          <div className="auth__divider"><span>HOẶC TIẾP TỤC VỚI</span></div>

          <div className="auth__social">
            <button type="button" className="auth__social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285f4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z" /><path fill="#34a853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7A10 10 0 0 0 12 22z" /><path fill="#fbbc05" d="M6.2 13.6a6 6 0 0 1 0-3.8V7.1H2.7a10 10 0 0 0 0 9.2z" /><path fill="#ea4335" d="M12 6c1.5 0 2.9.5 4 1.6l3-3A10 10 0 0 0 2.7 7.1l3.5 2.7C7 7.8 9.3 6 12 6z" /></svg>
              Google
            </button>
            <button type="button" className="auth__social-btn">
              <span className="auth__zalo">Z</span>
              Zalo
            </button>
          </div>

          <p className="auth__assure">
            <span><IconShield /></span>
            Xác minh phòng trọ thật quanh các đại học Hà Nội
          </p>

          <p className="auth__foot auth__foot--tight">
            Chưa có tài khoản? <Link to="/dang-ky" className="auth__link">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const roles = [
  { key: 'student', title: 'Sinh viên', desc: 'Tìm phòng an toàn gần trường', icon: <IconUser />, tone: 'red' },
  { key: 'landlord', title: 'Chủ nhà trọ', desc: 'Đăng tin tiếp cận hàng ngàn sinh viên', icon: <IconShield />, tone: 'green' },
]

export function Register() {
  const { setRole } = useAuth()
  const navigate = useNavigate()
  const [pick, setPick] = useState('student')
  const [form, setForm] = useState({ name: '', phone: '', password: '' })
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Vui lòng nhập họ và tên')
    if (!phoneOk(form.phone)) return setError('Số điện thoại gồm 10 số, bắt đầu bằng 0')
    if (form.password.length < 6) return setError('Mật khẩu tối thiểu 6 ký tự')
    if (!agree) return setError('Bạn cần đồng ý với điều khoản dịch vụ')
    setRole(pick)
    navigate(pick === 'landlord' ? '/chu-tro/xac-minh' : '/trang-chu')
  }

  return (
    <div className="auth">
      <div className="auth__wrap">
        <div className="auth__card auth__card--pad">
          <header className="auth__head">
            <Brand />
            <h1 className="auth__title">Tạo tài khoản mới</h1>
            <p className="auth__sub">Bắt đầu hành trình tìm kiếm hoặc cho thuê phòng trọ lý tưởng gần trường đại học</p>
          </header>

          <form className="auth__form" onSubmit={onSubmit}>
            <div className="auth__field">
              <span className="auth__label">Bạn tham gia với vai trò gì?</span>
              <div className="auth__roles">
                {roles.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    className={'auth__role' + (pick === r.key ? ' auth__role--on' : '')}
                    onClick={() => setPick(r.key)}
                  >
                    <span className={'auth__role-icon auth__role-icon--' + r.tone}>{r.icon}</span>
                    <span className="auth__role-title">
                      {r.title}
                      <span className="auth__radio">{pick === r.key && <IconCheck />}</span>
                    </span>
                    <span className="auth__role-desc">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="auth__field">
              <span className="auth__label auth__label--sm">Họ và tên</span>
              <div className="auth__input auth__input--white">
                <input value={form.name} onChange={set('name')} placeholder="Nguyễn Văn An" />
                <span className="auth__icon"><IconUser /></span>
              </div>
            </label>

            <label className="auth__field">
              <span className="auth__label auth__label--sm">Số điện thoại</span>
              <div className="auth__input auth__input--white">
                <input value={form.phone} onChange={set('phone')} placeholder="0987 654 321" inputMode="numeric" />
                <span className="auth__icon"><IconPhone /></span>
              </div>
            </label>

            <div className="auth__field">
              <span className="auth__label auth__label--sm">Mật khẩu</span>
              <PasswordInput value={form.password} onChange={set('password')} placeholder="Tối thiểu 6 ký tự" />
            </div>

            <label className="auth__terms">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span>Tôi đồng ý với các Điều khoản dịch vụ &amp; Chính sách bảo mật của TroGanTruong.vn</span>
            </label>

            {error && <p className="auth__error">{error}</p>}

            <button type="submit" className="auth__submit auth__submit--lg">
              Đăng ký tài khoản <IconArrow />
            </button>
          </form>

          <div className="auth__trust">
            <span><IconShield /> Phòng xác thực</span>
            <i />
            <span><IconLock /> Bảo mật 100%</span>
            <i />
            <span><IconHeadset /> Hỗ trợ 24/7</span>
          </div>

          <p className="auth__foot auth__foot--tight">
            Đã có tài khoản? <Link to="/dang-nhap" className="auth__link">Đăng nhập</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
