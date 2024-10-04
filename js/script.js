const addButton = document.getElementById("add-task-input");
const taskList = document.getElementById("task-list");

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskInput = document.getElementById("input-task");
  const task = taskInput.value;
  if (task) {
    taskList.append(addTask(task));
    taskInput.value = "";
  }
});

function addTask(task) {
  const newTask = document.createElement("li");
  newTask.textContent = task;
  newTask.classList.add("task-list-item");
  newTask.append(
    createButton("Edit", "edit-button"),
    createButton("Delete", "delete-button")
  );
  return newTask;
}

function createButton(text, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  return button;
}
