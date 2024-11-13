fetch("/tasks")
  .then((response) => response.json())
  .then((tasks) => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = "task";
      taskItem.innerHTML = `
                        <span class="${task.completed ? "completed" : ""}">
                            ${task.text}
                        </span>
                        ${
                          task.completed
                            ? ""
                            : `<form style="display:inline;" action="/tasks/${index}/complete" method="POST"><button type="submit">Mark as Complete</button></form>`
                        }
                        ${`<form style="display:inline;" action="/tasks/${index}" method="POST"><button type="submit">Delete a Task</button></form>`}
                    `;
      taskList.appendChild(taskItem);
    });
  });
