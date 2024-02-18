<script lang="ts">
	export let amount: number;
	export let onAmountChange: (event: Event) => void;
</script>

<input class="input__amount" type="number" min="1" bind:value={amount} on:input={onAmountChange} />

<style lang="scss">
	@use '/src/styles/variables' as *;

	.input__amount {
		position: relative;
		display: block;
		width: 100%;
   text-align: end;
		height: 4rem;
		padding: 2rem;
		font-size: 1.5rem;
		background-color: $color-primary-green;
		color: $color-primary-dark-green;
		border: none;
		border-bottom: 0.5rem solid $color-primary-dark-green;
		cursor: pointer;

		&:hover,
		&:focus {
			border-bottom: 1rem solid $color-primary-light-green;
			outline: none;
		}
    
	}
  .input__amount::-webkit-inner-spin-button,
.input__amount::-webkit-outer-spin-button {
    color: red; /* Цвет стрелки */
}

/* Изменение размера стрелок */
.input__amount::-webkit-inner-spin-button:before,
.input__amount::-webkit-outer-spin-button:before,
.input__amount::-webkit-inner-spin-button:after,
.input__amount::-webkit-outer-spin-button:after {
    font-size: 20px; /* Размер стрелок */
}


</style>
