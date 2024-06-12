// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// // Todo: create a function to generate a unique task id
function generateTaskId() {
  const timeStamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return timeStamp + random;
}

const uniqueTaskId = generateTaskId();
console.log(uniqueTaskId);

// Todo: create a function to create a task card
function createTaskCard(task) {
  console.log(task);
  const taskCardEl = document.createElement("div");
  taskCardEl.classList.add("task-card", "card", "mb-2");
  taskCardEl.setAttribute("id", `taskCard_${task.id}`);
  taskCardEl.setAttribute("draggable", "true");
  taskCardEl.setAttribute("data-id", task.id);

  const todayDate = new Date();
  const deadline = new Date(task.deadline);
  if (deadline < todayDate) {
    taskCardEl.classList.add("overdue");
  } else {
    taskCardEl.classList.add("due-soon");
  }

  const cardBodyEl = document.createElement("div");
  cardBodyEl.classList.add("card-body");

  const cardTitleEl = document.createElement("h4");
  cardTitleEl.classList.add("card-text");
  cardTitleEl.textContent = task.title;

  const cardTextEl = document.createElement("p");
  cardTextEl.classList.add("card-text");
  cardTextEl.textContent = task.description;

  const cardDeadlineEl = document.createElement("p");
  cardDeadlineEl.classList.add("card-text");
  cardDeadlineEl.textContent = `Due date: ${task.deadline}`;

  const deleteBut = document.createElement("button");
  deleteBut.classList.add("btn", "btn-delete");
  deleteBut.textContent = "Delete";
  deleteBut.addEventListener("click", () => handleDeleteTask(task.id));

  cardBodyEl.appendChild(cardTitleEl);
  cardBodyEl.appendChild(cardTextEl);
  cardBodyEl.appendChild(cardDeadlineEl);
  cardBodyEl.appendChild(deleteBut);

  taskCardEl.appendChild(cardBodyEl);

  return taskCardEl;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  if (!taskList) {
    taskList = [];
  }
  const todoCol = document.getElementById("todo-cards");
  const inProgressCol = document.getElementById("in-progress-cards");
  const doneCol = document.getElementById("done-cards");

  while (todoCol.firstChild) {
    todoCol.removeChild(todoCol.firstChild);
  }
  while (inProgressCol.firstChild) {
    inProgressCol.removeChild(inProgressCol.firstChild);
  }
  while (doneCol.firstChild) {
    doneCol.removeChild(doneCol.firstChild);
  }

  // todoCol.innerHTML = "";
  // inProgressCol.innerHTML = "";
  // doneCol.innerHTML = "";

  taskList.forEach((task) => {
    const taskCard = createTaskCard(task);
    if (task.status === "to-do") {
      todoCol.appendChild(taskCard);
    } else if (task.status === "in-progress") {
      inProgressCol.appendChild(taskCard);
    } else {
      doneCol.appendChild(taskCard);
    }
  });

  makeCardsDraggable();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("due-date").value;

  const newTask = {
    id: nextId++,
    title,
    description,
    deadline,
    status: "to-do",
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", nextId);

  renderTaskList();
  document.getElementById("task-form").reset();
  $("#formModal").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskId) {
  taskList = taskList.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event) {
  event.preventDefault();
  console.log(event.target);
  // const taskId = event.target.dataset;
  // console.log(taskId);
  // // const newStatus = event.target.closest(".col").id;
  // console.log(newStatus);

  // const task = taskList.find((task) => task.id == taskId);
  // task.status = newStatus;

  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

function makeCardsDraggable() {
  $(".task-card").draggable({
    revert: "invalid",
    zIndex: 100,
  });
}

function makeLanesDroppable() {
  $(".lane .card-body").droppable({
    accept: ".task-card",
    drop: handleDrop,
    hoverClass: "bg-secondary",
  });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  makeLanesDroppable();
  $("#due-date").datepicker();
  $("#task-form").on("submit", handleAddTask);
});
