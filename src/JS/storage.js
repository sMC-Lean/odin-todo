"use strict";

// TODO: sort will take a string from the different filter buttons, and then will render the content from local storage that matches whatever condition was selected;
export function getStorageData(sort = "") {
  console.log("retrieve data");
  const storageData = Object.entries(localStorage);
  storageData.forEach((task) => {
    const taskID = task[0];
    const taskData = task[1];
    console.log(taskID, JSON.parse(taskData));
  });
  return storageData;
}

export function setStorageData(objectName, objectData) {
  localStorage.setItem(objectName, objectData);
}

export function deleteTaskFromStorage(taskID) {
  localStorage.removeItem(taskID);
}
