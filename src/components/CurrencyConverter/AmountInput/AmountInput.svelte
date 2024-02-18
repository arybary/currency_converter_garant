<script lang="ts">
	import './AmountInput.scss';

	export let amount: number;
	export let name: 'to' | 'from';
	export let onAmountChange: (event: Event) => void;
</script>


	<input
		class="amount__input"
		type="number"
		min="1"
		bind:value={amount}
		on:input={onAmountChange}
		title={name}
		placeholder={name}
	/>

