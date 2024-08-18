import { jwtDecode } from 'jwt-decode'
import React, { createContext, useContext, useState } from 'react'
export const AuthContext=createContext({
    user:null,
    handleLogin:(token)=>{},
    handleLogout:()=>{}

}) 
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const handleLogin=(token)=>{
        const decodeToken=jwtDecode(token);
        localStorage.setItem("scholarId",decodeToken.sub)
        localStorage.setItem("scholarRole",decodeToken.role)
        localStorage.setItem("scholarToken",token)
        setUser(decodeToken)
    }
    const handleLogout=()=>{
        localStorage.removeItem("scholarId")
        localStorage.removeItem("scholarRole")
        localStorage.removeItem("scholarToken")
    }
  return (
    <AuthContext.Provider value={{user,handleLogin,handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider
export const useAuth=()=>{
    return useContext(AuthContext)
}
