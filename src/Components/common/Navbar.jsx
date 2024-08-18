import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/Scholar Forge.png'
import account from '../../assets/images/account.png'
import {Image} from 'react-bootstrap'
const Navbar = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("scholarRole"))
  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem("scholarRole"))
    
  },[])
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-0 sticky-top'>
        <div className='container-fluid'>
            <Link to={'/'} className='navbar-brand'>
                <Image className='mr-4' src={logo} height={60} />
                <span  style={{fontSize:'30px', marginLeft:'4px'}}><strong className='project-color'>𝕾𝖈𝖍𝖔𝖑𝖆𝖗 𝕱𝖔𝖗𝖌𝖊</strong></span>
            </Link>
            <div className='navbar-nav align-items-center'>
              {isLoggedIn ==='ADMIN' && <Link to={'/admin/allArticles'} className='nav-link'><b className='project-color'>Admin</b></Link> }
              {isLoggedIn?(
                <Link to={'/profile/accountSettings'} className='nav-link'>
                <Image src={account} height={50} />
                  </Link>
              ):
          <Link to={'/sign-in'} className='nav-link'><b className='project-color'>Sign-in</b></Link>
            }
        </div>
        </div>
        
      
    </nav>
  )
}

export default Navbar
