import { useCallback, useEffect, useReducer } from 'react'
import { AuthDispatchContext, AuthStateContext } from './AuthContextBase.js'
import { apiRequest } from '../api.js'

const SESSION_KEY = 'tienda-session'
const LEGACY_ACCOUNT_KEY = 'tienda-account'
const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const EXPIRES_AT_KEY = 'expiresAt'

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  expiresAt: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        expiresAt: action.payload.expiresAt,
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

function readStoredSession() {
  try {
    const legacySession = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    const { token: legacyToken, ...legacyUser } = legacySession || {}
    const token = localStorage.getItem(TOKEN_KEY) || legacyToken
    const savedUser = localStorage.getItem(USER_KEY)
    const user = savedUser
      ? JSON.parse(savedUser)
      : legacyUser
    const storedExpiry = localStorage.getItem(EXPIRES_AT_KEY)
    const expiresAt = storedExpiry ? Number(storedExpiry) : null

    if (
      typeof token !== 'string' ||
      token.length === 0 ||
      !user ||
      typeof user !== 'object' ||
      (storedExpiry && (!Number.isFinite(expiresAt) || expiresAt <= Date.now()))
    ) {
      return initialState
    }

    return { token, user, isAuthenticated: true, expiresAt }
  } catch {
    return initialState
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, readStoredSession)

  useEffect(() => {
    localStorage.removeItem(LEGACY_ACCOUNT_KEY)
  }, [])

  const saveSession = (user, token, actionType) => {
    const expiresAt = Date.now() + 5 * 60 * 1000

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    localStorage.setItem(EXPIRES_AT_KEY, String(expiresAt))
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, token }))
    dispatch({
      type: actionType,
      payload: { user, token, expiresAt },
    })
  }

  const register = async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        nombreCompleto: userData.name,
        correo: userData.email,
        password: userData.password,
      }),
    })
    const user = {
      id: response.usuario.id,
      name: response.usuario.nombreCompleto,
      email: response.usuario.correo,
      role: response.usuario.rol,
    }
    saveSession(user, response.token, 'REGISTER')
    return user
  }

  const login = (data) => {
    if (!data?.token || !data?.usuario) {
      throw new Error('La respuesta del servidor no contiene un token y usuario válidos.')
    }

    const user = {
      id: data.usuario.id,
      name: data.usuario.nombreCompleto,
      email: data.usuario.correo,
      role: data.usuario.rol,
      accessDate: new Date().toISOString(),
    }
    saveSession(user, data.token, 'LOGIN')
    return user
  }

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(EXPIRES_AT_KEY)
    localStorage.removeItem(SESSION_KEY)
    dispatch({ type: 'LOGOUT' })
  }, [])

  return (
    <AuthStateContext.Provider value={{ ...state, register, login, logout }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
