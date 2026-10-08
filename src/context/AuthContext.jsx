import { useEffect, useReducer } from 'react'
import { AuthDispatchContext, AuthStateContext } from './AuthContextBase.js'
import { apiRequest } from '../api.js'

const SESSION_KEY = 'tienda-session'
const LEGACY_ACCOUNT_KEY = 'tienda-account'

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
    localStorage.removeItem(LEGACY_ACCOUNT_KEY)
  }, [])

  useEffect(() => {
    if (state.user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(state.user))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [state.user])

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
    dispatch({ type: 'REGISTER', payload: user })
    return user
  }

  const login = async (email, password) => {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ correo: email, password }),
      })
      const user = {
        id: response.usuario.id,
        name: response.usuario.nombreCompleto,
        email: response.usuario.correo,
        role: response.usuario.rol,
        accessDate: new Date().toISOString(),
      }
      dispatch({ type: 'LOGIN', payload: user })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error
          ? error.message
          : 'No fue posible iniciar sesión.',
      }
    }
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
