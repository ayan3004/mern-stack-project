import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const userRole = sessionStorage.getItem("userRole");
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">
          <img
            src="https://img.freepik.com/premium-vector/drawing-computer-with-pen-pen-screen_1187092-29695.jpg?semt=ais_hybrid"
            alt="Logo"
          />
          <span className="text-danger ms-2">E LEARNING</span>
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <i className="fas fa-search"></i>
      </div>
      <nav className="nav">
        <Link to="/courses">Courses</Link>
        {userRole === "student" && <Link to="/enroll">Enroll Courses</Link>}
        {userRole === "teacher" && <Link to="/mycourses">My Courses</Link>}
        <a href="#">About Us</a>
       
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </nav>
    </header>
  );
}
