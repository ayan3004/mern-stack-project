import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Viewdash from './Viewdash';
import Editdash from './Editdash';
import Newpass from './Newpass';
import Fpass from './Fpass';
import Votp from './Votp';


function App() {
  return (
    <>
    <Router>
      <Routes>

        <Route path="/" element={<Signup />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/Newpass" element={<Newpass />} />
          <Route path="/Fpass" element={<Fpass />} />
          <Route path="/Votp" element={<Votp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Viewdash" element={<Viewdash />} />
          <Route path="/Editdash" element={<Editdash />} />

      
      </Routes>
      </Router>
          </>
  );
}

export default App;
