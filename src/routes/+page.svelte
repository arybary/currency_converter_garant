<script>
	import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter.svelte';
	import { currencyUAH } from '../constants/currenciesConst';
	import { currencies } from '../store/currencyConverterStore';

	export let data;
	const { currenciesData } = data;
	const currenciesPlusUAH = [currencyUAH, ...currenciesData];
	currencies.set(currenciesPlusUAH);
</script>

<svelte:head>
	<title>Converter</title>
	<meta name="description" content="Currency Converter" />
</svelte:head>

<CurrencyConverter />
