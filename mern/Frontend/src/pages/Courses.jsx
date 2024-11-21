import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [data, setData] = useState([]);
  const userRole = sessionStorage.getItem("userRole");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.courses);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEnroll = (course) => {
    navigate("/enroll", { state: { course } });
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:1008/teacher/deleteCourse?id=${id}`);
      setData(data.filter((course) => course._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="course-banner">
        <h1>Empower Your Future</h1>
      </div>
      <div className="course-container">
        <h2>All Courses</h2>
        <div className="course-grid">
          {data &&
            data.map((course, index) => (
              <div className="course-card" key={index}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhOt8yVPy6GGZ4tjCXHpImPPqpNoEwJGeE2Q&s"
                  alt="Course Thumbnail"
                  width={100}
                />
                <h3>{course.name}</h3>
                <p><strong>Subject:</strong> {course.subject}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Rating:</strong> {course.rating} ⭐</p>

                {userRole === "student" && (
                  <button
                    className="btn enroll-btn"
                    onClick={() => handleEnroll(course)}
                  >
                    Enroll Now
                  </button>
                )}

                {userRole === "teacher" && (
                  <div className="teacher-actions">
                    <button
                      className="btn edit-btn"
                      onClick={() => navigate(`/edit/${course._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteCourse(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
