import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Enroll() {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course; // Access the course details

  const handleConfirmEnrollment = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/enroll",
        { courseId: course._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Enrollment successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="course_baner">
        <h1>Better Future</h1>
      </div>
      <center style={{ backgroundColor: "#F5F5F5" }}>
        <h2 className="p-4">Course Enrollment</h2>
      </center>
      <div className="row" style={{ marginTop: "-7.5px" }}>
        <div className="col-3 filter"></div>
        <div className="col-9 courses p-5" style={{ backgroundColor: "#ECE6F6" }}>
          <h1>Enroll in Course</h1> <br />
          <div className="row text-center" >
            <div>
              {course ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Subject</th>
                      <th>Rating</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{course.name}</td>
                      <td>{course.subject}</td>
                      <td>{course.rating} ⭐</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={handleConfirmEnrollment}
                        >
                          Confirm Enrollment
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>No course selected for enrollment.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
