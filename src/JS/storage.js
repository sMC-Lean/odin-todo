"use strict";

// TODO: sort will take a string from the different filter buttons, and then will render the content from local storage that matches whatever condition was selected;
export function getStorageData(sort = "") {
  if (!localStorage.tasks) return;
  const storageData = Array.from(JSON.parse(localStorage.tasks));
  return storageData;
}

export function setStorageData(newTaskObject) {
  const existingTasks = getStorageData();
  const mergedObjects = [...existingTasks];
  mergedObjects.push(newTaskObject);
  console.log(mergedObjects);
  localStorage.setItem("tasks", JSON.stringify(mergedObjects));
  console.log(Array.from(JSON.parse(localStorage.tasks)));
}

export function deleteTaskFromStorage(taskID) {
  localStorage.removeItem(taskID);
}
