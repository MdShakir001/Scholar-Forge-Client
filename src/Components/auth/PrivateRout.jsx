import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRout = () => {
    const user=localStorage.getItem("scholarId")
    if(!user){
        return <Navigate to={"/sign-in"}/>
    }
  return (
    <Outlet/>
  )
}

export default PrivateRout
