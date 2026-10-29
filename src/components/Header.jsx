import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { menus } from '../data/menus.js'
import { BellIcon } from './Icons.jsx'

export default function Header() {
  const { role } = useAuth()
  const current = role ?? 'guest'
  const links = menus[current]
  const loggedIn = current !== 'guest'

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/trang-chu" className="header__logo">
          TroGanTruong.vn
        </Link>

        <nav className="nav" aria-label="Điều hướng chính">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                'nav__link' + (isActive ? ' nav__link--active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <Link to="/" className="btn btn-ghost">
            Đổi vai trò
          </Link>

          {current === 'landlord' && (
            <Link to="/chu-tro/dang-tin" className="btn btn-primary">
              Đăng tin mới
            </Link>
          )}

          {loggedIn ? (
            <>
              <Link to="/thong-bao" className="icon-btn" aria-label="Thông báo">
                <BellIcon />
              </Link>
              <Link to={current === 'landlord' ? '/cai-dat' : '/ho-so'} className="account">
                <span className="account__avatar">
                  {current === 'landlord' ? 'C' : 'S'}
                </span>
                <span className="account__name">Tài khoản</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dang-nhap" className="btn btn-ghost">
                Đăng nhập
              </Link>
              <Link to="/dang-ky" className="btn btn-primary">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
