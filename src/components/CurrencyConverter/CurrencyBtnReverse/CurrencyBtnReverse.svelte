<script lang="ts">
	import { rateCurrencyConverter } from '../../../store/currencyConverterStore';
	import arrow from '$lib/images/arrow.svg';
</script>

<button class="btn">
	<div class="btn__icon">
		<img class="btn__icon__img" src={arrow} alt="arrow" />
	</div>
	{$rateCurrencyConverter.toFixed(2)}</button
>

<style lang="scss">
	@use '/src/styles/variables' as *;
	@use '/src/styles/mixins' as *;

	.btn {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: $color-primary-light-green;
		color: $color-neutral-colors-black;
		border: none;
		border-radius: 0.5rem;
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
