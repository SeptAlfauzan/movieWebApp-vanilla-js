// api key
// http://www.omdbapi.com/?apikey=20cdd9eb&
// get API request
let searchQuery = document.getElementById('search-box');
let searchBoxInput = document.getElementById('search-input');

searchQuery.addEventListener('submit', function(e) {
    e.preventDefault();
    let cards = '';
    let valueSearch = searchBoxInput.value;
    fetch(`http://www.omdbapi.com/?apikey=20cdd9eb&s=${valueSearch}`).then(response => response.json()).then(response => {
        const movies = response.Search;
        let cards = '';
        movies.forEach(movie => {
            cards += callMoviesComponent(movie);
        });
        console.log(cards)
        const moviesContainer = document.getElementById('movies-container');
        console.log(moviesContainer)
        moviesContainer.innerHTML = cards;

        let buttonTrigger = document.querySelectorAll('.modal-trigger');

        buttonTrigger.forEach(button => {
            button.addEventListener('click', function() {
                let id = this.dataset.imdbid;
                fetch(`http://www.omdbapi.com/?apikey=20cdd9eb&i=${id}`).then(response => response.json()).then(response => {
                    const modal = callModalComponent(response);
                    const detailContainer = document.getElementById('content-detail');
                    detailContainer.innerHTML = modal;
                })
            })
        })
        
        
    });
    console.log('ok')
    // let cards = callMoviesComponent(movies);
    // movies.Search.forEach(movie => {
    // })
    // moviesContainer.innerHTML = cards;
})


function getMovies(search) {
let movies = fetch(`http://www.omdbapi.com/?apikey=20cdd9eb&s=${search}`).then(response => response.json()).then(response => response);
    return movies;
}

// $('#search-box').on('submit', function (e) {
//     e.preventDefault();
//     searchMovies($('#search-input').val());
// });

function searchMovies(search) {


    console.log(search)
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=20cdd9eb&s=${search}`,
        success: result =>{
            console.log(result)
            const movies = result.Search;
            let cards = callMoviesComponent(movies);
            
            $('.movies-container').html(cards);
    
            $('.modal-trigger').on('click', function () {
                let id = $(this).data('imdbid');
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=20cdd9eb&i='+id,
                    success: result =>{
                        console.log(result)
                        const modal = callModalComponent(result);
                      $('#content-detail').html(modal);
                    },
                    error: (e) =>{
                        console.log(e)
                    }
                })
            })
        }, 
        error: (e) => {
            console.log(e.responseText)
        }
    })
    
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