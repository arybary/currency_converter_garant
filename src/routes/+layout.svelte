<script>
	import Header from '../components/Header/Header.svelte';
	import './app.scss';
</script>

<div class="app">
	<Header />
	<main class="app__main">
		<slot />
	</main>
	<footer class="app__footer">
		<p>create by Medvid Rostislav</p>
	</footer>
</div>
