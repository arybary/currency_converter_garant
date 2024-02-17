<script lang="ts">
	import CurrencySelector from './CurrencySelector/CurrencySelector.svelte';
	import AmountInput from './AmountInput/AmountInput.svelte';
	import {
		currencies,
		currenciesForConverter,
		fromCurrency,
		toCurrency,
		fromAmount,
		toAmount,
		rateCurrencyConverter,
		setCurrenciesForConverter,
		getRateCurrency
	} from '../../store/currencyConverterStore';
	import { onMount } from 'svelte';

	const convertCurrency = (amount: number, rate: number) => parseFloat((amount * rate).toFixed(2));

	onMount(() => {
		setCurrenciesForConverter($currencies);
		getRateCurrency($currenciesForConverter, $fromCurrency, $toCurrency);
		convertFromTo();
	});

	$: getRateCurrency($currenciesForConverter, $fromCurrency, $toCurrency);
	const convertFromTo = () => {
		const convertedAmount = convertCurrency($rateCurrencyConverter, $fromAmount);
		toAmount.set(convertedAmount);
	};
	const convertToFrom = () => {
		const convertedAmount = convertCurrency(1 / $rateCurrencyConverter, $toAmount);
		fromAmount.set(convertedAmount);
	};
	const handleFromCurrencyChange = (event: Event) => {
		fromCurrency.set((event.target as HTMLSelectElement).value);
		convertToFrom();
	};
	const handleToCurrencyChange = (event: Event) => {
		toCurrency.set((event.target as HTMLSelectElement).value);
		convertFromTo();
	};
	const handleFromAmountChange = (event: Event) => {
		fromAmount.set(parseFloat((event.target as HTMLInputElement).value));
		convertFromTo();
	};
	const handleToAmountChange = (event: Event) => {
		toAmount.set(parseFloat((event.target as HTMLInputElement).value));
		convertToFrom();
	};
</script>

<div>
	<CurrencySelector
		bind:selectedCurrency={$fromCurrency}
		onCurrencyChange={handleFromCurrencyChange}
		{currencies}
	/>
	<AmountInput bind:amount={$fromAmount} onAmountChange={handleFromAmountChange} />
</div>
<div>rate: {$rateCurrencyConverter.toFixed(2)}</div>
<div>
	<CurrencySelector
		bind:selectedCurrency={$toCurrency}
		onCurrencyChange={handleToCurrencyChange}
		{currencies}
	/>
	<AmountInput bind:amount={$toAmount} onAmountChange={handleToAmountChange} />
</div>
