<template>
	<div class="container">
		<div class="common-page__wrapper common-page">
			<div class="common-page__main">
				<Header_From_Tab>
					<template #header>
						Награды
					</template>
				</Header_From_Tab>
				<Movie_Awards></Movie_Awards>
			</div>
			<aside class="common-page__sidebar">
				<About_Movie_Sidebar></About_Movie_Sidebar>
			</aside>
		</div>
	</div>
</template>

<script>
    import Movie_Awards from "@/components/MovieSpecificInfo/AboutMovie_Awards";
    import Header_From_Tab from "@/components/MovieSpecificInfo/Header_From_Tab";
    import About_Movie_Sidebar from "@/components/MovieSpecificInfo/AboutMovie_Sidebar"

    export default {
        components: {Movie_Awards, Header_From_Tab, About_Movie_Sidebar},
        name: "Movie_Tab_From_Awards",
        computed: {},
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";
</style>