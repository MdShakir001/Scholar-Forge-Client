import React, { useEffect, useState } from 'react'

const AcceptedArticles = ({articles, errorMessage,status}) => {
    const [filteredArticles,setFilteredArticles]=useState([])
    const filterArticles=()=>{
        let filtered=articles
        if(status){
           
          if( filtered && filtered.length>0){
            filtered=filtered.filter((article)=>{
              return article.status===status;
            })
            setFilteredArticles(filtered)
          }
        }else{
          setFilteredArticles(filtered)
        }
         
      }

    useEffect(()=>{
        filterArticles()
    },[])  
  return (
    <div>
        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th style={{ width: '60px' }} >S.No</th>
                    <th style={{ width: '700px' }}>Title</th>
                    <th>Upload Date</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {filteredArticles.map((article,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{article.title.substring(0,30)}</td>
                        <td>{article.uploadDate}</td>
                    </tr>
                ))}

            </tbody>

        </table>
        {filteredArticles.length===0 && <p className='mainhead1 m-auto'>No Record Found</p>}
      
    </div>
  )
}

export default AcceptedArticles
