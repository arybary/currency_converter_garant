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

<div class="converter">
	<div class="converter__input converter__input_reverse">
		<CurrencySelector
			bind:selectedCurrency={$fromCurrency}
			onCurrencyChange={handleFromCurrencyChange}
			{currencies}
		/>
		<AmountInput bind:amount={$fromAmount} onAmountChange={handleFromAmountChange} />
	</div>
	<button class="converter__btn">{$rateCurrencyConverter.toFixed(2)}</button>
	<div class="converter__input">
		<CurrencySelector
			bind:selectedCurrency={$toCurrency}
			onCurrencyChange={handleToCurrencyChange}
			{currencies}
		/>
		<AmountInput bind:amount={$toAmount} onAmountChange={handleToAmountChange} />
	</div>
</div>

<style lang="scss">
	@use '/src/styles/variables' as *;
	@use '/src/styles/mixins' as *;
	.converter {
		display: flex;
		flex-direction: column;
		background-color: $color-primary-green;
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
			padding: 1rem;

			&_reverse {
				@include desktop {
					flex-direction: row-reverse;
				}
			}
		}

		@include desktop {
			flex-direction: row;
		}
		&__btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 5rem;
			height: 5rem;
			color: $color-neutral-colors-white;
			font-size: 1.5rem;
			font-weight: 600;
			border-radius: 100%;
			background-color: $color-primary-green;
			box-shadow: 13px 17px 16px 0px rgba(0, 0, 0, 0.75);
			padding: 0.5rem;
			border: none;
			transition: all 0.4s ease;
			&:hover {
				cursor:
					url('$lib/images/arrow.svg') 15 15,
					auto;
				color: $color-primary-dark-green;
				box-shadow: 13px 17px 42px 0px rgba(0, 0, 0, 0.75);
			}
		}
	}
</style>
