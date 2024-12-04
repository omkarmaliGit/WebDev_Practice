document.addEventListener("DOMContentLoaded", () => {
  const studentList = document.getElementById("student-list");
  const addStudentForm = document.getElementById("add-student-form");

  // Fetch students and display
  function fetchStudents() {
    fetch("/students")
      .then((res) => res.json())
      .then((students) => {
        studentList.innerHTML = "";
        students.forEach((student) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${student.name}</td>
                        <td>${student.roll}</td>
                        <td>${student.class}</td>
                        <td>
                            ${student.attendance
                              .map((a) => `<p>${a.date}: ${a.status}</p>`)
                              .join("")}
                            <form class="attendance-form">
                                <input type="date" name="date" required>
                                <select name="status">
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                </select>
                                <button type="submit">Mark</button>
                            </form>
                        </td>
                        <td>
                            <button class="delete-btn" data-id="${
                              student.id
                            }">Delete</button>
                            <button class="edit-btn" data-id="${
                              student.id
                            }">Edit</button>
                        </td>
                    `;
          studentList.appendChild(row);

          // Mark attendance
          row
            .querySelector(".attendance-form")
            .addEventListener("submit", (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              fetch(`/students/${student.id}/attendance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  date: formData.get("date"),
                  status: formData.get("status"),
                }),
              }).then(fetchStudents);
            });

          // Delete student
          row.querySelector(".delete-btn").addEventListener("click", () => {
            fetch(`/students/${student.id}`, { method: "DELETE" }).then(
              fetchStudents
            );
          });

          //Edit student
          document.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
              const index = e.target.dataset.index;
              const newName = prompt(
                "Enter the new name:",
                students[index].name
              );
              if (newName) {
                fetch(`/students/${index}/edit`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name: newName }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.success) location.reload();
                  });
              }
            });
          });

          //
        });
      });
  }

  // Add new student
  addStudentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addStudentForm);
    fetch("/students", {
      method: "POST",
      body: new URLSearchParams(formData),
    }).then(() => {
      addStudentForm.reset();
      fetchStudents();
    });
  });

  // Initial fetch
  fetchStudents();
});
