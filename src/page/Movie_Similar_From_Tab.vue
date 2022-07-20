<template>
	<Header-Navigation></Header-Navigation>

	<div class="container">
		<div class="common-page__wrapper common-page">
			<div class="common-page__main">
				<Header_From_Tab>
					<template #header>
						Рекомендации
					</template>
				</Header_From_Tab>
				<AboutMovies_Similar></AboutMovies_Similar>
			</div>
			<aside class="common-page__sidebar">
				<About_Movie_Sidebar></About_Movie_Sidebar>
			</aside>
		</div>
	</div>
</template>

<script>
    //import AboutMovies_Similar from "@/components/MovieSpecificInfo/AboutMovies_Similar"
    import Header_From_Tab from "@/components/MovieSpecificInfo/Header_From_Tab";
    import About_Movie_Sidebar from "@/components/MovieSpecificInfo/AboutMovie_Sidebar"

    export default {
        name: "Movie_Similar_From_Tab",
        components: {
            AboutMovies_Similar,
            About_Movie_Sidebar,
            Header_From_Tab
        },
    }
</script>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";
</style>