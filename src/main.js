import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showNotification } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    showNotification('Please enter a search term.');
    return;
  }

  currentQuery = query;
  currentPage = 1;
  
  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(currentQuery, currentPage);
    hideLoader();

    if (images.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(images);
  } catch (error) {
    hideLoader();
    showNotification('Something went wrong. Please try again later.');
  }
});