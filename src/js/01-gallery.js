import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
let basicLightboxObj = null;

function createGalleryElemsMarkup(arrayItems) {
  return arrayItems
    .map(
      (el) =>
        `<li class="gallery__item">
    <a class="gallery__link" href="${el.original}">
    <img
      loading="lazy"
      class="gallery__image lazyload"
      data-src="${el.original}"
      alt="${el.description}"
    />
    </a>
    </li>`
    )
    .join("");
}

function addMarkupToList(markup) {
  galleryList.innerHTML = markup;
}

function closeModalOnKeyDownEsc(event) {
  if (event.code !== "Escape") {
    return;
  }
  basicLightboxObj.close();
}

function createBasicLightboxObj(largeImg) {
  basicLightboxObj = basicLightbox.create(`<img src=${largeImg}>`, {
    onShow: () => {
      document.addEventListener("keydown", closeModalOnKeyDownEsc);
    },
    onClose: () => {
      document.removeEventListener("keydown", closeModalOnKeyDownEsc);
    },
  });
}

function onGalleryListElClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const largeImgOfEl = event.target.dataset.src;

  createBasicLightboxObj(largeImgOfEl);
  basicLightboxObj.show();
}

function createScriptEl(script) {
  const scriptEl = document.createElement("script");

  scriptEl.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  scriptEl.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  scriptEl.crossOrigin = "anonymous";
  scriptEl.referrerPolicy = "no-referrer";

  return scriptEl;
}

function addSrcToImages(imagesArray) {
  imagesArray.forEach((image) => {
    image.src = image.dataset.src;
  });
}

const galleryElemsMarkup = createGalleryElemsMarkup(galleryItems);

addMarkupToList(galleryElemsMarkup);

galleryList.addEventListener("click", onGalleryListElClick);

if ("loading" in HTMLImageElement.prototype) {
  const allImages = document.querySelectorAll('img[loading="lazy"]');

  addSrcToImages(allImages);
} else {
  const script = createScriptEl();

  document.body.append(script);
}