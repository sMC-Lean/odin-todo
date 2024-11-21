"use strict";

// helper function, assesses the page for localStorage access and previous data;
export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    console.log(window.localStorage);
    storage.removeItem(x);
    console.log(localStorage);
    return true;
  } catch (error) {
    return (
      error instanceof DOMException &&
      error.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
