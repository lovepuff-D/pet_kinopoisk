<script>
    // Import Swiper Vue.js components
    import {Navigation, A11y} from 'swiper';
    import {Swiper, SwiperSlide} from 'swiper/vue';
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';

    export default {
        name: "Slider",
        data() {
            return {
                isShowSlider: false
            }
        },
        props: {
            slidesPerView: {
                type: Number,
                default: 7,
            },
            uniqName: {
                type: String,
                required: true,
            },
            items: {
                type: Array,
                //required: true,
            },
        },
		methods: {
            moveToMovie(id) {
                this.$router.push({name: 'Full-Item', params: {id: id}})
                /*this.loadAPI(id)*/
            },
            loadAPI(id) {
                /*this.$store.dispatch('loadOneMovie', {payload: id})*/
                /*this.$store.dispatch('loadStaff', id)*/
                /*this.$store.dispatch('loadTrailerAndVideos', id)*/
                /*this.$store.dispatch('loadSimilarMovies', id)*/
                /*this.$store.dispatch('loadFacts', id)*/
                /*this.$store.dispatch('loadAwards', id)*/
            },
		},
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            const onSwiper = (swiper) => {
                //console.log(swiper);
            };
            const onSlideChange = () => {
                //console.log('slide change');
            };
            return {
                onSwiper,
                onSlideChange,
                modules: [Navigation, A11y],
            };
        },
        watch: {
            'items'(newValue) {
                    this.isShowSlider = true
            }
        },
    }

</script>

<template>
	<div
			v-if="!isShowSlider"
			class="skeleton"
	>
	</div>
	<div class="similar-movies__carousel carousel" v-show="isShowSlider">
		<button
				:class="`${uniqName}-swiper-button-next swiper-button swiper-button-next`">
		</button>
		<button
				:class="`${uniqName}-swiper-button-prev swiper-button swiper-button-prev`">
		</button>
		<swiper
				:modules="modules"
				:slides-per-view="slidesPerView"
				:space-between="20"
				:speed="500"
				:slidesPerGroup="4"
				:navigation="{
								    nextEl: `.${uniqName}-swiper-button-next`,
								    prevEl: `.${uniqName}-swiper-button-prev`,
								}"
				:uniqueNavElements="true"
				@swiper="onSwiper"
				@slideChange="onSlideChange"
		>
			<swiper-slide
					v-for="item in items"
					:key="item.filmId"
					@click="moveToMovie(item.filmId)"
					class="carousel__item carousel-item"
			>
				<div class="carousel-item__img">
					<img :src="item.posterUrlPreview" alt="">
				</div>
				<span>{{item.nameRu}}</span>
				<span v-if="item.nameRu.length === 0">{{item.nameOriginal}}</span>
			</swiper-slide>
			<swiper-slide
					@click=""
					class="carousel__item carousel-item carousel-item_last-elem"
			>
				<span>
					Посмотреть
					<br>
					ещё
				</span>
			</swiper-slide>
		</swiper>
	</div>
</template>

<style scoped lang="scss">
	.skeleton {
		width: 100%;
		height: 270px;

		margin: 0 auto 15px;

		border-radius: 10px;

		background-color: hsl(200, 20%, 80%);

		animation: skeleton-loading 1s linear infinite alternate;
	}

	@keyframes skeleton-loading {
		0% {
			background-color: hsl(200, 20%, 80%);
		}
		100% {
			background-color: hsl(200, 20%, 95%);
		}
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

	.carousel {
		position: relative;

		&__item {
			cursor: pointer;

			font-size: 12px;

			max-width: 500px;

			.carousel-item__img {
				//height: 350px;

				position: relative;

				margin-bottom: 10px;


				img {
					display: block;
					//height: 350px;

					border-radius: 4px;
				}

				&::after {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;

					border-radius: 4px;

					max-height: 350px;

					opacity: 0;
					transition: opacity .3s;
					background-color: black;

				}
			}

			&:hover {
				color: #f60;

				.carousel-item__img::after {
					opacity: .15;
				}
			}
		}

		.carousel-item_last-elem {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			height: 190px;

			background-color: #f7f7f7;

			color: rgba(31, 31, 31, .4);
			text-align: center;
			font-weight: 600;

			border-radius: 4px;

			transition: background-color .3s;

			&:hover {
				background-color: #f60;
				color: white;
			}
		}

		.swiper-button, {
			width: 45px;
			height: 45px;

			top: 45%;

			border-radius: 50%;

			background-color: white;
			box-shadow: 0 4px 6px 0 rgb(0 0 0 / 5%), 0 1px 0 1px rgb(0 0 0 / 5%), 0 0 0 1px rgb(0 0 0 / 5%);
			transition: opacity .3s;

			&:hover {
				&::after {
					background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8px' height='14px' viewBox='0 0 8 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='%23000'%3E %3Cdefs/%3E %3Cg id='current' stroke='none' stroke-width='1' fill-rule='evenodd'%3E %3Cg id='ui' transform='translate(-633.000000, -2143.000000)'%3E %3Cg id='arrow' transform='translate(612.000000, 2126.000000)'%3E %3Cg transform='translate(15.000000, 15.000000)'%3E %3Cpolygon transform='translate(10.000000, 9.000000) scale(-1, 1) translate(-10.000000, -9.000000) ' points='12.72 2 6 8.99936126 12.7193846 16 14 14.6707729 8.53661538 8.99936126 14 3.32858837'/%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E");
				}
			}

			&::after {
				display: block;
				width: 100%;
				height: 100%;
				content: "";
				border-radius: 50%;
				background-color: #fff;
				background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width= '8px' height= '14px' viewBox= '0 0 8 14' version= '1.1' xmlns= 'http://www.w3.org/2000/svg' xmlns:xlink= 'http://www.w3.org/1999/xlink' fill= '%23666' %3E %3Cdefs/%3E %3Cg id= 'current' stroke= 'none' stroke-width= '1' fill-rule= 'evenodd' %3E %3Cg id= 'ui' transform= 'translate(-633.000000, -2143.000000)' %3E %3Cg id= 'arrow' transform= 'translate(612.000000, 2126.000000)' %3E %3Cg transform= 'translate(15.000000, 15.000000)' %3E %3Cpolygon transform= 'translate(10.000000, 9.000000) scale(-1, 1) translate(-10.000000, -9.000000) ' points= '12.72 2 6 8.99936126 12.7193846 16 14 14.6707729 8.53661538 8.99936126 14 3.32858837' /%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E");
				background-repeat: no-repeat;
				background-position: 50%;
			}
		}

		.swiper-button-next {
			right: -25px;
		}

		.swiper-button-prev {
			left: -25px;

			&::after {
				transform: rotate(-180deg);
			}
		}

		.swiper-button-disabled {
			opacity: 0;
		}
	}
</style>