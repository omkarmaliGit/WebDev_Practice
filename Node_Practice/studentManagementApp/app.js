const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const filePath = path.join(__dirname, "students.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Load student records or initialize empty array
function loadStudents() {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  } else {
    return [];
  }
}

// Save student records
function saveStudents(students) {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
}

// Get all students
app.get("/students", (req, res) => {
  const students = loadStudents();
  res.json(students);
});

// Add a new student
app.post("/students", (req, res) => {
  const students = loadStudents();
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    roll: req.body.roll,
    class: req.body.class,
    attendance: [], // Empty attendance initially
  };
  students.push(newStudent);
  saveStudents(students);
  res.redirect("/");
});

// Mark attendance for a student
app.post("/students/:id/attendance", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id == req.params.id);
  if (student) {
    student.attendance.push({ date: req.body.date, status: req.body.status });
    saveStudents(students);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// Delete a student
app.delete("/students/:id", (req, res) => {
  const students = loadStudents();
  const updatedStudents = students.filter((s) => s.id != req.params.id);
  saveStudents(updatedStudents);
  res.json({ success: true });
});

// Route to edit a student's name using PUT
app.put("/students/:index/edit", (req, res) => {
  const students = loadStudents();
  const index = parseInt(req.params.index, 10);
  const newName = req.body.name;

  if (index >= 0 && index < students.length) {
    students[index].name = newName;
    saveStudents(students);
  }
  res.json({ success: true });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
