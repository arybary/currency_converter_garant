<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/NBU_logo.svg';
</script>

<header class="header">
	<nav class="header__nav">
		<div class="logo">
			<a href="https://bank.gov.ua/">
				<img class="logo__img" src={logo} alt="NBU" />
			</a>
		</div>
		<ul class="nav__list">
			<li class={$page.url.pathname === '/' ? 'nav__item nav__item_active' : 'nav__item'}>
				<a class="nav__link" href="/">converter</a>
			</li>
			<li class={$page.url.pathname === '/contacts' ? 'nav__item nav__item_active' : 'nav__item'}>
				<a class="nav__link" href="/contacts">contacts</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@use '/src/styles/variables' as *;
	@use '/src/styles/mixins' as *;

	.header {
		background-color: $color-primary-green;
		color: $color-neutral-colors-white;
		text-align: center;
		padding-top: 1rem;

		&__nav {
			display: flex;
			width: 100%;
			height: 3rem;
			align-items: center;
			justify-content: space-between;
			padding: 0.5rem;
			gap: 2rem;
		}
		.logo {
			width: 8rem;
			height: 3em;
			&__img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
		.nav__list {
			display: flex;
			justify-content: space-between;
			gap: 2rem;
			font-size: 1rem;
			color: $color-neutral-colors-white;
			text-transform: uppercase;

			.nav__item {
				display: flex;
				padding: 0.5rem;
				align-items: center;
				height: 3.5rem;

				&_active {
					background-color: $color-primary-light-green;
					font-weight: 600;
					color: $color-primary-dark-green;
					border-radius: 1rem;
					border-bottom: 0.2rem solid $color-primary-dark-green;
				}
			}

			@include tablet {
				font-size: 1.2rem;
			}
		}
	}
</style>
