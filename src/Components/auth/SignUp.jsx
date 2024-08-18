import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/ApiFunctions'
import { useAuth } from './AuthProvider'
const SignUp = () => {
    const auth=useAuth()
    const navigate=useNavigate()
    const [errorMessage,setErrorMessage]=useState("")
    const [successMessage,setSuccessMessage]=useState("")
    const [userSignUp,setUserSignUp]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""

    })
    const handleInputChange=(e)=>{
        setUserSignUp({...userSignUp,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            const result=await registerUser(userSignUp)
            auth.handleLogin(result.token)
            navigate("/")
            window.location.reload()
        }catch(error){
            setErrorMessage(error.message)
        }

    }
  return (
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {successMessage && <p className='alert alert-success'>{successMessage}</p>}
      <h2 className='project-color'>Register</h2>
      <form onSubmit={handleSubmit} className='col-md-8'>
            <div className='row mb-3'>
                <label htmlFor="firstName" className='col-sm-2 col-form-label'>
                    Firstname
                </label>
                <div>
                    <input required 
                    id='firstName'
                    name='firstName'
                    type="text"
                    className='form-control'
                    value={userSignUp.firstName}
                    onChange={handleInputChange}
                     />
                </div>

            </div>
            <div className='row mb-3'>
                <label htmlFor="lastName" className='col-sm-2 col-form-label'>
                    Lastname
                </label>
                <div>
                    <input required 
                    id='lastName'
                    name='lastName'
                    type="text"
                    className='form-control'
                    value={userSignUp.lastName}
                    onChange={handleInputChange}
                     />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor="email" className='col-sm-2 col-form-label'>
                    Email
                </label>
                <div>
                    <input required 
                    id='email'
                    name='email'
                    type="email"
                    className='form-control'
                    value={userSignUp.email}
                    onChange={handleInputChange}
                     />
                </div>

            </div>
            <div className='row mb-3'>
                <label htmlFor="password" className='col-sm-2 col-form-label'>
                    Password
                </label>
                <div>
                    <input required 
                    id='password'
                    name='password'
                    type="password"
                    className='form-control'
                    value={userSignUp.password}
                    onChange={handleInputChange}
                    autoComplete="on"
                     />
                </div>
            </div>
            <div className='mb-3'>
                <button type='submit' className='mainbutton' style={{marginRight:"10px"}}>
                    <b>Sign-Up</b>
                </button>
                <span style={{ marginLeft: "10px" }}>
						Already have an account? <Link to={"/sign-in"}>Sign-In</Link>
					</span>
            </div>
        </form>
    </section>
  )
}

export default SignUp
