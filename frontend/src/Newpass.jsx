import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function Newpass() {
  const [admin, setAdmin] = useState({
    email: '',
    password: '',
    newpassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevstate) => ({
      ...prevstate,
      [name]: value
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5555/admin/changepass', admin,{withCredentials:true});
      console.log(response);
      window.alert('Password changed!');
      navigate('/login');
    } catch (err) {
      console.log(err);
      window.alert('Password change request failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Change Password</h2>
        <form onSubmit={handlesubmit}>
          <input type="email" placeholder="Enter your Email" name='email' value={admin.email} onChange={handleChange} /><br /><br />
          <input type="password" placeholder="Enter your old password" name='password' value={admin.password} onChange={handleChange} /><br /><br />
          <input type="password" placeholder="Enter your new password" name='newpassword' value={admin.newpassword} onChange={handleChange} /><br /><br />
          <button type="submit">Submit</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Newpass;
