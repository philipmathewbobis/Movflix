const imageUrl = "https://image.tmdb.org/t/p/original/";

const tvShowBtn = document.querySelector('#tvshows-btn')
const moviesBtn= document.querySelector('#movies-btn')
const animeBtn = document.querySelector('#anime-btn')
const MovieTitleSection = document.querySelector('#movie-section-title')

// Pagination buttons
const pagination1 = document.querySelector('#page-1')
const pagination2 = document.querySelector('#page-2')
const pagination3 = document.querySelector('#page-3')
const back = document.querySelector('#back')
const forward = document.querySelector('#forward')

let category = ''
let page = 0

window.onload = function () {
    displayMovies()
}

back.addEventListener('click', function () {
    if (page <= 1){
        console.log('Cannot back!!')
    }else {
        page -= 1
        addMoviesPage1(page)
        addTvShows1(page)
        addAnime1(page)
    }
})

forward.addEventListener('click', function () {
    if (page >= 1){
        page += 1
        addMoviesPage1(page)
        addTvShows1(page)
        addAnime1(page)
    }else {
        console.log('Cannot forward!!')
    }
})

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

pagination1.addEventListener('click', e => {
    addMoviesPage1(1)
    addTvShows1(1)
    addAnime1(1)
})

pagination2.addEventListener('click', e => {
    addMoviesPage2(2)
    addTvShows2(2)
    addAnime2(2)
})

pagination3.addEventListener('click', e => {
    addMoviesPage3(3)
    addTvShows3(3)
    addAnime3(3)
})

function displayMovies() {
    addNewMovies()
    MovieTitleSection.innerText = 'New Release Movies'
}

const addMoviesPage1 = async function (newPage){
    try {
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No movies found"
    }
}

const addMoviesPage2 = async function (newPage){
    try {
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No movies found"
    }
}

const addMoviesPage3 = async function (newPage){
    try {
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No movies found"
    }
}

const addTvShows1 = async function (newPage){
    try{
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No tvShows found"
    }
}

const addTvShows2 = async function (newPage){
    try{
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No tvShows found"
    }
}

const addTvShows3 = async function (newPage){
    try{
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No tvShows found"
    }
}

const addAnime1 = async function (newPage){
    try{
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No tvShows found"
    }
}

const addAnime2 = async function (newPage){
    try{
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No tvShows found"
    }
}

const addAnime3 = async function (newPage){
    try{
        page = newPage
        const moviesResponse = await pagination(page)
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
    }catch (err){
        return "No tvShows found"
    }
}

const addNewMovies = async function () {
    category = 'movies'
    page = 1
    const moviesResponse = await getCategory(category,page)
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
    category = 'tvshows'
    page = 1
    const moviesResponse = await getCategory(category,page)
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
    category = 'anime'
    page = 1
    const moviesResponse = await getCategory(category,page)
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

const getCategory = async function (category, page) {
    try {
        if (category.toLowerCase() === 'movies'){
            const moviesList = []
            const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=e02994a25ca108483463a8676f36b38d&language=en-US&page=${page}`)
            for (let i = 0;i < 8;i++){
                moviesList.push(response.data.results[i])
            }
            return moviesList
        }else if (category.toLowerCase() === 'tvshows'){
            const tvShows = []
            const reponse = await axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=e02994a25ca108483463a8676f36b38d&language=en-US&page=1")
            for (let i = 0;i < 8;i++){
                tvShows.push(reponse.data.results[i])
            }
            return tvShows
        }else if (category.toLowerCase() === 'anime'){
            const animes = []
            const response = await axios.get("https://api.themoviedb.org/3/search/tv?api_key=e02994a25ca108483463a8676f36b38d&query=anime")
            for (let i = 0;i < 5;i++){
                animes.push(response.data.results[i])
            }
            for (let i = 8;i < 12;i++){
                animes.push(response.data.results[i])
            }
            return animes
        }
    }catch (err){
        return "No category"
    }
}

const pagination = async function (page) {
    try {
        if (category.toLowerCase() === 'movies') {
            const moviesList = []
            const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=e02994a25ca108483463a8676f36b38d&language=en-US&page=${page}`)
            for (let i = 0;i < 8;i++){
                moviesList.push(response.data.results[i])
            }
            return moviesList
        }else if (category.toLowerCase() === 'tvshows') {
            const tvShows = []
            const reponse = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=e02994a25ca108483463a8676f36b38d&language=en-US&page=${page}`)
            for (let i = 0;i < 8;i++){
                tvShows.push(reponse.data.results[i])
            }
            return tvShows
        }else if (category.toLowerCase() === 'anime') {
            const animes = []
            const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=e02994a25ca108483463a8676f36b38d&query=anime&page=${page}`)
            for (let i = 0;i < 5;i++){
                animes.push(response.data.results[i])
            }
            for (let i = 8;i < 12;i++){
                animes.push(response.data.results[i])
            }
            return animes
        }
    }catch (err){
        return "No page found"
    }
}
