<script lang="ts">
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
</script>

<div class="converter">
	<div class="converter__input converter__input_reverse">
		<CurrencyChangeDropdown
			bind:selectedCurrency={$fromCurrency}
			onCurrencyChange={handleFromCurrencyChange}
			{currencies}
		/>
		<AmountInput bind:amount={$fromAmount} onAmountChange={handleFromAmountChange} />
	</div>
	<button class="converter__btn">{$rateCurrencyConverter.toFixed(2)}</button>
	<div class="converter__input">
		<CurrencyChangeDropdown
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
			align-items:center;
			justify-content: center;
			gap:1rem;
			padding: 2rem;

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
			padding: 10px 20px;
			background-color: $color-primary-dark-green;
			color: $color-neutral-colors-white;
			border: none;
			border-radius: 5px;
			cursor: pointer;
			transition: background-color 0.3s ease;
			&:hover {
				cursor:
					url('$lib/images/arrow.svg') 15 15,
					auto;
				background-color: darken($color-primary-dark-green, 10%);

				box-shadow: 13px 17px 42px 0px rgba(0, 0, 0, 0.75);
			}
		}
	}
</style>
