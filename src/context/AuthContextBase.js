import { createContext, useContext } from 'react'

export const AuthStateContext = createContext(null)
export const AuthDispatchContext = createContext(null)

function useRequiredContext(context, hookName) {
  const value = useContext(context)
  if (!value) {
    throw new Error(`${hookName} debe utilizarse dentro de AuthProvider`)
  }
  return value
}

export function useAuthState() {
  return useRequiredContext(AuthStateContext, 'useAuthState')
}

export function useAuthDispatch() {
  return useRequiredContext(AuthDispatchContext, 'useAuthDispatch')
}

export function useAuth() {
  const state = useAuthState()
  const dispatch = useAuthDispatch()
  return { ...state, dispatch }
}
