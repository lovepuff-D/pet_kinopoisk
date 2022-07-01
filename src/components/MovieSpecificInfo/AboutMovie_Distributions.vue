<template>
	<section>
		<div class="distributions__wrapper">
			<div class="container">
				<div class="distributions">
					<p>
						(Т.к API не предоставляет в каком городе происходила премьера, страны могут повторятся)
					</p>
					<br>
					<div v-for="date in getDistributions" class="distributions__item distributions-item">
						<span class="distributions-item__date">
							{{date.date}}
						</span>
						-
						<span>
							{{date.country['country']}}
						</span>
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
            //this.$store.dispatch('loadOneMovie', {payload: this.$route.params.id})
            this.$store.dispatch('loadDistributions', this.$route.params.id)
        },
        watch: {},
    }
</script>

<style scoped lang="scss">
	.distributions {
		&-item {
			&:not(:last-child) {
				margin-bottom: 10px;
			}

			&__date {
				font-weight: 600;
			}
		}
	}
</style>