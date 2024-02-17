<script>
	import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter.svelte';

	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>Converter</title>
	<meta name="description" content="Currency Converter" />
</svelte:head>

<CurrencyConverter currencies={data.currencies} />
