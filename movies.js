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

// Movies Card button
const allMovieCards = document.querySelectorAll('.movies')

// Modal button
const modal = document.querySelector('#modal')

let category = ''
let page = 0
let moviesResponse = []
let tvShowsResponse = []
let animeResponse = []

allMovieCards.forEach(movies => {
    movies.addEventListener('click', e => {
        if (category === 'movies') {
            // Find the title from the movie card
            const titleElement = movies.querySelector('.movie-title')
            const modalImg = modal.querySelector('img')
            const modalTitle = modal.querySelector('.movie-title')
            const movieOverview = modal.querySelector('#movie-overview')
            console.log(e)
            if (titleElement){
                const cardTitle = titleElement.innerText.trim()

                const matchingResponse = moviesResponse.find(response => response.title.trim().toLowerCase() === cardTitle.toLowerCase())

                if (matchingResponse){
                    console.log(`Match found: ${matchingResponse.title}`)
                    console.log(`Movie overview: ${matchingResponse.overview}`)
                    modalImg.setAttribute('src',`${imageUrl}${matchingResponse.poster_path}`)
                    modalTitle.innerText = matchingResponse.title
                    movieOverview.innerText = matchingResponse.overview
                    modal.classList.toggle('hidden')
                    modal.classList.toggle('fixed')
                }else {
                    console.log(`No match found`)
                }
            }else {
                console.log('No .movie-title element found in the movie card.');
            }
        }else if (category === 'tvshows') {
            // Find the title from the movie card
            const titleElement = movies.querySelector('.movie-title')
            const modalImg = modal.querySelector('img')
            const modalTitle = modal.querySelector('.movie-title')
            const movieOverview = modal.querySelector('#movie-overview')
            console.log(e)
            if (titleElement){
                const cardTitle = titleElement.innerText.trim()

                const matchingResponse = tvShowsResponse.find(response => response.name.trim().toLowerCase() === cardTitle.toLowerCase())

                if (matchingResponse){
                    console.log(`Match found: ${matchingResponse.title}`)
                    console.log(`Movie overview: ${matchingResponse.overview}`)
                    modalImg.setAttribute('src',`${imageUrl}${matchingResponse.poster_path}`)
                    modalTitle.innerText = matchingResponse.name
                    movieOverview.innerText = matchingResponse.overview
                    modal.classList.toggle('hidden')
                    modal.classList.toggle('fixed')
                }else {
                    console.log(`No match found`)
                }
            }else {
                console.log('No .movie-title element found in the movie card.');
            }
        }else if (category === 'anime') {
            // Find the title from the movie card
            const titleElement = movies.querySelector('.movie-title')
            const modalImg = modal.querySelector('img')
            const modalTitle = modal.querySelector('.movie-title')
            const movieOverview = modal.querySelector('#movie-overview')
            console.log(e)
            if (titleElement){
                const cardTitle = titleElement.innerText.trim()

                const matchingResponse = animeResponse.find(response => response.name.trim().toLowerCase() === cardTitle.toLowerCase())

                if (matchingResponse){
                    console.log(`Match found: ${matchingResponse.title}`)
                    console.log(`Movie overview: ${matchingResponse.overview}`)
                    modalImg.setAttribute('src',`${imageUrl}${matchingResponse.poster_path}`)
                    modalTitle.innerText = matchingResponse.name
                    movieOverview.innerText = matchingResponse.overview
                    modal.classList.toggle('hidden')
                    modal.classList.toggle('fixed')
                }else {
                    console.log(`No match found`)
                }
            }else {
                console.log('No .movie-title element found in the movie card.');
            }
        }
    })
})

modal.addEventListener('click', e => {
    if (e.target === modal){
        modal.classList.toggle('hidden')
        modal.classList.toggle('fixed')
    }
})

window.onload = function () {
    displayMovies()
}

back.addEventListener('click', function () {
    if (page <= 1){
        console.log('Cannot back!!')
    }else {
        page -= 1
        addMovies(page)
        addTvShows(page)
        addAnime(page)
    }
})

forward.addEventListener('click', function () {
    if (page >= 1){
        page += 1
        addMovies(page)
        addTvShows(page)
        addAnime(page)
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
    addMovies(1)
    addTvShows(1)
    addAnime(1)
})

pagination2.addEventListener('click', e => {
    addMovies(2)
    addTvShows(2)
    addAnime(2)
})

pagination3.addEventListener('click', e => {
    addMovies(3)
    addTvShows(3)
    addAnime(3)
})

function displayMovies() {
    addNewMovies()
    MovieTitleSection.innerText = 'New Release Movies'
}

const addMovies = async function (newPage){
    try {
        page = newPage
        moviesResponse = await pagination(page)
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

const addTvShows = async function (newPage){
    try{
        page = newPage
        tvShowsResponse = await pagination(page)
        const allMovieCardsImg = document.querySelectorAll('.movies img')
        const allMovieCardsTitle = document.querySelectorAll('.movies .movie-title')
        const allMovieCardsYear = document.querySelectorAll('.movies .year')
        const allMovieCardsRatings = document.querySelectorAll('.movies .ratings')

        for (let i = 0;i < tvShowsResponse.length;i++){
            const moviePoster = tvShowsResponse[i].poster_path
            const movieTitles = tvShowsResponse[i].title
            const releaseDate = tvShowsResponse[i].release_date
            const releaseYear = releaseDate.substring(0,4)
            const ratings = tvShowsResponse[i].vote_average
            allMovieCardsImg[i].setAttribute('src',`${imageUrl}${moviePoster}`)
            allMovieCardsTitle[i].innerText = movieTitles
            allMovieCardsYear[i].innerText = releaseYear
            allMovieCardsRatings[i].innerText = ratings
        }
    }catch (err){
        return "No tvShows found"
    }
}

const addAnime = async function (newPage){
    try{
        page = newPage
        animeResponse = await pagination(page)
        const allMovieCardsImg = document.querySelectorAll('.movies img')
        const allMovieCardsTitle = document.querySelectorAll('.movies .movie-title')
        const allMovieCardsYear = document.querySelectorAll('.movies .year')
        const allMovieCardsRatings = document.querySelectorAll('.movies .ratings')

        for (let i = 0;i < animeResponse.length;i++){
            const moviePoster = animeResponse[i].poster_path
            const movieTitles = animeResponse[i].name
            const releaseDate = animeResponse[i].first_air_date
            const releaseYear = releaseDate.substring(0,4)
            const ratings = animeResponse[i].vote_average
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
    moviesResponse = await getCategory(category,page)
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
    tvShowsResponse = await getCategory(category,page)
    const allMovieCardsImg = document.querySelectorAll('.movies img')
    const allMovieCardsTitle = document.querySelectorAll('.movies .movie-title')
    const allMovieCardsYear = document.querySelectorAll('.movies .year')
    const allMovieCardsRatings = document.querySelectorAll('.movies .ratings')

    for (let i = 0;i < tvShowsResponse.length;i++){
        const moviePoster = tvShowsResponse[i].poster_path
        const movieTitles = tvShowsResponse[i].name
        const releaseDate = tvShowsResponse[i].first_air_date
        const releaseYear = releaseDate.substring(0,4)
        const ratings = tvShowsResponse[i].vote_average
        allMovieCardsImg[i].setAttribute('src',`${imageUrl}${moviePoster}`)
        allMovieCardsTitle[i].innerText = movieTitles
        allMovieCardsYear[i].innerText = releaseYear
        allMovieCardsRatings[i].innerText = ratings
    }
}

const addNewAnimes = async function () {
    category = 'anime'
    page = 1
    animeResponse = await getCategory(category,page)
    const allMovieCardsImg = document.querySelectorAll('.movies img')
    const allMovieCardsTitle = document.querySelectorAll('.movies .movie-title')
    const allMovieCardsYear = document.querySelectorAll('.movies .year')
    const allMovieCardsRatings = document.querySelectorAll('.movies .ratings')

    for (let i = 0;i < animeResponse.length;i++){
        const moviePoster = animeResponse[i].poster_path
        const movieTitles = animeResponse[i].name
        const releaseDate = animeResponse[i].first_air_date
        const releaseYear = releaseDate.substring(0,4)
        const ratings = animeResponse[i].vote_average
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
