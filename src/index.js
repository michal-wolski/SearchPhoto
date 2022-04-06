import './sass/main.scss';
import axios, { Axios } from 'axios';
import Notiflix from 'notiflix';

//DOM import
const input = document.querySelector("input")
const btn = document.querySelector('button')

async function getFoto(words) {
    const apiKey = '26531596-66f70a56847dae6fbc6ddebb0';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${words}&image_type=photo`;
    try {
      const response = await axios.get(url);
      const data = await response.data;
      const hits = await response.data.hits;
      console.log(hits);
    } catch (error) {
      if (hits === []) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }
      console.error(error);
    }
  }

btn.addEventListener('click', ()=> {
    const result = input.value
    getFoto(result)
});

getFoto('aaaaaaaaaaaaa')
