<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "Staff_Item",
        computed: {
            ...mapState({
                person: state => state.module_person.person
            }),
            ...mapGetters(['getGrowth', 'getBirthday'])
        },
        beforeCreate() {
            this.$store.dispatch('loadOneStaff', {payload: 9144})
        }
    }
</script>

<template>
	<Header-Navigation></Header-Navigation>

	<section class="person__wrapper">
		<div class="container user-container-person">
			<div class="person">
				<div class="person__left col">
					<img :src="person.posterUrl" alt="Poster">
				</div>
				<div class="person__main person-info col">
					<div class="person-info__header person-header">
						<h1 class="person-header__title">{{person.nameRu}}</h1>
						<h2 class="person-header__subtitle">
							{{person.nameEn}}
						</h2>
						<!--<div class="person-header__description">
							{{movieFullInfo.shortDescription}}
						</div>-->
						<!--<a class="btn btn__link-to-kinopoisk"
						   :href="movieFullInfo.webUrl">Смотреть на "Кинопоиске"
						</a>-->
					</div>
					<h3>О персоне</h3>
					<div class="person-header__about about_person">
						<div class="table_row">
							<p class="table_col">Карьера</p>
							<div class="table_col">
								{{person.profession}}
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Рост</p>
							<div class="table_col">
								<span class="additional-info">
									{{`${getGrowth + ' м'}`}}
								</span>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Дата рождения</p>
							<div class="table_col">
								{{getBirthday}}
								<span class="additional-info">{{`${person.age} + 'лет'`}}</span>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Дата Смерти</p>
							<div class="table_col">
								{{getBirthday}}
								<span class="additional-info">{{`${person.age} + 'лет'`}}</span>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Место рождения</p>
							<div class="table_col">
								{{person.birthplace}}
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Всего фильмов</p>
							<div class="table_col">
								{{person.films.length}}
							</div>
						</div>
						<!--<div class="table_row">
							<p class="table_col">Страна</p>
							<div class="table_col">
								<template v-for="(country, index) in movieFullInfo.countries">
									<a>
										{{country.country}}
									</a>
									<span v-if="index < movieFullInfo.countries.length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Жанр</p>
							<div class="table_col">
								<template v-for="(genre, index) in movieFullInfo.genres">
									<a>
										{{`${genre.genre}`}}
									</a>
									<span v-if="index < movieFullInfo.genres.length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row" v-if="movieFullInfo.slogan">
							<p class="table_col">
								Слоган
							</p>
							<div class="table_col" style="color: rgba(255, 255, 255, 0.6)">
								{{`«${movieFullInfo.slogan}»`}}
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Режиссер</p>
							<div class="table_col">
								<template v-for="(director, index) in this.getDirector.slice(0,3)"
										  :key="director.staffId"
								>
									<a>{{director.nameRu}}</a>
									<span v-if="index < this.getDirector.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Сценарий</p>
							<div class="table_col">
								<template v-for="(writer, index) in this.getWriters.slice(0,3)"
										  :key="writer.staffId"
								>
									<a>{{writer.nameRu}}</a>
									<span v-if="index < this.getWriters.slice(0,3).length - 1">,&nbsp</span>
								</template>

							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Продюсер</p>
							<div class="table_col">
								<template v-for="(producer, index) in this.getProducers.slice(0,3)"
										  :key="producer.staffId"
								>
									<a>{{producer.nameRu}}</a>
									<span v-if="index < this.getProducers.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Оператор</p>
							<div class="table_col">
								<template v-for="(operator, index) in this.getOperators.slice(0,3)"
										  :key="operator.staffId"
								>
									<a>{{operator.nameRu}}</a>
									<span v-if="index < this.getOperators.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Композитор</p>
							<div class="table_col">
								<template v-for="(composer, index) in this.getComposer.slice(0,3)"
										  :key="composer.staffId"
								>
									<a>{{composer.nameRu.length === 0 ? composer.nameEn : composer.nameRu}}</a>
									<span v-if="index < this.getComposer.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Художник</p>
							<div class="table_col">
								<template v-for="(design, index) in this.getDesigner.slice(0,3)"
										  :key="design.staffId"
								>
									<a>{{design.nameRu}}</a>
									<span v-if="index < this.getDesigner.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>
						<div class="table_row">
							<p class="table_col">Монтаж</p>
							<div class="table_col">
								<template v-for="(editor, index) in this.getEditors.slice(0,3)"
										  :key="editor.staffId"
								>
									<a>{{editor.nameRu}}</a>
									<span v-if="index < this.getEditors.slice(0,3).length - 1">,&nbsp</span>
								</template>
							</div>
						</div>

						&lt;!&ndash;<div class="table_row">
							<p class="table_col">Сборы в США</p>
							<div v-for="boxOffice in getBox"
								 :key="boxOffice.type"
								 class="table_col">
								<a>{{boxOffice.amount}}</a>
							</div>
						</div>&ndash;&gt;

						<div class="table_row" v-if="movieFullInfo.ratingAgeLimits">
							<p class="table_col">Возраст</p>
							<div class="table_col">
								<p>{{movieFullInfo.ratingAgeLimits}}</p>
							</div>
						</div>
						<div
								class="table_row"
								v-if="movieFullInfo.filmLength"
						>
							<p class="table_col">Время</p>
							<div class="table_col">
								<p>{{movieFullInfo.filmLength}} мин. / ~ {{movieFullInfo.filmLength ?
									(movieFullInfo.filmLength / 60).toFixed(1) : ''}} ч.</p>
							</div>
						</div>-->
					</div>
				</div>
				<!--<div class="person__right col">
					<div>
						<p>В главных ролях</p>
						<p v-for="bestFilm in person.films.slice(0,10)"
						   :key="bestFilm.filmId"
						>
							<a>
								{{bestFilm.nameRu ? bestFilm.nameRu : bestFilm.nameEn}}
							</a>
						</p>
					</div>
				</div>-->
			</div>
			<!--<div class="movie-background">
				<img :src="movieFullInfo.coverUrl ? movieFullInfo.coverUrl : ''"
					 alt="">
				<div class="movie-background__gradient"></div>
			</div>-->
		</div>
	</section>

</template>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";

	.container {
		background-color: white;
	}

	.user-container-person {
		padding: 50px 0;
	}

	.table_row {
		display: flex;
		justify-content: flex-start;

		padding: 7px 0;

		&:not(:last-child) {
		}
	}

	.table_col {
		word-break: break-word;

		font-size: 15px;

		&:first-child {
			width: 30%;
		}

		&:last-child {
			width: 80%;
		}
	}

	.additional-info {
		color: rgba(31,31,31,.4);
	}

	/*Main info about person*/

	.person__wrapper {
		position: relative;
	}

	.person {
		/*:style="{background: 'url(' + movieFullInfo.coverUrl + ') no-repeat', backgroundSize: 'contain'}"*/
		display: flex;
		justify-content: space-between;

		//margin-top: 50px;

		position: relative;
		z-index: 5;

		color: #333;

		text-align: left;
		font-weight: 500;

		.person__left {
			flex: 0 0 320px;
		}

		.person-info {
			width: 100%;

			.person-header {
				&__title {
					margin-bottom: 15px;
					font-size: 40px;
				}

				&__subtitle {
					margin-bottom: 15px;

					font-size: 18px;
					font-weight: 500;
					//color: rgba(255, 255, 255, .6);
				}

				&__description {
					margin-bottom: 15px;
				}
			}

			.about_person {
				margin-top: 30px;
			}
		}

		.person__right {
			flex: 0 0 220px;
		}

		.btn__link-to-kinopoisk {
			margin: 20px 0 40px;
			padding: 20px;
			border-radius: 30px;

			background-color: #f60;

			color: white !important;

			&:hover {
				background-color: #f26100;
			}
		}


		//General styles for .person
		.col {
			padding: 15px;
		}

		a {
			color: #333;

			&:hover {
				color: #f60;
			}
		}

		p {
			color: #333;
		}
	}

	.movie-background {
		position: absolute;
		top: 0;
		left: 0;

		overflow: hidden;

		width: 100%;
		height: 100%;

		img {
			position: relative;
			z-index: 1;

			opacity: .2;
			object-fit: cover;
			object-position: top;
		}

		&__gradient {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2;


			background-image: linear-gradient(180deg, transparent 36%, #000 96%);

			@media screen and (max-width: 1280px) {
				background-image: linear-gradient(180deg, transparent 0%, #000 96%);
			}
		}
	}
</style>