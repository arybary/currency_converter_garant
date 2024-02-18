<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Currency } from '../../../type/Currency';

	export let currencies: Writable<Currency[]>;
	export let selectedCurrency: string;
	export let onCurrencyChange: (event: Event) => void;
</script>

<select class="currency__select" bind:value={selectedCurrency} on:change={onCurrencyChange}>
	{#each $currencies as currency}
		<option class="currency__option" value={currency.cc}>
			<div>{currency.cc}---<span class="currency__txt">{currency.txt}</span></div>
		</option>
	{/each}
</select>

<style lang="scss">
	@use '/src/styles/variables' as *;
	.currency {
		&__select {
			background-color: $color-primary-dark-green;
			color: $color-neutral-colors-white;
			width: 25%;
			font-size: 1.5rem;

			/* Начальное скрытие текста */
			.currency__txt {
				display: none;
			}
		}
		&__option {
			margin: 1rem;
			height: 3rem;
			border-radius:50%;

			/* Показ текста при наведении */
			&:hover .currency__txt {
				display: inline; /* или block, в зависимости от потребностей дизайна */
			}
		}
	}
</style>
