const API_KEY = '46204158-4df5f152d7953f3c8acc30a03';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}