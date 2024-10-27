import React, { useState } from 'react';
import './App.css'
import axios from 'axios';

function StudentForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    maths: '',
    physics: '',
    chemistry: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/server", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <div>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Student Name:</label>
        <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required /><br/>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br/>
        <label>Maths Mark:</label>
        <input type="number" name="maths" value={formData.maths} onChange={handleChange} required /><br/>
        <label>Physics Mark:</label>
        <input type="number" name="physics" value={formData.physics} onChange={handleChange} required /><br/>
        <label>Chemistry Mark:</label>
        <input type="number" name="chemistry" value={formData.chemistry} onChange={handleChange} required /><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StudentForm;
