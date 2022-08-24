import getRandomIntInclusive from "../helpers/getRandomIntInclusive";
import { state } from "./state";

const btnResetQuote = document.querySelector(".change-quote") as HTMLButtonElement;
const quoteTextContainer = document.querySelector(".quote") as HTMLDivElement;
const quoteAuthorContainer = document.querySelector(".author") as HTMLDivElement;

let indexRandomQuote: number;
let quotes: Quote[];

type Quote = {
  quote: string;
  author: string;
};

btnResetQuote.addEventListener("click", showQuote);

async function showQuote() {
  const newIndexRandomQuote = getRandomIntInclusive(0, quotes.length - 1);

  if (indexRandomQuote === newIndexRandomQuote) {
    return showQuote();
  }

  indexRandomQuote = newIndexRandomQuote;
  
  const quote = quotes[indexRandomQuote];

  quoteTextContainer.textContent = quote.quote;
  quoteAuthorContainer.textContent = quote.author;
}

async function setQuotes() {
  quotes = await getQuotes();
}

async function getQuotes() {
  const quotesPath = `./data/quotes-data-${state.language}.json`;
  const res = await fetch(quotesPath);
  const data: Quote[] = await res.json();
  return data;
}

export { showQuote, setQuotes };
