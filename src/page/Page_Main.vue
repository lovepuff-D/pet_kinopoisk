<script>
    import {defineAsyncComponent} from 'vue'
    import Header_Links from '@/components/Header_Links'

    export default {
        name: "Main_Page",
        data() {
            return {
                listOfPopular: [],
                listOfBest: [],
                listOfAwait: [],
            }
        },
        components: {
            Header_Links,
        },
        methods: {
            filterMovies(filterName) {
                this.$store.dispatch('loadTopOfMovies', {payload: 'TOP_100_POPULAR_FILMS', page: 1})
                this.$store.dispatch('loadTopOfMovies', {payload: 'TOP_250_BEST_FILMS', page: 1})
                this.$store.dispatch('loadTopOfMovies', {payload: 'TOP_AWAIT_FILMS', page: 1})
            }
        },
        mounted() {
        },
        async created() {
            this.listOfPopular = await this.$store.dispatch('loadTopOfMovies', {payload: 'TOP_100_POPULAR_FILMS', page: 1})
            this.listOfBest = await this.$store.dispatch('loadTopOfMovies', {payload: 'TOP_250_BEST_FILMS', page: 1})
            this.listOfAwait = await this.$store.dispatch('loadTopOfMovies', {payload: 'TOP_AWAIT_FILMS', page: 1})
        },
        watch: {
            'listOfPopular'(newValue) {
                //console.log(newValue)
            }
        },
    }
</script>

<template>
	<Header-Navigation :enableNavMenu="false"></Header-Navigation>
	<!--<button
			@click="$router.push('Catalog')"
			class="toCatalog btn"
	>
		Перейти в каталог
	</button>-->
	<div class="container">
		<div class="main-page">
			<div class="main-page__sidebar sidebar">
				<Header_Links></Header_Links>
			</div>
			<div class="main-page__content content">
				<div class="content__top-movies top-of-movies">
					<button class="top-of-movies__title btn">
						Популярное
						<span class="arrow-right"></span>
					</button>
					<div class="top-of-movies__slider">
						<Slider :items="listOfPopular.films"
								:uniqName="'first'"
						>
						</Slider>
					</div>
				</div>
				<div class="content__top-movies top-of-movies">
					<button class="top-of-movies__title btn">
						Лучшее
						<span class="arrow-right"></span>
					</button>
					<div class="top-of-movies__slider">
						<Slider :items="listOfBest.films"
								:uniqName="'two'"
						>
						</Slider>
					</div>
				</div>
				<div class="content__top-movies top-of-movies">
					<button class="top-of-movies__title btn">
						Ожидаемые
						<span class="arrow-right"></span>
					</button>
					<div class="top-of-movies__slider">
						<Slider :items="listOfAwait.films"
								:uniqName="'three'"
						>
						</Slider>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";

	.toCatalog {
		font-size: 55px;
	}

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

	.main-page {
		display: flex;
		justify-content: space-between;

		padding: 0 25px;

		background-color: white;

		.sidebar {
			width: 180px;
			margin-left: 15px;

			padding: 25px 0;

			border-right: 1px solid rgba(31, 31, 31, .1);
		}

		.content {
			width: 80%;

			padding: 25px 0;

			.top-of-movies {
				margin-bottom: 25px;

				&__title {
					position: relative;
					margin-bottom: 15px;

					font-size: 19px;
					font-weight: 700;

					&:hover {
						text-decoration: underline;

						.arrow-right {
							opacity: 1;
						}
					}

					.arrow-right {
						display: inline-block;

						position: absolute;
						top: 50%;
						transform: translateY(-50%);

						width: 32px;
						height: 32px;

						opacity: .8;

						background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='%23000' opacity='0.3'%3E %3Cpath fill-rule='evenodd' d='M11.307 1.778L5.333 7.999 11.306 14.222 12.444 13.041 7.588 7.999 12.444 2.959z' transform='matrix(-1 0 0 1 17.778 0)'/%3E %3C/svg%3E") no-repeat center center;
					}
				}

			}

		}
	}
</style>