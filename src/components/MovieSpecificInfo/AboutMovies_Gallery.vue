<script>
    import {mapState, mapGetters} from "vuex";
    import Masonry from 'masonry-layout';
    import Pagination from '@/components/FunctionalComponent/Pagination'

    export default {
        name: "AboutMovies_Gallery",
        components: {
            Pagination
        },
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
            },
            changePage(numPage) {
                this.activePage = numPage
                this.$store.dispatch('loadImages', {
                    payload: this.$route.params.id,
                    type: this.activeTab,
                    page: numPage
                })
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
                }, 1000)
            }
        },
        computed: {
            ...mapState(['typeImages']),
            ...mapGetters(['getImages', 'getTypeImages', 'getPaginationForGallery']),
        },
        mounted() {
            //this.$store.dispatch('loadOneMovie', {payload: this.$route.params.id})
            //this.$store.dispatch('loadTypeImages', this.$route.params.id)
            this.$store.dispatch('loadImages', {
                payload: this.$route.params.id,
                type: this.$store.state.firstKnownTypeImage,
                page: 1
            })
            this.activeTab = this.$store.state.firstKnownTypeImage
        },
        watch: {
            '$store.state.firstKnownTypeImage'(newValue, oldValue) {
                // устанавливаем модель active tab для выставления активной вкладки
                //console.log(newValue, 'Изменения в state')
                this.activeTab = newValue
            },
            '$store.state.imagesOfMovie'(newValue, oldValue) {
                //console.log(newValue, 'Изменения в state')
                //Выставление настроек для Masonry
                this.fixMasonry()
            }
        }
    }
</script>

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
					<div class="pagination__wrapper">
						<Pagination
								@changePage="changePage"
								:totalPages="getPaginationForGallery"
						>
						</Pagination>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

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
		padding: 15px 0;
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

		.pagination__wrapper {
			display: flex;
			justify-content: center;

			width: 100%;
			margin-top: 55px;
		}
	}

</style>