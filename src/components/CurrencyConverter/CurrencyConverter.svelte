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
		setCurrenciesForConverter
	} from '../../store/currencyConverterStore';
	import { convertCurrency, getRateCurrency } from '../../utils/currencyConverter';
	import { onMount } from 'svelte';

	onMount(() => {
		setCurrenciesForConverter($currencies);
		rateCurrencyConverter.set(getRateCurrency($currenciesForConverter, $fromCurrency, $toCurrency));
		convertFromTo();
	});
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
		rateCurrencyConverter.set(getRateCurrency($currenciesForConverter, $fromCurrency, $toCurrency));
		convertToFrom();
	}

	function handleToCurrencyChange(event: Event) {
		toCurrency.set((event.target as HTMLSelectElement).value);
		rateCurrencyConverter.set(getRateCurrency($currenciesForConverter, $fromCurrency, $toCurrency));
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
