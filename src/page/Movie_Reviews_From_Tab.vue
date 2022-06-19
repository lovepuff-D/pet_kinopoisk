<template>
	<div class="container">
		<div class="common-page__wrapper common-page">
			<div class="common-page__main">
				<Header_From_Tab>
					<template #header>
						Рецензии
					</template>
				</Header_From_Tab>
				<Movie_reviews
						:isLimitedPosts="false"
						:isShowTitle="false"
						:isShowPagination="true"
				></Movie_reviews>
			</div>
			<aside class="common-page__sidebar">
				<About_Movie_Sidebar></About_Movie_Sidebar>
			</aside>
		</div>
	</div>
</template>

<script>
    import Movie_reviews from "@/components/Movie_Reviews"
    import Header_From_Tab from "@/components/MovieSpecificInfo/Header_From_Tab";
    import About_Movie_Sidebar from "@/components/MovieSpecificInfo/AboutMovie_Sidebar"

    export default {
        name: "Movie_Reviews_From_Tab",
        components: {
            Movie_reviews,
            Header_From_Tab,
            About_Movie_Sidebar,
        },
		mounted(){
            window.scrollTo(0, 0)
        }
    }
</script>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";

	::v-deep {
		.reviews {
			width: 100%;

			flex-direction: column;

			.reviews-sidebar {
				flex-direction: row;
				align-items: center;
				order: -1;


				margin-bottom: 25px;

				&__item {
					display: flex;
					flex-direction: column;

					margin-right: 15px;
					margin-bottom: 0!important;
				}
			}
		}


	}


</style>