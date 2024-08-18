import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../utils/ApiFunctions'

const AllUsers = () => {
    const[users,setUsers]=useState([])
    const[errorMessage,setErrorMessage]=useState("")
    const fetchUsers= async()=>{
        try{
            const result=await getAllUsers()
            setUsers(result)
        }catch(error){
            setErrorMessage(error.message)
        }
        console.log(`time function gets called`)
    }
    useEffect(()=>{
        fetchUsers()
    },[])
  return (
    <div>
        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
       <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th style={{ width: '5%' }}>S.No</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Occupation </th>
                    <th>Contact No</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {users.map((user,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                        <td>{user.occupation}</td>
                        <td>{user.contactNo}</td>
                    </tr>
                ))}

            </tbody>
            
        </table>
        {users.length===0 && <p className='mainhead1 m-auto'>No Record Found</p>}
    </div>
  )
}

export default AllUsers
