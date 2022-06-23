import { navigate } from 'gatsby'
import React, { createContext, useEffect, useState } from 'react'
import { getUserSession, login, register } from '../services/auth'

const defaultState = {
  data: {}
}

export const AuthContext = createContext(defaultState)

export const AuthProvider = props => {
  const [loginModal, setLoginModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const openLoginModal = () => {
    setLoginModal(true)
  }

  const closeLoginModal = () => {
    setLoginModal(false)
  }

  const loginUser = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const user = await login(email, password)
      setUser(user)
      return user
    } catch (error) {
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const registerUser = async ({ username, email, password }) => {
    setIsLoading(true)
    setError(null)
    try {
      const user = await register({ username, email, password })
      setUser(user)
    } catch (error) {
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const cleanError = () => {
    setError(null)
  }

  const logout = () => {
    setLoginModal(false)
    setError(null)
    setUser(null)
    window.localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    getUserSession()
      .then(user => {
        if (user) {
          setUser(user)
        }
        setIsLoading(false)
      })
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      loginModal,
      actions: {
        openLoginModal,
        closeLoginModal,
        cleanError,
        loginUser,
        logout,
        registerUser
      }
    }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
