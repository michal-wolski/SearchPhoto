import './sass/main.scss';
import axios, { Axios } from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//DOM import
const input = document.querySelector("input")
const btnSubmit = document.getElementById("btn--submit")
const btnLoad = document.querySelector('button.load-more');
const galleryDiv = document.querySelector('div.gallery');
//Varibles
let inputValue;
let page = 1;
//Base URL
const apiKey = '26531596-66f70a56847dae6fbc6ddebb0';
// const url = `https://pixabay.com/api/?key=${apiKey}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
//Fetch image from http
async function getFoto(inputValue) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    const fotoArray = response.data.hits;
    if (fotoArray.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } 
    return response;
  } catch (error) {
    console.log(error);
  }
};


//Create gallery funcion
function createGallery(array) {
  const galleryArray = array.map((array)=>{
    const x = `<div class="photo-card">
    <a href="${array.largeImageURL}">
    <img class="gallery__image" src="${array.webformatURL}" alt="${array.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${array.likes}
      </p>
      <p class="info-item">
        <b>Views</b>${array.views}
      </p>
      <p class="info-item">
        <b>Comments</b>${array.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${array.downloads}
      </p>
    </div>
  </div>`
  return x;
  }).join('');
  galleryDiv.innerHTML = galleryArray;
}
//Load gallery
const innerGallery = ev => {
  ev.preventDefault();
  galleryDiv.innerHTML = ''
  inputValue = input.value.split(' ').join('+');
  getFoto(inputValue).then(response => {
    createGallery(response.data.hits)
    Notiflix.Notify.success("Hooray! We found totalHits images.");
    })
    .catch(error => {
      console.log(error);
    });
};
//Button to load gallery
btnSubmit.addEventListener('click', innerGallery);
//Next page gallery
const nextPageGallery = ev => {
  ev.preventDefault();
  page += 1;
  getFoto(inputValue).then(response => {
    if(40>= response.data.totalHits) {
      btnLoad.disabled;
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    } else {
      createGallery(response.data.hits);
      Notiflix.Notify.success("Hooray! We found totalHits images.");
    }
  })
}
//load more btn
btnLoad.addEventListener('click', nextPageGallery);
// //Simplelightbox
// const lightbox = new SimpleLightbox('.gallery a', {
//   nav: true,
//   navText,
// });


