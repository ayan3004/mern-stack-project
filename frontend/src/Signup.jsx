import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';


const Signup = () => {
  const [admin,setAdmin]=useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

   const response = await axios.post('http://localhost:5555/admin/registration', admin,{withCredentials:true})
    .then((res)=>{
       console.log(res)     
       window.alert('Registration successful!');  

    })
    .catch((err)=>{
      console.log(err);
      window.alert('Registration failed. Please try again.');  
    })
    navigate('/Login')

    
  }
  
  

  return (
    <>

    <div className="container">
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={handlesubmit}>
            <input type="text" placeholder="Enter your name" name='name' value={admin.name} onChange={handleChange} /><br /><br />
            <input type="email" placeholder="Enter your email" name='email' value={admin.email} onChange={handleChange} /><br /><br />
            <input type="text" placeholder="Enter your password" name='password' value={admin.password} onChange={handleChange} /><br /><br />
            <input type="text" placeholder="Enter your confirmPassword" name='confirmPassword' value={admin.confirmPassword} onChange={handleChange} /><br /><br />
            <button type="submit">Submit</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>


</>
  );
};

export default Signup;


