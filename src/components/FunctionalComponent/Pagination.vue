<script>
    export default {
        name: "Pagination",
        data() {
            return {
                activePage: 1,
                minPage: 0,
                maxPage: 4,
            }
        },
        emits: ['changePage'],
        props: {
            totalPages: {
                type: Number,
                required: true,
            }
        },
        methods: {
            changePage(numPage) {
                //Не позволяем менять ниже 1
                if (numPage === 0) return
                //Не позволяем если больше максимального диапозона
                if (this.totalPages === numPage - 1) {
                    //console.log(this.listOfMovies.totalPages, numPage)
                    return;
                }

                this.activePage = numPage

                //Передаём эмит на родителя для того, чтобы родительский компонент вызвал новую страцицу
                this.$emit('changePage', this.activePage)

                if (this.activePage !== 1) {
                    this.minPage = numPage - 2
                } else {
                    this.minPage = 0
                    this.maxPage = 4
                }

                if (this.activePage !== this.totalPages) {
                    if (numPage === 1) {
                        this.maxPage = numPage + 3
                        return
                    }
                    this.maxPage = numPage + 2
                } else {
                    this.maxPage = numPage + 1
                    this.minPage = this.totalPages - 3
                }

                window.scrollTo(0, 0)
            },
        }
    }
</script>

<template>
	<div class="reviews__pagination pagination"
		 v-if="totalPages > 1"

	>

		<button
				@click="changePage(activePage - 1)"
				class="reviews-pagination__arrow reviews-pagination__arrow_prev">
		</button>

		<template v-for="(e, index) of totalPages">
			<button
					@click="changePage(e)"
					v-if="(minPage < e && maxPage > e) "
					class="reviews-pagination__item btn"
					:class="{'active-page' : e === activePage}"
			>
				{{e}}
			</button>
		</template>

		<button
				@click="changePage(activePage + 1)"
				class="reviews-pagination__arrow reviews-pagination__arrow_next">
		</button>

	</div>
</template>

<style scoped lang="scss">
	.pagination {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.reviews-pagination__arrow {
			display: flex;
			align-items: center;

			&::before {
				content: "";
				display: inline-block;

				width: 36px;
				height: 36px;

				transition: opacity .2s;

				background: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.707 4.293a1 1 0 010 1.414L9.414 12l6.293 6.293a1 1 0 01-1.414 1.414l-6.93-6.93a1.1 1.1 0 010-1.555l6.93-6.93a1 1 0 011.414 0z'/%3E%3C/svg%3E") no-repeat center center;
			}

			&:hover {
				&::before {
					opacity: .7;
				}
			}

			&_next {
				&::before {
					transform: rotate(180deg);
				}
			}
		}


		.reviews-pagination__item {
			width: 45px;
			height: 45px;

			padding: 5px;

			border-radius: 50%;

			transition: background-color .2s;

			&:not(:last-child) {
				margin-right: 10px;
			}

			&:hover {
				background-color: #e6e6e6;
			}
		}

		.active-page {
			background-color: #222 !important;
			color: white;
		}
	}
</style>