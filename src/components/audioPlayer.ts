import { state } from "./state";

const playBtn = document.querySelector(".play") as HTMLButtonElement;
const playNextBtn = document.querySelector(".play-next") as HTMLButtonElement;
const playPrevBtn = document.querySelector(".play-prev") as HTMLButtonElement;
const playListContainer = document.querySelector(".play-list") as HTMLUListElement;
const trackTitleContainer = document.querySelector(".title") as HTMLSpanElement;
const durationContainer = document.querySelector(".duration") as HTMLSpanElement;
const currentTimeContainer = document.querySelector(".current-time") as HTMLSpanElement;
const trackProgressBar = document.querySelector(".progress") as HTMLInputElement;
const volumeProgressBar = document.querySelector(".volume-range") as HTMLInputElement;
const volumeBtn = document.querySelector(".volume-button") as HTMLButtonElement;

const audio = new Audio();

type PlayListItem = {
  title: string;
  src: string;
  duration: string;
};

let trackNumber = 0;
let playList: PlayListItem[];
let isPlay = false;
let isMuted = false;
let currentTime = 0;
let currentVolume = 80;
let interval: NodeJS.Timer;

playBtn.addEventListener("click", () => {
  if (!isPlay) {
    isPlay = true;
    playAudio();
    toggleBtn();
  } else {
    isPlay = false;
    pauseAudio();
    toggleBtn();
  }
});

playNextBtn.addEventListener("click", () => {
  playNext();
});

playPrevBtn.addEventListener("click", () => {
  playPrev();
});

trackProgressBar.addEventListener("input", () => {
  currentTime = Math.round(Number(trackProgressBar.value) * audio.duration);
  audio.currentTime = currentTime;
});
volumeProgressBar.addEventListener("input", () => {
  isMuted = false;
  audio.muted = isMuted;
  volumeBtn.classList.remove("volume-mute");
  currentVolume = Math.round(Number(volumeProgressBar.value));
  audio.volume = currentVolume / 100;
  if (currentVolume === 0) {
    isMuted = true;
    audio.muted = isMuted;
    volumeBtn.classList.add("volume-mute");
  }
});
volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("volume-mute");
  if (isMuted) {
    isMuted = false;
  } else {
    isMuted = true;
  }
  audio.muted = isMuted;
});

audio.addEventListener("ended", playNext);

export default async function showAudioPlayer() {
  const dataPlayList = await getPlayList();
  playList = dataPlayList;
  audio.src = playList[trackNumber].src;

  createPlayList();

  setInformationAboutTrack();
}

function createPlayList() {
  while (playListContainer.firstChild) {
    playListContainer.removeChild(playListContainer.firstChild);
  }
  playList.forEach((el, i) => {
    const playListElement = document.createElement("li");
    const playListElementIcon = document.createElement("i");

    playListElement.classList.add("play-item");
    playListElement.dataset.playListNumber = String(i);
    playListElement.textContent = el.title;

    playListElementIcon.classList.add("mini-play-icon");

    playListElement.addEventListener("click", (event) => {
      if (event.target === playListElement || event.target === playListElementIcon) {
        const numberElement = Number(playListElement.dataset.playListNumber);
        if (!isPlay) {
          trackNumber = numberElement;
          playAudio();
          toggleBtn();
        } else if (isPlay && trackNumber !== numberElement) {
          trackNumber = numberElement;
          currentTime = 0;
          playAudio();
        } else if (isPlay && trackNumber === numberElement) {
          pauseAudio();
          toggleBtn();
        }
      }
    });

    playListElement.prepend(playListElementIcon);
    playListContainer.append(playListElement);
  });
}

function playAudio() {
  deleteTrackProgress();
  audio.src = playList[trackNumber].src;
  audio.currentTime = currentTime;
  audio.play();
  isPlay = true;
  setActiveItem();
  setInformationAboutTrack();
  interval = setInterval(setCurentTrackProgress, 500);
}

function pauseAudio() {
  deleteTrackProgress();
  audio.pause();
  isPlay = false;
  setActiveItem();
  deleteTrackProgress();
}

function toggleBtn() {
  playBtn.classList.toggle("pause");
}

function playNext() {
  currentTime = 0;
  isPlay = true;
  trackNumber++;
  if (trackNumber > playList.length - 1) {
    trackNumber = 0;
  }
  playAudio();
  playBtn.classList.add("pause");
}

function playPrev() {
  currentTime = 0;
  isPlay = true;
  trackNumber--;
  if (trackNumber < 0) {
    trackNumber = playList.length - 1;
  }
  playAudio();
  playBtn.classList.add("pause");
}

function setActiveItem() {
  const listPlayListElements = document.querySelectorAll(".play-item");
  listPlayListElements.forEach((el, i) => {
    const elBtn = el.querySelector(".mini-play-icon") as HTMLElement;
    if (i === trackNumber && isPlay === true) {
      el.classList.add("item-active");
      elBtn.classList.add("pause");
    } else {
      el.classList.remove("item-active");
      elBtn.classList.remove("pause");
    }
  });
}
function setInformationAboutTrack() {
  trackTitleContainer.textContent = playList[trackNumber].title;
  durationContainer.textContent = playList[trackNumber].duration;
}

function setCurentTrackProgress() {
  currentTime = audio.currentTime;
  trackProgressBar.value = String(Math.floor(audio.currentTime) / audio.duration);
  const minutes = String(Math.floor(currentTime / 60));
  const seconds = String(Math.floor(currentTime % 60));

  currentTimeContainer.textContent = `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}

function deleteTrackProgress() {
  clearInterval(interval);
}

async function getPlayList() {
  const playListPath = `./data/playList-${state.language}.json`;
  const res = await fetch(playListPath);
  const data: PlayListItem[] = await res.json();

  return data;
}
