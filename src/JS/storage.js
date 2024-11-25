"use strict";
import {
  getCurrentDateAEST,
  evaluateDateForOverdue,
  evaluateForWeekPeriod,
} from "./date";
// TODO: sort will take a string from the different filter buttons, and then will render the content from local storage that matches whatever condition was selected;
export function getStorageData(sort = "") {
  if (!localStorage.tasks) return;
  const storageData = Array.from(JSON.parse(localStorage.tasks));
  if (!sort || sort === "all") {
    return storageData;
  } else if (sort === "today") {
    const todaysDate = getCurrentDateAEST();
    const todaysTasks = storageData.filter(
      (task) => task.taskData.dueDate === todaysDate
    );
    return todaysTasks;
  } else if (sort === "week") {
    const thisWeeksTasks = storageData.filter((task) =>
      evaluateForWeekPeriod(task.taskData.dueDate)
    );
    return thisWeeksTasks;
  } else if (sort === "overdue") {
    const overdueTasks = storageData.filter((task) =>
      evaluateDateForOverdue(task.taskData.dueDate)
    );
    return overdueTasks;
  } else if (sort) {
    const sortByCategory = storageData.filter(
      (task) => task.taskData.category === sort
    );
    return sortByCategory;
  }
}

export function getTaskDetailsText(taskID) {
  const storageData = getStorageData();
  const currentTask = storageData.find(
    (task) => task.taskID === Number(taskID)
  );
  return currentTask.taskData.description;
}

export function setStorageData(newTaskObject) {
  const existingTasks = getStorageData();
  const mergedObjects = [...existingTasks];
  mergedObjects.push(newTaskObject);
  localStorage.setItem("tasks", JSON.stringify(mergedObjects));
}

export function updateTaskToComplete(taskID) {
  const existingStorageData = getStorageData();
  const updatedStorageData = existingStorageData.map((task) => {
    if (task.taskID === Number(taskID)) {
      task.taskData.priority = "completed";
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedStorageData));
}

function deleteCategoryFromStorage(categoryToDelete) {
  const instancesOfCategory = getStorageData().filter(
    (task) => task.taskData.category === categoryToDelete
  );
  if (instancesOfCategory.length) return;
  const existingCategories = JSON.parse(localStorage.categories);
  const updatedCategories = existingCategories.filter(
    (category) => category !== categoryToDelete
  );
  localStorage.setItem("categories", JSON.stringify(updatedCategories));
}

export function deleteTaskFromStorage(taskID) {
  const existingStorageData = getStorageData();
  const categoryToDelete = existingStorageData.find(
    (task) => task.taskID === Number(taskID)
  ).taskData.category;
  const updatedStorageData = existingStorageData.filter(
    (task) => task.taskID !== Number(taskID)
  );
  localStorage.setItem("tasks", JSON.stringify(updatedStorageData));
  deleteCategoryFromStorage(categoryToDelete);
}

export function addNewCategory(newTaskData) {
  const newTaskCategory = newTaskData.taskData.category.toLowerCase();
  const existingCategories = JSON.parse(localStorage.categories);
  if (!existingCategories.includes(newTaskCategory)) {
    existingCategories.push(newTaskCategory);
    localStorage.setItem("categories", JSON.stringify(existingCategories));
  }
}
