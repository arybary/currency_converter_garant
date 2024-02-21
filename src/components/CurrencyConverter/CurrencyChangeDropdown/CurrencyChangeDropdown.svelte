<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Currency } from '../../../type/Currency';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Flag from '../Flag/Flag.svelte';
	import { getRateCurrency, typeConvert } from '../../../store/currencyConverterStore';

	export let currencies: Writable<Currency[]>;
	export let typeConvertForCurrency: 'to' | 'from';
	export let selectedCurrency: Writable<string>;

	const flyForX = typeConvertForCurrency == 'from' ? -300 : 300;

	let isOpen = false;
	let dropdownElement: HTMLElement;

	const toggleDropdown = (e: Event) => {
		isOpen = !isOpen;
		if (event) {
			event.stopPropagation();
		}
	};

	const escFunction = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			isOpen = false;
		}
	};

	const handleModalClick = (e: { target: any; currentTarget: any }) => {
		if (e.target === e.currentTarget) {
			isOpen = false;
		}
	};

	const handleClickOutside = (event: { target: Node | null }) => {
		if (dropdownElement && !dropdownElement.contains(event.target)) {
			isOpen = false;
		}
	};

	onMount(() => {
		const handler = (event: any) => handleClickOutside(event);
		document.addEventListener('keydown', escFunction);
		document.addEventListener('click', handler);
		const unsubscribe = getRateCurrency.subscribe(() => {});
		return () => {
			document.removeEventListener('click', handler);
			document.removeEventListener('keydown', escFunction);
			unsubscribe;
		};
	});

	const onCurrencyChange = (event: Event, currency: string) => {
		typeConvert.set(typeConvertForCurrency);
		selectedCurrency.set(currency);

		toggleDropdown(event);
	};
</script>

<button class="currency__item" on:click={toggleDropdown}>
	<div class="currency__item__flag"><Flag currency={$selectedCurrency} /></div>
	<h class="currency__item__currency-name">{$selectedCurrency}</h>
</button>

{#if isOpen}
	<button
		class="dropdown"
		transition:fly={{ y: -100, x: flyForX, duration: 300 }}
		on:click|stopPropagation={handleModalClick}
		bind:this={dropdownElement}
	>
		<ul class="dropdown__content">
			{#each $currencies as { cc, txt }}
				<button
					class="currency__item"
					on:click={(e) => {
						onCurrencyChange(e, cc);
					}}
					><div class="currency__item currency__item_pos_size">
						<div class="flag_size"><Flag currency={cc} /></div>
						<h>{cc}</h>
					</div>
				</button>
			{/each}
		</ul>
	</button>
{/if}

<style lang="scss">
	@use '/src/styles/variables' as *;

	.dropdown {
		position: absolute;
		background-color: $color-primary-light-green;
		padding: 1rem;
		z-index: 9;
		border: 0.2rem solid $color-system-default-30;
		border-radius: 1rem;

		&__content {
			display: flex;
			flex-direction: column;
			background-color: $color-primary-light-green;
			max-height: 20rem;
			overflow-y: auto;
			overflow-x: none;
		}
	}

	.currency__item {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		width: 6rem;
		height: 6rem;
		background-color: $color-primary-dark-green;
		color: $color-neutral-colors-white;
		border-radius: 0.5rem;
		border-bottom: 0.2rem solid $color-neutral-colors-white;
		transition: width 0.3s;
		&__flag {
			width: 100%;
		}

		&__currency-name {
			font-family: $secondary-font;
			font-size: 1.2rem;
			font-weight: 600;
		}

		&_pos_size {
			gap: 0.5rem;
			padding: 0.5rem;
			flex-direction: row;
			justify-content: space-around;
			width: 100%;
			height: 4rem;
		}
	}

	.flag_size {
		width: 3rem;
		height: 2rem;
	}
</style>
