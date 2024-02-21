<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { convert, typeConvert } from '../../../store/currencyConverterStore';
	import { onMount } from 'svelte';

	export let amount: Writable<number>;
	export let typeConvertForAmount: 'to' | 'from';

	onMount(() => {
		const unsubscribe = convert.subscribe(() => {});
		return unsubscribe;
	});

	const onAmountChange = (event: Event) => {
		typeConvert.set(typeConvertForAmount);
		amount.set(Number((event.target as HTMLInputElement).value));
	};
</script>

<div class="amount">
	<h class="amount__title">amount {typeConvertForAmount} convert:</h>
	<input
		class="amount__input"
		type="number"
		min="1"
		bind:value={$amount}
		on:input={onAmountChange}
		title={typeConvertForAmount}
	/>
</div>

<style lang="scss">
	@use '/src/styles/variables' as *;

	.amount {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		&__title {
			text-align: center;
			padding: 0.2rem;
			font-family: $secondary-font;
			font-size: 1rem;
			font-weight: 600;
		}
		&__input {
			height: 3rem;
			padding: 1rem;
			width: 100%;
			text-align: end;
			border: 1px solid $color-system-default-30;
			border-radius: 1rem;
			background-color: $color-system-default-10;
			color: $color-neutral-colors-black;
			border-bottom: 0.2rem solid $color-primary-dark-green;
			font-size: 1rem;
			font-weight: 600;
			-webkit-border-radius: 1rem;
			-moz-border-radius: 1rem;
			-ms-border-radius: 1rem;
			-o-border-radius: 1rem;
			&:hover,
			&:focus {
				border-bottom: 0.2rem solid $color-primary-light-green;
				outline: none;
			}
		}
	}
</style>
