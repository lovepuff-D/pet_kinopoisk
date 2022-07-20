<template>
	<router-view></router-view>
</template>

<script>
    import Movies_Block from "@/components/Movies_Catalog";
    import 'floating-vue/dist/style.css'

    export default {
        name: 'App',
        components: {
            Movies_Block
        },
        beforeCreate() {
        },
        mounted() {
            this.$store.dispatch('loadMovies', {payload: 'TOP_100_POPULAR_FILMS', page: 1})
            this.$store.dispatch('requestGenres')
        },
        watch: {
            $route: {
                handler(to, from) {
                    //console.log(to, from, 'isWorking?')
                },
            },
        }
    }
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

	#app {
		font-family: 'Montserrat', sans-serif, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;

		height: 100vh;
	}

	* {
		box-sizing: border-box;
	}

	html {
		scroll-behavior: smooth;
	}

	body {
		margin: 0;
		height: 100vh;
		//background-color: #f5f6f6;
		background-color: rgb(245, 246, 246);
	}

	/*---------------------------*/

	a {
		color: #0000ee;
		cursor: pointer;
		text-decoration: none;
	}

	p {
		margin: 0;
	}

	button {
		border: none;
		background-color: transparent;
		cursor: pointer;

		&[disabled] {
			cursor: default;
		}
	}

	h1, h2, h3 {
		margin: 0;
	}

	img {
		max-width: 100%;
	}

	input:focus {
		outline: none;
	}

	/*---------------------------*/


	.btn {
		display: inline-block;
		font-family: 'Montserrat', sans-serif;
		//color: white;
		font-size: 16px;
	}

	//Сетка
	.container {
		width: 100%;
		max-width: 100%;

		margin: 0 auto;
	}


	.slide-fade-enter-active {
		transition: all 0.3s;
	}

	.slide-fade-leave-active {
		transition: all 0.3s;
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateY(10px);
		opacity: 0;
	}
</style>