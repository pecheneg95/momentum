import { SettingsState } from "./state";
import { showApp, showClockAndGreeting } from "../index";
import { setBgFromSource } from "./imagesSlider";
import i18next from "i18next";
import { state, setState } from "./state";

//TO DO add write tags in input from local storage

const settingsBtn = document.querySelector(".settings-button") as HTMLButtonElement;
const settingsBlock = document.querySelector(".settings") as HTMLDivElement;
const languageRadioBntEn = document.getElementById("language-en") as HTMLInputElement;
const languageRadioBntRu = document.getElementById("language-ru") as HTMLInputElement;
const visibleTimeBtn = document.getElementById("time-visible") as HTMLInputElement;
const visibleDateBtn = document.getElementById("date-visible") as HTMLInputElement;
const visibleGreetingBtn = document.getElementById("greeting-visible") as HTMLInputElement;
const visibleQuoteBtn = document.getElementById("quote-visible") as HTMLInputElement;
const visibleWeatherBtn = document.getElementById("weather-visible") as HTMLInputElement;
const visibleAudioBtn = document.getElementById("audio-visible") as HTMLInputElement;
const timeBlock = document.querySelector(".time") as HTMLElement;
const dateBlock = document.querySelector(".date") as HTMLElement;
const greetingBlock = document.querySelector(".greeting-container") as HTMLElement;
const quoteBlock = document.querySelector(".quote-container") as HTMLElement;
const weatherBlock = document.querySelector(".weather") as HTMLElement;
const audioBlock = document.querySelector(".player-container") as HTMLElement;
const imgAPIGitHub = document.getElementById("image-github") as HTMLInputElement;
const imgAPIUnsplash = document.getElementById("image-unsplash") as HTMLInputElement;
const imgAPIFlickr = document.getElementById("image-flickr") as HTMLInputElement;
const languageHeader = document.getElementById("language") as HTMLHeadingElement;
const visibleHeader = document.getElementById("visible") as HTMLHeadingElement;
const imgSourceHeader = document.getElementById("img-source") as HTMLHeadingElement;
const visibleTimeText = document.getElementById("visible-time") as HTMLSpanElement;
const visibleDateText = document.getElementById("visible-date") as HTMLSpanElement;
const visibleGreetingText = document.getElementById("visible-greeting") as HTMLSpanElement;
const visibleQuoteText = document.getElementById("visible-quote") as HTMLSpanElement;
const visibleWeatherText = document.getElementById("visible-weather") as HTMLSpanElement;
const visibleAudioText = document.getElementById("visible-audio") as HTMLSpanElement;
// const settingsTagsContainer = document.querySelector(".tags-container") as HTMLDivElement;
const settingsTagsHeader = document.querySelector(".tags-header") as HTMLHeadingElement;
const settingsTagsDescription = document.querySelector(".tags-description") as HTMLSpanElement;
const settingsTagsInput = document.querySelector(".tags-input") as HTMLInputElement;

const blocksBtns = [visibleTimeBtn, visibleDateBtn, visibleGreetingBtn, visibleQuoteBtn, visibleWeatherBtn, visibleAudioBtn];
const blocks = [timeBlock, dateBlock, greetingBlock, quoteBlock, weatherBlock, audioBlock];
const imgAPI = [imgAPIGitHub, imgAPIUnsplash, imgAPIFlickr];

languageRadioBntEn.addEventListener("click", () => {
  changeSettings(state, setState);
  i18next.changeLanguage(state.language);
  showApp();
});

languageRadioBntRu.addEventListener("click", () => {
  changeSettings(state, setState);
  i18next.changeLanguage(state.language);
  showApp();
});

visibleTimeBtn.addEventListener("click", () => {
  changeSettings(state, setState), showClockAndGreeting();
});

visibleDateBtn.addEventListener("click", () => changeSettings(state, setState));

visibleGreetingBtn.addEventListener("click", () => changeSettings(state, setState));

visibleQuoteBtn.addEventListener("click", () => changeSettings(state, setState));

visibleWeatherBtn.addEventListener("click", () => changeSettings(state, setState));

visibleAudioBtn.addEventListener("click", () => changeSettings(state, setState));

imgAPIGitHub.addEventListener("click", () => {
  changeSettings(state, setState);
  setBgFromSource();
});

imgAPIUnsplash.addEventListener("click", () => {
  changeSettings(state, setState);
  setBgFromSource();
});

imgAPIFlickr.addEventListener("click", () => {
  changeSettings(state, setState);
  setBgFromSource();
});

settingsBtn.addEventListener("click", () => {
  settingsBtn.classList.toggle("active");
  settingsBlock.classList.toggle("active");
});

settingsTagsInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    settingsTagsInput.value = settingsTagsInput.value.trim();
    const newState = state;
    newState.photoSource.tags = settingsTagsInput.value.trim();
    setState(newState);
    setBgFromSource();
  }
});

settingsTagsInput.addEventListener("blur", () => {
  settingsTagsInput.value = settingsTagsInput.value.trim();
  const newState = state;
  newState.photoSource.tags = settingsTagsInput.value.trim();
  setState(newState);
  setBgFromSource();
});

window.addEventListener("click", (event) => {
  const element = event.target as HTMLElement;
  if (settingsBlock.classList.contains("active") && !element.closest(".settings") && !element.closest(".settings-button")) {
    settingsBtn.classList.toggle("active");
    settingsBlock.classList.toggle("active");
  }
});

export default function showSettings() {
  applyState(state);

  languageHeader.textContent = i18next.t("settings.language");
  visibleHeader.textContent = i18next.t("settings.visible.header");
  imgSourceHeader.textContent = i18next.t("settings.imagesource.source");
  visibleTimeText.textContent = i18next.t("settings.visible.time");
  visibleDateText.textContent = i18next.t("settings.visible.date");
  visibleGreetingText.textContent = i18next.t("settings.visible.greeting");
  visibleQuoteText.textContent = i18next.t("settings.visible.quote");
  visibleWeatherText.textContent = i18next.t("settings.visible.weather");
  visibleAudioText.textContent = i18next.t("settings.visible.audio");
  settingsTagsHeader.textContent = i18next.t("settings.imagesource.tags.header");
  settingsTagsDescription.textContent = i18next.t("settings.imagesource.tags.description");
}
function changeSettings(newState: SettingsState, setState: (state: SettingsState) => void) {
  languageRadioBntEn.checked ? (newState.language = "en") : languageRadioBntRu.checked ? (newState.language = "ru") : console.log("Language set error");

  blocksBtns.forEach((el, i) => {
    if (el.checked) {
      newState.blocks[i].visible = true;
    } else {
      newState.blocks[i].visible = false;
    }
  });

  imgAPI.forEach((el) => {
    if (el.checked && el.dataset.imgSource) {
      newState.photoSource.source = el.dataset.imgSource;
    }
  });

  setState(newState);
  applyState(state);
}

function applyState(state: SettingsState) {
  state.language === "en" ? (languageRadioBntEn.checked = true) : state.language === "ru" ? (languageRadioBntRu.checked = true) : console.log("Language apply error");
  state.blocks.forEach((el, i) => {
    if (!el.visible) {
      blocksBtns[i].checked = false;

      if (!blocks[i].classList.contains("invisible")) {
        blocks[i].classList.add("invisible");
      }
    } else {
      blocksBtns[i].checked = true;

      if (blocks[i].classList.contains("invisible")) {
        blocks[i].classList.remove("invisible");
      }
    }
  });

  imgAPI.forEach((el) => {
    if (el.dataset.imgSource === state.photoSource.source) {
      el.checked = true;
    }
  });
}
