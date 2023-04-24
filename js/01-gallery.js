import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('img.lightbox__image'),
  closeLightboxBtn: document.querySelector('.lightbox .lightbox__button'),
  overlay: document.querySelector('div.lightbox__overlay'),
};

// Переменная индекса текущего выбранного изображения
let lightboxImageIdx;

// ================== разметка галереи ======================
const galleryItemsElements = galleryItems.map(
  el => `<li  class="gallery__item"><a class="gallery__link" href=${el.original}><img
      class="gallery__image"
      src=${el.preview}
      data-source=${el.original}
      alt="${el.description}"
    /></a></li>`,
);

refs.gallery.insertAdjacentHTML('afterbegin', galleryItemsElements.join(''));
const imgArray = [...document.querySelectorAll('.gallery__image')];
// ================== открытие модалки ======================
refs.gallery.addEventListener('click', event => {
  if (!event.target.classList.contains('gallery__image')) {
    event.preventDefault();
    return;
  } else {
    event.preventDefault();
    refs.lightbox.classList.add('is-open');
    refs.lightboxImage.src = event.target.dataset.source;
    console.log(event);
    refs.lightboxImage.alt = event.target.alt;
    refs.closeLightboxBtn.addEventListener('click', closeLightBox);
    refs.overlay.addEventListener('click', closeLightBox);
    document.addEventListener('keydown', onGalleryKeyPress);
    refs.lightboxImage.addEventListener('click', galleryScrollByMouse);
    // Запись значения индекса текущего выбранного изображения
    lightboxImageIdx = imgArray.indexOf(event.target);
  }
});

function closeLightBox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  refs.closeLightboxBtn.removeEventListener('click', closeLightBox);
  refs.overlay.removeEventListener('click', closeLightBox);
  document.removeEventListener('keydown', onGalleryKeyPress);
  document.removeEventListener('click', galleryScrollByMouse);
}

function onGalleryKeyPress(event) {
  if (event.code === "Escape") {
    closeLightBox();
  }

  galleryScrollByArrows(event);
}

function galleryScrollByArrows(event) {
  if (event.key === "ArrowLeft") {
    if (lightboxImageIdx > 0) {
      lightboxImageIdx -= 1;
    } else {
      lightboxImageIdx = galleryItems.length - 1;
    }
    refs.lightboxImage.src = galleryItems[lightboxImageIdx].original;
    refs.lightboxImage.alt = galleryItems[lightboxImageIdx].description;
  }
  if (event.code === "ArrowRight") {
    if (lightboxImageIdx < galleryItems.length - 1) {
      lightboxImageIdx += 1;
    } else {
      lightboxImageIdx = 0;
    }
    refs.lightboxImage.src = galleryItems[lightboxImageIdx].original;
    refs.lightboxImage.alt = galleryItems[lightboxImageIdx].description;
  }
}

function galleryScrollByMouse(event) {
  if (event.pageX <= document.documentElement.clientWidth * 0.5) {
    console.log("left side click");
    if (lightboxImageIdx > 0) {
      lightboxImageIdx -= 1;
    } else {
      lightboxImageIdx = galleryItems.length - 1;
    }
    refs.lightboxImage.src = galleryItems[lightboxImageIdx].original;
    refs.lightboxImage.alt = galleryItems[lightboxImageIdx].description;
  }
  if (event.pageX > document.documentElement.clientWidth * 0.5) {
    console.log("right side click");
    if (lightboxImageIdx < galleryItems.length - 1) {
      lightboxImageIdx += 1;
    } else {
      lightboxImageIdx = 0;
    }
    refs.lightboxImage.src = galleryItems[lightboxImageIdx].original;
    refs.lightboxImage.alt = galleryItems[lightboxImageIdx].description;
  }
}
