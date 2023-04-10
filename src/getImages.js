import axios from 'axios';
import notiflix from 'notiflix';

const API_KEY = '35097594-2079bd5e4adb4155ba76a6246';

const getImages = async searchTerm => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo&per_page=40`
    );
    const hits = response.data.hits;
    if (hits.length === 0) {
      notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return hits;
  } catch (error) {
    console.error(error);
  }
};

export default getImages;
