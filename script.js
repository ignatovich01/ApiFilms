
const API_KEY = 'fe8c9c92-3b8c-4d00-8e3d-b27f5cd8e9b0';
const API_URL_POPULAR = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH ='https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_URL_MOVIE_DESCROPTION = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';


async function getMovies(url){
const resp = await fetch(url,{
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
  },
});
const respData = await resp.json();
console.log(respData);
showMovies(respData);
}
getMovies(API_URL_POPULAR);


function showMovies(data){
  let moviesEl = document.querySelector('.movies');

  document.querySelector(".movies").innerHTML = "";


  data.films.forEach((movie)=>{
  const movieEl = document.createElement('div');
  movieEl.classList.add('movie');
  //
  movieEl.innerHTML = `
          <div class="movie_cover">
          <img class='movie_image' src="${movie.posterUrlPreview}" alt="${movie.filmId}">
          <div class="movie_cover_dark"></div>
        </div>
        <div class="movie_info">
          <div class="movie_title">${movie.nameRu}</div>
          <div class="movie_category"> ${movie.genres.map(
            (genre) => ` ${genre.genre.firstLetterToUppercase()}`
          )}</div>
        
          <div class="movie_rate movie_rate--${voteRating(movie.rating)}">${voteRate(movie.rating)}</div>
          
          
        </div>
          `;
  movieEl.addEventListener('click',()=>openModal(movie.filmId));

  moviesEl.appendChild(movieEl);
  })
  }




function category(){

  let final = genre.genre.split("");
  let first = final[0].toUpperCase();

}

//изменение прототипа стринга , аккуратнее)
String.prototype.firstLetterToUppercase = function() {
  if(this!= null){
  return this[0].toUpperCase() + this.slice(1);
}
else return;}

String.prototype.percentsToOneNumber = function() {
  return  Math.round(this.slice(0,-1)/10);
}


function voteRating(vote) {
  if(vote){
if (Array.from(vote).includes('%')) {
  vote = vote.percentsToOneNumber();
  if(vote >= 7){
    return 'green';
      }
      if(vote >= 5){
        return 'yellow';
      }
      else{
        return 'red';
      }
} 

  if(vote >= 7){
return 'green';
  }
  if(vote >= 5){
    return 'yellow';
  }
  else {
    return 'red';
  } 

  }
else return 'red';}





function voteRate(vote) {
  if(vote){
if (Array.from(vote).includes('%')) {
 return  vote = vote.percentsToOneNumber();
}
else{ return vote;}
}

if(!vote) {return '0'}

}

const form = document.querySelector("form");
const search =document.querySelector('.header_search')

// API_URL_SEARCH не работает , не видит AddEventListener

form.addEventListener("submit", (e)=>{
    e.preventDefault();
  
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
      getMovies(apiSearchUrl);
  
      search.value = "";
  }
  });
// конец апи серча

 //попап
 //API_URL_MOVIE_DESCROPTION
let modalEl = document.querySelector('.modal');

async function openModal(id){
  const resp = await fetch(API_URL_MOVIE_DESCROPTION + id,{
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();

  console.log(id);
    modalEl.classList.add('modal_show');
    document.body.classList.add('stop_scrolling');


  modalEl.innerHTML = `
  <div class="modal_card">
      <img class="modal_movie_back" src="${respData.posterUrlPreview}" alt="${respData.id}">
      <h2>
          <span class="modal_movie_title">${respData.nameRu}</span>
          <span class="modal_movie_releaseYear">${respData.year}</span>
      </h2>
      <ul>
          <li class="modal_movie_genre">${respData.genres.map(
            (genre) => ` ${genre.genre.firstLetterToUppercase()}`
          )}</li>
         ${respData.filmLength ? `<li class="modal_movie_runtime">Время: ${respData.filmLength} мин. </li>`: ' '}
          <li>Сайт: <a class="modal_movie_site" href='${respData.webUrl}'>${respData.webUrl}</a></li>
          <li class="modal_movie_about">${respData.description}</li>
      </ul>
      <button type="button" class="modal_button_close">Закрыть</button>
  </div>
  `;
  document.querySelector('.modal_button_close').addEventListener('click', () => closeModal());
  }

 function closeModal(){
    modalEl.classList.remove('modal_show');
    document.body.classList.remove('stop_scrolling');
  }

  window.addEventListener('click',(event)=>{
      if( event.target === modalEl){
    closeModal();
    
  }
  });

  window.addEventListener('keydown',(event)=>{
    if( event.keyCode === 27){
  closeModal();
  
}
});

//пагинация 
//не , не будет пагинации
