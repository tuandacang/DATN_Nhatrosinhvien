import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import Home from './pages/Home.jsx'
import RoleSelect from './pages/RoleSelect.jsx'

// Các trang chưa làm: thêm dần, mỗi trang xong thì thay bằng component thật
const upcoming = [
  ['/tim-kiem', 'Tìm kiếm phòng'],
  ['/ban-do', 'Bản đồ lớn'],
  ['/o-ghep', 'Tìm bạn ở ghép'],
  ['/tin-nhan', 'Tin nhắn'],
  ['/yeu-thich', 'Phòng đã lưu'],
  ['/thong-bao', 'Thông báo'],
  ['/ho-so', 'Hồ sơ cá nhân'],
  ['/cai-dat', 'Cài đặt tài khoản'],
  ['/dang-nhap', 'Đăng nhập'],
  ['/dang-ky', 'Đăng ký'],
  ['/chu-tro', 'Bảng điều khiển chủ trọ'],
  ['/chu-tro/dang-tin', 'Đăng tin mới'],
  ['/chu-tro/lich-hen', 'Lịch hẹn xem phòng'],
  ['/chu-tro/xac-minh', 'Xác minh chủ trọ'],
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route element={<Layout />}>
        <Route path="/trang-chu" element={<Home />} />
        {upcoming.map(([path, title]) => (
          <Route key={path} path={path} element={<ComingSoon title={title} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
