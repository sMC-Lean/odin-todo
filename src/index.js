"use strict";

import "./index.css";

import iconLogo from "./images/logo-500.png";
import emptyUserImg from "./images/empty-account.svg";
import appLogo from "./images/logo-500-dark.png";

import { storageAvailable } from "./JS/check-storage.js";
import {
  setStorageData,
  getStorageData,
  getTaskDetailsText,
  updateTaskToComplete,
  deleteTaskFromStorage,
  addNewCategory,
} from "./JS/storage.js";
import {
  constructUserForm,
  constructTaskForm,
  handleForm,
  hideForm,
  constructDescriptionModal,
} from "./JS/form.js";
import {
  renderCategoryButtons,
  renderUserName,
  renderTaskCards,
} from "./JS/views.js";

const sidebar = document.querySelector("#header-bar");
const addTaskButton = document.querySelector("#add-task");
const modal = document.querySelector("#modal");
const modalContentContainer = document.querySelector("#modal-content");
const overlay = document.querySelector("#overlay");
const formCloseButton = document.querySelector("#close-button");
const taskCardContainer = document.querySelector("#task-container");
let viewState;

document.querySelector("#page-icon").setAttribute("href", iconLogo);
document.querySelector("#user-icon").setAttribute("src", emptyUserImg);
document.querySelector("#app-logo").setAttribute("src", appLogo);

function submitNewTask(event) {
  event.preventDefault();
  const newTaskData = handleForm();
  hideForm();
  addNewCategory(newTaskData);
  renderCategoryButtons();
  const newTaskObject = {
    taskID: newTaskData.taskID,
    taskData: newTaskData.taskData,
  };
  setStorageData(newTaskObject);
  renderTaskCards(getStorageData(newTaskData.taskData.category));
}

function submitNewUser(event) {
  event.preventDefault();
  const nameField = document.querySelector("#name");
  localStorage.setItem("user", JSON.stringify(nameField.value));
  hideForm();
  renderUserName();
}

// button handlers;
function viewButtonHandler(event) {
  event.preventDefault();
  if (event.target.classList.contains("view-button")) {
    const tasksToShow = getStorageData(event.target.dataset.view);
    viewState = event.target.dataset.view;
    renderTaskCards(tasksToShow);
    document
      .getElementById("task-container")
      .scrollIntoView({ behavior: "smooth" });
  }
}
sidebar.addEventListener("click", viewButtonHandler);

function addTaskButtonHandler(event) {
  event.preventDefault();
  const newFormEl = constructTaskForm();
  modalContentContainer.appendChild(newFormEl);
  newFormEl.addEventListener("submit", submitNewTask);
  [modal, overlay].forEach((el) => el.classList.remove("hidden"));
}
addTaskButton.addEventListener("click", addTaskButtonHandler);
formCloseButton.addEventListener("click", hideForm);

// task Card button functions;
function completeTaskButtonHandler(taskID) {
  updateTaskToComplete(taskID);
  renderTaskCards(getStorageData(viewState));
}

function showDetailsButtonHandler(taskID) {
  const detailsText = getTaskDetailsText(taskID);
  const descriptionparagraph = constructDescriptionModal(detailsText);
  modalContentContainer.appendChild(descriptionparagraph);
  [modal, overlay].forEach((el) => el.classList.remove("hidden"));
}

function deleteTaskButtonHandler(taskID) {
  deleteTaskFromStorage(taskID);
  renderTaskCards(getStorageData(viewState));
  renderCategoryButtons();
}

taskCardContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("complete-button")) {
    completeTaskButtonHandler(event.target.dataset.taskid);
  }
  if (event.target.classList.contains("view-details")) {
    showDetailsButtonHandler(event.target.dataset.taskid);
  }
  if (event.target.classList.contains("delete-task")) {
    deleteTaskButtonHandler(event.target.dataset.taskid);
  }
});

// functions related to initialising the app at first use and on page load;
function setUser() {
  if (!localStorage.user) {
    const newFormEl = constructUserForm();
    modalContentContainer.appendChild(newFormEl);
    newFormEl.addEventListener("submit", submitNewUser);
    [modal, overlay].forEach((el) => el.classList.remove("hidden"));
  }
}

(function initPage() {
  if (storageAvailable("localStorage")) {
    console.log("module ran, storage available");
    if (!localStorage.categories) {
      localStorage.setItem("categories", JSON.stringify(["personal"]));
    }
    if (localStorage.categories) renderCategoryButtons();
    if (!localStorage.tasks) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
    if (JSON.parse(localStorage.tasks).length)
      renderTaskCards(getStorageData("all"));
    if (!localStorage.user) setUser();
    if (localStorage.user) renderUserName();
  } else {
    console.log("module ran, storage error");
    // Too bad, no localStorage for us
  }
})();
