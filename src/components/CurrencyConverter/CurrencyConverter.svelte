<script lang="ts">
	import CurrencySelector from './CurrencySelector/CurrencySelector.svelte';
	import AmountInput from './AmountInput/AmountInput.svelte';
	import {
		currencies,
		fromCurrency,
		toCurrency,
		fromAmount,
		toAmount
	} from '../../store/currencyConverterStore';
	import { convertCurrency } from '../../utils/currencyConverter';

	let updatingFrom = false;
	let updatingTo = false;

	// React to changes in fromAmount or fromCurrency to update toAmount
	$: if ($fromCurrency && $toCurrency && $fromAmount && !updatingTo) {
		updatingFrom = true;
		const convertedAmount = convertCurrency($currencies, $fromCurrency, $toCurrency, $fromAmount);
		toAmount.set(convertedAmount);
		updatingFrom = false;
	}

	// React to changes in toAmount or toCurrency to update fromAmount
	$: if ($fromCurrency && $toCurrency && $toAmount && !updatingFrom) {
		updatingTo = true;
		const convertedAmount = convertCurrency($currencies, $toCurrency, $fromCurrency, $toAmount);
		fromAmount.set(convertedAmount);
		updatingTo = false;
	}
	function handleFromCurrencyChange(event: Event) {
		fromCurrency.set((event.target as HTMLSelectElement).value);
	}

	function handleToCurrencyChange(event: Event) {
		toCurrency.set((event.target as HTMLSelectElement).value);
	}

	function handleFromAmountChange(event: Event) {
		fromAmount.set(parseFloat((event.target as HTMLInputElement).value));
	}

	function handleToAmountChange(event: Event) {
		toAmount.set(parseFloat((event.target as HTMLInputElement).value));
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
<div>
	<CurrencySelector
		bind:selectedCurrency={$toCurrency}
		onCurrencyChange={handleToCurrencyChange}
		{currencies}
	/>
	<AmountInput bind:amount={$toAmount} onAmountChange={handleToAmountChange} />
</div>
