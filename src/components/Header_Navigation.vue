<script>
    import {mapState, mapGetters} from 'vuex'
    import Header_Links from '@/components/Header_Links'
	import Search_Of_Movie from '@/components/FunctionalComponent/Search_Of_Movie'

    export default {
        name: "Header-Navigation",
        components: {
            Header_Links,
            Search_Of_Movie
        },
        data() {
            return {
                isShowHeaderLinks: false,
            }
        },
        props: {
            enableNavMenu: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
        },
        computed: {
        },
        mounted() {
        },
    }
</script>

<template>

	<div class="header-navigation__wrapper">
		<div class="container">
			<header class="header-navigation">
				<button class="header-navigation__header-logo header-logo btn"
						@click="$router.push({name: 'Main'})"
						:class="{'black-background' : isShowHeaderLinks && enableNavMenu}"
						@mouseenter="isShowHeaderLinks = true"
						@mouseleave="isShowHeaderLinks = false"
				>
					<Header_Links
							v-if="isShowHeaderLinks && enableNavMenu"
							:darkStyleTheme="true"
					>
					</Header_Links>
					<button v-if="enableNavMenu"
							class="header-logo__burger-icon burger-button"
					>
						<span class="burger-icon">
						</span>
					</button>
					<span>LOVEPUFF</span>
				</button>
				<div class="header-navigation__my-links my-links">
					<a href="https://github.com/lovepuff-D" class="my-links__item btn">
						GitHub
					</a>
					<a href="https://t.me/lovepuff/" class="my-links__item btn">
						Telegram
					</a>
				</div>
				<div class="header-navigation__form-of-search">
					<Search_Of_Movie></Search_Of_Movie>
				</div>
				<div class="header-navigation__profile profile"></div>
			</header>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import "../scss/CommonStyle_For_Movie";

	.container {
		margin: 0 auto;
	}

	$border-radius: 3px;

	.header-navigation__wrapper {
		position: relative;
		z-index: 200;

		background-color: #1f1f1f;
	}

	.header-navigation {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		position: relative;
		//padding: 17px 25px;


		.header-logo {
			display: flex;
			justify-content: center;
			align-items: center;

			position: relative;

			width: 240px;
			padding: 17px 0;

			font-size: 30px;
			color: white;
			font-weight: 600;

			.burger-button {
				position: relative;

				display: flex;
				align-items: center;

				width: 32px;
				height: 32px;
				margin-right: 5px;

				.burger-icon {
					display: inline-block;

					position: absolute;

					width: 20px;
					height: 2px;

					background-color: #999999;

					&:before, &:after {
						content: "";
						display: block;

						position: absolute;
						z-index: 100;

						width: 20px;
						height: 2px;

						background-color: #999999;
					}

					&:before {
						top: 7px;
					}

					&:after {
						bottom: 7px;
					}
				}
			}
		}

		.my-links {
			margin-left: 15px;
			padding: 0 15px;

			&__item {
				color: white;

				transition: opacity .2s;
				opacity: .6;

				&:hover {
					opacity: 1;
				}

				&:not(:last-child) {
					margin-right: 15px;
				}
			}
		}

		.profile {
			width: 42px;
			height: 42px;

			margin-left: auto;

			border-radius: 50%;

			background: url("data:image/svg+xml,%3csvg fill='none' width='48px' height='48px' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='%23777' fill-opacity='.4' d='M0 0h48v48H0z'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.819 11.643c-1.845 0-3.43.587-4.511 1.927-1.036 1.284-1.452 3.07-1.452 5.156 0 4.387 2.9 7.384 5.963 7.384 3.062 0 5.963-2.997 5.963-7.384 0-2.085-.416-3.871-1.452-5.155-1.08-1.34-2.666-1.928-4.511-1.928ZM14.34 34.068c.425.522 2.39 2.275 9.66 2.275s9.236-1.753 9.66-2.275a.434.434 0 0 0 .092-.32c-.091-.994-.984-5.874-9.752-5.874-8.767 0-9.66 4.88-9.75 5.874-.011.117.016.229.09.32Z' fill='%23fff' fill-opacity='.6'/%3e%3c/svg%3e") no-repeat center center;
		}

	}

	.black-background {
		background-color: #333;
	}
</style>