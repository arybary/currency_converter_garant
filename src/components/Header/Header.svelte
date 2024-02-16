<script>
	import { page } from '$app/stores';
	import './Header.scss';
</script>

<header class="header">
	<div class="header__nav">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/contacts' ? 'page' : undefined}>
				<a href="/contacts">About</a>
			</li>
		</ul>
	</div>
</header>
