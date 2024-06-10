// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const timeStamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return timeStamp + random;
}

const uniqueTaskId = generateTaskId();
console.log(uniqueTaskId);

// Todo: create a function to create a task card
// needs title, deadline and description
function createTaskCard(event) {
  const taskCard = document.createElement("div");
  taskCard.add("task-card");
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});

const taskBut = document.getElementById("btn-success");
const modal = document.getElementsByClassName("myModal");
const submitBut = document.getElementById("submit-task");

taskBut.addEventListener("click", () => {
  modal.classList.add("show");
});

submitBut.addEventListener("click", () => {
  modal.classList.remove("show");
});
