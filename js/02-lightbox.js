import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);
const listGallery = document.querySelector('.gallery');

const markup = galleryItems
  .map(item => {
    return `<li class="gallery__item">
                <a class="gallery__link" href="${item.original}">
                    <img
                        class="gallery__image"
                        src="${item.preview}" 
                        alt="${item.description}"
                    >
                </a>
            </li>`;
  })
  .join('');

listGallery.insertAdjacentHTML('beforeend', markup);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
