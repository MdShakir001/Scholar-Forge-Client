import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserSideBar from './UserSideBar'
import AccountSetting from './AccountSetting'
import './userprofile.css'
import UploadArticle from './UploadArticle'
import AcceptedArticles from './AcceptedArticles'
import ArticlesUnderReview from './ArticlesUnderReview'
import SignOut from '../auth/SignOut'
import { listOfUserArticles } from '../utils/ApiFunctions'
const Profile = () => {
  const [errorMessage,setErrorMessage]=useState("")
    const {activePage}=useParams()
    const [articles,setArticles]=useState([])
    const fetchUserArticles= async()=>{
      try{
        listOfUserArticles().then((response)=>{
          setArticles(response)
        })
      }catch(error){
        setErrorMessage(error.message)
      }
    }
    useEffect(()=>{
      fetchUserArticles()
    },[])

  return (
    <div className='userprofile'>
        <h1 className='m-auto mt-4 project-color'>My Profile</h1>
        <div className='userprofileIn'>
            <div className='left'>
                <UserSideBar activePage={activePage}/>
            </div>
            <div className='right'>
               {activePage ==='accountSettings' && <AccountSetting/>} 
               {activePage ==='uploadArticles' && <UploadArticle/>}
               {activePage ==='acceptedArticles' && <AcceptedArticles articles={articles} errorMessage={errorMessage} status={"ACCEPTED"} />}
               {activePage ==='articlesUnderReview' && <AcceptedArticles articles={articles} errorMessage={errorMessage} status={"Under-Review"} />}
               {activePage ==='rejectedArticles' && <AcceptedArticles articles={articles} errorMessage={errorMessage}  status={"REJECTED"} />}
               {activePage ==='sign-out'&& <SignOut/>}
            </div>


        </div>
      
    </div>
  )
}

export default Profile
