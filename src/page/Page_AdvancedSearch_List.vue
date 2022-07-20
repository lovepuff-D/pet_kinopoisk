<script>
    import {mapState, mapGetters} from 'vuex'

    import About_Movie_Sidebar from "@/components/MovieSpecificInfo/AboutMovie_Sidebar"
    import List_Of_Movies from "@/components/List_Of_Movies"

    export default {
        name: "Page_AdvancedSearch_List",
        components: {
            About_Movie_Sidebar,
            List_Of_Movies,
        },
    }
</script>

<template>
	<Header-Navigation></Header-Navigation>
	<div class="container">
		<div class="common-page__wrapper common-page">
			<div class="common-page__main">
				<div class="list-of-movies__wrapper">
					<List_Of_Movies></List_Of_Movies>
				</div>
			</div>
			<aside class="common-page__sidebar">
				<About_Movie_Sidebar></About_Movie_Sidebar>
			</aside>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";

	.list-of-movies__wrapper {
		padding: 30px 0 15px;
	}
</style>