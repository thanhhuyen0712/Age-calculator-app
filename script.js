"use strict";

//Declare variables
const form = document.querySelector(".form");
const formLabel = document.querySelector(".form__label");
const formInput = document.querySelector(".form__input");
const dayInput = document.querySelector(".form__input--day");
const monthInput = document.querySelector(".form__input--month");
const yearInput = document.querySelector(".form__input--year");

const dayResult = document.querySelector(".result__detail--days");
const monthResult = document.querySelector(".result__detail--months");
const yearResult = document.querySelector(".result__detail--years");

const error = document.querySelector(".error");

const currentDate = new Date();
const test = new Date(2020, 13, 3);
// console.log(moment("31.02.2016", "DD.MM.YYYY").isValid());

//Declare functions
const renderError = function (element, message) {
  document.querySelector(`.error__${element}`).textContent = message;
  document.querySelector(`.form__label--${element}`).classList.add("error");
  document
    .querySelector(`.form__input--${element}`)
    .classList.add("error__border");
};
const hideError = function (element) {
  document.querySelector(`.error__${element}`).textContent = "";
  document.querySelector(`.form__label--${element}`).classList.remove("error");
  document
    .querySelector(`.form__input--${element}`)
    .classList.remove("error__border");
};

const calcYears = function (days) {
  return Math.trunc(days / 365.25);
};
const calcMonths = function (days) {
  return Math.trunc(days / (7 * 4));
};

const calcDays = function (time) {
  return Math.trunc(time / (1000 * 60 * 60 * 24));
};

//Event handler

dayInput.addEventListener("input", function (e) {
  if (dayInput.value === "") {
    renderError("day", "This field is required");
  } else {
    hideError("day");
  }

  if (dayInput.value < 1 || dayInput.value > 31) {
    renderError("day", "Must be a valid day");
  } else {
    hideError("day");
  }
});

monthInput.addEventListener("input", function (e) {
  if (monthInput.value === "") {
    renderError("month", "This field is required");
  } else {
    hideError("month");
  }

  if (monthInput.value < 1 || monthInput.value > 12) {
    renderError("month", "Must be a valid month");
  } else {
    hideError("month");
  }
});

yearInput.addEventListener("input", function (e) {
  if (yearInput.value === "") {
    renderError("year", "This field is required");
  } else {
    hideError("year");
  }

  if (yearInput.value < 1 || yearInput.value > currentDate.getFullYear()) {
    renderError("year", "Must be in the past");
  } else {
    hideError("year");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  //Get data from user and check validity
  const date = +dayInput.value;
  const month = +monthInput.value;
  const year = +yearInput.value;

  if (
    date < 1 ||
    date > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1 ||
    year > currentDate.getFullYear()
  )
    return;

  //Check if date is valid
  if (!moment(`${year}/${month}/${day}`, "YYYY/MM/DD").isValid()) {
    renderError("day", "Must be a valid date");
    renderError("month", "");
    renderError("year", "");
  } else {
    document.querySelector(".button").classList.add("button--active");
    const inputDate = new Date(year, month - 1, date);
    const totalDaysPassed = (currentDate - inputDate) / (1000 * 60 * 60 * 24);

    const yearsPassed = calcYears(totalDaysPassed);
    const monthsPassed = calcMonths(totalDaysPassed - yearsPassed * 365.25);
    const daysPassed = Math.trunc(
      totalDaysPassed - yearsPassed * 365.25 - monthsPassed * 7 * 4
    );

    //Render results
    dayResult.textContent = daysPassed;
    monthResult.textContent = monthsPassed;
    yearResult.textContent = yearsPassed;
  }
});
