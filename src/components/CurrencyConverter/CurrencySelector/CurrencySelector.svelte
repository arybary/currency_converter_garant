<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Currency } from '../../../type/Currency';
    
	export let currencies: Writable<Currency[]>;
	export let selectedCurrency: string;
	export let onCurrencyChange: (event: Event) => void;
</script>

<select bind:value={selectedCurrency} on:change={onCurrencyChange}>
	{#each $currencies as currency}
		<option value={currency.cc}>{currency.cc}</option>
	{/each}
</select>
