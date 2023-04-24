import { galleryItems } from './gallery-items.js';
// Change code below this line


let instance = '';

const listGallery = document.querySelector('.gallery');

const markup = galleryItems.map(item => {
    return `<li class="gallery__item">
                <a class="gallery__link" href="${item.original}">
                    <img
                        class="gallery__image"
                        data-source="${item.original}"
                        src="${item.preview}" 
                        alt="${item.description}"
                    >
                </a>
            </li>`
}).join('');

listGallery.insertAdjacentHTML('beforeend', markup);

listGallery.addEventListener('click', onOpenModal);

function onOpenModal(event) {  
    if (event.target.nodeName !== 'IMG') { 
        return
    };
    event.preventDefault();
    window.addEventListener('keydown', onCloseModal);

    instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}">
    `);
    instance.show();
};

function onCloseModal(event) { 
    if (event.code === 'Escape') {
        instance.close();
        window.removeEventListener('keydown', onCloseModal);        
    };
};