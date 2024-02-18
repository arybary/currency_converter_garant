<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Currency } from '../../../type/Currency';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let currencies: Writable<Currency[]>;
	export let selectedCurrency: string;
	export let onCurrencyChange: (currency: string) => void;

	let isOpen = false;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};
</script>

<button class="currency__item" on:click={toggleDropdown}>
	{selectedCurrency}
</button>

{#if isOpen}
	<div
		class="dropdown"
		transition:fly={{ y: 0, duration: 300 }}
		on:click|stopPropagation={toggleDropdown}
	>
		<div class="dropdown__content">
			{#each $currencies as { cc, txt }}
				<div
					class="currency__item"
					on:click={() => {
						onCurrencyChange(cc);
						toggleDropdown();
					}}
				>
					<div><span>{cc}</span></div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	@use '/src/styles/variables' as *;

	.dropdown {
		widows: 30rem;
		position: absolute;
		padding: 1rem;
		z-index: 9;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		.dropdown__content {
			max-height: 20rem; /* Выберите желаемую высоту */
			overflow-y: auto;
			overflow-x: none;
		}
	}
	.currency__item {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		display: flex;
		width: 5rem;
		height: 5rem;
		display: flex;
		padding: 2rem;
		background-color: $color-primary-dark-green;
		color: $color-neutral-colors-white;
		padding: 8px 0;
		border-radius: 4px;
		border-bottom: 1px solid $color-neutral-colors-white;
		transition: width 0.3s;
		&__txt {
			position: absolute;
			z-index: 10;
		}
	}
</style>
