import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

// Các trang khách (chưa đăng nhập) không được vào
// eslint-disable-next-line react-refresh/only-export-components
export const gatedPrefixes = [
  '/tin-nhan',
  '/yeu-thich',
  '/chu-tro',
  '/dat-lich',
  '/o-ghep/dang-tin',
  '/ho-so',
  '/xac-minh-sinh-vien',
  '/thong-bao',
]
// eslint-disable-next-line react-refresh/only-export-components
export const isGated = (path) => gatedPrefixes.some((p) => path === p || path.startsWith(p + '/'))

const Ctx = createContext(null)

export function LoginPromptProvider({ children }) {
  const { role } = useAuth()
  const isGuest = !role || role === 'guest'
  const [message, setMessage] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => setMessage(null), [pathname])
  useEffect(() => {
    if (!message) return undefined
    const onKey = (e) => e.key === 'Escape' && setMessage(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [message])

  // Trả về true nếu là khách (đã hiện hộp thoại) => nơi gọi nên dừng hành động
  const requireLogin = useCallback(
    (text) => {
      if (!isGuest) return false
      setMessage(text || 'Bạn cần đăng nhập để sử dụng chức năng này.')
      return true
    },
    [isGuest],
  )

  return (
    <Ctx.Provider value={{ isGuest, requireLogin }}>
      {children}
      {message && (
        <div className="lp" role="dialog" aria-modal="true" aria-labelledby="lp-title" onClick={() => setMessage(null)}>
          <div className="lp__box" onClick={(e) => e.stopPropagation()}>
            <h2 id="lp-title">Cần đăng nhập để tiếp tục</h2>
            <p>{message}</p>
            <div className="lp__actions">
              <Link className="btn btn-primary btn-lg" to="/dang-nhap">Đăng nhập</Link>
              <Link className="btn btn-outline btn-lg" to="/dang-ky">Đăng ký</Link>
            </div>
            <button type="button" className="link-btn" onClick={() => setMessage(null)}>Để sau</button>
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoginPrompt() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLoginPrompt phải nằm trong LoginPromptProvider')
  return ctx
}
