"use strict";

export function handleForm() {
  const taskID = new Date().getTime();
  const taskData = {
    title: "gym",
    description: "leg workout",
    dueDate: new Date(),
    priority: "high",
  };
  return { taskID, taskData };
}
