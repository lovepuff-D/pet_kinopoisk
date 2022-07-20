<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "List_Of_Movies_Item",
        props: {
            item: {
                type: Object,
            },
        },
        data() {
            return {}
        },
        methods: {
            openMovieCard() {
                this.$router.push({name: 'Full-Item', params: {id: this.item.kinopoiskId}})
            }
        },
        computed: {
            chooseColorForRating() {
                return {
                    green: this.item.ratingKinopoisk >= 7,
                    gray: this.item.ratingKinopoisk >= 5 && this.item.ratingKinopoisk <= 6.99,
                    red: this.item.ratingKinopoisk >= 0 && this.item.ratingKinopoisk <= 4.99,
                }
            }
        }
    }
</script>

<template>
	<div
			class="item"
			@click="openMovieCard"
	>
		<div class="item__img">
			<img :src="item.posterUrlPreview" alt="Постер фильма">
		</div>
		<div class="item__movie movie row">
			<div class="movie__title col">
				{{item.nameRu}}
				<span class="year">{{item.year}}</span>
			</div>
			<div class="movie__subtitle col">
				{{item.nameOriginal}}
			</div>
			<div class="movie__countries countries col">
				<template v-for="countryItem in item.countries">
					<div class="countries__item">
						{{countryItem.country}}
					</div>
				</template>
			</div>
			<div class="movie__genre genres col">
				(
				<template v-for="(genreItem, index) in item.genres">
					<div class="genre__item">
						{{genreItem.genre}}
						<span v-if="index < item.genres.length - 1">,&nbsp</span>
					</div>
				</template>
				)
			</div>
			<div
					class="item__rating"
					:class="chooseColorForRating"
					v-if="item.ratingKinopoisk"
			>
				{{item.ratingKinopoisk}}
			</div>
		</div>

	</div>
</template>

<style scoped lang="scss">

	.row {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;

		.col {
			width: 100%;
		}
	}

	.item {
		display: flex;
		justify-content: space-between;

		color: #777;

		cursor: pointer;
		transition: background-color .3s;

		&:hover {
			background-color: rgba(190, 190, 190, 0.2);
		}

		&__img {
			max-width: 120px;
		}

		.movie {
			width: 100%;

			margin-left: 15px;

			&__title {
				color: #007;
				font-weight: 600;

				.year {
					color: #f60;
				}
			}

			&__subtitle {
				font-size: 12px;

				margin-bottom: 15px;

			}

			.countries {
				display: flex;

				&__item {

				}
			}

			.genres {
				display: flex;

				&__item {
					display: inline
				}
			}

		}

		&__rating {
			display: flex;
			justify-content: center;
			align-items: center;
			align-self: center;

			min-width: 35px;
			min-height: 25px;

			margin-top: 15px;

			color: white;
		}

		.green {
			background-color: green;
		}

		.gray {
			background-color: gray;
		}

		.red {
			background-color: red;
		}
	}
</style>