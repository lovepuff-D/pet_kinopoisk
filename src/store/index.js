import {createStore} from 'vuex'

export default createStore({
    state: () => ({
        movies: [],
        movieFullInfo: [],
        actorsMovie: [],
        movieVideos: [],
        /*boxOffice: [],*/
        awards: [],
        distributions: [],

        imagesOfMovie: [],
        typeImages: [
            {typeEng: 'STILL', typeRu: 'Кадры', total: 0},
            {typeEng: 'SHOOTING', typeRu: 'Съёмки', total: 0},
            {typeEng: 'POSTER', typeRu: 'Постеры', total: 0},
            {typeEng: 'FAN_ART', typeRu: 'Фан-арт', total: 0},
            {typeEng: 'PROMO', typeRu: 'Промо', total: 0},
            {typeEng: 'CONCEPT', typeRu: 'Концепт', total: 0},
            {typeEng: 'WALLPAPER', typeRu: 'Обои', total: 0},
            {typeEng: 'COVER', typeRu: 'Обложки', total: 0},
            {typeEng: 'SCREENSHOT', typeRu: 'Скриншоты', total: 0},
        ],
        firstKnownTypeImage: '', //Используется для проставления активного таба в компоненте AboutMoviesGallery
    }),
    getters: {
        getDirector(state) {
            //console.log(state.actorsMovie, 'isWorking getDirector')
            return state.actorsMovie.filter(staff => staff.professionKey.toLowerCase() === 'director')
        },
        getComposer(state) {
            //console.log(state.actorsMovie, 'isWorking getComposer')
            return state.actorsMovie.filter(staff => staff.professionKey.toLowerCase() === 'composer')
        },
        getWriters(state) {
            //console.log(state.actorsMovie, 'isWorking getComposer')
            return state.actorsMovie.filter(staff => staff.professionKey.toLowerCase() === 'writer')
        },
        getProducers(state) {
            //console.log(state.actorsMovie, 'isWorking getComposer')
            return state.actorsMovie.filter(staff => staff.professionKey.toLowerCase() === 'producer')
        },
        getOperators(state) {
            //console.log(state.actorsMovie, 'isWorking getComposer')
            return state.actorsMovie.filter(staff => staff.professionKey.toLowerCase() === 'operator')
        },
        getDesigner(state) {
            //console.log(state.actorsMovie, 'isWorking getComposer')
            return state.actorsMovie.filter(staff => staff.professionKey.toLowerCase() === 'design')
        },
        getEditors(state) {
            //console.log(state.actorsMovie, 'isWorking getComposer')
            return state.actorsMovie.filter(staff => staff.professionKey.toLowerCase() === 'editor')
        },

        /*getBoxOffice(state, getters) {
            console.log(state.boxOffice, 'boxOffice')
            return state.boxOffice
        },*/

        //Награды
        getAwards(state) {
            if (state.awards.length !== 0) {
                let type = state.awards.items.sort((a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                })
                type = type.map((e) => {
                    return e.name
                })
                type = type.filter((e, i) => {
                    return type.indexOf(e) === i
                })
                type = type.reduce((acc, curr) => {
                    return type.reduce((acc, curr) => (acc[curr] = [], acc), {});
                })
                for (let key in type) {
                    type[key] = state.awards.items.filter(e => {
                        return e.name === key
                    })
                }
                return type
            }
        },

        //Дата Премьеры
        getDistributions(state) {
            let arr = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ]
            if (state.distributions.length !== 0) {
                return state.distributions.items.filter(e => {
                    if (e.type === 'WORLD_PREMIER' || e.type === 'PREMIERE') {
                        //ревёрсим дату, вычисляем месяц
                        let fullDate = e.date.split(/-/).reverse().join('-')
                        let month = e.date.split(/-/).reverse()[1]
                        e.date = fullDate.replace(/-[\d]{2}/, '-' + arr[month - 1])
                        //console.log(e.date)
                        return true
                    }
                })
            }
        },

        getImages(state) {
            if (state.imagesOfMovie.length !== 0) {
                return state.imagesOfMovie.items
            }
        },

        getTypeImages: (state) => {
            return state.typeImages.filter(e => e.total !== 0)
        },
        //
        getOneTypeImages: (state) => {
            return state.typeImages.find(e => e.total !== 0)
        },

        getPaginationForGallery: (state) => {
            return state.imagesOfMovie.totalPages
        },
    },
    mutations: {
        ADD_MOVIES(state, payload) {
            //Обращаемся к .films, для получения item'ов
            //console.log(payload.films, 'mutation-payload')
            //console.log(payload.films[0], 'One film')
            state.movies = payload.films
        },

        ADD_ONE_MOVIE(state, payload) {
            //console.log(payload, 'One film FULL INFO')
            state.movieFullInfo = payload
        },

        ADD_ACTORS(state, payload) {
            //console.log(payload, 'Actors from movie')
            state.actorsMovie = payload
        },

        ADD_VIDEOS(state, payload) {
            //console.log(payload, 'Videos from movie')
            state.movieVideos = payload
        },

        /*ADD_BOX_OFFICE(state, payload) {
            //console.log(payload.items, 'BoxOffice')
            state.boxOffice = payload.items
        },*/

        ADD_AWARDS_MOVIE(state, payload) {
            //console.log(payload, 'Awards movie')
            state.awards = payload
        },

        ADD_DISTRIBUTIONS_MOVIE(state, payload) {
            //console.log(payload, 'distribution movie')
            state.distributions = payload
        },

        ADD_IMAGES_MOVIE(state, payload) {
            //console.log(payload, 'images movie')
            state.imagesOfMovie = payload
        },

        ADD_TYPE_IMAGES_MOVIE(state, {payload, type}) {
            //console.log(payload, 'images movie')
            //Скрипт для вывода не пустого массива с картинками, при первой загрузке
            if (state.imagesOfMovie.length === 0) {
                if (payload.total !== 0) {
                    state.imagesOfMovie = payload
                    state.firstKnownTypeImage = type
                }
            }
            //---
            state.typeImages.find(e => e.typeEng === type).total = payload.total
            //console.log(state.typeImages)
        },


    },
    actions: {
        //По умолчанию топ фильмы
        async loadMovies(contex, {payload, page}) {
            let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=' + payload + '&page=' + page
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            contex.commit('ADD_MOVIES', await response.json())
        },

        //Загрузка инф-и по одному фильму
        async loadOneMovie({state, commit}, payload) {
            let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/' + payload
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_ONE_MOVIE', await response.json())
        },

        //Staff который работал над фильмом
        async loadStaff({commit}, payload) {
            let url = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${payload}`
            //console.log(url, 'url loadStaff')
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_ACTORS', await response.json())
        },

        //Загрузка трейлеров и видео
        async loadTrailerAndVideos({commit}, payload) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/videos`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_VIDEOS', await response.json())
        },

        /*async loadBoxOffice({commit}, payload) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/box_office`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_BOX_OFFICE', await response.json())
        },*/

        //Награды
        async loadAwards({commit}, payload) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/awards`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_AWARDS_MOVIE', await response.json())
        },

        //Премьеры
        async loadDistributions({commit}, payload) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/distributions`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_DISTRIBUTIONS_MOVIE', await response.json())
        },

        //Типы изображений фильма
        async loadTypeImages({commit, state}, payload) {
            let typeImages = [
                'STILL',
                'SHOOTING',
                'POSTER',
                'FAN_ART',
                'PROMO',
                'CONCEPT',
                'WALLPAPER',
                'COVER',
                'SCREENSHOT',
            ]

            for (let type of typeImages) {
                let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/images?type=${type}`
                //console.log(url)
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                        'Content-Type': 'application/json',
                    },
                })
                commit('ADD_TYPE_IMAGES_MOVIE', {payload: await response.json(), type: type})
            }
        },

        //Изображения фильма
        async loadImages({commit, state}, {payload, type = 'STILL', page = 2}) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/images?type=${type}&page=${page}`
            //console.log(url)
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_IMAGES_MOVIE', await response.json())
        },

    },
    modules: {}
})

const moduleOneMovie = {}