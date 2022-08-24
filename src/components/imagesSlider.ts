import getRandomIntInclusive from "../helpers/getRandomIntInclusive";
import getTimeOfDay from "../helpers/getTimeOfDay";
import { state } from "./state";

const body = document.querySelector("body") as HTMLBodyElement;
const btnSlidePrev = document.querySelector(".slide-prev") as HTMLButtonElement;
const btnSlideNext = document.querySelector(".slide-next") as HTMLButtonElement;
const ANIMATION_TIME = 1;

let dataFlickr: { photos: { photo: { url_l: string }[] } };

let bgNum = getRandomIntInclusive(1, 20);
let bgNumForAPI = String(bgNum).padStart(2, "0"); // TO DO rename for github
let dayTime = getTimeOfDay();
let bgIsAnimated = false;
let bgNumFlickr = 0;

btnSlidePrev.addEventListener("click", () => {
  if (!bgIsAnimated) {
    getSlidePrev();
  }
});

btnSlideNext.addEventListener("click", () => {
  if (!bgIsAnimated) {
    getSlideNext();
  }
});

async function setBgFromSource() {
  body.style.transition = `background-image ${ANIMATION_TIME}s ease-in-out`;
  if (state.photoSource.source === "flickr") {
    dataFlickr = await getLinkToImageFromFlickr();
  }
  await setBg();
}

async function getLinkToImageFromUnsplash() {
  let url: string;
  if (state.photoSource.tags) {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${state.photoSource.tags}&client_id=TtPKrBlPesg0Go1q4qhSnfzJTWO3iHNPphGX7oBDqxg`;
  } else {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${dayTime}&client_id=TtPKrBlPesg0Go1q4qhSnfzJTWO3iHNPphGX7oBDqxg`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data.urls.regular;
}

async function getLinkToImageFromFlickr() {
  let url: string;
  if (state.photoSource.tags) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5281c7393cfc5f5a478b08bc6bb0dfce&tags=${state.photoSource.tags}&extras=url_l&format=json&nojsoncallback=1&per_page=100`;
  } else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5281c7393cfc5f5a478b08bc6bb0dfce&tags=${dayTime}&extras=url_l&format=json&nojsoncallback=1&per_page=100&content_type=1&sort=relevance`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getSlideNext() {
  if (state.photoSource.source === "github") {
    bgNum = bgNum + 1;

    if (bgNum === 21) {
      bgNum = 1;
    }
    bgNumForAPI = String(bgNum).padStart(2, "0");
  }
  if (state.photoSource.source === "flickr") {
    bgNumFlickr = bgNumFlickr + 1;

    if (bgNumFlickr === 100) {
      bgNumFlickr = 0;
    }
  }
  await setBg();
}

async function getSlidePrev() {
  if (state.photoSource.source === "github") {
    bgNum = bgNum - 1;

    if (bgNum === 0) {
      bgNum = 20;
    }
    bgNumForAPI = String(bgNum).padStart(2, "0");
  }
  if (state.photoSource.source === "flickr") {
    bgNumFlickr = bgNumFlickr - 1;

    if (bgNumFlickr === -1) {
      bgNumFlickr = 99;
    }
  }
  await setBg();
}

async function setBg() {
  bgIsAnimated = true;
  const img = new Image();
  if (state.photoSource.source === "github") {
    img.src = `https://raw.githubusercontent.com/pecheneg95/stage1-tasks/assets/images/${dayTime}/${bgNumForAPI}.webp`;
  }

  if (state.photoSource.source === "unsplash") {
    img.src = await getLinkToImageFromUnsplash();
  }

  if (state.photoSource.source === "flickr") {
    if (dataFlickr.photos.photo[bgNumFlickr].url_l) {
      img.src = dataFlickr.photos.photo[bgNumFlickr].url_l;
    } else {
      getSlideNext();
    }
  }

  img.onload = () => {
    setTimeout(() => {
      bgIsAnimated = false;
    }, ANIMATION_TIME * 1000);

    body.style.backgroundImage = `url(${img.src})`;
  };
}

export { setBgFromSource };
