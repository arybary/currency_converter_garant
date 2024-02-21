<script lang="ts">
	import AmountInput from './AmountInput/AmountInput.svelte';
	import {
		fromCurrency,
		toCurrency,
		fromAmount,
		toAmount,
		setCurrenciesForConverter,
		convert,
		getRateCurrency
	} from '../../store/currencyConverterStore';
	import { onMount } from 'svelte';
	import CurrencyChangeDropdown from './CurrencyChangeDropdown/CurrencyChangeDropdown.svelte';
	import CurrencyReverseBtn from './CurrencyBtnReverse/CurrencyBtnReverse.svelte';

	onMount(() => {
		const unsubscribeCurrencies = setCurrenciesForConverter.subscribe(() => {});
		const unsubscribeRate = getRateCurrency.subscribe(() => {});
		const unsubscribeConvert = convert.subscribe(() => {});
		return { unsubscribeCurrencies, unsubscribeRate, unsubscribeConvert };
	});
</script>

<div class="converter">
	<div class="converter__input converter__input_reverse">
		<CurrencyChangeDropdown typeConvertForCurrency={'to'} selectedCurrency={fromCurrency} />
		<AmountInput typeConvertForAmount={'from'} amount={fromAmount} />
	</div>
	<CurrencyReverseBtn />
	<div class="converter__input">
		<CurrencyChangeDropdown typeConvertForCurrency={'from'} selectedCurrency={toCurrency} />
		<AmountInput typeConvertForAmount={'to'} amount={toAmount} />
	</div>
</div>

<style lang="scss">
	@use '/src/styles/variables' as *;
	@use '/src/styles/mixins' as *;
	.converter {
		display: flex;
		flex-direction: column;
		background-color: $color-primary-green;
		width: 100%;
		padding: 2rem;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		border-bottom: 0.2rem solid $color-primary-dark-green;
		-webkit-border-radius: 1rem;
		-moz-border-radius: 1rem;
		-ms-border-radius: 1rem;
		-o-border-radius: 1rem;

		&__input {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;

			&_reverse {
				@include desktop {
					flex-direction: row-reverse;
				}
			}
		}

		@include desktop {
			flex-direction: row;
		}
	}
</style>
