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

function createTaskCard(event) {
  event.preventDefault();
  const taskCardEl = document.createElement("div");
  taskCardEl.classList.add("task-card", "card", "mb-2");
  taskCardEl.setAttribute("id", "taskCard");
  taskCardEl.setAttribute("draggable", "true");

  const todayDate = newDate();
  const deadline = newDate(task.newDate);
  if (deadline < todayDate) {
    taskCardEl.classList.add("overdue");
  } else {
    taskCardEl.classList.add("due-soon");
  }

  // create body element
  const cardBodyEl = document.createElement("div");
  cardBodyEl.classList.add("card-body");

  //create card elemtents for the body
  const cardTitleEl = document.createElement("h4");
  cardTitleEl.classList.add("card-text");
  cardTitleEl.textContent = task.title;

  const cardTextEl = document.createElement("p");
  cardTextEl.classList.add("card-text");
  cardTextEl.textContent = text.description;

  const cardDeadlineEl = document.createElement("p");
  cardDeadlineEl.classList.add("card-text");
  cardDeadlineEl.textContent = `Due date; ${task.deadline}`;

  const deleteBut = document.createElement("button");
  deleteBut.classList.add("btn", "btn-delete");
  deleteBut.textContent = "Delete";
  deleteBut.onclick = () => handleDeleteTask(task.id);

  //append card elements to body element
  cardBodyEl.appendChild(cardTitleEl);
  cardBodyEl.appendChild(cardTextEl);
  cardBodyEl.appendChild(cardDeadlineEl);
  cardBodyEl.appendChild(deleteBut);

  //append body element to task card
  taskCardEl.appendChild(cardBodyEl);

  return taskCardEl;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
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
    id: generateTaskId(),
    title,
    description,
    deadline,
    status: "to-do",
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("newId", newId);

  renderTaskList();
  document.getElementById("task-form").requestFullscreen();
  $("#task-form").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  taskList = taskList.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

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
