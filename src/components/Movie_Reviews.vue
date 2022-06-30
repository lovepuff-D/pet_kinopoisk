<template>
	<button
			@click="$router.push({name:'Reviews'})"
			class="header header_link btn"
			v-if="isShowTitle"
	>
		Рецензии зрителей
		<span class="arrow-right"></span>
	</button>
	<div class="reviews__wrapper">
		<Btn_Create_Reviews></Btn_Create_Reviews>
		<div class="reviews">
			<div class="reviews-item">
				<div
						v-for="(item,index) in getReviews"
						:key="item.kinopoiskId"
						class="item"
						:class="[item.type === 'POSITIVE' ? 'item_type-positive' : 'item_type-negative', item.type === 'NEUTRAL' ? 'item_type-neutral' : false]"
				>
					<template v-if="this.isLimitedPosts ? true : index < 10">
						<div class="item__header item-header">
							<div class="author">
								<div class="author__picture"></div>
								<div class="author__name">
									{{item.author}}
								</div>
							</div>
							<div class="all-info">
								{{item.date}}
							</div>
						</div>
						<div class="item__body item-body">
							<div class="item-body__description" v-html="item.description">
							</div>
							<button
									@click="showFullReview(item.kinopoiskId)"
									:ref="'buttonShowAll' + item.kinopoiskId"
									class="item-body_show-all btn">
								показать всю рецензию
							</button>
						</div>
						<div class="item__footer item-footer">
							<div class="item-footer__users-rating users-rating">
								<button
										@click="incrementLike(item.kinopoiskId)"
										class="users-rating__positive btn btn_set-rating">
									<span class="btn_set-rating__icon"></span>
									<span>Полезно</span>
									<span class="btn_set-rating__counter">{{item.positiveRating}}</span>
								</button>
								<button
										@click="discernmentLike(item.kinopoiskId)"
										class="users-rating__negative btn btn_set-rating">
									<span class="btn_set-rating__icon"></span>
									<span>Нет</span>
									<span class="btn_set-rating__counter">{{item.negativeRating}}</span>
								</button>
							</div>
						</div>
					</template>
				</div>
			</div>
			<div class="reviews__sidebar reviews-sidebar">
				<div class="reviews-sidebar__item reviews-sidebar__total">
					<span>{{movies_reviews.total}}</span>
					<span>Всего</span>
				</div>
				<div class="reviews-sidebar__item reviews-sidebar__positive">
					<span>{{movies_reviews.totalPositiveReviews}}</span>
					<span>Положительные</span>
				</div>
				<div class="reviews-sidebar__item reviews-sidebar__negative">
					<span>{{movies_reviews.totalNegativeReviews}}</span>
					<span>Отрицательные</span>
				</div>
				<div class="reviews-sidebar__item reviews-sidebar__neutral">
					<span>{{movies_reviews.totalNeutralReviews}}</span>
					<span>Нейтральные</span>
				</div>
			</div>
			<div
					v-if="isShowPagination && movies_reviews.totalPages > 1"
					class="reviews__pagination reviews-pagination"
			>
				<button
						@click="changePage(activePage - 1)"
						class="reviews-pagination__arrow reviews-pagination__arrow_prev">
				</button>
				<template v-for="(e, index) of getPaginationForReviews">
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
		</div>
	</div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "Movie_Reviews",
        data() {
            return {
                limitedItemsOfReviews: [],
                disableBtnLikes: false,
                disableBtnDislikes: false,
                activePage: 1,
                minPage: 0,
                maxPage: 4,
            }
        },
        props: {
            isLimitedPosts: Boolean,
            isShowTitle: {
                default: true,
                type: Boolean
            },
            isShowPagination: Boolean,
        },
        methods: {
            showFullReview(id) {
                id = 'buttonShowAll' + id
                let button = this.$refs[`${id}`][0]
                button.previousElementSibling.classList.add('full-length')
                button.remove()
            },
            incrementLike(id) {
                if (this.disableBtnLikes) return
                this.$store.commit('UPDATE_POSITIVE_LIKES', {payload: id})
                this.disableBtnLikes = true
                if (this.disableBtnDislikes) {
                    this.$store.commit('UPDATE_NEGATIVE_LIKES', {payload: id, increment: false})
                    this.disableBtnDislikes = false
                }
            },
            discernmentLike(id) {
                if (this.disableBtnDislikes) return
                this.$store.commit('UPDATE_NEGATIVE_LIKES', {payload: id})
                this.disableBtnDislikes = true
                if (this.disableBtnLikes) {
                    this.$store.commit('UPDATE_POSITIVE_LIKES', {payload: id, increment: false})
                    this.disableBtnLikes = false
                }
            },
            changePage(numPage) {
                if (numPage === 0) return
                if (this.getPaginationForReviews === numPage - 1) {
                    console.log(this.getPaginationForReviews, numPage)
                    return;
                }
                this.activePage = numPage
                this.$store.dispatch('loadReviews', {payload: this.$route.params.id, page: numPage})

                if (this.activePage !== 1) {
                    this.minPage = numPage - 2
                } else {
                    this.minPage = 0
                    this.maxPage = 4
                }


                if (this.activePage !== this.getPaginationForReviews) {
                    this.maxPage = numPage + 2
                } else {
                    this.maxPage = numPage + 1
                    this.minPage = this.getPaginationForReviews - 3
                }

                window.scrollTo(0, 0)
            },
        },
        watch: {},
        computed: {
            ...mapState({
                movies_reviews: state => state.movies_reviews.moviesReviews
			}),
            ...mapGetters(['getReviews', 'getPaginationForReviews']),
        },
        mounted() {
            this.$store.dispatch('loadReviews', {payload: this.$route.params.id})
        },
    }
</script>

<style scoped lang="scss">
	$black: #222;

	.header {
		font-size: 36px !important;
	}

	.arrow-right {
		background-size: 100% !important;
	}

	.reviews {
		width: 70%;

		display: flex;
		justify-content: space-between;

		margin-top: 25px;

		.reviews-item {
			.item {

				margin-right: 30px;
				margin-bottom: 20px;

				border-radius: 6px;

				.item-header {
					display: flex;
					justify-content: space-between;
					align-items: center;

					margin-bottom: 15px;
					padding: 20px 30px;

					border-bottom: 1px solid rgba(31, 31, 31, .07);

					.author {
						display: flex;
						align-items: center;

						font-weight: 500;

						&__picture {
							width: 46px;
							height: 46px;

							margin-right: 10px;

							border-radius: 50%;

							background: url("data:image/svg+xml,%3csvg fill='none' width='48px' height='48px' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='%23777' fill-opacity='.4' d='M0 0h48v48H0z'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.819 11.643c-1.845 0-3.43.587-4.511 1.927-1.036 1.284-1.452 3.07-1.452 5.156 0 4.387 2.9 7.384 5.963 7.384 3.062 0 5.963-2.997 5.963-7.384 0-2.085-.416-3.871-1.452-5.155-1.08-1.34-2.666-1.928-4.511-1.928ZM14.34 34.068c.425.522 2.39 2.275 9.66 2.275s9.236-1.753 9.66-2.275a.434.434 0 0 0 .092-.32c-.091-.994-.984-5.874-9.752-5.874-8.767 0-9.66 4.88-9.75 5.874-.011.117.016.229.09.32Z' fill='%23fff' fill-opacity='.6'/%3e%3c/svg%3e") no-repeat center center;
							background-size: 48px 48px;
						}
					}

					.all-info {
						font-weight: 300;
					}
				}

				.item-body {
					display: flex;
					flex-direction: column;

					padding: 15px 30px 23px;

					&__description {
						max-height: 280px;

						margin-bottom: 30px;

						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 14;
						-webkit-box-orient: vertical;
					}

					&_show-all {
						width: 240px;

						padding: 2px;

						border-radius: 2px;

						color: rgba(31, 31, 31, .7);
						background-color: rgba(31, 31, 31, .1);
					}

					.full-length {
						max-height: none !important;
						-webkit-line-clamp: initial !important;
						margin-bottom: 0;
					}
				}

				.item-footer {
					padding: 0 30px 23px;

					text-align: right;

					&__users-rating {
						align-self: flex-end;

						.btn_set-rating {
							display: inline-flex;
							align-items: center;

							padding: 5px 11px 5px 8px;

							background-color: #f7f7f7;

							border-radius: 2px;

							&:first-child {
								margin-right: 20px;
							}

							&:hover {
								background-color: #f0f0f0;
							}

							span.btn_set-rating__icon {
								display: inline-block;

								width: 16px;
								height: 16px;
							}

							span:not(:last-child) {
								margin-right: 5px;
							}

							span.btn_set-rating__counter {
								opacity: .4;
								color: #333;
							}
						}

						.users-rating__positive {
							span.btn_set-rating__icon {
								background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e    %3cpath fill='%23093' fill-rule='evenodd' d='M4.35 8.723l1.825 5.012-2.35.855L2 9.58l2.35-.856zm4.317-7.39c.66.022 1.333 1.18 1.333 2l-.001 2h3.334c.693 0 1.263.53 1.328 1.205l.006.129c0 .631-.44 1.16-1.029 1.298.227.283.362.643.362 1.035 0 .545-.261 1.029-.666 1.333v1c0 1.105-.896 2-2 2h-4L5.333 8C6.888 5.529 7.777 3.973 8 3.333c0-1.182 0-1.985.667-2z'/%3e%3c/svg%3e") no-repeat;
							}
						}

						.users-rating__negative {
							span.btn_set-rating__icon {
								background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e    %3cpath fill='%23F60' fill-rule='evenodd' d='M11.65 7.2L9.824 2.19l2.35-.856L14 6.345l-2.35.856zm-4.317 7.39c-.66-.02-1.333-1.18-1.333-2l.001-2H2.667c-.693 0-1.263-.528-1.328-1.205l-.006-.128c0-.631.44-1.16 1.029-1.298C2.135 7.676 2 7.316 2 6.924c0-.545.262-1.029.666-1.333v-1c0-1.105.896-2 2-2h4l2 5.333C9.112 10.395 8.223 11.95 8 12.59c0 1.183 0 1.986-.667 2z'/%3e%3c/svg%3e") no-repeat;
							}
						}

					}
				}
			}

			.item_type-positive {
				background: rgba(0, 153, 51, .15);
			}

			.item_type-negative {
				background-color: rgba(255, 102, 0, .15);
			}

			.item_type-neutral {
				background-color: #f2f2f2;
			}

		}

		.reviews-sidebar {
			display: flex;
			flex-direction: column;

			&__item {
				padding-left: 9px;

				font-size: 28px;
				font-weight: 600;

				span:last-child {
					display: block;

					font-size: 12px;
					font-weight: 400;
					color: #393939;
				}

				&:not(:last-child) {
					margin-bottom: 10px;
				}
			}

			&__total {
				border-left: 3px solid #f60;
			}

			&__positive {
				color: #093;
			}

			&__negative {
				color: #d11f13;
			}

			&__neutral {
				color: #777;
			}

		}

		&__pagination {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			order: -2;

			margin-bottom: 30px;

			width: 100%;

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
				background-color: $black !important;
				color: white;
			}
		}
	}
</style>