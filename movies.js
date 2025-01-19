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

// All cards to apply loading
const movieImgLoading = document.querySelectorAll('.movies .overflow-hidden')
const hdLoading = document.querySelectorAll('.movies h4')
const hideSvg = document.querySelectorAll('.movies svg')
const containerPVote = document.querySelectorAll('.movies .vote-average')
const allMovieImages = document.querySelectorAll('.movies img')
const allMovieTitle = document.querySelectorAll('.movies .movie-title')
const allMovieYear = document.querySelectorAll('.movies .year')
const voteAverage = document.querySelectorAll('.movies .ratings')


// the set of classes for loading if fetching the api failed
const loadingAnimation = {
    ImageLoading: {
        firstClass: 'bg-gray-600',
        secondClass: 'w-full',
        thirdClass: 'h-80'
    },
    TitleLoading: {
        firstClass: 'bg-gray-600',
        secondClass: 'w-40',
        thirdClass: 'h-7'
    },
    YearLoading: {
        firstClass: 'bg-gray-600',
        secondClass: 'w-9',
        thirdClass: 'h-7'
    }, //
    HdLoading: {
        firstClass: 'bg-gray-600',
        secondClass: 'w-14',
        thirdClass: 'h-8'
    },
    HdBorderRemove: {
        firstClass: 'border',
        secondClass: 'border-white',
        thirdClass: 'border-2',
    },
    VoteLoading: {
        firstClass: 'bg-gray-600',
        secondClass: 'w-14',
        thirdClass: 'h-8'
    },
    HideLike: 'hidden'
}

allMovieCards.forEach(movies => {
    movies.addEventListener('click', e => {
        if (category === 'movies') {
            // Find the title from the movie card
            const titleElement = movies.querySelector('.movie-title')
            const modalImg = modal.querySelector('img')
            const modalTitle = modal.querySelector('.movie-title')
            const movieOverview = modal.querySelector('#movie-overview')
            const yearP = modal.querySelector('.year')
            if (titleElement){
                const cardTitle = titleElement.innerText.trim()

                const matchingResponse = moviesResponse.find(response => response.title.trim().toLowerCase() === cardTitle.toLowerCase())

                if (matchingResponse){
                    const year = matchingResponse.release_date.substring(0,4)
                    modalImg.setAttribute('src',`${imageUrl}${matchingResponse.poster_path}`)
                    modalTitle.innerText = matchingResponse.title
                    movieOverview.innerText = matchingResponse.overview
                    yearP.innerText = year
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
            const yearP = modal.querySelector('.year')
            if (titleElement){
                const cardTitle = titleElement.innerText.trim()

                const matchingResponse = tvShowsResponse.find(response => response.name.trim().toLowerCase() === cardTitle.toLowerCase())

                if (matchingResponse){
                    const year = matchingResponse.first_air_date.substring(0,4)
                    modalImg.setAttribute('src',`${imageUrl}${matchingResponse.poster_path}`)
                    modalTitle.innerText = matchingResponse.name
                    movieOverview.innerText = matchingResponse.overview
                    yearP.innerText = year
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
            const yearP = modal.querySelector('.year')
            if (titleElement){
                const cardTitle = titleElement.innerText.trim()

                const matchingResponse = animeResponse.find(response => response.name.trim().toLowerCase() === cardTitle.toLowerCase())

                if (matchingResponse){
                    const year = matchingResponse.first_air_date.substring(0,4)
                    modalImg.setAttribute('src',`${imageUrl}${matchingResponse.poster_path}`)
                    modalTitle.innerText = matchingResponse.name
                    movieOverview.innerText = matchingResponse.overview
                    yearP.innerText = year
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
        moviesResponse = await getCategory(page)
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
        tvShowsResponse = await getCategory(page)
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
        animeResponse = await getCategory(page)
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
    try{
        moviesResponse = await getCategory(page)
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
        for (let i = 0;i < movieImgLoading.length;i++){
            // Remove all current text and image
            allMovieImages[i].setAttribute('src','')
            allMovieTitle[i].innerText = ''
            allMovieYear[i].innerText = ''
            hdLoading[i].innerText = ''
            hdLoading[i].classList.remove(loadingAnimation.HdBorderRemove.firstClass,loadingAnimation.HdBorderRemove.secondClass,loadingAnimation.HdBorderRemove.thirdClass)
            hideSvg[i].classList.add(loadingAnimation.HideLike)
            voteAverage[i].innerText = ''

            movieImgLoading[i].classList.add(loadingAnimation.ImageLoading.firstClass,loadingAnimation.ImageLoading.secondClass,loadingAnimation.ImageLoading.thirdClass)
            allMovieTitle[i].classList.add(loadingAnimation.TitleLoading.firstClass,loadingAnimation.TitleLoading.secondClass,loadingAnimation.TitleLoading.thirdClass)
            hdLoading[i].classList.add(loadingAnimation.HdLoading.firstClass,loadingAnimation.HdLoading.secondClass,loadingAnimation.HdLoading.thirdClass)
            allMovieYear[i].classList.add(loadingAnimation.YearLoading.firstClass,loadingAnimation.YearLoading.secondClass,loadingAnimation.YearLoading.thirdClass)
            containerPVote[i].classList.add(loadingAnimation.VoteLoading.firstClass,loadingAnimation.VoteLoading.secondClass,loadingAnimation.VoteLoading.thirdClass)
        }
    }
}

const addNewTvShows = async function () {
    category = 'tvshows'
    page = 1
    tvShowsResponse = await getCategory(page)
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
    animeResponse = await getCategory(page)
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

const getCategory = async function (page) {

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
            const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=e02994a25ca108483463a8676f36b38d&language=en-US&page=${page}`)
            for (let i = 0;i < 8;i++){
                tvShows.push(response.data.results[i])
            }
            return tvShows
        }else if (category.toLowerCase() === 'anime'){
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
        return "Failed fetching api" // return the set of classes for loading if fetching the api failed
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
        return loadingAnimation // return the set of classes for loading if fetching the api failed
    }
}
