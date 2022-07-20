<template>
	<div
			class="loader-wrapper"
	>
		<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Loader_Fullscreen"
    }
</script>

<style scoped lang="scss">

	//Loader

	.loader-wrapper {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		z-index: 150;

		background-color: black;
	}

	.lds-ring {
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);


		width: 80px;
		height: 80px;

		margin: 0 auto;

	}

	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 2px solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #f60 transparent transparent transparent;
	}

	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}

	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}

	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

</style>