<script>
    import {mapState, mapGetters} from 'vuex'

    import Movie_Reviews from '@/components/Movie_Reviews'

    //Import component loader
    import loaderFullscreen from '@/components/FunctionalComponent/Loader_Fullscreen'

    // Import Swiper Vue.js components
    import {Navigation, A11y} from 'swiper';
    import {Swiper, SwiperSlide} from 'swiper/vue';

    //Подключение компонента
    import DropDown_List from '@/components/FunctionalComponent/DropDown_List'

    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';

    export default {
        name: "Movie_Item-Full",
        data() {
            return {
                staff: [],
                director: '',
                composer: '',
                tabs: [
                    {
                        id: 1,
                        name: 'Обзор'
                    },
                    {
                        id: 2,
                        name: 'Награды',
                        src: 'Awards',
                    },
                    {
                        id: 3,
                        name: 'Премьеры',
                        src: 'Distributions',
                    },
                    {
                        id: 4,
                        name: 'Изображения',
                        src: 'Gallery',
                    },
                    {
                        id: 5,
                        name: 'Трейлеры',
                    },
                    /*{
                        id: 6,
                        name: 'Студии',
                    },
                    {
                        id: 7,
                        name: 'Связи',
                    },*/
                    {
                        id: 8,
                        name: 'Рецензии',
                        src: 'Reviews'
                    },
                ],
                ratingUser: [
                    {
                        id: 1,
                    },
                    {
                        id: 2,
                    },
                    {
                        id: 3,
                    },
                    {
                        id: 4,
                    },
                    {
                        id: 5,
                    },
                    {
                        id: 6,
                    },
                    {
                        id: 7,
                    },
                    {
                        id: 8,
                    },
                    {
                        id: 9,
                    },
                    {
                        id: 10
                    },
                ].reverse(),

                isResetStyleStarsRating: '',

                isLoadingPage: false,
                isShowFactsWrapper: false,
                isShowBloopersWrapper: false,
                isShowAllFacts: false,
                isShowAllBlooper: false,

                updateKey: 0,
            }
        },
        components: {
            Movie_Reviews,
            Swiper,
            SwiperSlide,
            DropDown_List,
            loaderFullscreen
        },
        setup() {
            const onSwiper = (swiper) => {
                //console.log(swiper);
            };
            const onSlideChange = () => {
                //console.log('slide change');
            };
            return {
                onSwiper,
                onSlideChange,
                modules: [Navigation, A11y],
            };
        },
        methods: {
            loadAPI(id) {
                this.$store.dispatch('loadOneMovie', {payload: id})
                this.$store.dispatch('loadStaff', id)
                this.$store.dispatch('loadSimilarMovies', id)
                this.$store.dispatch('loadFacts', id)

                //т.к api не пользоваляеть делать много запросов, делаем таймаут для последущих загрузок
                setTimeout(() => {
                    this.$store.dispatch('loadAwards', id)
                    this.$store.dispatch('loadDistributions', id)
                    this.$store.dispatch('loadImages', {payload: id,})
                }, 1100)
                //this.$store.dispatch('loadTrailerAndVideos', id)
            },
            moveToMovie(id) {
                this.$router.push({name: 'Full-Item', params: {id: id}})
                this.loadAPI(id)
            },
            moveToPerson(id) {
                this.$router.push({name: 'Person', params: {id: id}})
            },
            disableTabs(tab) {
                return ((this.awards.total === 0) && tab.id === 2)
                    || ((this.distributions.total === 0) && tab.id === 3)
                    || ((this.imagesOfMovie.total === 0) && tab.id === 4)
                    || ((this.reviews.total === 0) && tab.id === 8)
                    || tab.id === 5
            },
        },
        computed: {
            ...mapState(['movieFullInfo', 'actorsMovie', 'awards', 'distributions', 'imagesOfMovie']),
            ...mapState({
                reviews: state => state.movies_reviews.moviesReviews
            }),
            ...mapGetters(
                [
                    'getDirector',
                    'getComposer',
                    'getWriters',
                    'getProducers',
                    'getOperators',
                    'getDesigner',
                    'getEditors',
                    'getMovieFacts',
                    'getMovieBloop',
                ]
            ),
        },
        beforeMount() {
        },
        mounted() {
            /*setTimeout(() => {
                let a = document.querySelectorAll("button[data-film], button[data-name]")
                a.forEach(elem => {
                    elem.addEventListener('mouseover', (event) => {
                        if (event.target.dataset.film) {
                            this.$store.dispatch('loadOneMovie', {
                                payload: event.target.dataset.film.match(/\d/g).join(''),
                                loadType: 'hover'
                            })
                        }
                        if (event.target.dataset.name) {
                            this.$store.dispatch('loadOneStaff', {
                                payload: event.target.dataset.name.match(/\d/g).join(''),
                                loadType: 'hover'
                            })
                        }
                    })
                })

            }, 1000)*/

            //Loading info about movie from API
            this.loadAPI(this.$route.params.id)

            let urlCDN = ['https://unpkg.com/@ungap/custom-elements-builtin', 'https://unpkg.com/x-frame-bypass']
            for (const url of urlCDN) {
                let scriptTag = document.createElement("script");
                scriptTag.src = url
                scriptTag.type = 'module'
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
        },
        watch: {
            '$store.getters.getMovieFacts'(newValue, oldValue) {
                if (newValue.length) this.isShowFactsWrapper = true
            },
            '$store.getters.getMovieBloop'(newValue, oldValue) {
                if (newValue.length) this.isShowBloopersWrapper = true
            },
            '$store.state.movieFullInfo'(newValue, oldValue) {
                this.updateKey++
                newValue.length === 0 ? this.isLoadingPage = true : this.isLoadingPage = false
            },
            $route: {
                handler(to, from) {
                    //console.log(to, from, 'isWorking?')
                    if (to.name === 'Full-Item') {
                        this.loadAPI(this.$route.params.id)
                    }
                },
            },
        }
    }
</script>

<template>
	<Header-Navigation></Header-Navigation>

	<loaderFullscreen v-if="isLoadingPage"/>

	<section class="movie__wrapper">
		<div class="container user-container-movie">
			<div class="movie">
				<div class="movie__left col">
					<img :src="movieFullInfo.posterUrl" alt="Poster">
				</div>
				<div class="movie__main movie-info col">
					<div class="movie-info__header movie-info-header">
						<h1 class="movie-info-header__title">{{movieFullInfo.nameRu}} ({{movieFullInfo.year}})</h1>
						<h2 class="movie-info-header__subtitle">
							{{ movieFullInfo.nameOriginal }} {{ movieFullInfo.ratingAgeLimits }}
						</h2>
						<div class="movie-info-header__description">
							{{movieFullInfo.shortDescription}}
						</div>
						<a class="btn btn__link-to-kinopoisk"
						   :href="movieFullInfo.webUrl">Смотреть на "Кинопоиске"</a>
					</div>
					<h3>О фильме</h3>
					<div
							v-if="movieFullInfo.year"
							class="movie-info__about about_movie"
					>
						<div class="table_row">
							<p class="table_col">Год производства</p>
							<div class="table_col">
								{{movieFullInfo.year}}
							</div>
						</div>
						<div
								v-if="movieFullInfo.countries.length"
								class="table_row"
						>
							<p class="table_col">Страна</p>
							<div class="table_col">
								<template v-for="(country, index) in movieFullInfo.countries">
									<a>
										{{country.country}}
									</a>
									<span v-if="index < movieFullInfo.countries.length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div
								v-if="movieFullInfo.genres.length"
								class="table_row"
						>
							<p class="table_col">Жанр</p>
							<div class="table_col">
								<template v-for="(genre, index) in movieFullInfo.genres">
									<a>
										{{`${genre.genre}`}}
									</a>
									<span v-if="index < movieFullInfo.genres.length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row" v-if="movieFullInfo.slogan">
							<p class="table_col">
								Слоган
							</p>
							<div class="table_col" style="color: rgba(255, 255, 255, 0.6)">
								{{`«${movieFullInfo.slogan}»`}}
							</div>
						</div>
						<div
								v-if="getDirector.length"
								class="table_row"
						>
							<p class="table_col">Режиссер</p>
							<div class="table_col">
								<template v-for="(director, index) in this.getDirector.slice(0,3)"
										  :key="director.staffId"
								>
									<a @click="moveToPerson(director.staffId)">{{director.nameRu}}</a>
									<span v-if="index < this.getDirector.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div
								v-if="getWriters.length"
								class="table_row"
						>
							<p class="table_col">Сценарий</p>
							<div class="table_col">
								<template v-for="(writer, index) in this.getWriters.slice(0,3)"
										  :key="writer.staffId"
								>
									<a @click="moveToPerson(writer.staffId)">{{writer.nameRu}}</a>
									<span v-if="index < this.getWriters.slice(0,3).length - 1">,&nbsp</span>
								</template>

							</div>
						</div>
						<div
								v-if="getProducers.length"
								class="table_row"
						>
							<p class="table_col">Продюсер</p>
							<div class="table_col">
								<template v-for="(producer, index) in this.getProducers.slice(0,3)"
										  :key="producer.staffId"
								>
									<a @click="moveToPerson(producer.staffId)">{{producer.nameRu}}</a>
									<span v-if="index < this.getProducers.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div
								v-if="getOperators.length"
								class="table_row"
						>
							<p class="table_col">Оператор</p>
							<div class="table_col">
								<template v-for="(operator, index) in this.getOperators.slice(0,3)"
										  :key="operator.staffId"
								>
									<a @click="moveToPerson(operator.staffId)">{{operator.nameRu}}</a>
									<span v-if="index < this.getOperators.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div
								v-if="getComposer.length"
								class="table_row"
						>
							<p class="table_col">Композитор</p>
							<div class="table_col">
								<template v-for="(composer, index) in this.getComposer.slice(0,3)"
										  :key="composer.staffId"
								>
									<a @click="moveToPerson(composer.staffId)">{{composer.nameRu.length === 0 ?
										composer.nameEn : composer.nameRu}}</a>
									<span v-if="index < this.getComposer.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div
								v-if="getDesigner.length"
								class="table_row"
						>
							<p class="table_col">Художник</p>
							<div class="table_col">
								<template v-for="(design, index) in this.getDesigner.slice(0,3)"
										  :key="design.staffId"
								>
									<a @click="moveToPerson(design.staffId)">{{design.nameRu}}</a>
									<span v-if="index < this.getDesigner.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div
								v-if="getEditors.length"
								class="table_row"
						>
							<p class="table_col">Монтаж</p>
							<div class="table_col">
								<template v-for="(editor, index) in this.getEditors.slice(0,3)"
										  :key="editor.staffId"
								>
									<a @click="moveToPerson(editor.staffId)">{{editor.nameRu}}</a>
									<span v-if="index < this.getEditors.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>

						<!--<div class="table_row">
							<p class="table_col">Сборы в США</p>
							<div v-for="boxOffice in getBox"
								 :key="boxOffice.type"
								 class="table_col">
								<a>{{boxOffice.amount}}</a>
							</div>
						</div>-->

						<div class="table_row" v-if="movieFullInfo.ratingAgeLimits">
							<p class="table_col">Возраст</p>
							<div class="table_col">
								<p>{{movieFullInfo.ratingAgeLimits}}</p>
							</div>
						</div>
						<div
								v-if="movieFullInfo.filmLength"
								class="table_row"
						>
							<p class="table_col">Время</p>
							<div class="table_col">
								<p>{{movieFullInfo.filmLength}} мин. / ~ {{movieFullInfo.filmLength ?
									(movieFullInfo.filmLength / 60).toFixed(1) : ''}} ч.</p>
							</div>
						</div>
					</div>
				</div>
				<div class="movie__right col">
					<div class="list-of-person">
						<p class="list-of-person__header">В главных ролях</p>
						<div class="list-of-person__list list-of-person-list"
						>
							<a
									v-for="actors in actorsMovie.slice(0,10)"
									:key="actors.staffId"
									@click="this.$router.push({name: 'Person', params: {id: actors.staffId}})"
									class="list-of-person-list__item"
							>
								{{actors.nameRu}}
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="movie-background">
				<img :src="movieFullInfo.coverUrl ? movieFullInfo.coverUrl : ''"
					 alt="">
				<div class="movie-background__gradient"></div>
			</div>
		</div>
	</section>
	<section class="movie-other__wrapper">
		<div class="container user-container-movie">
			<div class="movie-other">
				<div class="tabs">
					<div class="tabs__link">
						<button
								v-for="tab in tabs"
								:key="tab.id"
								class="tab"
								@click="$router.push({name: tab.src, params: {id: movieFullInfo.kinopoiskId}})"
								:disabled="disableTabs(tab)"
						>
							{{tab.name}}
						</button>
					</div>
					<div class="tabs__review">
						{{movieFullInfo.description}}
					</div>
				</div>
				<div class="header">Рейтинг фильма</div>
				<div class="movie-other__rating rating">
					<div class="rating__user rating-user"
					>
						<div
								class="rating-user__stars"
						>
							<div v-for="elem in ratingUser"
								 :key="elem.id"
								 :class="{'chosen-rating': elem.id <= Math.round(movieFullInfo.ratingKinopoisk) && !isResetStyleStarsRating}"
								 class="rating-star"
								 @mouseenter="isResetStyleStarsRating = true"
								 @mouseleave="isResetStyleStarsRating = false"
							>
								<div>
									<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
										 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
										 viewBox="0 0 426.667 426.667"
										 style="enable-background:new 0 0 426.667 426.667;"
										 xml:space="preserve">
<polygon points="213.333,10.441 279.249,144.017 426.667,165.436 320,269.41 345.173,416.226 213.333,346.91
	81.485,416.226 106.667,269.41 0,165.436 147.409,144.017 "/>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
										<g>
</g>
</svg>
								</div>
								<div>
									{{elem.id}}
								</div>
							</div>
						</div>
						<Btn_Create_Reviews></Btn_Create_Reviews>
					</div>
					<div class="rating__critics critics">
						<div class="critics__kinopoisk">
							<p class="stong-text">{{movieFullInfo.ratingKinopoisk}}</p>
							<br>
							<p>{{movieFullInfo.ratingKinopoiskVoteCount}} оценок</p>
						</div>
						<div class="critics__imdb" v-if="movieFullInfo.ratingImdbVoteCount">
							<p>
								<span class="stong-text">
									Imdb: {{movieFullInfo.ratingImdb}}&nbsp
								</span>
								<span>
								{{movieFullInfo.ratingImdbVoteCount}} оценок
							</span>
							</p>
						</div>
					</div>
				</div>
				<div class="movie-other__similar similar-movies"
				>
					<template
							v-if="this.$store.state.similarMovies.total"
					>
						<button
								@click=""
								class="btn header header_link">
							Если вам понравился этот фильм
							<span style="margin-left: 8px;color: rgba(31,31,31,.4); font-weight: 500;">
							{{this.$store.state.similarMovies.total}}
						</span>
							<span class="arrow-right">
						</span>
						</button>
						<div class="similar-movies__carousel carousel">
							<button
									class="swiper-button-next">
							</button>
							<button
									class="swiper-button-prev">
							</button>
							<swiper
									:modules="modules"
									:slides-per-view="5"
									:space-between="20"
									:speed="500"
									:slidesPerGroup="4"
									:navigation="{
								    nextEl: '.swiper-button-next',
    								prevEl: '.swiper-button-prev',
								}"
									@swiper="onSwiper"
									@slideChange="onSlideChange"
							>
								<swiper-slide
										v-for="item in this.$store.state.similarMovies.items"
										:key="item.filmId"
										@click="moveToMovie(item.filmId)"
										class="carousel__item carousel-item"
								>
									<div class="carousel-item__img">
										<img :src="item.posterUrlPreview" alt="">
									</div>
									<span>{{item.nameRu}}</span>
									<span v-if="item.nameRu.length === 0">{{item.nameOriginal}}</span>
								</swiper-slide>
								<swiper-slide
										@click=""
										class="carousel__item carousel-item carousel-item_last-elem"
								>
									<span style="font-size: 36px;">{{this.$store.state.similarMovies.total}}</span>
									<span>всего</span>
								</swiper-slide>
							</swiper>
						</div>
					</template>
					<p
							class="header"
							v-else
					>
						Нет похожих фильмов
					</p>
				</div>
				<div class="movie-other__similar similar-movies"
					 v-if="!this.$store.state.similarMovies.total"
				>
				</div>
				<div class="movie-other__facts facts">
					<div class="facts">
						<DropDown_List
								:factsList="getMovieFacts"
								:bloopersList="getMovieBloop"
						>
						</DropDown_List>
					</div>
				</div>
				<div class="movie-other__reviews">
					<Movie_Reviews :key="updateKey"></Movie_Reviews>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">

	.user-container-movie {
		max-width: 1280px;
		box-shadow: none;
	}

	h1, h2, h3, h4 {
		font-size: 24px;
	}

	::v-deep {
		.header {
			display: flex;
			align-items: center;

			margin-bottom: 25px;
			padding: 0;

			font-size: 24px;
			font-weight: 700;
		}

		.header_link {
			&:hover {
				text-decoration: underline;
			}
		}

		.arrow-right {
			width: 32px;
			height: 32px;

			background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='%23000' opacity='0.3'%3E %3Cpath fill-rule='evenodd' d='M11.307 1.778L5.333 7.999 11.306 14.222 12.444 13.041 7.588 7.999 12.444 2.959z' transform='matrix(-1 0 0 1 17.778 0)'/%3E %3C/svg%3E") no-repeat center center;
		}
	}

	/*Таблица*/

	.table_row {
		display: flex;
		justify-content: flex-start;

		padding: 7px 0;

		&:not(:last-child) {
		}
	}

	.table_col {
		word-break: break-word;

		font-size: 15px;

		&:first-child {
			width: 30%;
		}

		&:last-child {
			width: 80%;
		}
	}

	/*Main info about movies*/

	.movie__wrapper {
		position: relative;

		background-color: black;

		padding: 50px 0;
	}

	.movie {
		/*:style="{background: 'url(' + movieFullInfo.coverUrl + ') no-repeat', backgroundSize: 'contain'}"*/
		display: flex;
		justify-content: space-between;

		//margin-top: 50px;

		position: relative;
		z-index: 5;

		color: white;

		text-align: left;
		font-weight: 500;

		.movie__left {
			flex: 0 0 320px;
		}

		.movie-info {
			width: 100%;

			.movie-info-header {
				&__title {
					margin-bottom: 15px;
					font-size: 40px;
				}

				&__subtitle {
					margin-bottom: 15px;

					font-size: 18px;
					font-weight: 500;
					color: rgba(255, 255, 255, .6);
				}

				&__description {
					margin-bottom: 15px;
				}
			}

			.about_movie {

				margin-top: 30px;
			}
		}

		.movie__right {
			flex: 0 0 220px;


			.list-of-person {
				font-size: 13px;

				&__header {
					font-size: 16px;

					margin-bottom: 15px;

					font-weight: 700;
				}

				&__list {

					.list-of-person-list__item {
						display: block;

						&:not(:last-child) {
							margin-bottom: 7px;
						}
					}
				}

			}

		}

		.btn__link-to-kinopoisk {
			margin: 20px 0 40px;
			padding: 20px;
			border-radius: 30px;

			background-color: #f60;

			color: white !important;

			&:hover {
				background-color: #f26100;
			}
		}


		//General styles for .movie
		.col {
			padding: 15px;
		}

		a {
			color: white;
			transition: color .1s;

			&:hover {
				color: #f60;
			}
		}

		p {
			color: rgba(255, 255, 255, .6);
		}
	}

	.movie-background {
		position: absolute;
		top: 0;
		left: 0;

		overflow: hidden;

		width: 100%;
		height: 100%;

		img {
			position: relative;
			z-index: 1;

			opacity: .2;
			object-fit: cover;
			object-position: top;
		}

		&__gradient {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2;


			background-image: linear-gradient(180deg, transparent 36%, #000 96%);

			@media screen and (max-width: 1280px) {
				background-image: linear-gradient(180deg, transparent 0%, #000 96%);
			}
		}
	}

	/*Other info about movie*/

	.movie-other__wrapper {
		background-color: white;
		padding: 50px 0;
	}

	.movie-other {
		$margin-for-original-block: 55px;

		//background-color: #f5f6f6;

		text-align: left;

		.tabs {
			margin-bottom: $margin-for-original-block;

			&__link {
				display: flex;
				justify-content: left;

				margin-bottom: 25px;

				button {
					font-size: 16px;
					padding: 10px 15px;

					border-bottom: 1px solid #f60;

					&:not(:last-child) {
						margin-right: 25px;
					}

					&:hover:not(:disabled) {
						color: #ff7316;
					}
				}
			}

			&__review {
				margin-bottom: 25px;
			}
		}

		.rating {
			display: flex;
			align-items: flex-start;

			margin-bottom: $margin-for-original-block;

			&__user {
				display: flex;
				align-items: center;
				flex-wrap: wrap;


				margin-right: 50px;

				.rating-user__stars {
					display: flex;
					justify-content: space-between;

					width: 100%;
					margin-bottom: 15px;

					direction: rtl;
				}

				.rating-star {
					display: inline-block;

					padding: 0 15px 15px;
					border-radius: 50%;

					color: rgba(190, 190, 190, 1);
					text-align: center;
					cursor: pointer;

					transition: color .3s;

					&:hover ~ .rating-star, &:hover {
						color: black;

						svg {
							fill: #f60;
						}
					}

					svg {
						transition: fill .3s;
						width: 50px;
						fill: rgba(190, 190, 190, .4);
					}
				}

				.chosen-rating {
					color: black;

					svg {
						fill: #f60;
					}

					&, & ~ .rating-star {
						color: black;

						svg {
							fill: #f60;
						}
					}
				}
			}

			.critics {
				display: flex;

				color: #777;

				&__kinopoisk {
					margin-right: 25px;

					.stong-text {
						font-size: 40px;
					}
				}

				&__imdb {
					align-self: flex-end;
				}

				.stong-text {
					color: #777;
					font-weight: 700;
				}
			}
		}

		.similar-movies {
			margin-bottom: $margin-for-original-block;

			.carousel {
				position: relative;

				&__item {
					cursor: pointer;

					.carousel-item__img {
						height: 350px;

						position: relative;

						margin-bottom: 10px;


						img {
							width: 100%;
							height: 350px;

							border-radius: 4px;
						}

						&::after {
							content: "";
							position: absolute;
							top: 0;
							left: 0;
							bottom: 0;
							right: 0;

							max-height: 350px;

							opacity: 0;
							transition: opacity .3s;
							background-color: black;

						}
					}

					&:hover {
						color: #f60;

						.carousel-item__img::after {
							opacity: .15;
						}
					}
				}

				.carousel-item_last-elem {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					height: 350px;

					background-color: #f7f7f7;

					color: rgba(31, 31, 31, .4);
					text-align: center;
					font-weight: 600;

					border-radius: 4px;

					transition: background-color .3s;

					&:hover {
						background-color: #f60;
						color: white;
					}
				}

				.swiper-button-next, .swiper-button-prev {
					width: 45px;
					height: 45px;

					top: 45%;

					border-radius: 50%;

					background-color: white;
					box-shadow: 0 4px 6px 0 rgb(0 0 0 / 5%), 0 1px 0 1px rgb(0 0 0 / 5%), 0 0 0 1px rgb(0 0 0 / 5%);
					transition: opacity .3s;

					&:hover {
						&::after {
							background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8px' height='14px' viewBox='0 0 8 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='%23000'%3E %3Cdefs/%3E %3Cg id='current' stroke='none' stroke-width='1' fill-rule='evenodd'%3E %3Cg id='ui' transform='translate(-633.000000, -2143.000000)'%3E %3Cg id='arrow' transform='translate(612.000000, 2126.000000)'%3E %3Cg transform='translate(15.000000, 15.000000)'%3E %3Cpolygon transform='translate(10.000000, 9.000000) scale(-1, 1) translate(-10.000000, -9.000000) ' points='12.72 2 6 8.99936126 12.7193846 16 14 14.6707729 8.53661538 8.99936126 14 3.32858837'/%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E");
						}
					}

					&::after {
						display: block;
						width: 100%;
						height: 100%;
						content: "";
						border-radius: 50%;
						background-color: #fff;
						background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width= '8px' height= '14px' viewBox= '0 0 8 14' version= '1.1' xmlns= 'http://www.w3.org/2000/svg' xmlns:xlink= 'http://www.w3.org/1999/xlink' fill= '%23666' %3E %3Cdefs/%3E %3Cg id= 'current' stroke= 'none' stroke-width= '1' fill-rule= 'evenodd' %3E %3Cg id= 'ui' transform= 'translate(-633.000000, -2143.000000)' %3E %3Cg id= 'arrow' transform= 'translate(612.000000, 2126.000000)' %3E %3Cg transform= 'translate(15.000000, 15.000000)' %3E %3Cpolygon transform= 'translate(10.000000, 9.000000) scale(-1, 1) translate(-10.000000, -9.000000) ' points= '12.72 2 6 8.99936126 12.7193846 16 14 14.6707729 8.53661538 8.99936126 14 3.32858837' /%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E");
						background-repeat: no-repeat;
						background-position: 50%;
					}
				}

				.swiper-button-next {
					right: -25px;
				}

				.swiper-button-prev {
					left: -25px;

					&::after {
						transform: rotate(-180deg);
					}
				}

				.swiper-button-disabled {
					opacity: 0;
				}
			}
		}

		.facts {

			margin-bottom: 60px;

			.facts-list {
				padding: 0;

				list-style: none;

				&__item {
					position: relative;

					padding: 16px 0 16px 24px;

					color: #393939;

					&::before {
						content: "";
						display: inline-block;

						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);

						width: 8px;
						height: 8px;

						border-radius: 50%;

						background-color: rgba(31, 31, 31, .4);
					}

					&:not(:first-child) {
						border-top: 1px solid rgba(31, 31, 31, .1);
					}
				}
			}

			.facts_show-all {
				display: flex;
				align-items: center;

				margin-bottom: 50px;
				padding: 5px 8px 5px 5px;

				background-color: rgba(242, 242, 242, .9);

				&::before {
					content: "";
					display: inline-block;

					width: 16px;
					height: 16px;

					margin-right: 5px;

					background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E %3Cg opacity='.9'%3E %3Cpath fill-rule='evenodd' d='M8 6.833L2.533 10.933 1.733 9.867 8 5.167 14.267 9.867 13.467 10.933z' opacity='.6' transform='matrix(1 0 0 -1 0 16)'/%3E %3C/g%3E %3C/svg%3E") no-repeat center center;
				}
			}
		}

		.reviews {

		}

		h3 {
			margin-bottom: 25px;
		}

		p {
			color: black;
		}
	}
</style>