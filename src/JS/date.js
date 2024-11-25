"use strict";

export function getCurrentDateAEST() {
  return new Date()
    .toLocaleDateString("en-AU", {
      timeZone: "Australia/Sydney",
    })
    .split("/")
    .reverse()
    .join("-");
}

function generateDateForEvaluation(dateString) {
  const dateValues = dateString.split("-");
  const year = dateValues[0];
  const month = dateValues[1] - 1;
  const day = dateValues[2];
  return new Date(year, month, day);
}

export function evaluateDateForOverdue(taskDate) {
  const currentDate = generateDateForEvaluation(getCurrentDateAEST());
  const dateToCheck = generateDateForEvaluation(taskDate);
  return dateToCheck - currentDate < 0;
}

export function evaluateForWeekPeriod(taskDate) {
  function convertToDays(timeInMilliseconds) {
    return timeInMilliseconds / 1000 / 60 / 60 / 24;
  }
  const currentDate = generateDateForEvaluation(getCurrentDateAEST());
  const dateToCheck = generateDateForEvaluation(taskDate);
  const difference = dateToCheck - currentDate;
  if (difference < 0) return;
  return convertToDays(difference) <= 7;
}

export function getDisplayDate(taskDate) {
  const currentDate = getCurrentDateAEST();
  const dateDisplayObject = { displayText: "", overDue: false, today: false };
  const isOverdue = evaluateDateForOverdue(taskDate);
  const dueToday = currentDate === taskDate;
  if (isOverdue) {
    dateDisplayObject.overDue = true;
    dateDisplayObject.displayText = `OVERDUE: ${taskDate
      .split("-")
      .reverse()
      .join("/")}`;
  }
  if (dueToday) {
    (dateDisplayObject.displayText = "due: TODAY"),
      (dateDisplayObject.today = true);
  }
  if (!isOverdue && !dueToday) {
    dateDisplayObject.displayText = `due: ${taskDate
      .split("-")
      .reverse()
      .join("/")}`;
  }
  return dateDisplayObject;
}
