import {createStore} from 'vuex'

export default createStore({
    state: () => ({
        movies: [],
        movieFullInfo: [],
        actorsMovie: [],
        movieVideos: [],

        moviesHover: [],
        stuffHover: [],

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

        similarMovies: [],

        listOfMonth: {
            0: [
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
            ],
            1: [
                'Января',
                'Февраля',
                'Марта',
                'Апреля',
                'Мая',
                'Июня',
                'Июля',
                'Августа',
                'Сентября',
                'Октября',
                'Ноября',
                'Декабря',
            ],
        }

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
            if (state.distributions.length !== 0) {
                return state.distributions.items.filter(e => {
                    if (e.type === 'WORLD_PREMIER' || e.type === 'PREMIERE') {
                        console.log(e)
                        //ревёрсим дату, вычисляем месяц
                        let fullDate = e.date.split(/-/).reverse().join('-')
                        let month = e.date.split(/-/).reverse()[1]
                        e.date = fullDate.replace(/-[\d]{2}/, '-' + state.listOfMonth[1][month - 1])
                        e.date = e.date.replace(/-/g, ' ')
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
            console.log(state.imagesOfMovie.totalPages)
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

        ADD_ONE_MOVIE(state, {payload, loadType}) {
            //console.log(payload, 'One film FULL INFO')
            if (loadType === 'hover') {
                state.moviesHover = payload
                console.log('state.moviesHover', state.moviesHover)
            }
            if (loadType === 'standard') {
                state.movieFullInfo = payload
                //Меняем формат ratingAgeLimits (standard "age16" to "16+")
                if (state.movieFullInfo.ratingAgeLimits) {
                    state.movieFullInfo.ratingAgeLimits = state.movieFullInfo.ratingAgeLimits.match(/\d.*/g) + '+'
                }
            }
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
            //console.log(payload, 'images type movie')
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

        ADD_SIMILAR_MOVIES(state, payload) {
            //console.log(payload, 'similar movies')
            state.similarMovies = payload
        },

    },
    actions: {
        //Поиск фильмов по параметрам
        async findMovies({commit}, {nameOfMovie, order = 'NUM_VOTE'}) {
            //Добавляет аборт, если пользователь ввёл новый текст и ещё раз нажал на поиск

            let abortFetch = new AbortController();
            //console.log(abortFetch, 'abort')

            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=${order}&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${nameOfMovie}`
            //console.log(url)

            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
                signal: abortFetch.signal
            })
            commit('addToMoviesFromSearchField', await response.json(), {module: 'header_navigation'})
        },

        //По умолчанию топ фильмы
        async loadMovies({commit}, {payload, page}) {
            let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=' + payload + '&page=' + page
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_MOVIES', await response.json())
        },

        //По умолчанию топ фильмы без записи в state
        async loadTopOfMovies({commit}, {payload, page}) {
            let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=' + payload + '&page=' + page
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            return await response.json()
        },

        //Загрузка инф-и по одному фильму
        async loadOneMovie({state, commit}, {payload, loadType = 'standard'}) {
            state.movieFullInfo = []
            let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/' + payload
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_ONE_MOVIE', {
                payload: await response.json(),
                loadType: loadType
            })
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

        //Get bio about person
        async loadOneStaff({commit}, {payload, loadType = 'standard'}) {
            let url = `https://kinopoiskapiunofficial.tech/api/v1/staff/${payload}`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_ONE_ACTORS', {
                payload: await response.json(),
                loadType: loadType
            }, {module: ['person']})
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


        //Похожие фильмы
        async loadSimilarMovies({commit}, payload) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/similars`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_SIMILAR_MOVIES', await response.json())
        },

        //Список фактов и ляпов
        async loadFacts({commit, dispatch}, payload) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/facts`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_FACTS', await response.json(), {module: 'movies_facts'})
        },

        //Список рецензий от пользователей
        async loadReviews({commit}, {payload, page = 1}) {
            let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${payload}/reviews?page=${page}&order=USER_POSITIVE_RATING_DESC`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '92e8d301-bae3-4836-9132-48a28441ad97',
                    'Content-Type': 'application/json',
                },
            })
            commit('ADD_REVIEWS', await response.json(), {module: 'movies_reviews'})
        },
    },
    modules: {
        header_navigation: {
            state: () => ({
                moviesFromSearchField: [],
            }),
            mutations: {
                addToMoviesFromSearchField(state, payload) {
                    state.moviesFromSearchField = payload
                },
                clearMoviesFromSearchField(state) {
                    state.moviesFromSearchField = []
                }
            },
            actions: {},
            getters: {
                getMoviesFromSearchField(state) {
                    //console.log(state.moviesFromSearchField.items)
                    return state.moviesFromSearchField.items
                }
            }
        },
        movies_facts: {
            state: () => ({
                moviesFacts: [],
            }),
            mutations: {
                ADD_FACTS(state, payload) {
                    //console.log(payload, 'Список фактов и ляпов')
                    payload.items.map(e => {
                        //Замена <a> на <button> + добавление атрибута data
                        let f = e.text.match(/film\/\d+/g)
                        //console.log('f', f)
                        let n = e.text.match(/name\/\d+/g)
                        //console.log('n', n)
                        if (f !== null) {
                            //console.log(f)
                            e.text = e.text.replace(/href/g,
                                `data-film`
                            )
                            e.text = e.text.replace(/<a/g,
                                `<button`
                            )
                        }
                        if (n !== null) {
                            //console.log(f)
                            e.text = e.text.replace(/href/g,
                                `data-name`
                            )
                            e.text = e.text.replace(/<a/g,
                                `<button`
                            )
                        }

                        e.text = e.text.replace(/<\/a>/g, '</button>')
                    })
                    state.moviesFacts = payload
                },
            },
            actions: {},
            getters: {
                getMovieFacts: (state) => {
                    //console.log(state.moviesFacts, 'getter')
                    if (state.moviesFacts.length !== 0) {
                        return state.moviesFacts.items.filter(e => e.type === 'FACT')
                    }
                },
                getMovieBloop: (state) => {
                    //console.log(state.moviesFacts, 'getter')
                    if (state.moviesFacts.length !== 0) {
                        return state.moviesFacts.items.filter(e => e.type === 'BLOOPER')
                    }
                },
            }
        },
        movies_reviews: {
            state: () => ({
                moviesReviews: [],
            }),
            mutations: {
                ADD_REVIEWS(state, payload) {
                    payload.items.forEach(e => {
                        e.disableBtnLikes = false
                        e.disableBtnDislikes = false
                    })
                    state.moviesReviews = payload
                },
                UPDATE_POSITIVE_LIKES(state, {payload, increment = true}) {
                    //payloads = id
                    //console.log(payload, 'Список рецензий')
                    if (increment) {
                        state.moviesReviews.items.find(e => e.kinopoiskId === payload).positiveRating++
                    } else {
                        state.moviesReviews.items.find(e => e.kinopoiskId === payload).positiveRating--
                    }


                },
                UPDATE_NEGATIVE_LIKES(state, {payload, increment = true}) {
                    //payloads = id
                    //console.log(payload, 'Список рецензий')
                    if (increment) {
                        state.moviesReviews.items.find(e => e.kinopoiskId === payload).negativeRating++
                    } else {
                        state.moviesReviews.items.find(e => e.kinopoiskId === payload).negativeRating--
                    }
                },
            },
            actions: {},
            getters: {
                getReviews(state, getters, rootState) {
                    if (state.moviesReviews.length !== 0) {
                        //console.log(state.moviesReviews)
                        state.moviesReviews.items.forEach(e => {
                            e.description = e.description.replace(/(\r\n\r\n)/g, ' <br> <br> ')
                            //функция для форматирования даты рецензии
                            e.date = e.date.replace(/T/g, '-в-')
                            let data = e.date.split(/[-]/g)
                            let [a, b] = [data[0], data[2]]
                            data[0] = b
                            data[2] = a
                            data[1] = rootState.listOfMonth[1][data[1] - 1]
                            data = data.join(' ')
                            data = data.split(':').splice(0, data.split(':').length - 1).join(':')
                            e.date = data
                        })
                        return state.moviesReviews.items
                    }
                },
                getPaginationForReviews(state) {
                    if (state.moviesReviews.length !== 0) {
                        return state.moviesReviews.totalPages
                    }
                }
            }
        },
        module_person: {
            state: () => ({
                person: [],
            }),
            mutations: {
                ADD_ONE_ACTORS(state, {payload, loadType}) {
                    //console.log(payload, 'One staff')
                    if (loadType === 'hover') {
                        state.person = payload
                        //console.log('hover person', state.stuffHover)
                    }
                    if (loadType === 'standard') {
                        //console.log(payload)
                        state.person = payload
                    }
                },
            },
            actions: {},
            getters: {
                getGrowth(state) {
                    if (state.person.length !== 0) {
                        let a = String(state.person.growth).split('')
                        a.splice(1, 0, '.')
                        return a.join('')
                    }
                },
                getBirthday(state, getters, rootState) {
                    if (state.person.length !== 0) {
                        let string = state.person.birthday
                        let fullDate = string.split(/-/).reverse().join('-')
                        let month = string.split(/-/).reverse()[1]
                        string = fullDate.replace(/-[\d]{2}/, '-' + rootState.listOfMonth[1][month - 1])
                        string = string.replace(/-/g, ' ')
                        return string
                    }
                },
                getSortedBestFilms(state) {
                    if (state.person.length !== 0) {
                        return state.person.films.filter(e => e.professionKey === 'ACTOR').sort((a, b) => b.rating - a.rating).slice(0, 10)
                    }
                },
                getCountOfMovies(state) {
                    if (state.person.length !== 0) {
                        return state.person.films.length
                    }
                }
            }
        }
    }
})

const moduleOneMovie = {}