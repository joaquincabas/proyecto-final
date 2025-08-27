import React, { createContext, useState, useContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const setUserContext = (value) => setIsLoggedIn(value)

  return (
    <UserContext.Provider value={{ isLoggedIn, setUserContext }}>
      {children}
    </UserContext.Provider>
  )
}


export const useAuth = () => useContext(UserContext)