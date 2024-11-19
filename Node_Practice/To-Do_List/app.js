// app.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const filePath = path.join(__dirname, "tasks.json");

// Middleware to parse JSON data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Load tasks from file or initialize an empty array if file doesn't exist
function loadTasks() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } else {
    return [];
  }
}

// Save tasks to file
function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Route to get all tasks
app.get("/tasks", (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// Route to add a new task
app.post("/tasks", (req, res) => {
  // console.log({ req, body: req.body, data: req.body.text });
  const tasks = loadTasks();
  const newTask = { text: req.body.text, completed: false };
  tasks.push(newTask);
  saveTasks(tasks);
  res.redirect("/");
});

// Route to mark a task as complete
app.post("/tasks/:index/complete", (req, res) => {
  const tasks = loadTasks();
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    saveTasks(tasks);
  }
  res.redirect("/");
});

// Route to delete a task
app.post("/tasks/:index", (req, res) => {
  const tasks = loadTasks();
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    saveTasks(tasks);
  }
  res.redirect("/");
});

// Start the server
const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Server is running at http://localhost:${PORT}`);
});
