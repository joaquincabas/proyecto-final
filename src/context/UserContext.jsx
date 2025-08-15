import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  const login = () => {
    setUser(true)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ login, logout, user }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useAuth = () => useContext(UserContext)

export { UserProvider, useAuth }