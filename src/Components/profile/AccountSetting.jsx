import React, { useEffect, useState } from 'react'
import './accountsettings.css'
import { findUserByEmail, updateUserDetails } from '../utils/ApiFunctions'
const AccountSetting = () => {
  const userId=localStorage.getItem("scholarId")
  const [errorMessage,setErrorMessage]=useState("")
  const [successMessage,setSuccessMessage]=useState("")
    const [user,setUser]=useState({
      firstName:"",
      lastName:"",
      contactNo:"",
      occupation:""
    })
    const handleInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
          const result=await updateUserDetails(user)
          setUser(result)
          setSuccessMessage("Changes Saved Successfully")
        }catch(error){
          setErrorMessage(error.message)
        }
       
    }
    useEffect(()=>{
      const fetchUser=async ()=>{
        try{
          
          const result=await findUserByEmail(userId)
          setUser(result)
        }catch(error){
          setErrorMessage(error.message)
        }
      }
      fetchUser()
      setTimeout(()=>{
        setErrorMessage("")
        setSuccessMessage("")
      },3000)
     
    },[userId])
  return (
    <div className='accountsettings'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {successMessage && <p className='alert alert-success'>{successMessage}</p>}
        <h1 className='mainhead1'> Personal Information</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
            <label htmlFor='firstname'>First Name <span>*</span></label>
            <input required className='form-control' type='text' id='firstName' name='firstName' value={user.firstName || ''} onChange={handleInputChange} />
        </div>

        <div className='form-group'>
            <label htmlFor='lastname'>Last Name </label>
            <input className='form-control' type='text' id='lastName' name='lastName' value={user.lastName|| ''} onChange={handleInputChange} />
        </div>

        <div className='form-group'>
            <label htmlFor='contactno'>Contact No <span>*</span></label>
            <input required className='form-control' type='text' id='contactNo' name='contactNo' value={user.contactNo || ''} onChange={handleInputChange} />
        </div>
        <div className='form-group'>
            <label htmlFor='occupation'>Occupation </label>
            <input required className='form-control' type='text' id='occupation' name='occupation' value={user.occupation|| ''} onChange={handleInputChange} />
        </div>
       

        <button type='submit' className='mainbutton m-auto mt-4'> Save Changes</button>

      </form>
      

    </div>
  )
}

export default AccountSetting
