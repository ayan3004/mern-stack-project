import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

function Votp() {
  const [admin, setAdmin] = useState({
    otp: '',
    newpassword: '',
    confirmpassword: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:5555/admin/verifyOtp', admin,{withCredentials:true})
      .then((res) => {
        console.log(res);
        window.alert('Password updated successfully!');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        window.alert('Password update failed!');
      });
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Verify OTP</h2>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            name="otp"
            value={admin.otp}
            onChange={handleChange}
          /><br /><br />
          <input
            type="text"
            placeholder="Enter New Password"
            name="newpassword"
            value={admin.newpassword}
            onChange={handleChange}
          /><br /><br />
          <input
            type="text"
            placeholder="Confirm New Password"
            name="confirmpassword"
            value={admin.confirmpassword}
            onChange={handleChange}
          /><br /><br />
          <button type="submit">Submit</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Votp;
