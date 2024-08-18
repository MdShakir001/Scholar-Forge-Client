import React ,{useState} from 'react'

const ArticlesUnderReview = () => {
    const [filteredArticles,setFilteredArticles]=useState([])
  return (
    <div>
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
                        <td>{article.title}</td>
                        <td>{article.uploadDate}</td>
                    </tr>
                ))}

            </tbody>

        </table>
        {filteredArticles.length===0 && <p className='mainhead1 m-auto'>No Record Found</p>}
      
    </div>
  )
}

export default ArticlesUnderReview
