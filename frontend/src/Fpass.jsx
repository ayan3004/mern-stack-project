import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
function Fpass() {
    const [admin,setAdmin]=useState({
       
        email: ''
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
    
       const response = await axios.post('http://localhost:5555/admin/forgetpass', admin,{withCredentials:true})
        .then((res)=>{
           console.log(res)
           window.alert('Otp sent!');  
           navigate('/Votp')
        })
        .catch((err)=>{
          console.log(err);
          window.alert('Otp sendin fail')
        })
        
      }
    
  return (
    <div className="container">
    <div className="form-wrapper">
      <h2>Login Page</h2>
      <form onSubmit={handlesubmit}>
          <input type="email" placeholder="Enter your email" name='email' value={admin.email} onChange={handleChange} /><br /><br />
          <button type="submit">Submit</button>
  
      </form>
      <Link to='/login'>Login</Link>

      
    </div>
  </div>  )
}

export default Fpass