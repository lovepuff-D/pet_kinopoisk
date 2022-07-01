<script>
    export default {
        name: "Drop-Down_List",
        data() {
            return {
                isShowFactsWrapper: false,
                isShowBloopersWrapper: false,
                isShowAllFacts: false,
                isShowAllBlooper: false,
            }
        },
		props: {
            facts: {
                type: Array,
				required: true,
			}
		}
    }
</script>

<template>
	<div class="facts__wrapper" v-if="true">
		<div class="header">
			Знаете ли вы, что…
		</div>
		<ul class="facts__list facts-list">
			<template v-for="(list, index) in facts">
				<li
						v-html="list"
						v-if="index < 3 || isShowAllFacts"
						class="facts-list__item"
				>
				</li>
			</template>
		</ul>
		<button
				@click="isShowAllFacts = true"
				v-if="!isShowAllFacts"
				class="facts_show-all btn"
		>
			Показать ещё
		</button>
	</div>
</template>

<style scoped lang="scss">
	.header {
		display: flex;
		align-items: center;

		margin-bottom: 25px;
		padding: 0;

		font-size: 24px;
		font-weight: 700;
	}

	.facts__wrapper {

		margin-bottom: 60px;

		.facts-list {
			padding: 0;

			list-style: none;

			&__item {
				position: relative;

				padding: 16px 0 16px 24px;

				color: #393939;

				&::before {
					content: "";
					display: inline-block;

					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);

					width: 8px;
					height: 8px;

					border-radius: 50%;

					background-color: rgba(31, 31, 31, .4);
				}

				&:not(:first-child) {
					border-top: 1px solid rgba(31, 31, 31, .1);
				}
			}
		}

		.facts_show-all {
			display: flex;
			align-items: center;

			margin-bottom: 50px;
			padding: 5px 8px 5px 5px;

			background-color: rgba(242, 242, 242, .9);

			&::before {
				content: "";
				display: inline-block;

				width: 16px;
				height: 16px;

				margin-right: 5px;

				background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E %3Cg opacity='.9'%3E %3Cpath fill-rule='evenodd' d='M8 6.833L2.533 10.933 1.733 9.867 8 5.167 14.267 9.867 13.467 10.933z' opacity='.6' transform='matrix(1 0 0 -1 0 16)'/%3E %3C/g%3E %3C/svg%3E") no-repeat center center;
			}
		}
	}
</style>