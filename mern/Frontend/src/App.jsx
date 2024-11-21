import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/LoginPage'
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Courses from './pages/Courses';
import MyCourse from './pages/MyCourse';
import AddCourse from './pages/AddCourse';
import Enroll from './pages/Enroll'

function App() {
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const storedUserRole = sessionStorage.getItem("userRole");
    const storedToken = sessionStorage.getItem("token");

    if (storedUserRole && storedToken) {
      setUserRole(storedUserRole);
      setToken(storedToken);
    }
    setLoading(false);

  }, []);

  if (loading) {
    return <div><span class="loader"></span></div>;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {
          token && (<>
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mycourses" element={<MyCourse />} />
            <Route path="/addCourse" element={<AddCourse />} />
            {
              userRole == "student" && (
<Route path='/enroll' element={<Enroll/>} />
              )
            }
            
          </>)
        }

        {token && <Route path="/home" element={<Navigate to="/home" />} />}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
