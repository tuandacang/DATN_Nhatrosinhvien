import { createContext, useContext, useState } from 'react'

// Ba vai trò: 'guest' (khách), 'student' (sinh viên), 'landlord' (chủ trọ)
const AuthContext = createContext(null)

function readRole() {
  try {
    return localStorage.getItem('role')
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [role, setRoleState] = useState(readRole)

  const setRole = (next) => {
    setRoleState(next)
    try {
      if (next) localStorage.setItem('role', next)
      else localStorage.removeItem('role')
    } catch {
      /* bỏ qua nếu trình duyệt chặn localStorage */
    }
  }

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth phải nằm trong AuthProvider')
  return ctx
}
