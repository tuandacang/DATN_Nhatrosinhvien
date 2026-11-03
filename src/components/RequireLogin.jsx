import { Link } from 'react-router-dom'
import { useLoginPrompt } from '../context/LoginPrompt.jsx'

// Bọc các trang chỉ dành cho người đã đăng nhập
export default function RequireLogin({ children }) {
  const { isGuest } = useLoginPrompt()
  if (!isGuest) return children

  return (
    <div className="page page--narrow">
      <div className="card lp__page">
        <h1>Cần đăng nhập để tiếp tục</h1>
        <p>Trang này dành cho thành viên. Hãy đăng nhập hoặc tạo tài khoản miễn phí để sử dụng.</p>
        <div className="lp__actions">
          <Link className="btn btn-primary btn-lg" to="/dang-nhap">Đăng nhập</Link>
          <Link className="btn btn-outline btn-lg" to="/dang-ky">Đăng ký</Link>
        </div>
        <Link className="link-red" to="/trang-chu">← Về trang chủ</Link>
      </div>
    </div>
  )
}
