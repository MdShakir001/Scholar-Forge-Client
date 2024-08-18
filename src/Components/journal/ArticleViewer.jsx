import React, { useEffect, useState } from 'react'
import { displayArticle, downloadArticle } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import PdfComp from './PdfComp';
import { GridLoader} from 'react-spinners';
const ArticleViewer = ({isClicked}) => {
    const [article,setArticle]=useState({
        title:"",
        authorName:"",
        authorEmail:"",
        uploadDate:""

    })
    const {articleId}=useParams()
    const [pdf,setPdf]=useState("")
    const[isLoading,setIsLoading]=useState(true)
    const [errorMessage,setErrorMessage]=useState("")
    const fetchPdf=(articleId)=>{
        setIsLoading(true)
        try{
            downloadArticle(articleId).then((response)=>{
                const url=window.URL.createObjectURL(new Blob([response],{type:"application/pdf"}))
                if(url){
                    setPdf(url)
                    console.log(isLoading)
                    setIsLoading(false)
                }
            })
        }catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    
    }
    const fetchArticle=async (articleId)=>{
        try{
            const result=await displayArticle(articleId)
            setArticle(result)
            fetchPdf(articleId)
            isClicked=false  
        }catch(error){
            setErrorMessage(error.message)
        }
       
    }
    useEffect(()=>{
        if(isClicked){
            fetchArticle(articleId)
        }
       
    },[articleId])
  
  return (
    <div className='pdf-container'>
        {errorMessage &&<p className='alert alert-danger'>{errorMessage}</p>}
        <h2>{article.title.toUpperCase()}</h2>
        <div className='pdf-details'>
            <p>Author Name : <b>{article.authorName.toUpperCase()}</b></p>
            <p>Upload Date : <b>{article.uploadDate}</b></p>
        </div>
        <p>Note : Loading make take up to few minutes based on the load on the server and your internet connection </p>
      <div >
        <div >
        <GridLoader color='#145369' loading={isLoading} size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        style={{margin:'auto',justifyContent:'center'}}/>
        </div>
        
        {pdf && <PdfComp pdf={pdf}/>}
      </div>
    </div>
  )
}

export default ArticleViewer
