import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
const galleryElemsMarkup = createGallery(galleryItems);

function createGallery(arrayItems) {
  return arrayItems
    .map(
      ({ original, preview, description }) =>
        `<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${preview}" alt="${description}" />
   </a>
</li>`
    )
    .join("");
}

galleryList.innerHTML = galleryElemsMarkup;

new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  captionsData: "alt",
});
