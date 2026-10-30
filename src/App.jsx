import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import Home from './pages/Home.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PostRoom from './pages/PostRoom.jsx'
import Appointments from './pages/Appointments.jsx'
import Verify from './pages/Verify.jsx'
import Notifications from './pages/Notifications.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import { Login, Register } from './pages/Auth.jsx'

// Các trang chưa làm: thêm dần, mỗi trang xong thì thay bằng component thật
const upcoming = [
  ['/tim-kiem', 'Tìm kiếm phòng'],
  ['/ban-do', 'Bản đồ lớn'],
  ['/o-ghep', 'Tìm bạn ở ghép'],
  ['/tin-nhan', 'Tin nhắn'],
  ['/yeu-thich', 'Phòng đã lưu'],
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route element={<Layout />}>
        <Route path="/trang-chu" element={<Home />} />
        <Route path="/chu-tro" element={<Dashboard />} />
        <Route path="/chu-tro/dang-tin" element={<PostRoom />} />
        <Route path="/chu-tro/lich-hen" element={<Appointments />} />
        <Route path="/chu-tro/xac-minh" element={<Verify />} />
        <Route path="/thong-bao" element={<Notifications />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/ho-so" element={<Profile />} />
        <Route path="/cai-dat" element={<Settings />} />
        {upcoming.map(([path, title]) => (
          <Route key={path} path={path} element={<ComingSoon title={title} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
