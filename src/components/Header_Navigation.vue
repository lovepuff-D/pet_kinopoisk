<script>
    import {mapState, mapGetters} from 'vuex'
    import loader from "vue-ui-preloader";
    import Header_Links from '@/components/Header_Links'


    export default {
        name: "Header-Navigation",
        components: {
            Header_Links
        },
        data() {
            return {
                searchField: '',
                isShowSearchForm: false,
                isShowLoader: false,
                isShowHeaderLinks: false,
            }
        },
        props: {
            enableNavMenu: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            findMovie(id) {
                this.isShowLoader = true
                this.isShowSearchForm = true
                this.$store.commit('clearMoviesFromSearchField', {module: 'header_navigation'})
                if (this.searchField.length === 0) return
                this.$store.dispatch('findMovies', {nameOfMovie: id})
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
            }
        },
        computed: {
            ...mapGetters(['getMoviesFromSearchField'])
        },
        mounted() {
            this.hideFiledOfResult()
        },
    }
</script>

<template>

	<div class="header-navigation__wrapper">
		<div class="container">
			<header class="header-navigation">
				<button class="header-navigation__header-logo header-logo btn"
						@click="$router.push({name: 'Main'})"
						:class="{'black-background' : isShowHeaderLinks && enableNavMenu}"
						@mouseenter="isShowHeaderLinks = true"
						@mouseleave="isShowHeaderLinks = false"
				>
					<Header_Links
							v-if="isShowHeaderLinks && enableNavMenu"
							:darkStyleTheme="true"
					>
					</Header_Links>
					<button v-if="enableNavMenu"
							class="header-logo__burger-icon burger-button"
					>
						<span class="burger-icon">
						</span>
					</button>
					<span>LOVEPUFF</span>
				</button>
				<div class="header-navigation__my-links my-links">
					<a href="https://github.com/lovepuff-D" class="my-links__item btn">
						GitHub
					</a>
					<a href="https://t.me/lovepuff/" class="my-links__item btn">
						Telegram
					</a>
				</div>
				<div class="header-navigation__form-of-search form-of-search"
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
						<button class="field-search__icon"
								@click="findMovie(searchField)"
						>
							<svg class="styles_icon__1bYKL search-form-submit-button__icon"
								 xmlns="http://www.w3.org/2000/svg"
								 width="18" height="18" viewBox="0 0 18 18">
								<path fill-rule="evenodd"
									  d="M12.026 10.626L16 14.6 14.6 16l-3.974-3.974a5.5 5.5 0 1 1 1.4-1.4zM7.5 11.1a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2z"></path>
							</svg>
						</button>
					</div>
					<TransitionGroup name="showSearchField">
						<div class="form-of-search__field-of-result field-of-result movies"
							 v-if="isShowSearchForm"
						>
							<span v-if="getMoviesFromSearchField">Возможно, вы искали</span>
							<div class="lds-ring"
								 v-if="!getMoviesFromSearchField && isShowLoader && searchField"
							>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
							<div class="movies__item movies-item"
								 v-if="getMoviesFromSearchField"
								 v-for="item in getMoviesFromSearchField"
								 @click="$router.push({ name: 'Full-Item', params: { id: item.kinopoiskId}})"
							>
								<div class="movies-item__poster">
									<img :src="item.posterUrlPreview" alt="Poster of Movie">
								</div>
								<div class="movies-item__info movie-item-info">
									<div class="movie-item-info__name">{{item.nameRu}}</div>
									<div class="movie-item-info__other-info item-info-other-info">
										<span class="item-info-other-info__rating">{{item.ratingKinopoisk}}</span>
										<span class="item-info-other-info__origin-name"
											  v-if="item.nameOriginal">{{item.nameOriginal}}, </span>
										<span class="item-info-other-info__year">{{item.year}}</span>
									</div>
								</div>
							</div>
							<div class="movies_empty-reply"
							>
								По вашему запросу ничего не найдено
							</div>
						</div>
					</TransitionGroup>
				</div>
				<div class="header-navigation__profile profile"></div>
			</header>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";

	$border-radius: 3px;

	.header-navigation__wrapper {
		position: relative;
		z-index: 200;

		background-color: #1f1f1f;
	}

	.header-navigation {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		position: relative;
		//padding: 17px 25px;


		.header-logo {
			display: flex;
			justify-content: center;
			align-items: center;

			position: relative;

			width: 240px;
			padding: 17px 0;

			font-size: 30px;
			color: white;
			font-weight: 600;

			.burger-button {
				position: relative;

				display: flex;
				align-items: center;

				width: 32px;
				height: 32px;
				margin-right: 5px;

				.burger-icon {
					display: inline-block;

					position: absolute;

					width: 20px;
					height: 2px;

					background-color: #999999;

					&:before, &:after {
						content: "";
						display: block;

						position: absolute;
						z-index: 100;

						width: 20px;
						height: 2px;

						background-color: #999999;
					}

					&:before {
						top: 7px;
					}

					&:after {
						bottom: 7px;
					}
				}
			}
		}

		.my-links {
			margin-left: 15px;
			padding: 0 15px;

			&__item {
				color: white;

				transition: opacity .2s;
				opacity: .6;

				&:hover {
					opacity: 1;
				}

				&:not(:last-child) {
					margin-right: 15px;
				}
			}
		}

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
				}
			}

			&__field-of-result {
				position: absolute;
				top: 35px;
				z-index: 15;

				width: 400px;
				padding: 5px 0;
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

		.movies {
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

			.movies_empty-reply {
				text-align: center;

				padding: 50px 15px;

				opacity: .6;
			}
		}

		.profile {
			width: 42px;
			height: 42px;

			margin-left: auto;

			border-radius: 50%;

			background: url("data:image/svg+xml,%3csvg fill='none' width='48px' height='48px' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='%23777' fill-opacity='.4' d='M0 0h48v48H0z'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.819 11.643c-1.845 0-3.43.587-4.511 1.927-1.036 1.284-1.452 3.07-1.452 5.156 0 4.387 2.9 7.384 5.963 7.384 3.062 0 5.963-2.997 5.963-7.384 0-2.085-.416-3.871-1.452-5.155-1.08-1.34-2.666-1.928-4.511-1.928ZM14.34 34.068c.425.522 2.39 2.275 9.66 2.275s9.236-1.753 9.66-2.275a.434.434 0 0 0 .092-.32c-.091-.994-.984-5.874-9.752-5.874-8.767 0-9.66 4.88-9.75 5.874-.011.117.016.229.09.32Z' fill='%23fff' fill-opacity='.6'/%3e%3c/svg%3e") no-repeat center center;
		}

	}

	.black-background {
		background-color: #333;
	}

	//Loader
	.lds-ring {
		display: block;
		position: relative;

		width: 80px;
		height: 80px;

		margin: 50px auto 0;
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