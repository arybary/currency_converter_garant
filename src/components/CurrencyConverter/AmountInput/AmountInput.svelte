<script lang="ts">
	export let amount: number;
  export let name: 'to' | 'from'
	export let onAmountChange: (event: Event) => void;
</script>

<input class="input__amount" type="number" min="1" bind:value={amount} on:input={onAmountChange} title={name} />

<style lang="scss">
	@use '/src/styles/variables' as *;

	.input__amount {
    height: 3rem;
		padding: 10px;
		margin-right: 10px;
		border: 1px solid $color-system-default-30;
		border-radius: 5px;
		background-color: $color-system-default-10;
		color: $color-neutral-colors-black;
		border-bottom: 0.2rem solid $color-primary-dark-green;

		&:hover,
		&:focus {
			border-bottom: 0.2rem solid $color-primary-light-green;
			outline: none;
		}
	}
</style>
