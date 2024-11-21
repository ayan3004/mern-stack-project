import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const token = sessionStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    duration: "",
    description: "",
    posterImage: "",
    level: "",
    certificate: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/teacher/addCourse",
        {
          name: formData.name,
          subject: formData.subject,
          duration: formData.duration,
          description: formData.description,
          instruction: formData.instruction,
          // posterImage: formData.posterImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setFormData({});
        alert("Course added successfully!");
        navigate("/mycourses");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header />
      <div className="add-course-container">
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmit} className="add-course-form">
          <div className="form-group">
            <label htmlFor="courseName">Course Name *</label>
            <input
              type="text"
              id="courseName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className="form-group">
            <label htmlFor="duration">Duration *</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="level">Level</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="">Select level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="posterImage">Poster Image</label>
            <input
              type="file"
              id="posterImage"
              name="posterImage"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
       
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="certificate"
              name="certificate"
              checked={formData.certificate}
              onChange={handleChange}
            />
            <label htmlFor="certificate">Certificate</label>
          </div>
          <button type="submit">Add Course</button>
        </form>
      </div>
    </>
  );
}
