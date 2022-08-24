import { state } from "./state";
import i18next from "i18next";

export default function initialLanguage() {
  i18next.init({
    lng: state.language,
    debug: false,
    resources: {
      en: {
        translation: {
          greeting: {
            morning: "Good morning",
            afternoon: "Good afternoon",
            evening: "Good evening",
            night: "Good night",
            placeholder: "[Enter Name]",
          },
          weather: {
            placeholder: "[Enter city]",
            windspeed: "Wind speed",
            windmetric: "m/s",
            humidity: "Humidity",
            error: "Error! Сity not found for",
            errornothing: "Error! Nothing to geocode!",
          },
          settings: {
            language: "Language",
            visible: {
              header: "Visible",
              time: "Time",
              date: "Date",
              greeting: "Greeting",
              quote: "Quote",
              weather: "Weather",
              audio: "Audio",
            },
            imagesource: {
              source: "Image source",
              tags: {
                header: "Tags",
                description: "Enter tags separated by commas",
              },
            },
          },
        },
      },
      ru: {
        translation: {
          greeting: {
            morning: "Доброе утро",
            afternoon: "Добрый день",
            evening: "Добрый вечер",
            night: "Доброй ночи",
            placeholder: "[Введите Имя]",
          },
          weather: {
            placeholder: "[Введите город]",
            windspeed: "Скорость ветра",
            windmetric: "м/с",
            humidity: "Влажность",
            error: "Ошибка! Город не найден для",
            errornothing: "Ошибка! Нечего искать!",
          },
          settings: {
            language: "Язык",
            visible: {
              header: "Видимость",
              time: "Время",
              date: "Дата",
              greeting: "Приветствие",
              quote: "Цитаты",
              weather: "Погода",
              audio: "Аудио",
            },
            imagesource: {
              source: "Источник изображений",
              tags: {
                header: "Тэги",
                description: "Введите теги через запятую",
              },
            },
          },
        },
      },
    },
  });
}
