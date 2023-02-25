import React, {createContext, useContext, useState} from 'react'

const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext)
}

export default function LoginProvider({children}) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false)
  const [isAdmin, setIsAdmin] = useState(user? user.isAdmin : false)

  const login = () => {
    setIsLoggedIn(true)
    setIsAdmin(JSON.parse(localStorage.getItem('user')).isAdmin)
  }
  const logout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    localStorage.removeItem('user')
  }

  window.onstorage = () => {
    logout()
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </LoginContext.Provider>
  )
}
