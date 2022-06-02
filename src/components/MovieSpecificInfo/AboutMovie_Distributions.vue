<template>
	<section>
		<div class="distributions__wrapper">
			<div class="container">
				<div class="distributions">
					<div v-for="date in getDistributions">
						{{date.date}} - {{date.country['country']}}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "Movie_Distributions",
        computed: {
            ...mapGetters(['getDistributions'])
        },
        mounted() {
            this.$store.dispatch('loadOneMovie', this.$route.params.id)
            this.$store.dispatch('loadDistributions', this.$route.params.id)
        },
        watch: {
        },
    }
</script>

<style scoped lang="scss">

</style>