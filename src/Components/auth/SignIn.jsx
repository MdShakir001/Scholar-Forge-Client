import React, { useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { loginUser } from '../utils/ApiFunctions'
import { useAuth } from './AuthProvider'
const SignIn = () => {
    const auth=useAuth()
    const navigate=useNavigate()
    const[errorMessage,setErrorMessage]=useState("")
    const [login,setLogin]=useState({
        email:"",
        password:""
    })
    const handleInputChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const result=await loginUser(login)
            auth.handleLogin(result.token)
            navigate("/",{replace:true})
            window.location.reload()
        }catch(error){
            setErrorMessage(error.message)
        }
    }
  return (
    <section className='container col-6 mt-5 mb-5'>
        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        <h2 className='project-color'>Login</h2>
        <form onSubmit={handleSubmit} className='col-md-8'>
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
                    value={login.email}
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
                    value={login.password}
                    onChange={handleInputChange}
                    autoComplete="on"
                     />
                </div>
            </div>
            <div className='mb-3 align-items-center'>
                <button type='submit' className='mainbutton' style={{marginRight:"10px"}}>
                    Sign-In
                </button>
                <span style={{marginLeft:'10px'}}> Don't have an account ?  
                <Link to={"/sign-up"}> Sign Up</Link></span>
            </div>
        </form>
    </section>
  )
}

export default SignIn
