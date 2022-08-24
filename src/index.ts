import initialLanguage from "./components/language";
initialLanguage();
import getDate from "./helpers/getDate";
import { showTime, showDate } from "./components/timeAndDate";
import { setBgFromSource } from "./components/imagesSlider";
import showGreeting from "./components/greeting";
import showWeather from "./components/weather";
import { showQuote, setQuotes } from "./components/quotes";
import showAudioPlayer from "./components/audioPlayer";
import showSettings from "./components/settings";

setBgFromSource();
async function showApp() {
  showSettings();
  showClockAndGreeting();
  showWeather();
  showAudioPlayer();
  await setQuotes();
  showQuote();
}
showApp();

function showClockAndGreeting() {
  const date = getDate();
  showDate(date);
  showGreeting();
  showTime(date);
  setTimeout(showClockAndGreeting, 1000);
}

export { showClockAndGreeting, showApp };
