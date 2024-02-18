<script lang="ts">
	import {
		rateCurrencyConverter,
		toCurrency,
		fromCurrency
	} from '../../../store/currencyConverterStore';
	import './CurrencyBtnReverse.scss';
	import arrow from '$lib/images/arrow.svg';
	export let onReverseCurrency: () => void;
</script>

<button class="btn" on:click={onReverseCurrency}>
	<div class="btn__icon">
		<img class="btn__icon__img" src={arrow} alt="arrow" />
	</div>
	<h>{$rateCurrencyConverter.toFixed(2)}</h></button
>
