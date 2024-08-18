import React, { useState } from 'react'
import { useAuth } from './AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const SignOut = () => {
    const auth=useAuth()
    const navigate=useNavigate()
    const [showDialog,setShowDialog]=useState(true)
    const logout=()=>{
        auth.handleLogout()
        setShowDialog(false)
        navigate("/",{replace:true})
        window.location.reload()
    }
    const closeModal=()=>{
        setShowDialog(false)
        navigate("/profile/accountSettings",{replace:true})
    }
  return (
    <>
    {showDialog ?
    <div className='modal-wrapper'>
    <div className='modal-container'>

        
        <h2 className='mainhead1'>Are you sure you want to logout ?</h2>
        <div className='modal-buttons'>
        <button className='mainbutton' onClick={closeModal} ><b>No,Stay</b></button>
            <button className='mainbutton'style={{color:"red"}} onClick={logout}><b>Sign-out</b></button>
            

        </div>
    </div>
      
    </div>
    :
    <> 
    </>}
    </>

  )
}

export default SignOut
