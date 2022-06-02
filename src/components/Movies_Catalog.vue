<template>
	<section>
		<div class="container">
			<div class="filter">
				<button @click="filterMovies('TOP_100_POPULAR_FILMS')">Trending</button>
				<button @click="filterMovies('TOP_250_BEST_FILMS')">Top Rated</button>
				<button @click="filterMovies('')">New Arrivals</button>
				<button @click="filterMovies('')">Trailers</button>
				<button @click="filterMovies('TOP_AWAIT_FILMS')">Coming</button>
			</div>
			<div class="movies">
				<transition-group name="slide-fade">
					<Movie_Item
							:item="item"
							v-for="item in movies"
							:key="item.filmId"
					></Movie_Item>
				</transition-group>
			</div>
		</div>
	</section>
</template>

<script>
    import {mapState} from 'vuex'
    import Movie_Item from "@/components/Movie_Item";

    export default {
        name: "Movies_Block",
        components: {
            Movie_Item
        },
		methods: {
            filterMovies(filterName) {
                this.$store.dispatch('loadMovies', {payload: filterName, page: 1})
            }
		},
        mounted() {
        },
        computed: {
            ...mapState(['movies']),
        }
    }
</script>

<style scoped lang="scss">

	.filter {
		button {
			padding: 15px;
			color: #0aaee4;
		}
	}

	.movies {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>