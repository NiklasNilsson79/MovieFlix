import { IMovie } from './models/IMovie.js';
import { IShow } from './models/IShow.js';
import { listMovies, searchMovies } from './services/movies-services.js';
import {
  createMovieCard,
  displayNotFoundMessage,
  hideNotFoundMessage,
} from './utilities/dom.js';

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

const initApp = async () => {
  let filter: string | null = '';

  if (document.referrer.includes('shows')) {
    localStorage.removeItem('filter');
  } else {
    filter = localStorage.getItem('filter');
  }

  if (filter) {
    searchMovies(filter).then((response) => {
      displayMovies(response.results as IMovie[]);
      updatePagination(response.totalPages, response.page);
    });
    document.querySelector<HTMLInputElement>('#searchInput')!.value = filter;
  } else {
    listMovies().then((response) => {
      displayMovies(response.results as IMovie[]);
      updatePagination(response.totalPages, response.page);
    });
  }
};

const filterMovies = async () => {
  const filter: string =
    document.querySelector<HTMLInputElement>('#searchInput')!.value;

  localStorage.setItem('filter', filter);
  const response = await searchMovies(filter);

  displayMovies(response.results as IMovie[]);
};

const displayMovies = (movies: Array<IMovie>) => {
  const app = document.querySelector('#top-movies') as HTMLDivElement;
  app.innerHTML = '';

  if (movies.length === 0) {
    displayNotFoundMessage('Vi hittar ingen film med sökbegrepp:');
  } else {
    hideNotFoundMessage();
    for (let movie of movies) {
      app.appendChild(createMovieCard(movie));
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
  await filterMovies();
}

document.addEventListener('DOMContentLoaded', initApp);
