import { state } from "./state";
import i18next from "i18next";

const weatherDescription = document.querySelector(".weather-description") as HTMLSpanElement;
const weatherIcon = document.querySelector(".weather-icon") as HTMLElement;
const temperature = document.querySelector(".temperature") as HTMLSpanElement;
const wind = document.querySelector(".wind") as HTMLDivElement;
const humidity = document.querySelector(".humidity") as HTMLDivElement;
const weatherError = document.querySelector(".weather-error") as HTMLDivElement;
const cityInput = document.querySelector(".city") as HTMLInputElement;
const key = "574b0746c3cf3da2640dd7e3c4ddd534"; //4UWAken

let city = "";

type weatherData = {
  cod: number | string;
  main: {
    humidity: number;
    temp: number;
  };
  weather: {
    description: string;
    id: number;
  }[];
  wind: {
    speed: number;
  };
  message: string;
};

getCityFromLocalStorage();

cityInput.value = city;

cityInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    cityInput.value = cityInput.value.trim();
    city = cityInput.value;
    setCityToLocalStorage();
    showWeather();
  }
});

cityInput.addEventListener("blur", () => {
  cityInput.value = cityInput.value.trim();
  setCityToLocalStorage();
  city = cityInput.value;
  showWeather();
});

export default async function showWeather() {
  cityInput.placeholder = i18next.t("weather.placeholder");
  city = cityInput.value;

  const data = await getWeather();

  if (data.cod === 200) {
    weatherError.textContent = ``;
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${i18next.t("weather.windspeed")}: ${Math.round(data.wind.speed)} ${i18next.t("weather.windmetric")}`;
    humidity.textContent = `${i18next.t("weather.humidity")}: ${data.main.humidity}%`;
    return
  }

  if (data.cod === "400") {
    weatherError.textContent = `${i18next.t("weather.errornothing")}`;
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
    return
  }

  if (data.cod === "404") {
    weatherError.textContent = `${i18next.t("weather.error")} '${city}'!`;
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
    return
  }
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${state.language}&appid=${key}&units=metric`;
  const res = await fetch(url);
  const data: weatherData = await res.json();
  return data;
}

function setCityToLocalStorage() {
  localStorage.setItem("city", city);
}

function getCityFromLocalStorage() {
  const cityFromStorage = localStorage.getItem("city");

  if (cityFromStorage) {
    city = cityFromStorage;
  } else {
    if (state.language === "en") {
      city = "Minsk";
    }
    if (state.language === "ru") {
      city = "Минск";
    }
  }
}
