<template>
	<div class="header">
		<a @click="$router.push({name:'Full-Item', params: {id:movieFullInfo.kinopoiskId}})"
		   class="about-movie"
		>
			Информация о фильме
		</a>
		<h1>
		<span class="type-page">
			<slot name="header"></slot>
		</span>
			<br>
			<a
					@click="$router.push({name:'Full-Item', params: {id:movieFullInfo.kinopoiskId}})"
					class="movie-name"
			>
				{{movieFullInfo.nameRu !== '' ? movieFullInfo.nameRu : movieFullInfo.nameEn}}
			</a>
		</h1>

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

	.header {
		margin-bottom: 30px;

		h1 {
			margin-bottom: 10px;
			padding: 15px;

			font-size: 23px;
			font-weight: 600;
		}

		.type-page {
			color: #f60;
		}

		.about-movie {
			display: block;


			padding: 15px 0 15px 15px;



			font-size: 14px;
		}
	}

</style>