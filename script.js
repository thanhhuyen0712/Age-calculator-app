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
  if (dayInput.validity.valueMissing) {
    renderError("day", "This field is required");
  } else {
    hideError("day");
  }

  if (dayInput.validity.rangeUnderflow || dayInput.validity.rangeOverflow) {
    renderError("day", "Must be a valid day");
  } else {
    hideError("day");
  }
});

monthInput.addEventListener("input", function (e) {
  if (monthInput.validity.valueMissing) {
    renderError("month", "This field is required");
  } else {
    hideError("month");
  }

  if (monthInput.validity.rangeUnderflow || monthInput.validity.rangeOverflow) {
    renderError("month", "Must be a valid month");
  } else {
    hideError("month");
  }
});

yearInput.addEventListener("input", function (e) {
  if (yearInput.validity.valueMissing) {
    renderError("year", "This field is required");
  } else {
    hideError("year");
  }

  if (yearInput.value > currentDate.getFullYear()) {
    renderError("year", "Must be in the past");
  } else {
    hideError("year");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  //Get date from user
  const date = +dayInput.value;
  const month = +monthInput.value;
  const year = +yearInput.value;
  const inputDate = new Date(year, month - 1, date);

  //Check if date is valid
  if (!moment(`${year}/${month}/${month}`, "YYYY/MM/DD").isValid()) {
    renderError("day", "Must be a valid date");
    renderError("month", "");
    renderError("year", "");
  } else {
    document.querySelector(".button").classList.add("button--active");
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
