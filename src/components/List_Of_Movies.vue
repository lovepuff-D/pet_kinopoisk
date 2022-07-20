<script>
    import {mapState, mapGetters} from 'vuex'

    import Item from '@/components/List_Of_Movies_Item'
    import Pagination from '@/components/FunctionalComponent/Pagination'

    export default {
        name: "List_Of_Movies",
        components: {
            Item,
            Pagination,
        },
        data() {
            return {
                activePage: 1,
                minPage: 0,
                maxPage: 4,
            }
        },
        methods: {
            changePage(numPage) {
                let paramsOfQuery = this.queryOfSearch
                paramsOfQuery.page = numPage
                this.$store.dispatch('findMoviesByFilters', this.queryOfSearch)
            },
        },
        computed: {
            ...mapState({
                listOfMovies: state => state.module_advancedSearch.resultOfSearch,
                queryOfSearch: state => state.module_advancedSearch.lastQueryOfSearch,
                statusOfQuery: state => state.module_advancedSearch.statusOfQuery,
            })
        },
        mounted() {
        },
    }
</script>

<template>
	<div
			class="loader-wrapper"
			v-if="statusOfQuery === false"
	>
		<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>

	<div
			v-if="!listOfMovies.total"
			class="empty-list"
	>
		<p class="empty-list__header">К сожалению, по вашему запросу ничего не найдено...</p>
		<p class="empty-list__name-list">Что делать?</p>
		<ul>
			<li>Попробуйте изменить запрос. Многие фильмы имеют несколько названий</li>
			<li>Используйте вариант названия фильма актера на английском языке</li>
			<li>Если вы пытаетесь найти человека, найдите сначала фильм, где он принимает участие. Затем на странице фильма вы найдёте того, кого искали.</li>
		</ul>

		<button
				class="empty-list__btn_back"
				@click="this.$router.push({name: 'AdvancedSearch_Form'})"
		>
			Искать снова
		</button>
	</div>

	<div
			class="list-of-movies"
			v-if="listOfMovies.total"
	>

		<div class="list-of-movies__header header">
			<span>поиск: </span>
			<span class="header_keyword">{{queryOfSearch.keyword ? queryOfSearch.keyword : '-'}}</span>
			<span> - </span>
			<span>результат: </span>
			<span class="header_total">{{listOfMovies.total}}</span>
		</div>

		<div class="pagination__wrapper-top">
			<Pagination
					@changePage="changePage"
					:totalPages='listOfMovies.totalPages'
			/>
		</div>

		<div class="list-of-movies__result">
			Результаты поиска ({{listOfMovies.total}})
		</div>

		<div class="list">
			<template v-for="item in listOfMovies.items">
				<Item
						:item="item"
						class="list__item"
				>

				</Item>
			</template>
		</div>

		<div class="pagination__wrapper-bottom ">
			<Pagination
					@changePage="changePage"
					:totalPages='listOfMovies.totalPages'
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">

	.empty-list {
		&__header {
			margin-bottom: 15px;

			font-size: 16px;
			color: #f60;
			font-weight: 600;
		}

		&__name-list {
			color: #777;
			font-size: 16px;
			font-weight: 600;
		}

		&__btn_back {
			color: #f60;
		}
	}

	.list-of-movies {
		display: flex;
		flex-direction: column;

		.header {
			margin-bottom: 35px;
			padding: 5px;
			background-color: #f2f2f2;

			.header_keyword {
				font-weight: 500;
			}
		}

		&__result {
			margin-bottom: 25px;

			color: #f60;
			font-size: 18px;
		}

		.list {
			display: flex;
			flex-wrap: wrap;

			&__item {
				width: 100%;

				&:not(:last-child) {
					margin-bottom: 15px;
				}
			}
		}
	}

	.pagination__wrapper-top {
		margin-bottom: 30px;
	}
	.pagination__wrapper-bottom {
		margin-top: 30px;
	}

	.loader-wrapper {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		z-index: 150;

		background-color: black;

		.lds-ring {
			display: block;
			position: relative;
			top: 50%;
			transform: translateY(-50%);


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
	}

</style>