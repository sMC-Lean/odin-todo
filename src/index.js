"use strict";

import "./index.css";

import iconLogo from "./images/logo-500.png";
import emptyUserImg from "./images/empty-account.svg";
import appLogo from "./images/logo-500-dark.png";

import { initPage } from "./JS/init.js";
import {
  setStorageData,
  getStorageData,
  deleteTaskFromStorage,
} from "./JS/storage.js";
import { handleForm } from "./JS/form.js";

const taskViewButtonContainer = document.querySelector("#view-div");
const listViewButtonContainer = document.querySelector("#list-div");

document.querySelector("#page-icon").setAttribute("href", iconLogo);
document.querySelector("#user-icon").setAttribute("src", emptyUserImg);
document.querySelector("#app-logo").setAttribute("src", appLogo);

function submitNewTask() {
  const newTask = handleForm();
  setStorageData(newTask.taskID, JSON.stringify(newTask.taskData));
}

// button handlers;
function viewTasksButtonHandler(event) {
  event.preventDefault();
  console.log(`${event.target.dataset.view} button clicked`);
}
taskViewButtonContainer.addEventListener("click", viewTasksButtonHandler);

function viewListButtonHandler(event) {
  event.preventDefault();
  console.log(`${event.target.dataset.list} button clicked`);
}
listViewButtonContainer.addEventListener("click", viewListButtonHandler);

// testing in dev;

const firstDataArray = Array.from(getStorageData());
console.log(firstDataArray);
// submitNewTask();
deleteTaskFromStorage(1732050541483);
const secondDataArray = Array.from(getStorageData());
console.log(secondDataArray);

initPage();
