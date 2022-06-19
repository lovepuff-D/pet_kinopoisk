<template>
	<button class="reviews_create-post btn">Написать рецензию</button>
</template>

<script>
    export default {
        name: "Btn_Create_Reviews"
    }
</script>

<style scoped lang="scss">
	.reviews_create-post {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		padding: 8px 9px;

		border: 1px solid rgba(0, 0, 0, .1);
		border-radius: 4px;

		font-weight: 500;

		&::before {
			content: "";
			display: inline-block;

			width: 16px;
			height: 15px;

			margin-right: 5px;

			background: url("data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg' fill='rgba(0, 0, 0, 0.6)'%3E %3Cpath d='M5.75 0H4.25V4.25H0V5.75H4.25V10H5.75V5.75H10V4.25H5.75V0Z' fill-opacity='0.6'/%3E %3C/svg%3E") no-repeat center center;
			background-size: 11px;
		}

		&:hover {
			background-color: #f7f7f7;
		}
	}
</style>