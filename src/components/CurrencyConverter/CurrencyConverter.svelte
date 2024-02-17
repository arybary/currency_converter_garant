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
	function convertFromTo() {
		const convertedAmount = convertCurrency($rateCurrencyConverter, $fromAmount);
		toAmount.set(convertedAmount);
	}
	function convertToFrom() {
		const convertedAmount = convertCurrency(1 / $rateCurrencyConverter, $toAmount);
		fromAmount.set(convertedAmount);
	}
	function handleFromCurrencyChange(event: Event) {
		fromCurrency.set((event.target as HTMLSelectElement).value);
		convertToFrom();
	}
	function handleToCurrencyChange(event: Event) {
		toCurrency.set((event.target as HTMLSelectElement).value);
		convertFromTo();
	}
	function handleFromAmountChange(event: Event) {
		fromAmount.set(parseFloat((event.target as HTMLInputElement).value));
		convertFromTo();
	}
	function handleToAmountChange(event: Event) {
		toAmount.set(parseFloat((event.target as HTMLInputElement).value));
		convertToFrom();
	}
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
