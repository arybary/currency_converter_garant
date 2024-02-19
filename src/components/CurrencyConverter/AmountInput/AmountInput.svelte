<script lang="ts">
	import type { Writable } from 'svelte/store';
	import './AmountInput.scss';

	export let amount: Writable<number>;
	export let typeConvertForAmount: 'to' | 'from';
	export let onConvert: (convertType: 'to' | 'from') => void;

	const onAmountChange = (event: Event) => {
		amount.set(Number((event.target as HTMLInputElement).value));
		onConvert(typeConvertForAmount);
	};
</script>

<div class="amount">
	<h class="amount__title">amount {typeConvertForAmount} convert:</h>
	<input
		class="amount__input"
		type="number"
		min="1"
		bind:value={$amount}
		on:input={(e) => onAmountChange(e)}
		title={typeConvertForAmount}
	/>
</div>
