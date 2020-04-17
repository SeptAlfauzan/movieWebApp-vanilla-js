// api key
// http://www.omdbapi.com/?apikey=20cdd9eb&
// get API request
let searchQuery = document.getElementById('search-box');
let searchBoxInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies-container');
const modalContainer = document.getElementById('content-detail');
searchQuery.addEventListener('submit', async function(e) {
    e.preventDefault();
    let cards = ''
    let valueSearch = searchBoxInput.value;
    const movies = await getMovies(valueSearch);

    movies.forEach(movie => {
        cards += callMoviesComponent(movie)
    });
    moviesContainer.innerHTML = cards;
})


function getMovies(search) {
let movies = fetch(`http://www.omdbapi.com/?apikey=20cdd9eb&s=${search}`).then(response => response.json()).then(response => response.Search);
    return movies;
}

document.addEventListener('click', async function(e) {
    if (e.target.classList.contains('modal-trigger')) {
        const imdbID = e.target.dataset.imdbid;
        const movieDetails = await getMovieDetails(imdbID)
        const modal = callModalComponent(movieDetails)
        modalContainer.innerHTML = modal
    }
})

function getMovieDetails(id){
    return fetch(`http://www.omdbapi.com/?apikey=20cdd9eb&i=${id}`).then(response => response.json()).then(response => response)
}

function callModalComponent(object){
    const title = object.Title;
    const posterUrl = object.Poster;
    const type = object.Type;
    const year = object.Year;
    const actors = object.Actors;
    const realeased = object.Released;
    const plot = object.Plot;
    const runtime = object.Runtime;
    const writer = object.writer;
    const imdbRating =object.imdbRating;
    const imdbVotes = object.imdbVotes;
    return `<div class="modal-body bg-dark">
                <img src="${posterUrl}" alt="" class="img-fluid">
                <h1>${title}</h1>
                <div class="p-2">
                <p>IMDB rating ${imdbRating}</p>
                <p>IMDB votes ${imdbVotes}</p>
                <p>Realease on ${realeased}</p>
                <p>Runtime ${runtime}</p>
                <p>Actors ${actors}</p>
                <p>Writer ${writer}</p>
                <h5>Plot</h5>
                <p>${plot}</p>
                </div>
            </div>`
}

function callMoviesComponent(object) {
    let cards = '';
        let title = object.Title;
        let posterUrl = object.Poster;
        let type = object.Type;
        let year = object.Year;
        let imdbId = object.imdbID;
        cards = `<div class="col-md-3 col-6 p-1">
                    <div class="card bg-dark col-12 m-auto p-0" style="width: 18rem;">
                    <img class="card-img-top" src="${posterUrl}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">Release year ${year}</p>
                    </div>
                    <a href="#" data-imdbid="${imdbId}" class="btn btn-outline-none modal-trigger text-right col-12 m-0" data-toggle="modal" data-target="#movieDetail">more info</a>
                    </div>
                </div>`;
    return cards;
}