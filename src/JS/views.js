"use strict";

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
