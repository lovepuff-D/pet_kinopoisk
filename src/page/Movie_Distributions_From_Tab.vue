<template>
	<Header-Navigation></Header-Navigation>

	<div class="container">
		<div class="common-page__wrapper common-page">
			<div class="common-page__main">
				<Header_From_Tab>
					<template #header>
						Премьеры
					</template>
				</Header_From_Tab>
				<Movie_Distributions></Movie_Distributions>
			</div>
				<aside class="common-page__sidebar">
					<About_Movie_Sidebar></About_Movie_Sidebar>
				</aside>
		</div>
	</div>
</template>

<script>
    import Movie_Distributions from "@/components/MovieSpecificInfo/AboutMovie_Distributions";
    import Header_From_Tab from "@/components/MovieSpecificInfo/Header_From_Tab";
    import About_Movie_Sidebar from "@/components/MovieSpecificInfo/AboutMovie_Sidebar"

    export default {
        components: {Movie_Distributions, Header_From_Tab, About_Movie_Sidebar},
        name: "Movie_Tab_From_Awards",
    }
</script>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";
</style>