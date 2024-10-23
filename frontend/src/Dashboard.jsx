import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function Dashboard() {

    const [admin,setAdmin]=useState({
        name: '',
        email: '',
        task: '',
      });
    
      
      const navigate=useNavigate();

    
    
      const handleChange = (e)=> {
        const { name, value } = e.target
        setAdmin((prevstate)=>({
          ...prevstate,
          [name]: value
        }))
      }
    
    
      
    
      const handlesubmit=async(e)=>{
        e.preventDefault();
    
       const response = await axios.post('http://localhost:5555/admin/insertadmin', admin,{withCredentials:true})
        .then((res)=>{
           console.log(res)      
        })
        .catch((err)=>{
          console.log(err);
        })
        navigate('/Viewdash')

        
      }
      


  return (

      <div className="container">
      <div className="form-wrapper">
        <h2>Add Work For Employees</h2>
        <form onSubmit={handlesubmit}>
            <input type="text" placeholder="Enter employe name" name='name' value={admin.name} onChange={handleChange} /><br /><br />
            <input type="email" placeholder="Enter employe email" name='email' value={admin.email} onChange={handleChange} /><br /><br />
            <input type="text" placeholder="Enter employe task" name='task' value={admin.task} onChange={handleChange} /><br /><br />
            <button type="submit">Submit</button>
        </form>
      </div>
    </div>  )
}

export default Dashboard;