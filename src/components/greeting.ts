import getTimeOfDay from "../helpers/getTimeOfDay";
import i18next from "i18next";

const greetingName = document.querySelector(".name") as HTMLInputElement;
const greetingTextContainer = document.querySelector(".greeting-text") as HTMLSpanElement;

window.addEventListener("beforeunload", setNameToLocalStorage);

greetingName.addEventListener("change", () => {
  greetingName.value = greetingName.value.trim();
});

export default function showGreeting() {
  getNameFromLocalStorage();

  const timeOfDay = getTimeOfDay();
  const greetingText = i18next.t(`greeting.${timeOfDay}`);

  greetingName.placeholder = i18next.t("greeting.placeholder");
  greetingTextContainer.textContent = greetingText;
}

function setNameToLocalStorage() {
  if (greetingName) {
    localStorage.setItem("name", greetingName.value);
  }
}

function getNameFromLocalStorage() {
  const name = localStorage.getItem("name");

  if (greetingName && name) {
    greetingName.value = name;
  }
}
