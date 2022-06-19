<template>
	<div class="header">
		<a @click="$router.push({name:'Full-Item', params: {id:movieFullInfo.kinopoiskId}})"
		   class="about-movie"
		>
			<span class="about-movie_icon-back"></span>
			На страницу фильма
		</a>
		<div class="header__title">
			<a
					@click="$router.push({name:'Full-Item', params: {id:movieFullInfo.kinopoiskId}})"
					class="movie-name"
			>
				{{movieFullInfo.nameRu !== '' ? movieFullInfo.nameRu : movieFullInfo.nameOriginal}}
			</a>
			<br>
			<span class="movie-name_original">
				{{movieFullInfo.nameOriginal}}
			</span>
			<br>
			<span class="type-page">
			<slot name="header">
			</slot>
		</span>
		</div>

	</div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "Header_From_Tav",
        computed: {
            ...mapState(['movieFullInfo', 'awards']),
        }
    }
</script>

<style scoped lang="scss">

	a {
		text-decoration: none
	}

	.header {
		padding: 30px 0 0;

		.header__title {
			padding: 15px 0;

			font-size: 26px;
			font-weight: 600;

			line-height: 30px;
		}

		.about-movie {
			display: flex;
			align-items: center;

			margin-bottom: 10px;

			color: rgba(0, 0, 0, .6);
			font-size: 13px;
			font-weight: 600;
		}

		.about-movie_icon-back {
			display: inline-block;
			width: 15px;
			height: 24px;

			transform: rotate(180deg);
			background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='%23000' opacity='0.3'%3E %3Cpath fill-rule='evenodd' d='M11.307 1.778L5.333 7.999 11.306 14.222 12.444 13.041 7.588 7.999 12.444 2.959z' transform='matrix(-1 0 0 1 17.778 0)'/%3E %3C/svg%3E") no-repeat center center;
		}

		.type-page {
			font-size: 14px;
			font-weight: 500;
			color: rgba(0, 0, 0, .6);
		}

		.movie-name {
			font-size: 36px;
			font-weight: 700;
			color: #1f1f1f;
		}

		.movie-year {
			color: #777;
			font-size: 32px;
			font-weight: 500
		}

		.movie-name_original {
			font-size: 18px;
			font-weight: 400;
			color: rgba(0, 0, 0, .6);
		}
	}

</style>