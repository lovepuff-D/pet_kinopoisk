<template>
	<section>
		<div class="awards__wrapper">
			<div class="container">
				<div class="awards">
					<div class="awards__nomination awards-nomination">
						<div
								v-for="(award, i) in getAwards"
								class="awards-nomination__type awards-nomination-type"
						>
							<h2>
								{{i}}
							</h2>
							<div v-for="e in getAwards[i]"
								 :class="{active : e.win}"
								 class="awards-nomination-type__nomination-name"
							>
								&#187; {{e.nominationName}}
								<span v-if="e.win">(Победитель)</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "Movie_Details",
        computed: {
            ...mapState(['awards']),
            ...mapGetters(['getAwards'])
        },
        mounted() {
            //this.$store.dispatch('loadOneMovie', {payload: this.$route.params.id})
            this.$store.dispatch('loadAwards', this.$route.params.id)
        }
    }
</script>

<style scoped lang="scss">

	.awards__wrapper {
		padding: 15px 0 15px 15px;
	}

	.awards {
		.awards-nomination {
			&__type {
				border: 1px #ccc solid;

				margin-bottom: 15px;
				padding: 15px;

				h2 {
					font-size: 16px;
					margin-bottom: 15px;
				}

				.awards-nomination-type {
					&__nomination-name {
						margin-left: 20px;
						margin-bottom: 10px;
					}
				}
			}
		}
	}

	.block {
		border: 1px solid black;
		margin-bottom: 15px;
	}

	.active {
		color: red;
	}

</style>