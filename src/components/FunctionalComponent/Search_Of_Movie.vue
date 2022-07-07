<script>
    import {mapState, mapGetters} from 'vuex'
    import Header_Links from '@/components/Header_Links'

    export default {
        name: "Search_Of_Movie",
        data() {
            return {
                searchField: '',
                isShowSearchForm: false,
                isShowLoader: false,
            }
        },
        methods: {
            findMovie(id) {
                this.isShowLoader = true
                this.isShowSearchForm = true
                this.$store.commit('clearMoviesFromSearchField', {module: 'header_navigation'})
                if (this.searchField.length === 0) return
                this.$store.dispatch('findMoviesByKeyword', {nameOfMovie: id})
            },
            hideFiledOfResult(event) {
                window.addEventListener('click', (event) => {
                    if (event.path.filter(e => {
                        if (e !== document && e !== window) {
                            if (e.hasAttribute('data-closeModal')) {
                                return true
                            }
                        }
                    }).length === 0) {
                        this.isShowSearchForm = false
                    }
                })
            },
            moveToMovie(id) {
                this.$router.push({name: 'Full-Item', params: {id: id}})
            },
        },
        computed: {
            ...mapState({
                moviesFromSearchField: state => state.header_navigation.moviesFromSearchField
            }),
            ...mapGetters(['getMoviesFromSearchField', 'getMostPossibleMoviesFromSearchField'])
        },
        mounted() {
            this.hideFiledOfResult()
        },
    }
</script>

<template>
	<div class="form-of-search"
		 @click="hideFiledOfResult($event)"
		 data-closeModal
	>
		<div class="form-of-search__input field-search"
			 :class="{'form-of-search_active' :isShowSearchForm}"
		>
			<input type="text"
				   class="field-search__input"
				   placeholder="Фильмы, сериалы"
				   v-model="searchField"
				   @click="isShowSearchForm = true"
				   @keyup.enter="findMovie(searchField)"
			>
			<button class="field-search__icon field-search__icon_filter"
					@click="$router.push({name: 'AdvancedSearch'})"
			>
				<svg class="search-form-submit-button__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
					 viewBox="0 0 18 18">
					<path fill-rule="evenodd"
						  d="M5.995 10.3A2.7 2.7 0 0 1 8.504 12H17v2H8.504a2.7 2.7 0 0 1-5.018 0H1v-2h2.486a2.7 2.7 0 0 1 2.509-1.7zm0 1.7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5.997-8.7A2.7 2.7 0 0 1 14.5 5H17v2h-2.5a2.7 2.7 0 0 1-5.017 0H1V5h8.483a2.7 2.7 0 0 1 2.509-1.7zm0 1.7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
				</svg>
			</button>
			<button class="field-search__icon"
					@click="findMovie(searchField)"
			>
				<svg class="search-form-submit-button__icon"
					 xmlns="http://www.w3.org/2000/svg"
					 width="18" height="18" viewBox="0 0 18 18">
					<path fill-rule="evenodd"
						  d="M12.026 10.626L16 14.6 14.6 16l-3.974-3.974a5.5 5.5 0 1 1 1.4-1.4zM7.5 11.1a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2z"></path>
				</svg>
			</button>
		</div>
		<TransitionGroup name="showSearchField">
			<div class="form-of-search__field-of-result field-of-result movies_wrapper"
				 v-if="isShowSearchForm"
			>
				<div class="movies">
					<template v-if="moviesFromSearchField.searchFilmsCountResult">
						<div
								v-if="getMostPossibleMoviesFromSearchField"
								class="movies__header"
						>
							<p>Возможно, вы искали</p>
						</div>
						<div class="movies__item movies-item"
							 @click="moveToMovie(getMostPossibleMoviesFromSearchField.filmId)"
						>
							<div class="movies-item__poster">
								<img :src="getMostPossibleMoviesFromSearchField.posterUrlPreview"
									 alt="Poster of Movie">
							</div>
							<div class="movies-item__info movie-item-info">
								<div class="movie-item-info__name">
									{{getMostPossibleMoviesFromSearchField.nameRu}}
								</div>
								<div class="movie-item-info__other-info item-info-other-info">
									<span class="item-info-other-info__rating">{{getMostPossibleMoviesFromSearchField.rating}}</span>
									<span class="item-info-other-info__origin-name"
										  v-if="getMostPossibleMoviesFromSearchField.nameEn">{{getMostPossibleMoviesFromSearchField.nameEn}}, </span>
									<span class="item-info-other-info__year">{{getMostPossibleMoviesFromSearchField.year}}</span>
								</div>
							</div>
						</div>
					</template>
					<template v-if="moviesFromSearchField.searchFilmsCountResult > 1">
						<div
								v-if="getMostPossibleMoviesFromSearchField"
								class="movies__header"
						>
							<p>Фильмы и сериалы</p>
						</div>
						<div class="movies__item movies-item"
							 v-if="getMoviesFromSearchField"
							 v-for="item in getMoviesFromSearchField"
							 @click="moveToMovie(item.filmId)"
						>
							<div class="movies-item__poster">
								<img :src="item.posterUrlPreview" alt="Poster of Movie">
							</div>
							<div class="movies-item__info movie-item-info">
								<div class="movie-item-info__name">{{item.nameRu}}</div>
								<div class="movie-item-info__other-info item-info-other-info">
									<span class="item-info-other-info__rating">{{item.rating}}</span>
									<span class="item-info-other-info__origin-name"
										  v-if="item.nameEn">{{item.nameEn}}, </span>
									<span class="item-info-other-info__year">{{item.year}}</span>
								</div>
							</div>
						</div>
					</template>

					<div
							class="movies_notify"
							v-if="moviesFromSearchField.searchFilmsCountResult === 0"
					>
						По вашему запросу ничего не найдено
					</div>
					<div
							class="movies_notify"
							v-if="moviesFromSearchField.length === 0"
					>
						Для поиска нажмите Enter
					</div>
					<button
							@click="$router.push({name: 'AdvancedSearch'})"
							class="btn movies__btn_show-all"
							v-if="moviesFromSearchField.searchFilmsCountResult > 0"
					>
						Показать всё
					</button>
					<div
							class="lds-ring_wrapper"
							v-if="!getMoviesFromSearchField && isShowLoader && searchField"
					>
						<div class="lds-ring">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</TransitionGroup>
	</div>
</template>

<style scoped lang="scss">
	$border-radius: 3px;

	.form-of-search {
		height: 27px;
		margin-left: 50px;

		position: relative;

		.field-search {
			position: relative;

			&__input {
				width: 400px;

				padding: 5px 10px;

				background-color: rgba(242, 242, 242, .15);

				color: white;
				font-family: 'Montserrat', sans-serif;
				font-size: 14px;

				border-radius: $border-radius;
				outline: none;
				border: none;

				&::placeholder {
					color: white;
					opacity: .7;
				}
			}

			&__icon {
				display: flex;
				align-items: center;

				position: absolute;
				top: 0;
				right: 5px;
				bottom: 0;

				svg {
					transition: fill .2s;

					fill: rgba(255, 255, 255, .6);
				}

				&:hover {
					svg {
						fill: white;
					}
				}

				&_filter {
					right: 30px;
				}
			}
		}

		&__field-of-result {
			position: absolute;
			top: 35px;
			z-index: 15;

			background-color: white;

			border-radius: $border-radius;
		}

		.form-of-search_active {
			.field-search__input {
				color: black;
				background-color: #f2f2f2;

				transition: background-color .2s;

				&::placeholder {
					color: #000;
				}
			}

			.field-search__icon {
				svg {
					fill: rgba(0, 0, 0, .4);
				}

				&:hover {
					svg {
						fill: rgba(0, 0, 0, .5);
					}
				}
			}
		}

		//Анимация для TransitionGroup
		.showSearchField-enter-active,
		.showSearchField-leave-active {
			transition: opacity 0.2s;
		}

		.showSearchField-enter-from,
		.showSearchField-leave-to {
			opacity: 0;
		}
	}

	.movies_wrapper {
	}

	.movies {
		position: relative;

		width: 400px;
		min-height: 150px;

		padding: 5px 0 40px;

		.movies__header {
			margin: 5px 0;
			padding: 0 15px;
		}

		.movies-item {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			padding: 10px 15px;

			text-align: left;

			transition: background-color .2s;

			cursor: pointer;

			&:hover {
				background-color: rgba(0, 0, 0, .03);
			}

			.movies-item__poster {
				width: 32px;
				height: 48px;

				margin-right: 25px;
			}

			.movies-item__info {
				overflow: hidden;

				display: flex;
				flex-direction: column;

				font-size: 15px;

				.movie-item-info__name {
					font-weight: 500;
					color: #333;
				}

				.movie-item-info__other-info {

					.item-info-other-info__rating {
						margin-right: 7px;

						font-weight: 500;
						color: #3bb33b;
					}

					.item-info-other-info__origin-name, .item-info-other-info__year {
						font-size: 12px;
						color: rgba(0, 0, 0, .6);
						font-weight: 500;
					}
				}
			}
		}

		.movies_notify {
			width: 100%;

			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			text-align: center;

			padding: 50px 15px;

			opacity: .6;
		}

		.movies__btn_show-all {
			position: absolute;
			bottom: 0;

			width: 100%;
			padding: 10px 15px;

			background-color: #f7f7f7;

			font-size: 13px;
			text-align: left;

			&:hover {
				background-color: #e6e6e6;
			}
		}
	}


	//Loader
	.lds-ring_wrapper {
		position: absolute !important;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		align-items: center;

		background-color: white;
	}

	.lds-ring {
		display: block;
		position: relative;

		width: 80px;
		height: 80px;

		margin: 0 auto;
	}

	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 2px solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #f60 transparent transparent transparent;
	}

	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}

	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}

	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

</style>