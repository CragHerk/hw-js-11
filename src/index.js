import getImages from './getImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const perPage = 40;

const createGallery = images => {
  const gallery = document.querySelector('.gallery');

  images.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');

    const a = document.createElement('a');
    a.href = image.webformatURL;
    a.classList.add('gallery-link');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.classList.add('gallery-img');
    a.appendChild(img);

    const imgInfo = document.createElement('div');
    imgInfo.classList.add('img-info');

    const likesLabel = document.createElement('div');
    likesLabel.innerText = 'Likes: ';

    const likesCount = document.createElement('span');
    likesCount.innerText = image.likes.toLocaleString();

    const viewsLabel = document.createElement('div');
    viewsLabel.innerText = 'Views: ';

    const viewsCount = document.createElement('span');
    viewsCount.innerText = image.views.toLocaleString();

    const commentsLabel = document.createElement('div');
    commentsLabel.innerText = 'Comments: ';

    const commentsCount = document.createElement('span');
    commentsCount.innerText = image.comments.toLocaleString();

    const downloadsLabel = document.createElement('div');
    downloadsLabel.innerText = 'Downloads: ';

    const downloadsCount = document.createElement('span');
    downloadsCount.innerText = image.downloads.toLocaleString();

    likesLabel.appendChild(likesCount);
    viewsLabel.appendChild(viewsCount);
    commentsLabel.appendChild(commentsCount);
    downloadsLabel.appendChild(downloadsCount);

    imgInfo.appendChild(likesLabel);
    imgInfo.appendChild(viewsLabel);
    imgInfo.appendChild(commentsLabel);
    imgInfo.appendChild(downloadsLabel);

    a.appendChild(imgInfo);

    galleryItem.appendChild(a);
    gallery.appendChild(galleryItem);
  });

  const lightbox = new SimpleLightbox('.gallery a', {
    /* opcje */
  });
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
