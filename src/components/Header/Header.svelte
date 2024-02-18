<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/NBU_logo.svg';
	import './Header.scss';
</script>

<header class="header">
	<nav class="header__nav">
		<div class="logo">
			<a href="https://bank.gov.ua/">
				<img  class="logo__img" src={logo} alt="NBU" />
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
