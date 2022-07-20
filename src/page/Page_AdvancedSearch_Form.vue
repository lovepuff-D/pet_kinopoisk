<script>
    import {mapState, mapGetters} from 'vuex'

    import About_Movie_Sidebar from "@/components/MovieSpecificInfo/AboutMovie_Sidebar"
    import AdvancedSearch_Form from "@/components/AdvancedSearch_Form"
    import List_Of_Movies from "@/components/List_Of_Movies"


    export default {
        name: "AdvancedSearch_Of_Movies",
        components: {
            About_Movie_Sidebar,
            AdvancedSearch_Form,
            List_Of_Movies
        },
        data() {
            return {}
        },
        methods: {},
        computed: {},
        mounted() {
        },
    }
</script>

<template>
	<Header-Navigation></Header-Navigation>
	<div class="container">
		<div class="common-page__wrapper common-page">
			<div class="common-page__main">
				<div class="field-of-search__wrapper">
					<AdvancedSearch_Form></AdvancedSearch_Form>
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

	.field-of-search__wrapper {
		margin-top: 35px;
	}

	.list-of-movies__wrapper {
		margin-top: 35px;
	}

</style>