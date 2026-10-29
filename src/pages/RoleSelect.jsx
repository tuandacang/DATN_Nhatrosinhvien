import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { EyeIcon, KeyIcon, UserIcon } from '../components/Icons.jsx'

const options = [
  {
    role: 'student',
    to: '/trang-chu',
    icon: <UserIcon />,
    title: 'Tôi là sinh viên',
    desc: 'Thuê trọ gần trường và tìm bạn ở ghép.',
  },
  {
    role: 'landlord',
    to: '/chu-tro',
    icon: <KeyIcon />,
    title: 'Tôi là chủ trọ',
    desc: 'Đăng phòng, quản lý lịch hẹn và tin nhắn.',
  },
  {
    role: 'guest',
    to: '/trang-chu',
    icon: <EyeIcon />,
    title: 'Xem thử với tư cách khách',
    desc: 'Xem phòng và tìm kiếm, chưa cần tài khoản.',
  },
]

export default function RoleSelect() {
  const { setRole } = useAuth()
  const navigate = useNavigate()

  const choose = (opt) => {
    setRole(opt.role)
    navigate(opt.to)
  }

  return (
    <div className="role">
      <div className="role__inner">
        <p className="role__logo">TroGanTruong.vn</p>
        <p className="eyebrow role__eyebrow">Cộng đồng sinh viên Thủ đô</p>
        <h1 className="role__title">Bạn muốn làm gì hôm nay?</h1>
        <p className="role__sub">
          Chọn vai trò để chúng tôi hiển thị đúng những gì bạn cần.
        </p>

        <div className="role__grid">
          {options.map((opt) => (
            <button
              key={opt.role}
              type="button"
              className="role-card"
              onClick={() => choose(opt)}
            >
              <span className="role-card__icon">{opt.icon}</span>
              <span className="role-card__title">{opt.title}</span>
              <span className="role-card__desc">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
