import { IShow } from './models/IShow';
import { listShows, searchShows } from './services/shows-services.js';
import {
  createShowCard,
  displayNotFoundMessage,
  hideNotFoundMessage,
} from './utilities/dom.js';

document
  .querySelector<HTMLFormElement>('#searchForm')!
  .addEventListener('submit', handleSearch);

document
  .querySelector<HTMLFormElement>('#searchForm')!
  .addEventListener('submit', handleSearch);

document
  .querySelector<HTMLSpanElement>('#gotoFirst')!
  .addEventListener('click', handleGoToFirstPage);

document
  .querySelector<HTMLSpanElement>('#gotoPrevious')!
  .addEventListener('click', handleGoToPreviousPage);

document
  .querySelector<HTMLSpanElement>('#gotoNext')!
  .addEventListener('click', handleGoToNextPage);

document
  .querySelector<HTMLSpanElement>('#gotoLast')!
  .addEventListener('click', handleGoToLastPage);

const pageNumber = document.querySelector<HTMLSpanElement>('#pageNo');
const pages = document.querySelector<HTMLSpanElement>('#pages');

const initApp = () => {
  let filter: string | null = '';

  if (document.referrer.includes('movie')) {
    localStorage.removeItem('filter');
  } else {
    filter = localStorage.getItem('filter');
  }

  if (filter) {
    searchShows(filter).then((response) => {
      displayShows(response.results as IShow[]);
      updatePagination(response.totalPages, response.page);
    });
    document.querySelector<HTMLInputElement>('#searchInput')!.value = filter;
  } else {
    listShows().then((response) => {
      displayShows(response.results as IShow[]);
      updatePagination(response.totalPages, response.page);
    });
  }
};

const filterShows = async () => {
  const filter: string =
    document.querySelector<HTMLInputElement>('#searchInput')!.value;

  localStorage.setItem('filter', filter);

  const response = await searchShows(filter);
  displayShows(response.results as IShow[]);
};

const displayShows = (shows: Array<IShow>) => {
  const app = document.querySelector('#top-series') as HTMLDivElement;

  app.innerHTML = '';

  if (shows.length === 0) {
    displayNotFoundMessage('Vi hittar ingen TV-serie med sökbegrepp:');
  } else {
    hideNotFoundMessage();
    for (let show of shows) {
      app.appendChild(createShowCard(show));
    }
  }
};

const updatePagination = (pages: number, page: number) => {
  document.querySelector('#pageNo')!.innerHTML = page.toString();
  document.querySelector('#pages')!.innerHTML = pages.toString();
};

async function handleGoToFirstPage(): Promise<void> {
  console.log('går till första sidan');
}
async function handleGoToPreviousPage(): Promise<void> {
  console.log('går till föregående sida');
}
async function handleGoToNextPage(): Promise<void> {
  console.log('går till nästa sida');
}
async function handleGoToLastPage(): Promise<void> {
  console.log('går till sista sidan');
}

async function handleSearch(e: SubmitEvent) {
  e.preventDefault();
  await filterShows();
}

document.addEventListener('DOMContentLoaded', initApp);
