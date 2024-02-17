<script>
	import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter.svelte';
	import { currencies, setCurrencies } from '../store/currencyConverterStore';

	export let data;

	const { currenciesData } = data;
	setCurrencies(currenciesData);
</script>

<svelte:head>
	<title>Converter</title>
	<meta name="description" content="Currency Converter" />
</svelte:head>

<CurrencyConverter />
