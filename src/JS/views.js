"use strict";
import { getDisplayDate } from "./date";

function createTaskButtons(task) {
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-button");
  completeButton.setAttribute("data-taskID", task.taskID);
  completeButton.textContent = "complete";
  const viewButton = document.createElement("button");
  viewButton.classList.add("view-details");
  viewButton.setAttribute("data-taskID", task.taskID);
  viewButton.textContent = "details";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-task");
  deleteButton.setAttribute("data-taskID", task.taskID);
  deleteButton.textContent = "delete";
  return { completeButton, viewButton, deleteButton };
}

export function renderUserName() {
  const userNameDisplay = document.querySelector("#avatar-name");
  userNameDisplay.textContent = `Hi ${JSON.parse(localStorage.user)}`;
}

export function renderCategoryButtons() {
  const categoryArray = JSON.parse(localStorage.categories);
  const container = document.querySelector("#category-button-div");
  container.innerHTML = "";
  categoryArray.forEach((category) => {
    const newButton = document.createElement("button");
    newButton.setAttribute("id", category);
    newButton.setAttribute("class", "view-button");
    newButton.setAttribute("data-view", category);
    newButton.textContent = category;
    newButton.style.textTransform = "capitalize";
    container.appendChild(newButton);
  });
}

export function renderTaskCards(tasks) {
  const taskCardContainer = document.querySelector("#task-container");
  taskCardContainer.innerHTML = "";

  if (!tasks?.length) {
    const noTasksToShow = "No tasks match the selected filter";
    taskCardContainer.textContent = noTasksToShow;
    return;
  }

  tasks.forEach((task) => {
    const newTaskCard = document.createElement("div");
    newTaskCard.setAttribute("id", task.taskID);
    newTaskCard.classList.add("task-card");
    const newTitleDiv = document.createElement("div");
    newTitleDiv.classList.add("task-card-title-div");
    const newTitle = document.createElement("h2");
    newTitle.textContent = task.taskData.title;
    const newCategory = document.createElement("h3");
    newCategory.textContent = task.taskData.category;
    if (task.taskData.priority === "completed") {
      newTaskCard.classList.add("task-complete");
    }
    newTitleDiv.appendChild(newTitle);
    newTitleDiv.appendChild(newCategory);
    const newDateContainer = document.createElement("div");
    newDateContainer.classList.add("task-card-date-div");
    const newDueDate = document.createElement("p");
    getDisplayDate(task.taskData.dueDate);
    const { displayText, overDue, today } = getDisplayDate(
      task.taskData.dueDate
    );
    newDueDate.textContent = displayText;
    if (today) newDueDate.classList.add("medium");
    if (overDue) newDueDate.classList.add("high");
    const newPriority = document.createElement("p");
    newPriority.textContent = task.taskData.priority;
    newPriority.classList.add(task.taskData.priority);
    newDateContainer.appendChild(newPriority);
    newDateContainer.appendChild(newDueDate);
    // add buttons start;
    const newButtonContainer = document.createElement("div");
    newButtonContainer.classList.add("task-card-buttons");
    const { completeButton, viewButton, deleteButton } =
      createTaskButtons(task);
    newButtonContainer.appendChild(completeButton);
    newButtonContainer.appendChild(viewButton);
    newButtonContainer.appendChild(deleteButton);
    // end add buttons
    newTaskCard.appendChild(newTitleDiv);
    newTaskCard.appendChild(newDateContainer);
    newTaskCard.appendChild(newButtonContainer);
    taskCardContainer.prepend(newTaskCard);
  });
}
