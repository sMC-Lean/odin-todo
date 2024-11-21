"use strict";

export function renderUserName() {
  const userNameDisplay = document.querySelector("#avatar-name");
  userNameDisplay.textContent = `Hi ${JSON.parse(localStorage.user)}`;
}

export function renderCategories() {}
