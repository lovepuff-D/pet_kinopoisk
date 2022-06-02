<template>
	<div class="container">
		<div class="common-page__wrapper common-page">
			<div class="common-page__main">
				<Header_From_Tab>
					<template #header>
						Галерея
					</template>
				</Header_From_Tab>
				<AboutMovies_Gallery></AboutMovies_Gallery>
			</div>
			<!--<aside class="common-page__sidebar">
				<About_Movie_Sidebar></About_Movie_Sidebar>
			</aside>-->
		</div>
	</div>

</template>

<script>
    import AboutMovies_Gallery from "@/components/MovieSpecificInfo/AboutMovies_Gallery"
    import Header_From_Tab from "@/components/MovieSpecificInfo/Header_From_Tab";
    import About_Movie_Sidebar from "@/components/MovieSpecificInfo/AboutMovie_Sidebar"

    export default {
        components: {
            AboutMovies_Gallery,
            About_Movie_Sidebar,
            Header_From_Tab
        },
        name: "Movie_Gallery_From_Tab",

        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
	@import "../scss/CommonStyle_For_Movie";
</style>