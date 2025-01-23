import { listShows, searchShows } from './services/shows-services.js';
import { createShowCard, displayNotFoundMessage, hideNotFoundMessage, } from './utilities/dom.js';
document
    .querySelector('#searchForm')
    .addEventListener('submit', handleSearch);
document
    .querySelector('#searchForm')
    .addEventListener('submit', handleSearch);
document
    .querySelector('#gotoFirst')
    .addEventListener('click', handleGoToFirstPage);
document
    .querySelector('#gotoPrevious')
    .addEventListener('click', handleGoToPreviousPage);
document
    .querySelector('#gotoNext')
    .addEventListener('click', handleGoToNextPage);
document
    .querySelector('#gotoLast')
    .addEventListener('click', handleGoToLastPage);
const pageNumber = document.querySelector('#pageNo');
const pages = document.querySelector('#pages');
const initApp = () => {
    let filter = '';
    if (document.referrer.includes('movie')) {
        localStorage.removeItem('filter');
    }
    else {
        filter = localStorage.getItem('filter');
    }
    if (filter) {
        searchShows(filter).then((response) => {
            displayShows(response.results);
            updatePagination(response.totalPages, response.page);
        });
        document.querySelector('#searchInput').value = filter;
    }
    else {
        listShows().then((response) => {
            displayShows(response.results);
            updatePagination(response.totalPages, response.page);
        });
    }
};
const filterShows = async () => {
    const filter = document.querySelector('#searchInput').value;
    localStorage.setItem('filter', filter);
    const response = await searchShows(filter);
    displayShows(response.results);
};
const displayShows = (shows) => {
    const app = document.querySelector('#top-series');
    app.innerHTML = '';
    if (shows.length === 0) {
        displayNotFoundMessage('Vi hittar ingen TV-serie med sökbegrepp:');
    }
    else {
        hideNotFoundMessage();
        for (let show of shows) {
            app.appendChild(createShowCard(show));
        }
    }
};
const updatePagination = (pages, page) => {
    document.querySelector('#pageNo').innerHTML = page.toString();
    document.querySelector('#pages').innerHTML = pages.toString();
};
async function handleGoToFirstPage() {
    console.log('går till första sidan');
}
async function handleGoToPreviousPage() {
    console.log('går till föregående sida');
}
async function handleGoToNextPage() {
    console.log('går till nästa sida');
}
async function handleGoToLastPage() {
    console.log('går till sista sidan');
}
async function handleSearch(e) {
    e.preventDefault();
    await filterShows();
}
document.addEventListener('DOMContentLoaded', initApp);
