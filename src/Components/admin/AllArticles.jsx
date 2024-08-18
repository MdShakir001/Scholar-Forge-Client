import React, { useEffect, useState } from 'react'
import { FaAccessibleIcon, FaDumpster, FaEye, FaTrashAlt } from 'react-icons/fa'
import { deleteArticle, getAllArticles, updateArticleStatus } from '../utils/ApiFunctions'
import { FaCross } from 'react-icons/fa6'

const AllArticles = () => {
    const [filteredArticles,setFilteredArticles]=useState([])
    const [errorMessage,setErrorMessage]=useState("")
    const [successMessage,setSuccessMessage]=useState("")
    const fetchArticles= async ()=>{
        try{
            const result=await getAllArticles()
            setFilteredArticles(result)
        }catch(error){
          setErrorMessage(error.message)
        }
    }
    const handleStatusUpdate= async(articleId,status)=>{
        try{
            const result=await updateArticleStatus(articleId,status);
            if(result){
                fetchArticles()
            }
            setSuccessMessage(result)
        }catch(error){
            setErrorMessage(error.message);
        }

    }
    const handleDelete= async (articleId)=>{
        try{
            const result=await deleteArticle(articleId)
            if(result.status===204){
                setSuccessMessage(result)
                fetchArticles()
            }
            
        }catch(error){
            setErrorMessage(error.message)
        }
    }
    useEffect(()=>{
        fetchArticles()
    },[])
  return (
    <div>
         <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th style={{ width: '5%' }}>S.No</th>
                    <th style={{ width: '30%' }}>Title</th>
                    <th>Author Name</th>
                    <th>Author Email </th>
                    <th>Upload Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {filteredArticles.map((article,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{article.title.substring(0,30)}</td>
                        <td>{article.authorName}</td>
                        <td>{article.authorEmail}</td>
                        <td>{article.uploadDate}</td>
                        <td className='gap-2'>
                            <button className='btn btn-primary'>

                                <FaEye/>
                            </button>
                            {article.status==='Under-Review' && (
                                <>
                                <button className='btn btn-warning' onClick={()=>handleStatusUpdate(article.id,"REJECTED")}>
                                <FaCross/>
                                </button>
                                <button className='btn btn-success' onClick={()=>handleStatusUpdate(article.id,"ACCEPTED")}>
                                    <FaAccessibleIcon/>
                                </button>
                                </>
                            )}
                            <button className='btn btn-danger' onClick={()=>handleDelete(article.id)}>
                                <FaTrashAlt/>

                            </button>
                        </td>
                    </tr>
                ))}

            </tbody>

        </table>
        {filteredArticles.length===0 && <p className='mainhead1 m-auto'>No Record Found</p>}
    </div>
  )
}

export default AllArticles
