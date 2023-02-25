import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useLogin } from './LoginProvider'


const UserContext = createContext();

export function useUser() {
  return useContext(UserContext)
}

export default function UserProvider({children}) {
  const [user, setUser] = useState(null)
  const { isLoggedIn } = useLogin()

  useEffect(() => {
    try{
      const getUser = async () => {
        const result = await axios.get(`http://localhost:4000/users/user` , {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
        })
        setUser(result.data);
      }
      if(isLoggedIn){
      getUser();
      }
    } catch(e) {
      console.log(e)
    }
  }, [isLoggedIn] )


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}