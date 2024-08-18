import React, { useState } from 'react'
import './uploadarticle.css'
import { addArticle } from '../utils/ApiFunctions'
const UploadArticle = () => {
    const [errorMessage,setErrorMessage]=useState("")
    const [successMessage,setSuccessMessage]=useState("")
    const [article,setArticle]=useState({
        title:"",
        authorName:"",
        authorEmail:"",
        uploadDate:new Date().toISOString().split('T')[0]
    })
    const[isSubmitted,setIsSubmitted]=useState(false)
    const [document,setDocument]=useState(null)
    const handleInputChange=(e)=>{
        setArticle({...article,[e.target.name]:e.target.value})

    }
    const handleDocumentChange=(e)=>{
        setDocument(e.target.files[0])
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        setIsSubmitted(true)
        try{
            const result=await addArticle(article,document)
            setArticle({
                title:"",
            authorName:"",
            authorEmail:"",
         uploadDate:new Date().toISOString().split('T')[0],
            document:null
            })

            if(result.status ===200){
                setSuccessMessage("Article added Successfully !")
                setIsSubmitted(false)
                setErrorMessage("")
            }else{
                setIsSubmitted(false)
                setErrorMessage("Something went wrong")
            }
        }catch(error){
            setIsSubmitted(false)
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000);
    }
  return (
    <div className='uploadarticle'>
        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        {successMessage && <p className='alert alert-success'>{successMessage}</p>}
        <div className='headiv'>
        <h4 className='mainhead1 m-auto'>Upload a new Article</h4>
        </div>
        <form className='form' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="title">Title <span>*</span></label>
                <input required className='form-control' type="text" name="title" id="title" value={article.title} onChange={handleInputChange} />
            </div>
            
            <div className='form-group'>
                <label htmlFor="authorName">Author Name <span>*</span></label>
                <input required className='form-control' type="text" name="authorName" id="authorName" value={article.authorName} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
                <label htmlFor="authorEmail">Author Email <span>*</span></label>
                <input required className='form-control' type="email" name="authorEmail" id="authorEmail" value={article.authorEmail} onChange={handleInputChange} />
            </div>
            
            
            <div className='form-group'>
                <label htmlFor="document">Choose Article <span>*</span></label>
                <input required className='form-control' type="file" accept='.pdf' name="document" id="document" onChange={handleDocumentChange} />
            </div>

            <button type='submit' className='mainbutton m-auto mt-4' disabled={isSubmitted}> Upload Article</button>
        </form>
      
    </div>
  )
}

export default UploadArticle
