<script lang="ts">
	import './CurrencyChangeDropdown.scss';
	import type { Writable } from 'svelte/store';
	import type { Currency } from '../../../type/Currency';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Flag from '../Flag/Flag.svelte';

	export let currencies: Writable<Currency[]>;
	export let selectedCurrency: string;
	export let onCurrencyChange: (currency: string) => void;

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
		return () => {
			document.removeEventListener('click', handler);
			document.removeEventListener('keydown', escFunction);
		};
	});
</script>

<button class="currency__item" on:click={toggleDropdown}>
	<Flag currency={selectedCurrency} />
	<h>{selectedCurrency}</h>
</button>

{#if isOpen}
	<button
		class="dropdown"
		transition:fly={{ y: 0, duration: 300 }}
		on:click|stopPropagation={handleModalClick}
		bind:this={dropdownElement}
	>
		<ul class="dropdown__content">
			{#each $currencies as { cc }}
				<button
					class="currency__item currency__item_pos_size"
					on:click={(e) => {
						onCurrencyChange(cc);
						toggleDropdown(e);
					}}
				>
					<div class="flag_size"><Flag currency={cc} /></div>
					<h>{cc}</h>
				</button>
			{/each}
		</ul>
	</button>
{/if}
