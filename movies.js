const imageUrl = "https://image.tmdb.org/t/p/original/";

const tvShowBtn = document.querySelector('#tvshows-btn')
const moviesBtn= document.querySelector('#movies-btn')
const animeBtn = document.querySelector('#anime-btn')
const MovieTitleSection = document.querySelector('#movie-section-title')

window.onload = function () {
    displayMovies()
}

tvShowBtn.addEventListener('click', e => {
    const titleSection = document.querySelector('#section-movies-title')
    addNewTvShows()
    MovieTitleSection.innerText = 'Tv Shows'
    titleSection.classList.add('2xl:space-x-[750px]')
})

moviesBtn.addEventListener('click', e => {
    const titleSection = document.querySelector('#section-movies-title')
    displayMovies()
    titleSection.classList.remove('2xl:space-x-[750px]')
})

animeBtn.addEventListener('click', e => {
    const titleSection = document.querySelector('#section-movies-title')
    addNewAnimes()
    MovieTitleSection.innerText = 'Anime'
    titleSection.classList.add('2xl:space-x-[750px]')
})

function displayMovies() {
    addNewMovies()
    MovieTitleSection.innerText = 'New Release Movies'
}

const addNewMovies = async function () {
    const moviesResponse = await getNewMovies()
    const allMovieCardsImg = document.querySelectorAll('.movies img')
    const allMovieCardsTitle = document.querySelectorAll('.movies .movie-title')
    const allMovieCardsYear = document.querySelectorAll('.movies .year')
    const allMovieCardsRatings = document.querySelectorAll('.movies .ratings')

    for (let i = 0;i < moviesResponse.length;i++){
        const moviePoster = moviesResponse[i].poster_path
        const movieTitles = moviesResponse[i].title
        const releaseDate = moviesResponse[i].release_date
        const releaseYear = releaseDate.substring(0,4)
        const ratings = moviesResponse[i].vote_average
        allMovieCardsImg[i].setAttribute('src',`${imageUrl}${moviePoster}`)
        allMovieCardsTitle[i].innerText = movieTitles
        allMovieCardsYear[i].innerText = releaseYear
        allMovieCardsRatings[i].innerText = ratings
    }
}

const addNewTvShows = async function () {
    const moviesResponse = await getTopRatedTvShows()
    const allMovieCardsImg = document.querySelectorAll('.movies img')
    const allMovieCardsTitle = document.querySelectorAll('.movies .movie-title')
    const allMovieCardsYear = document.querySelectorAll('.movies .year')
    const allMovieCardsRatings = document.querySelectorAll('.movies .ratings')

    for (let i = 0;i < moviesResponse.length;i++){
        const moviePoster = moviesResponse[i].poster_path
        const movieTitles = moviesResponse[i].name
        const releaseDate = moviesResponse[i].first_air_date
        const releaseYear = releaseDate.substring(0,4)
        const ratings = moviesResponse[i].vote_average
        allMovieCardsImg[i].setAttribute('src',`${imageUrl}${moviePoster}`)
        allMovieCardsTitle[i].innerText = movieTitles
        allMovieCardsYear[i].innerText = releaseYear
        allMovieCardsRatings[i].innerText = ratings
    }
}

const addNewAnimes = async function () {
    const moviesResponse = await getAnime()
    const allMovieCardsImg = document.querySelectorAll('.movies img')
    const allMovieCardsTitle = document.querySelectorAll('.movies .movie-title')
    const allMovieCardsYear = document.querySelectorAll('.movies .year')
    const allMovieCardsRatings = document.querySelectorAll('.movies .ratings')

    for (let i = 0;i < moviesResponse.length;i++){
        const moviePoster = moviesResponse[i].poster_path
        const movieTitles = moviesResponse[i].name
        const releaseDate = moviesResponse[i].first_air_date
        const releaseYear = releaseDate.substring(0,4)
        const ratings = moviesResponse[i].vote_average
        allMovieCardsImg[i].setAttribute('src',`${imageUrl}${moviePoster}`)
        allMovieCardsTitle[i].innerText = movieTitles
        allMovieCardsYear[i].innerText = releaseYear
        allMovieCardsRatings[i].innerText = ratings
    }
}

const getNewMovies = async function () {
    try {
        const moviesList = []
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=e02994a25ca108483463a8676f36b38d&language=en-US&page=1")
        for (let i = 0;i < 8;i++){
            moviesList.push(response.data.results[i])
        }
        return moviesList
    }catch (err) {
        return "No movies found";
    }
}

const getTopRatedTvShows = async function (){
    try{
        const tvShows = []
        const reponse = await axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=e02994a25ca108483463a8676f36b38d&language=en-US&page=1")
        for (let i = 0;i < 8;i++){
            tvShows.push(reponse.data.results[i])
        }
        return tvShows
    }catch (err){
        return "No Tv Shows found"
    }
}

const getAnime = async function () {
    try{
        const animes = []
        const response = await axios.get("https://api.themoviedb.org/3/search/tv?api_key=e02994a25ca108483463a8676f36b38d&query=anime")
        for (let i = 0;i < 5;i++){
            animes.push(response.data.results[i])
        }
        for (let i = 8;i < 12;i++){
            animes.push(response.data.results[i])
        }
        return animes
    }catch (err) {
        return "No Anime found"
    }
}

