import { state } from "./state";

const timeContainer = document.querySelector(".time") as HTMLTimeElement;
const dateContainer = document.querySelector(".date") as HTMLTimeElement;
const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", weekday: "long", timeZone: "UTC" };

function showDate(date: Date) {
  const currentDate = date
    .toLocaleDateString(state.language, options)
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");

  dateContainer.textContent = currentDate;
}

function showTime(date: Date) {
  const currentTime = date.toLocaleTimeString();
  
  timeContainer.textContent = currentTime;
}

export { showDate, showTime };
