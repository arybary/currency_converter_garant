<script>
	import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter.svelte';
	import { currencyUAH } from '../constants/currenciesConst';	

	export let data;
	const { currencies } = data;
	currencies.unshift(currencyUAH);
</script>

<svelte:head>
	<title>Converter</title>
	<meta name="description" content="Currency Converter" />
</svelte:head>

<CurrencyConverter currencies={currencies} />
