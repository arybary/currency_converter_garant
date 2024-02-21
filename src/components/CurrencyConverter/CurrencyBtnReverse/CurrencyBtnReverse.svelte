<script lang="ts">
	import {
		rateCurrencyConverter,
		toCurrency,
		fromCurrency,
		typeConvert
	} from '../../../store/currencyConverterStore';
	import arrow from '$lib/images/arrow.svg';

	const handleReverseCurrency = () => {
		const tempToCurrency = $toCurrency;
		const tempFromCurrency = $fromCurrency;

		fromCurrency.set(tempToCurrency);
		toCurrency.set(tempFromCurrency);
	};
</script>

<button class="btn" on:click={handleReverseCurrency}>
	<div class="btn__icon">
		<img class="btn__icon__img" src={arrow} alt="arrow" />
	</div>
	<h>{$rateCurrencyConverter.toFixed(2)}</h></button
>

<style lang="scss">
	@use '/src/styles/variables' as *;
	@use '/src/styles/mixins' as *;

	.btn {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 6rem;
		height: 4rem;

		background-color: $color-primary-light-green;
		color: $color-neutral-colors-black;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;

		&:hover {
			background-color: $color-primary-dark-green;
			color: $color-neutral-colors-white;
		}
		&__icon {
			width: 2rem;
			height: 2em;
			&__img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
	}
</style>
