import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Chips, Field } from '../components/ui.jsx'

const roleItems = [
  { key: 'student', label: 'Sinh viên' },
  { key: 'landlord', label: 'Chủ trọ' },
]

const homeOf = (role) => (role === 'landlord' ? '/chu-tro' : '/trang-chu')

function Shell({ title, sub, children, footer }) {
  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">{title}</h1>
        <p className="auth__sub">{sub}</p>
        {children}
        <p className="auth__foot">{footer}</p>
      </div>
    </div>
  )
}

export function Login() {
  const { role, setRole } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [pickRole, setPickRole] = useState(role === 'landlord' ? role : 'student')
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.email.includes('@')) return setError('Email không hợp lệ')
    if (form.password.length < 6) return setError('Mật khẩu tối thiểu 6 ký tự')
    setRole(pickRole)
    navigate(homeOf(pickRole))
  }

  return (
    <Shell
      title="Đăng nhập"
      sub="Chào mừng bạn quay lại TroGanTruong.vn"
      footer={
        <>
          Chưa có tài khoản? <Link to="/dang-ky">Đăng ký</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={onSubmit}>
        <Chips items={roleItems} value={pickRole} onChange={setPickRole} />
        <Field label="Email">
          <input type="email" value={form.email} onChange={set('email')} placeholder="ban@email.com" />
        </Field>
        <Field label="Mật khẩu">
          <input type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />
        </Field>
        <div className="auth__row">
          <label className="auth__check">
            <input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập
          </label>
          <Link to="/dang-nhap">Quên mật khẩu?</Link>
        </div>
        {error && <p className="auth__error">{error}</p>}
        <button type="submit" className="btn btn-primary btn-lg">
          Đăng nhập
        </button>
      </form>
    </Shell>
  )
}

export function Register() {
  const { setRole } = useAuth()
  const navigate = useNavigate()
  const [pickRole, setPickRole] = useState('student')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', again: '' })
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Vui lòng nhập họ tên')
    if (!form.email.includes('@')) return setError('Email không hợp lệ')
    if (!/^0\d{9}$/.test(form.phone)) return setError('Số điện thoại gồm 10 số, bắt đầu bằng 0')
    if (form.password.length < 6) return setError('Mật khẩu tối thiểu 6 ký tự')
    if (form.password !== form.again) return setError('Mật khẩu nhập lại không khớp')
    if (!agree) return setError('Bạn cần đồng ý điều khoản sử dụng')
    setRole(pickRole)
    navigate(pickRole === 'landlord' ? '/chu-tro/xac-minh' : '/trang-chu')
  }

  return (
    <Shell
      title="Tạo tài khoản"
      sub="Chọn vai trò của bạn và điền thông tin bên dưới"
      footer={
        <>
          Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={onSubmit}>
        <Chips items={roleItems} value={pickRole} onChange={setPickRole} />
        <Field label="Họ và tên">
          <input value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A" />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={set('email')} placeholder="ban@email.com" />
        </Field>
        <Field label="Số điện thoại">
          <input value={form.phone} onChange={set('phone')} placeholder="0912345678" inputMode="numeric" />
        </Field>
        <div className="auth__two">
          <Field label="Mật khẩu">
            <input type="password" value={form.password} onChange={set('password')} />
          </Field>
          <Field label="Nhập lại mật khẩu">
            <input type="password" value={form.again} onChange={set('again')} />
          </Field>
        </div>
        <label className="auth__check">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          Tôi đồng ý với điều khoản sử dụng
        </label>
        {error && <p className="auth__error">{error}</p>}
        <button type="submit" className="btn btn-primary btn-lg">
          Đăng ký
        </button>
      </form>
    </Shell>
  )
}
