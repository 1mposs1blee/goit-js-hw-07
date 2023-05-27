import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
const galleryElemsMarkup = createGalleryElemsMarkup(galleryItems);

galleryList.addEventListener("click", openBigPhoto);

function createGalleryElemsMarkup(arrayItems) {
  return arrayItems
    .map(
      ({ original, preview, description }) =>
        `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
    </li>`
    )
    .join("");
}

galleryList.innerHTML = galleryElemsMarkup;

function openBigPhoto(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800">`
  );

  instance.show();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  });
}
