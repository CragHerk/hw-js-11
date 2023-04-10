import getImages from './getImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const createGallery = images => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  images.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');
    photoCard.innerHTML = `
      <a href="${image.largeImageURL}" data-caption="${image.tags}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
    `;
    gallery.appendChild(photoCard);
  });

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.on('error.simplelightbox', function (e) {
    console.log(e);
  });
};

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    const images = await getImages(searchTerm);

    if (images.length === 0) {
      console.log('No images found.');
      return;
    }

    createGallery(images);
  }
});
