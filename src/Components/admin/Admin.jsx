import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './admin.css'
import AdminBar from './AdminBar'
import AllArticles from './AllArticles'
import AllUsers from './AllUsers'
const Admin = () => {
  const {activePage}=useParams()
  const [articles,setArticles]=useState([])
  const [users,setUsers]=useState([])
  const [errorMessage,setErrorMessage]=useState("")
  
  return (
    <div className='adminprofile'>
      <div className='adminheader'>
      <h1 className='project-color'> <strong>ADMIN PAGE</strong>
      </h1>
      </div>
      <div className='admintabs'>
        <AdminBar activePage={activePage}/>

      </div>
      <div>
        {activePage==='allArticles' && <AllArticles/> }
        {activePage==='allUsers' && <AllUsers/> }
      </div>
        
      
    </div>
  )
}

export default Admin
