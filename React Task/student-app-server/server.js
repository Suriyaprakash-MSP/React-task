const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/studentDB')

  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const studentSchema = new mongoose.Schema({
  studentName: String,
  email: String,
  maths: Number,
  physics: Number,
  chemistry: Number,
  cutoff: Number,
});

const Student = mongoose.model("Student", studentSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suriyaprakash9042@gmail.com',
    pass: 'suriya4415R',
  },
});

const calculateCutoff = (maths, physics, chemistry) => {
  return ((maths + physics + chemistry) / 3).toFixed(2);
};

app.post('/api/students', async (req, res) => {
  const { studentName, email, maths, physics, chemistry } = req.body;

  const cutoff = calculateCutoff(maths, physics, chemistry);

  try {
    const student = new Student({ studentName, email, maths, physics, chemistry, cutoff });
    await student.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Cutoff Score",
      text: `Hello ${studentName},\n\nYour cutoff score is: ${cutoff}\n\nBest regards,\nStudent App`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: "Error sending email: " + error.message });
      }
      res.status(200).send({ message: "Student data saved and email sent successfully!" });
    });
  } catch (error) {
    res.status(500).send({ message: "Error saving student data: " + error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
