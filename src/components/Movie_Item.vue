<template>
	<div class="movies__item movies-item"
		 @click="$router.push({ name: 'Full-Item', params: { id: item.filmId}})"
	>
		<img
				@mouseenter="showFullInfo($event, item.filmId)"
				:src="item.posterUrlPreview"
				class="movies-item__img"
				alt="Poster"/>
		<div class="movies-item__info">
			<div class="info">
				<div class="info__name">
					{{item.nameRu}}
				</div>
				<div class="info__genres">
					<p v-for="genre in item.genres">
						{{genre.genre}}
					</p>
				</div>
			</div>
			<div class="rating">
				{{item.rating}}
			</div>
		</div>
		<!--<transition-group name="slide-fade">
			<div v-if="isShowFullInfo"
				 class="movies-item__hover movies-item-hover"
				 @mouseleave="hideFullInfo">
				<div class="movies-item-hover__info movies-item__info">
					<div class="info">
						<div class="info__name">
							{{item.nameRu}}
						</div>
						<div class="info__genres">
							<p v-for="genre in item.genres">
								{{genre.genre}}
							</p>
						</div>
					</div>
					<div class="rating">
						{{item.rating}}
					</div>
				</div>
				<div>{{movieFullInfo.shortDescription !== null ?
					movieFullInfo.shortDescription : 'Краткого описания нет'}}
				</div>
				<button @click="$router.push({ name: 'Full-Item', params: { id: item.filmId}})"
						class="watch-more btn">
					More...
				</button>
			</div>
		</transition-group>-->
	</div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Movie_Item",
        props: {
            item: {
                type: Object,
            }
        },
        data() {
            return {
                isShowFullInfo: false,
            }
        },
        methods: {
            showFullInfo(event, id) {
                //console.log(event.target, 'show', event.relatedTarget, 'ушёл')
                this.$store.dispatch('loadOneMovie', id)
                this.isShowFullInfo = true
            },
            hideFullInfo(event) {
                //console.log(event.target, 'hide')
                this.isShowFullInfo = false
            }
        },
        computed: {
            ...mapState(['movieFullInfo'])
        },
    }
</script>

<style scoped lang="scss">
	.cut_text {
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}

	.movies__item {
		position: relative;
		overflow: hidden;

		width: 15%;
		max-width: 500px;
		margin-bottom: 40px;

		cursor: pointer;

		&:hover {
			.info__name {
				color: #f60;
			}
		}

		.movies-item__img {
			display: block;

			width: 100%;
			max-width: 100%;

			border-radius: 10px;

			object-fit: fill;
		}

		.movies-item__info {
			display: flex;
			justify-content: space-between;
			align-items: center;

			height: 70px;
			padding: 15px;

			font-size: 13px;
			font-weight: 500;

			background-color: lightgray;

			.info {
				width: 80%;

				text-align: left;

				&__name {
					margin-bottom: 5px;

					font-weight: 700;

					transition: color .2s;
				}

				&__genres {
					@extend .cut_text;

					white-space: nowrap;

					p {
						display: inline-block;
						margin-right: 10px;
					}
				}
			}

			.rating {
				width: 20%;
				margin-left: 15px;
				border: 1px solid cadetblue;
			}
		}

		.movies-item__hover {
			display: flex;
			justify-content: space-between;
			align-content: flex-end;
			align-items: center;
			flex-wrap: wrap;

			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;

			width: 100%;
			padding: 15px;

			background: rgb(0, 0, 0);
			background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.3029586834733894) 100%);

			text-align: left;
			color: white;

			.movies-item-hover__info {
				width: 100%;
				padding: 0;

				text-align: center;

				background-color: transparent;
			}
		}
	}

	.watch-more {
		width: 100%;

		color: white;

		margin-top: 15px;
		padding: 15px;

		background-color: #3bb4e0;
	}
</style>