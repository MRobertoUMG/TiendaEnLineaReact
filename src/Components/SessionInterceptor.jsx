import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContextBase.js'

export default function SessionInterceptor() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status
        let responseData = error.response?.data

        if (typeof responseData === 'string') {
          try {
            responseData = JSON.parse(responseData)
          } catch {
            responseData = null
          }
        }

        const tokenError = responseData?.error
        const isLoginRequest = error.config?.url?.includes('/auth/login')

        if (status === 401 && !isLoginRequest && token) {
          logout()

          const message = tokenError === 'token_expired'
            ? 'Su sesión ya no es válida o ha caducado.'
            : 'Su sesión no es válida. Inicie sesión nuevamente.'

          sessionStorage.setItem('sessionMessage', message)
          navigate('/login', { replace: true })
        }

        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [token, logout, navigate])

  useEffect(() => {
    if (!token) {
      return undefined
    }

    const expiresAt = Number(localStorage.getItem('expiresAt'))
    if (!Number.isFinite(expiresAt) || expiresAt <= 0) {
      return undefined
    }

    const expireSession = () => {
      logout()
      sessionStorage.setItem(
        'sessionMessage',
        'Su sesión ya no es válida o ha caducado.'
      )
      navigate('/login', { replace: true })
    }

    const remainingTime = expiresAt - Date.now()
    if (remainingTime <= 0) {
      expireSession()
      return undefined
    }

    const timer = window.setTimeout(expireSession, remainingTime)
    return () => window.clearTimeout(timer)
  }, [token, logout, navigate])

  return null
}
