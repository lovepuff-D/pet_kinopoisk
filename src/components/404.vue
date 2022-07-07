<template>
	<Header-Navigation>
	</Header-Navigation>
	<div class="not-found-page__wrapper">
		<div class="not-found-page">
			<div class="not-found-page__header">
				404. Страница не найдена
			</div>
			<button
					@click="$router.push({name: 'Main'})"
					class="btn not-found-page-button"
			>
				Перейти на главную
			</button>
			<button
					class="btn not-found-page-button"
					@click="$router.go(-1)"
			>
				Вернуться назад
			</button>
		</div>
	</div>

</template>

<script>
    export default {
        name: "404"
    }
</script>

<style scoped lang="scss">
	.not-found-page__wrapper {
		position: relative;
		height: 100%;

		background-color: #141414;
	}

	.not-found-page {
		display: flex;
		flex-direction: column;
		justify-content: center;

		width: 100%;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		&__header {
			color: rgba(255, 255, 255, 0.9);
			font-size: 56px;
			font-weight: 700;

			margin-bottom: 50px;
		}

		.not-found-page-button {
			display: block;

			font-size: 20px;
			color: rgba(255, 255, 255, 0.7);

			&:hover {
				color: white;
			}

			&:not(:last-child) {
				margin-bottom: 15px;
			}
		}
	}
</style>