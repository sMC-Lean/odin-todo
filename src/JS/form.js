"use strict";
import { getCurrentDateAEST } from "./date";
// const minInputDate = new Date().toISOString().slice(0, 10);
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const modalContentContainer = document.querySelector("#modal-content");
const userFieldsData = [
  {
    type: "label",
    textContent: "Please Enter a Name",
    attributes: [{ name: "for", val: "name" }],
  },
  {
    type: "input",
    attributes: [
      { name: "type", val: "text" },
      { name: "id", val: "name" },
      { name: "name", val: "name" },
      { name: "required", val: "true" },
    ],
  },
  {
    type: "input",
    textContent: "Submit",
    attributes: [
      { name: "type", val: "submit" },
      { name: "id", val: "submit-button" },
    ],
  },
];
const formFieldsData = [
  {
    type: "label",
    textContent: "Task Title:",
    attributes: [{ name: "for", val: "title" }],
  },
  {
    type: "input",
    attributes: [
      { name: "type", val: "text" },
      { name: "id", val: "title" },
      { name: "name", val: "title" },
      { name: "autocorrect", val: "true" },
      { name: "required", val: "true" },
    ],
  },
  {
    type: "label",
    textContent: "Category:",
    attributes: [{ name: "for", val: "category" }],
  },
  {
    type: "input",
    attributes: [
      { name: "type", val: "text" },
      { name: "id", val: "category" },
      { name: "name", val: "category" },
      { name: "autocorrect", val: "true" },
      { name: "placeholder", val: "list name" },
    ],
  },
  {
    type: "label",
    textContent: "Task Description:",
    attributes: [{ name: "for", val: "description" }],
  },
  {
    type: "textarea",
    attributes: [
      // { name: "type", val: "textarea" },
      { name: "id", val: "description" },
      { name: "name", val: "description" },
      { name: "rows", val: "3" },
      { name: "autocorrect", val: "true" },
      { name: "required", val: "true" },
    ],
  },
  {
    type: "label",
    textContent: "Due Date:",
    attributes: [{ name: "for", val: "date" }],
  },
  {
    type: "input",
    attributes: [
      { name: "type", val: "date" },
      { name: "id", val: "date" },
      { name: "name", val: "date" },
      { name: "required", val: "true" },
      { name: "min", val: getCurrentDateAEST() },
    ],
  },
  {
    type: "label",
    textContent: "Priority:",
    attributes: [{ name: "for", val: "priority" }],
  },
  {
    type: "select",
    children: [
      {
        type: "option",
        textContent: "select priority",
        attributes: [{ name: "value", val: "" }],
      },
      {
        type: "option",
        textContent: "High",
        attributes: [{ name: "value", val: "high" }],
      },
      {
        type: "option",
        textContent: "Medium",
        attributes: [{ name: "value", val: "medium" }],
      },
      {
        type: "option",
        textContent: "Low",
        attributes: [{ name: "value", val: "low" }],
      },
    ],
    textContent: "Priority:",
    attributes: [
      { name: "id", val: "priority" },
      { name: "name", val: "priority" },
      { name: "required", val: "true" },
    ],
  },
  {
    type: "input",
    textContent: "Submit",
    attributes: [
      { name: "type", val: "submit" },
      { name: "id", val: "submit-button" },
    ],
  },
];

export function constructTaskForm() {
  const newForm = document.createElement("form");
  formFieldsData.forEach((element) => {
    const newElement = document.createElement(element.type);
    if (element.textContent) newElement.textContent = element.textContent;
    if (element.children) {
      element.children.forEach((childEl) => {
        const newChildEl = document.createElement(childEl.type);
        if (childEl.textContent) newChildEl.textContent = childEl.textContent;
        childEl.attributes.forEach((attribute) =>
          newChildEl.setAttribute(attribute.name, attribute.val)
        );
        newElement.appendChild(newChildEl);
      });
    }
    element.attributes.forEach((attribute) => {
      newElement.setAttribute(attribute.name, attribute.val);
    });
    newForm.appendChild(newElement);
  });

  return newForm;
}

export function constructUserForm() {
  const newForm = document.createElement("form");
  userFieldsData.forEach((element) => {
    const newElement = document.createElement(element.type);
    if (element.textContent) newElement.textContent = element.textContent;
    if (element.children) {
      element.children.forEach((childEl) => {
        const newChildEl = document.createElement(childEl.type);
        if (childEl.textContent) newChildEl.textContent = childEl.textContent;
        childEl.attributes.forEach((attribute) =>
          newChildEl.setAttribute(attribute.name, attribute.val)
        );
        newElement.appendChild(newChildEl);
      });
    }
    element.attributes.forEach((attribute) => {
      newElement.setAttribute(attribute.name, attribute.val);
    });
    newForm.appendChild(newElement);
  });
  return newForm;
}

export function handleForm() {
  const titleField = document.querySelector("#title");
  const categoryField = document.querySelector("#category");
  const descriptionField = document.querySelector("#description");
  const dateField = document.querySelector("#date");
  const priorityField = document.querySelector("#priority");
  const taskID = new Date().getTime();
  const taskData = {
    category: categoryField.value?.toLowerCase() || "personal",
    title: titleField.value.toLowerCase(),
    description: descriptionField.value,
    dueDate: dateField.value,
    priority: priorityField.value,
  };
  return { taskID, taskData };
}

export function constructDescriptionModal(text) {
  const newParagraph = document.createElement("p");
  newParagraph.classList.add("task-description");
  newParagraph.textContent = text;
  return newParagraph;
}

export function hideForm() {
  [modal, overlay].forEach((el) => el.classList.add("hidden"));
  modalContentContainer.innerHTML = "";
}
