<template>
	<section class="movie__wrapper">
		<div class="container user-container-movie">
			<div class="movie">
				<div class="movie__left col">
					<img :src="movieFullInfo.posterUrl" alt="Poster">
				</div>
				<div class="movie__main movie-info col">
					<div class="movie-info__header movie-info-header">
						<h1 class="movie-info-header__title">{{movieFullInfo.nameRu}} ({{movieFullInfo.year}})</h1>
						<h2 class="movie-info-header__subtitle">{{movieFullInfo.nameOriginal}}
							{{movieFullInfo.nameOriginal !==
							null ?
							`(${movieFullInfo.ratingAgeLimits})` : movieFullInfo.ratingAgeLimits}}</h2>
						<div class="movie-info-header__description">
							{{movieFullInfo.shortDescription}}
						</div>
						<a class="btn btn__link-to-kinopoisk"
						   :href="movieFullInfo.webUrl">Смотреть на "Кинопоиске"</a>
					</div>
					<h3>О фильме</h3>
					<div class="movie-info__about about_movie">
						<div class="table_row">
							<p class="table_col">
								Год производства
							</p>
							<div class="table_col">
								{{movieFullInfo.year}}
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Страна</p>
							<div class="table_col">
								<a v-for="country in movieFullInfo.countries">
									{{country.country}}
								</a>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Жанр</p>
							<div class="table_col">
								<a v-for="genre in movieFullInfo.genres">
									{{`${genre.genre}`}}
								</a>
							</div>
						</div>
						<div class="table_row" v-if="movieFullInfo.slogan">
							<p class="table_col">
								Слоган
							</p>
							<div class="table_col" style="color: rgba(255, 255, 255, 0.6)">
								«{{`${movieFullInfo.slogan}`}}»
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Режиссер</p>
							<div v-for="director in this.getDirector.slice(0,3)"
								 :key="director.staffId"
								 class="table_col">
								<a>{{director.nameRu}}</a>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Сценарий</p>
							<div v-for="writer in this.getWriters.slice(0,3)"
								 :key="writer.staffId"
								 class="table_col">
								<a>{{writer.nameRu}}</a>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Продюсер</p>
							<div v-for="producer in this.getProducers.slice(0,3)"
								 :key="producer.staffId"
								 class="table_col">
								<a>{{producer.nameRu}}</a>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Оператор</p>
							<div v-for="operator in this.getOperators.slice(0,3)"
								 :key="operator.staffId"
								 class="table_col">
								<a>{{operator.nameRu}}</a>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Композитор</p>
							<div v-for="composer in this.getComposer.slice(0,3)"
								 :key="composer.staffId"
								 class="table_col">
								<a>{{composer.nameRu.length === 0 ? composer.nameEn : composer.nameRu}},&nbsp</a>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Художник</p>
							<div v-for="design in this.getDesigner.slice(0,3)"
								 :key="design.staffId"
								 class="table_col">
								<a>{{design.nameRu}}</a>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Монтаж</p>
							<div v-for="editor in this.getEditors.slice(0,3)"
								 :key="editor.staffId"
								 class="table_col">
								<a>{{editor.nameRu}}</a>
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

						<div class="table_row">
							<p class="table_col">Возраст</p>
							<div class="table_col">
								<p>{{movieFullInfo.ratingAgeLimits}}</p>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Время</p>
							<div class="table_col">
								<p>{{movieFullInfo.filmLength}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="movie__right col">
					<div>
						<p>В главных ролях</p>
						<p v-for="actors in actorsMovie.slice(0,10)"
						   :key="actors.staffId"
						>
							<a>
								{{actors.nameRu}}
							</a>
						</p>
					</div>
				</div>
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
								:disabled="awards.total === 0 && tab.id === 2"
						>
							{{tab.name}}
						</button>
					</div>
					<div class="tabs__review">
						{{movieFullInfo.description}}
					</div>
				</div>
				<h3>Рейтинг фильма</h3>
				<div class="movie-other__rating rating">
					<div class="rating__user rating-user">
						<div
								class="rating-user__stars"
						>
							<div v-for="elem in ratingUser"
								 @mouseenter="clearClass"
								 :key="elem.id"
								 :class="{'chosen-rating': elem.id === Math.round(movieFullInfo.ratingKinopoisk)}"
								 class="rating-star"
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
						<button class="btn btn_make-review" style="color: black">Написать рецензию</button>
					</div>
					<div class="rating__critics critics">
						<div class="critics__kinopoisk">
							<p class="stong-text">{{movieFullInfo.ratingKinopoisk}}</p>
							<br>
							<p>{{movieFullInfo.ratingKinopoiskVoteCount}} оценок</p>
						</div>
						<div class="critics__imdb">
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
			</div>
		</div>
	</section>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'

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
                    {
                        id: 6,
                        name: 'Студии',
                    },
                    {
                        id: 7,
                        name: 'Связи',
                    },
                    {
                        id: 8,
                        name: 'Рецензии',
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
                ].reverse()
            }
        },
        methods: {},
        computed: {
            ...mapState(['movieFullInfo', 'actorsMovie', 'movieVideos', 'awards']),
            ...mapGetters(
                [
                    'getDirector',
                    'getComposer',
                    'getWriters',
                    'getProducers',
                    'getOperators',
                    'getDesigner',
                    'getEditors',
                ]
            ),
        },
        mounted() {

            //Loading info about movie from API
            this.$store.dispatch('loadOneMovie', this.$route.params.id)
            this.$store.dispatch('loadStaff', this.$route.params.id)
            this.$store.dispatch('loadTrailerAndVideos', this.$route.params.id)
            this.$store.dispatch('loadAwards', this.$route.params.id)

            let urlCDN = ['https://unpkg.com/@ungap/custom-elements-builtin', 'https://unpkg.com/x-frame-bypass']
            for (const url of urlCDN) {
                let scriptTag = document.createElement("script");
                scriptTag.src = url
                scriptTag.type = 'module'
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
        },
    }
</script>

<style scoped lang="scss">
	.user-container-movie {
		max-width: 1280px;
	}

	h1, h2, h3, h4 {
		font-size: 24px;
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
			width: 180px;
		}
	}

	/*Main info about movies*/

	.movie__wrapper {
		background-color: black;

		padding: 50px 0;
	}

	.movie {
		/*:style="{background: 'url(' + movieFullInfo.coverUrl + ') no-repeat', backgroundSize: 'contain'}"*/
		display: flex;
		justify-content: space-between;

		color: white;

		text-align: left;
		font-weight: 500;

		.movie__left {
			flex: 0 0 320px;
		}

		.movie-info {
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
		}

		.btn__link-to-kinopoisk {
			margin: 20px 0 40px;
			padding: 20px;
			border-radius: 30px;

			background-color: #f60;

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
		}

		p {
			color: rgba(255, 255, 255, .6);
		}
	}

	/*Other info about movie*/

	.movie-other__wrapper {
		padding: 50px 0;
	}

	.movie-other {
		background-color: #f5f6f6;

		text-align: left;

		.tabs {

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
				}
			}

			&__review {
				margin-bottom: 25px;
			}
		}

		h3 {
			margin-bottom: 15px;
		}

		.rating {
			display: flex;
			align-items: flex-start;

			&__user {
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				direction: rtl;

				margin-right: 50px;

				.rating-user__stars {
					display: flex;
					justify-content: space-between;

					width: 100%;
					margin-bottom: 15px;
				}

				.rating-star {
					display: inline-block;

					padding: 15px;
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
					&, & ~ .rating-star {
						color: black;

						svg {
							fill: #f60;
						}
					}
				}


				.btn_make-review {
					width: 100%;
					border: 1px solid rgba(0, 0, 0, .1);
					padding: 10px;

					&:hover {
						background-color: #e4e4e4;
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

		p {
			color: black;
		}
	}
</style>