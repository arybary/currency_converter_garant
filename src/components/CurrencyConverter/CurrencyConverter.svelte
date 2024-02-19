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
		getRateCurrency,
		typeConvert
	} from '../../store/currencyConverterStore';
	import { onMount } from 'svelte';
	import CurrencyChangeDropdown from './CurrencyChangeDropdown/CurrencyChangeDropdown.svelte';
	import CurrencyReverseBtn from './CurrencyBtnReverse/CurrencyBtnReverse.svelte';

	const convertCurrency = (amount: number, rate: number) => Number((amount * rate).toFixed(2));

	onMount(() => {
		setCurrenciesForConverter($currencies);
		getRateCurrency($currenciesForConverter, $fromCurrency, $toCurrency);
		convert($typeConvert);
	});

	$: {
		getRateCurrency($currenciesForConverter, $fromCurrency, $toCurrency), convert($typeConvert);
	}

	const convert = (convertType: 'to' | 'from') =>
		convertType !== 'to'
			? toAmount.set(convertCurrency($rateCurrencyConverter, $fromAmount))
			: fromAmount.set(convertCurrency(1 / $rateCurrencyConverter, $toAmount));

	const convertReverse = () => {
		const newRate = 1 / $rateCurrencyConverter;
		const convertedAmount = convertCurrency(newRate, $fromAmount);
		toAmount.set(convertedAmount);
	};

	const handleReverseCurrency = () => {
		const tempToCurrency = $toCurrency;
		const tempFromCurrency = $fromCurrency;
		toCurrency.set(tempFromCurrency);
		fromCurrency.set(tempToCurrency);
		convertReverse();
	};
</script>

<div class="converter">
	<div class="converter__input converter__input_reverse">
		<CurrencyChangeDropdown
			typeConvertForCurrency={'to'}
			selectedCurrency={fromCurrency}
			onConvert={convert}
			{currencies}
		/>
		<AmountInput typeConvertForAmount={'from'} amount={fromAmount} onConvert={convert} />
	</div>
	<CurrencyReverseBtn onReverseCurrency={handleReverseCurrency} />
	<div class="converter__input">
		<CurrencyChangeDropdown
			typeConvertForCurrency={'from'}
			selectedCurrency={toCurrency}
			onConvert={convert}
			{currencies}
		/>
		<AmountInput typeConvertForAmount={'to'} amount={toAmount} onConvert={convert} />
	</div>
</div>
