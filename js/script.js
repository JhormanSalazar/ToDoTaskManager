const addButton = document.getElementById("add-task-input");
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
loadTasksFromLocalStorage();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskInput = document.getElementById("input-task");
  const task = taskInput.value;
  if (task) {
    taskList.append(addTask(task));
    storeTaskInLocalStorage(task);
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

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    deleteTask(event.target.parentElement);
  } else if (event.target.classList.contains("edit-button")) {
    editTask(event.target.parentElement);
  }
});

function deleteTask(taskItem) {
  if (confirm("¿Deseas eliminar esta tarea?")) {
    taskItem.remove();
    updateTaskFromLocalStorage();
    //EL METODO UpdateTaskFromLocalStorage() ME PERMITE ELIMINAR LAS TAREAS DE MANERA INTERNA EN EL LOCALSTORAGE, YA QUE ESTE RENDERIZA DE NUEVO TODOS LOS LI DEL TASKLIST, Y AL FALTAR UNO, ENTONCES ESTE SE ELIMINA.
  }
}

function editTask(taskItem) {
  const newTask = prompt("Edita la tarea:", taskItem.firstChild.textContent);
  if (newTask !== null) {
    taskItem.firstChild.textContent = newTask;
    updateTaskFromLocalStorage();
  }
}

function updateTaskFromLocalStorage() {
 const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => li.firstChild.textContent);
 localStorage.setItem("tasks", JSON.stringify(tasks));
}

function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
 tasks.forEach( task => {
  taskList.appendChild(addTask(task));
 });
}