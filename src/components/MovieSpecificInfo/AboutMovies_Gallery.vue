<template>
	<section>
		<div class="gallery__wrapper">
			<div class="container">
				<div class="gallery">
					<div class="gallery__tabs gallery-tabs">
						<button
								v-for="elem in getTypeImages"
								@click="changeTab(elem.typeEng)"
								class="gallery-tabs__item btn"
								:class="{'tab_active' : elem.typeEng === activeTab}"
						>
							{{elem.typeRu}} {{elem.total}}
						</button>
					</div>
					<div class="gallery__images grid">
						<div
								v-for="image in getImages"

								:key="image.previewUrl"
								class="gallery__images_item grid-item grid-sizer"
						>
							<img :src="image.previewUrl" alt="">
						</div>
						<!--Не удалять, для работы с Masonry-->
						<div class="gutter-sizer"></div>
						<!----------------->
					</div>
					<div class="gallery__pagination gallery-pagination">
						<button v-for="e of getPaginationForGallery"
								@click="changePage(e)"
								class="gallery-pagination__item btn"
								:class="{'active-page' : e === activePage}"
						>
							{{e}}
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import Masonry from 'masonry-layout';

    export default {
        name: "AboutMovies_Gallery",
        components: {},
        data() {
            return {
                activeTab: '',
                activePage: 1,
            }
        },
        methods: {
            changeTab(type) {
                this.activeTab = type
                this.$store.dispatch('loadImages', {payload: this.$route.params.id, type: type, page: 1})
                this.fixMasonry()
            },
            changePage(numPage) {
                this.activePage = numPage
                this.$store.dispatch('loadImages', {
                    payload: this.$route.params.id,
                    type: this.activeTab,
                    page: numPage
                })
                this.fixMasonry()
                window.scrollTo(0, 0)
            },
            //Временная функция для нормальной работы Masonry
            fixMasonry() {
                setTimeout(function () {
                    let elem = document.querySelector('.grid');
                    let msnry = new Masonry(elem, {
                        // options
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-sizer',
                        gutter: '.gutter-sizer',
                        percentPosition: true
                    })
                }, 500)
            }
        },
        computed: {
            ...mapState(['typeImages']),
            ...mapGetters(['getImages', 'getTypeImages', 'getPaginationForGallery']),
        },
        mounted() {
            this.$store.dispatch('loadTypeImages', this.$route.params.id)
            this.activeTab = this.$store.state.firstKnownTypeImage
            this.fixMasonry()

        },
        watch: {
            '$store.state.firstKnownTypeImage'(newValue, oldValue) {
                // устанавливаем модель active tab для выставления активной вкладки
                console.log(newValue, 'Изменения в state')
                this.activeTab = newValue
            }
        }
    }
</script>

<style scoped lang="scss">

	$black: #222;

	//Masonry
	.grid-sizer, .grid-item {
		width: 32.333333%;
		margin-bottom: 1%;
	}

	.gutter-sizer {
		width: 1%;
	}

	//----

	.gallery__wrapper {
		padding: 15px;
	}

	.gallery {

		&__tabs {
			margin-bottom: 15px;

			.gallery-tabs__item {
				margin-bottom: 7px;

				padding: 8px 16px;

				border-radius: 16px;

				color: black;
				font-size: 13px;
				font-weight: 500;

				background-color: #f2f2f2;
				transition: background-color .2s;

				&:hover {
					background-color: #e6e6e6;
				}

				&:not(:last-child) {
					margin-right: 5px;
				}
			}

			.tab_active {
				color: white !important;
				background-color: $black !important;
			}
		}

		&__images {
			height: auto;

			&_item {
				img {
					border-radius: 10px;
				}
			}
		}

		&__pagination {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 100%;


			.gallery-pagination__item {
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