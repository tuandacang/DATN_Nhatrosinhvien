import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import RequireLogin from './components/RequireLogin.jsx'
import Home from './pages/Home.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PostRoom from './pages/PostRoom.jsx'
import Appointments from './pages/Appointments.jsx'
import Verify from './pages/Verify.jsx'
import Notifications from './pages/Notifications.jsx'
import Messages from './pages/Messages.jsx'
import Profile from './pages/Profile.jsx'
import Roommates from './pages/Roommates.jsx'
import SearchRooms from './pages/SearchRooms.jsx'
import MapView from './pages/MapView.jsx'
import RoomDetail from './pages/RoomDetail.jsx'
import Booking from './pages/Booking.jsx'
import Favorites from './pages/Favorites.jsx'
import RoommateDetail from './pages/RoommateDetail.jsx'
import PostRoommate from './pages/PostRoommate.jsx'
import StudentVerify from './pages/StudentVerify.jsx'
import Settings from './pages/Settings.jsx'
import { Login, Register } from './pages/Auth.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route element={<Layout />}>
        <Route path="/trang-chu" element={<Home />} />
        <Route path="/chu-tro" element={<RequireLogin><Dashboard /></RequireLogin>} />
        <Route path="/chu-tro/dang-tin" element={<RequireLogin><PostRoom /></RequireLogin>} />
        <Route path="/chu-tro/lich-hen" element={<RequireLogin><Appointments /></RequireLogin>} />
        <Route path="/chu-tro/xac-minh" element={<RequireLogin><Verify /></RequireLogin>} />
        <Route path="/thong-bao" element={<RequireLogin><Notifications /></RequireLogin>} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/tim-kiem" element={<SearchRooms />} />
        <Route path="/ban-do" element={<MapView />} />
        <Route path="/phong/:id" element={<RoomDetail />} />
        <Route path="/dat-lich/:id" element={<RequireLogin><Booking /></RequireLogin>} />
        <Route path="/yeu-thich" element={<RequireLogin><Favorites /></RequireLogin>} />
        <Route path="/o-ghep" element={<Roommates />} />
        <Route path="/o-ghep/dang-tin" element={<RequireLogin><PostRoommate /></RequireLogin>} />
        <Route path="/o-ghep/:id" element={<RoommateDetail />} />
        <Route path="/tin-nhan" element={<RequireLogin><Messages /></RequireLogin>} />
        <Route path="/xac-minh-sinh-vien" element={<RequireLogin><StudentVerify /></RequireLogin>} />
        <Route path="/ho-so" element={<RequireLogin><Profile /></RequireLogin>} />
        <Route path="/cai-dat" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
