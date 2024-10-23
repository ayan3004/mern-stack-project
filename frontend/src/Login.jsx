import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function Login() {

    const [admin,setAdmin]=useState({
       
        email: '',
        password: '',
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
    
       const response = await axios.post('http://localhost:5555/admin/loginadmin', admin,{withCredentials:true})
        .then((res)=>{
           console.log(res)
           window.alert('Login successful!');  
           navigate('/dashboard')


        })
        .catch((err)=>{
          console.log(err);
          window.alert('Login failed. Please check your credentials and try again.')
        })
        
      }
      
  return (
    <div className="container">
  <div className="form-wrapper">
    <h2>Login Page</h2>
    <form onSubmit={handlesubmit}>
        <input type="email" placeholder="Enter your email" name='email' value={admin.email} onChange={handleChange} /><br /><br />
        <input type="text" placeholder="Enter your password" name='password' value={admin.password} onChange={handleChange} /><br /><br />
        <button type="submit">Submit</button>

    </form>

    
  </div>
  <Link to='/'>Signup</Link>&nbsp;&nbsp;&nbsp;
    <Link to='/Newpass'>Change Password</Link>&nbsp;&nbsp;&nbsp;
    <Link to='/Fpass '>Forget Password</Link>
</div>
  )
}

export default Login