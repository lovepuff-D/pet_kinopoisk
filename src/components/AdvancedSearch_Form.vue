<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "AdvancedSearch_Field",
        data() {
            return {
                valueOfYearFrom: 1890,
                valueOfYearTo: new Date().getFullYear() + 2,

                filledField: {
                    keyword: '',
                    year: '',
                    yearFrom: '',
                    yearTo: '',
                    genre: '',
                    country: '',
                    order: 'NUM_VOTE'
                }
            }
        },
        methods: {
            findMovies() {
                this.$router.push({name: 'AdvancedSearch_List'})

                //Если пользователь указывает поле yearFrom or yearTo, то обнуляем year.
                if (this.filledField.yearFrom || this.filledField.yearTo) {
                    this.filledField.year = ''
                }

                //Если пользователь указывает конкретный год для поиска, то выставляем его для диапозона
                if (this.filledField.year) {
                }

                let paramsOfQuery = {
                    keyword: this.filledField.keyword,
                    year: this.filledField.year,
                    yearFrom: this.filledField.yearFrom,
                    yearTo: this.filledField.yearTo,
                    genre: this.filledField.genre,
                    country: this.filledField.country,
                    order: this.filledField.order,
                    page: 1,
                }

                //Вызываем api для поиска
                this.$store.dispatch('findMoviesByFilters', paramsOfQuery)
                this.$store.commit('ADD_LAST_QUERY_OF_SEARCH', paramsOfQuery)
            },
        },
        computed: {
            isBlockFieldOfYear() {
                return this.filledField.yearFrom !== '' || this.filledField.yearTo !== ''
            },

            ...mapState(['listOfGenresOfMovies', 'listOfCountries']),
            ...mapState({
                lastQueryOfSearch: state => state.module_advancedSearch.lastQueryOfSearch
            })
        },
        mounted() {
            if (this.lastQueryOfSearch) this.filledField = this.lastQueryOfSearch
        },
    }
</script>

<template>
	<div class="header-component">
		<div class="header-component__title">
			Расширенный поиск
		</div>
		<div class="header-component__subtitle">
			Поиск фильмов
		</div>
	</div>

	<form
			class="field-of-search"
			@submit.prevent
	>
		<div class="field-of-search__header">
			Искать фильм
		</div>
		<div class="row">
			<div class="field-of-search__filter-name filter">
				<div class="filter__field">
					<input
							type="text"
							v-model="filledField.keyword"
							placeholder="Наименование фильма"
					/>
				</div>
				<span class="filter__subtitle">
								полное или частичное название фильма
							</span>
			</div>
			<div class="field-of-search__filter-year filter">
				<div class="filter__year row">
									<span class="filter__header col">
										Год:
									</span>
					<div class="filter__field col">
						<input
								type="text"
								v-model="filledField.year"
								:disabled="isBlockFieldOfYear"
						/>
					</div>
				</div>
				<div class="filter__year row ">
									<span class="filter__header col">
								или интервал:
							</span>
					<div class="filter__field interval-of-year col">
						<select
								name="yearFrom"
								v-model="filledField.yearFrom"
						>
							<option value="">-</option>
							<option
									v-for="item of valueOfYearTo - valueOfYearFrom"
									:value="valueOfYearTo - item"
							>
								{{ valueOfYearTo - item }}
							</option>
						</select>
						<select
								name="yearTo"
								v-model="filledField.yearTo"
						>
							<option value="">-</option>
							<option
									v-for="item of valueOfYearTo - valueOfYearFrom"
									:value="valueOfYearTo - item"
							>
								{{ valueOfYearTo - item }}
							</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="field-of-search__filter-genre filter">
							<span class="filter__header">
								Жанр:
							</span>
			<div class="filter__field">
				<select
						name="genre"
						v-model="filledField.genre"
				>
					<option
							selected="selected"
							value=""
					>
						-
					</option>
					<option
							v-for="item of listOfGenresOfMovies"
							:value="item.id"
							:key="item.id"
					>
						{{ item.genre }}
					</option>
				</select>
			</div>
		</div>
		<div class="field-of-search__filter-country filter">
							<span class="filter__header">
								Страна:
							</span>
			<div class="filter__field">
				<select
						name="countries"
						v-model="filledField.country"
				>
					<option
							selected="selected"
							value=""
					>
						-
					</option>
					<option
							v-for="item of listOfCountries"
							:value="item.id"
							:key="item.id"
					>
						{{ item.country }}
					</option>
				</select>
			</div>
		</div>
		<div
				class="field-of-search__filter-order filter"
		>
							<span class="filter__header">
								Сортировка по:
							</span>

			<div class="filter__field filed_radio">
				<label>
					<input
							v-model="filledField.order"
							type="radio"
							name="order"
							value="RATING"
					>
					Рейтингу
				</label>

				<label>
					<input
							v-model="filledField.order"
							type="radio"
							name="order"
							value="NUM_VOTE"
							checked
					>
					Кол-ву голосов
				</label>

				<label>
					<input
							v-model="filledField.order"
							type="radio"
							name="order"
							value="YEAR"
					>
					Дата выхода фильма
				</label>
			</div>

		</div>
		<!--<div>
			<input type="number" name="ratingFrom" min="0" max="10">
			<input type="number" name="ratingTo" min="0" max="10">
		</div>-->
		<button
				@click="findMovies()"
				class="field-of-search__btn_search btn"
		>
			Поиск
		</button>
	</form>
</template>


<style scoped lang="scss">
	.header-component {
		margin-bottom: 25px;

		&__title {
			color: #f60;
			font-size: 25px;
			font-weight: 500;
		}

		&__subtitle {
			color: #777;
			font-size: 12px;
		}
	}

	.field-of-search {
		display: flex;
		flex-wrap: wrap;

		padding: 15px;

		background: #f2f2f2;


		& > * {
			width: 100%;
		}

		&__header {
			margin-bottom: 15px;

			font-size: 23px;
			font-weight: 500;
		}

		.row {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;

			width: 100%;
		}

		.col {
			width: 50%;
		}

		.filter {
			display: flex;
			flex-wrap: wrap;

			margin-bottom: 15px;

			& > span {
				margin-right: 15px;
			}

			&__header {

			}

			&__subtitle {
				font-size: 12px
			}

			&__field {
				display: block;
			}

			.filed_radio {
				display: flex;
				flex-direction: column;
			}
		}

		&__filter-name {
			margin-right: auto;

			.filter__field {
				width: 100%;

				input {
					width: 100%;
				}
			}
		}

		&__filter-year {
			justify-content: space-between;

			width: 40%;

			.filter__year {

				&:first-child {
					margin-bottom: 15px;
				}

				input {
					width: 100%;
				}

				select {
					width: 30%;
				}

				.col:first-child {
					width: 30%;
				}

				.col:last-child {
					display: flex;

					width: 60%;
				}

			}

			.interval-of-year {
				justify-content: space-between;

				select {
					width: 40%;
				}
			}
		}

		&__btn_search {
			background-color: #ece9e2;
		}
	}
</style>