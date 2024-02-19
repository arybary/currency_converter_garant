<script lang="ts">
	import './CurrencyConverter.scss';
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
	import CurrencyChangeDropdown from './CurrencyChangeDropdown/CurrencyChangeDropdown.svelte';
	import CurrencyReverseBtn from './CurrencyBtnReverse/CurrencyBtnReverse.svelte';
	import CurrencySlider from './CurrencySlider/CurrencySlider.svelte';

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
		const newRate = 1 / $rateCurrencyConverter;
		const convertedAmount = convertCurrency(newRate, $toAmount);
		fromAmount.set(convertedAmount);
	};

	const convertReverse = () => {
		const convertedAmount = convertCurrency(1 / $rateCurrencyConverter, $fromAmount);
		toAmount.set(convertedAmount);
	};

	const handleFromCurrencyChange = (currency: string) => {
		fromCurrency.set(currency);
		convertToFrom();
	};
	const handleToCurrencyChange = (currency: string) => {
		toCurrency.set(currency);
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

	const handleReverseCurrency = () => {
		const tempToCurrency = $toCurrency;
		const tempFromCurrency = $fromCurrency;
		toCurrency.set(tempFromCurrency);
		fromCurrency.set(tempToCurrency);
		convertReverse();
	};
</script>

<div>
	<div class="converter">
		<div class="converter__input converter__input_reverse">
			<CurrencyChangeDropdown
				bind:selectedCurrency={$fromCurrency}
				onCurrencyChange={handleFromCurrencyChange}
				{currencies}
			/>
			<AmountInput
				name={'from'}
				bind:amount={$fromAmount}
				onAmountChange={handleFromAmountChange}
			/>
		</div>
		<CurrencyReverseBtn onReverseCurrency={handleReverseCurrency} />
		<div class="converter__input">
			<CurrencyChangeDropdown
				bind:selectedCurrency={$toCurrency}
				onCurrencyChange={handleToCurrencyChange}
				{currencies}
			/>
			<AmountInput name={'to'} bind:amount={$toAmount} onAmountChange={handleToAmountChange} />
		</div>
	</div>
	<CurrencySlider />
</div>
