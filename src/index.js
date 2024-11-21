"use strict";

import "./index.css";

import iconLogo from "./images/logo-500.png";
import emptyUserImg from "./images/empty-account.svg";
import appLogo from "./images/logo-500-dark.png";

import { storageAvailable } from "./JS/check-storage.js";
import {
  setStorageData,
  getStorageData,
  deleteTaskFromStorage,
} from "./JS/storage.js";
import {
  constructUserForm,
  constructTaskForm,
  handleForm,
  hideForm,
} from "./JS/form.js";
import { renderUserName } from "./JS/views.js";

const sidebar = document.querySelector("#header-bar");
const addTaskButton = document.querySelector("#add-task");
const modal = document.querySelector("#modal");
const modalContentContainer = document.querySelector("#modal-content");
const overlay = document.querySelector("#overlay");
const formCloseButton = document.querySelector("#close-button");

document.querySelector("#page-icon").setAttribute("href", iconLogo);
document.querySelector("#user-icon").setAttribute("src", emptyUserImg);
document.querySelector("#app-logo").setAttribute("src", appLogo);

function submitNewTask(event) {
  event.preventDefault();
  const newTaskData = handleForm();
  hideForm();
  const newTaskObject = {
    taskID: newTaskData.taskID,
    taskData: newTaskData.taskData,
  };
  setStorageData(newTaskObject);
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
    console.log(`${event.target.dataset.view} button clicked`);
    getStorageData(event.target.dataset.view);
  }
}
sidebar.addEventListener("click", viewButtonHandler);

function addTaskButtonHandler(event) {
  event.preventDefault();
  console.log("add nw task");
  const newFormEl = constructTaskForm();
  modalContentContainer.appendChild(newFormEl);
  newFormEl.addEventListener("submit", submitNewTask);
  [modal, overlay].forEach((el) => el.classList.remove("hidden"));
}
addTaskButton.addEventListener("click", addTaskButtonHandler);
formCloseButton.addEventListener("click", hideForm);

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
      localStorage.setItem(
        "categories",
        JSON.stringify(["Personal", "Add New"])
      );
    }
    if (!localStorage.tasks) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
    if (!localStorage.user) setUser();

    // initial render shoudl go here;
    if (localStorage.user) renderUserName();
  } else {
    console.log("module ran, storage error");
    // Too bad, no localStorage for us
  }
})();

// testing in dev;
document.querySelector("#clear-all").addEventListener("click", () => {
  localStorage.clear();
});
