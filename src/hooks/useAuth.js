import { useContext } from 'react'
import { AuthContext } from '../context/auth'

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined || context === null) {
    throw new Error('useAuthContext must be called within AuthContextProvider')
  }
  return context
}
