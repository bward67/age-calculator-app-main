const formDay = document.querySelector(".day");
const formMonth = document.querySelector(".month");
const formYear = document.querySelector(".year");

const resultYears = document.querySelector(".result-years span");
const resultMonths = document.querySelector(".result-months span");
const resultDays = document.querySelector(".result-days span");

const form = document.querySelector(".form");

let currentYear = new Date().getFullYear();
console.log(currentYear);
let currentMonth = 1 + new Date().getMonth();
//I did this because the month is 0 indexed so Jan would be 0
console.log(currentMonth);
let currentDate = new Date().getDate();
console.log(currentDate);

const formDayValue = formDay.value.trim();
const formMonthValue = formMonth.value.trim();
const formYearValue = formYear.value.trim();

let validator = true;

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  isDayCorrect();
  isMonthCorrect();
  isYearCorrect();
  /*If all inputs are valid numbers*/
  if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
    subtractAge();
  }
});

function isDayCorrect() {
  const formDayValue = formDay.value.trim();
  if (formDayValue === "") {
    setError(formDay, "Input cannot be empty");
    validator = false;
  } else if (formDayValue < 1 || formDayValue > 31) {
    setError(formDay, "Not a valid date");
    validator = false;
  } else {
    setSuccess(formDay);
    validator = true;
  }
  return validator;
}

function isMonthCorrect() {
  const formMonthValue = formMonth.value.trim();
  if (formMonthValue === "") {
    setError(formMonth, "Input cannot be empty");
    validator = false;
  } else if (formMonthValue < 1 || formMonthValue > 12) {
    setError(formMonth, "Not a valid month");
    validator = false;
  } else {
    setSuccess(formMonth);
    validator = true;
  }
  return validator;
}

function isYearCorrect() {
  const formYearValue = formYear.value.trim();
  if (formYearValue === "") {
    setError(formYear, "Input cannot be empty");
    validator = false;
  } else if (formYearValue > 2024) {
    setError(formYear, "Not a valid year");
    validator = false;
  } else {
    setSuccess(formYear);
    validator = true;
  }
  return validator;
}

function subtractAge() {
  if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
    if (formDay.value > currentDate) {
      //formYearValue etc does not work here
      //I will test it out with 26 Sept 1967
      //26 > 19 - yes
      currentDate = currentDate + months[currentMonth - 1];
      //19 = 19 + [1 - 1]  so = 19 + [0] so = 19 + 31 = 50
      currentMonth = currentMonth - 1;
      //1 = 1 - 1 = 0
    }

    if (formMonth.value > currentMonth) {
      // 9 > 1  yes
      currentMonth = currentMonth + 12;
      // = 0 + 12 = 12
      currentYear = currentYear - 1;
      // = 2024 - 1 = 2023
    }
  }

  const newYear = currentYear - formYear.value;
  // = 2023 - 1967 = 56
  const newMonth = currentMonth - formMonth.value;
  // = 12 - 9 = 3
  const newDay = currentDate - formDay.value;
  // 50 - 26 = 24

  resultYears.innerHTML = newYear;
  resultMonths.innerHTML = newMonth;
  resultDays.innerHTML = newDay;
}

function setError(input, message) {
  const formControl = input.parentElement;
  const errorMsg = formControl.querySelector("small");
  /*this will get the specific small for that specific input*/
  errorMsg.innerHTML = message;
  formControl.classList.add("error");
  formControl.classList.remove("success");
}

function setSuccess(input) {
  const formControl = input.parentElement;

  formControl.classList.add("success");
  formControl.classList.remove("error");
}
