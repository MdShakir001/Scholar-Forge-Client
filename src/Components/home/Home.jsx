import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { searchArticle } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
import ArticleCard from '../journal/ArticleCard'

const Home = () => {
 
  const[title,setTitle]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const [result,setResult]=useState([])
  const handleInputChange=(e)=>{
    setTitle(e.target.value)
    setResult([])

  }
 const handleSubmit= async(e)=>{
  e.preventDefault()
  if(title){
    try{
      const results=await searchArticle(title.trim())
      setResult(results)
    }catch(error){
      setErrorMessage(error.errorMessage)
    }
  }
  
 }
  return (
        <div className='m-auto mt-4 row col-md-4'>
          {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        <h1 ><b className='project-color'>SCHOLAR FORGE</b></h1>
       <form className='searchbar' onSubmit={handleSubmit}>
        <Form.Control
        type='text'
        name='title'
        id='title'
        value={title}
        onChange={handleInputChange}
      style={{ height: '40px' ,fontSize:'20px' }} 
      placeholder='Enter the research title'/>
       <Button 
       style={{ height: '40px',background:'#145369' }}>
        <b>Search </b>
        
      <FaSearch/>
      </Button>
       </form>
       {result.length>0 && (
        <Row className='search-result'>
          {result.map((article)=>(
              <Link key={article.id} to={`view/article/${article.id}`} style={{textDecoration:'none'}}>
                <ArticleCard article={article}/>
              </Link>
          ))}

        </Row>
       )}
       
      

      </div>
      
    
  )
}

export default Home
