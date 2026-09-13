import { useEffect, useReducer } from 'react'
import { AuthDispatchContext, AuthStateContext } from './AuthContextBase.js'

const SESSION_KEY = 'tienda-session'
const ACCOUNT_KEY = 'tienda-account'

const initialState = {
  user: null,
  isAuthenticated: false,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_SESSION':
    case 'LOGIN':
    case 'REGISTER':
      return {
        user: action.payload,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

function readStoredUser(key) {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, () => ({
    user: readStoredUser(SESSION_KEY),
    isAuthenticated: Boolean(readStoredUser(SESSION_KEY)),
  }))

  useEffect(() => {
    if (state.user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(state.user))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [state.user])

  const register = (userData) => {
    const user = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'cliente',
    }
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ ...user, password: userData.password }))
    dispatch({ type: 'REGISTER', payload: user })
  }

  const login = (email, password) => {
    const account = readStoredUser(ACCOUNT_KEY)
    if (!account || account.email !== email || account.password !== password) {
      return false
    }

    const user = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role || 'cliente',
      accessDate: new Date().toISOString(),
    }
    dispatch({ type: 'LOGIN', payload: user })
    return true
  }

  const logout = () => dispatch({ type: 'LOGOUT' })

  return (
    <AuthStateContext.Provider value={{ ...state, register, login, logout }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
