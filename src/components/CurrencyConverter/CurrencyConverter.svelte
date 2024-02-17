<script lang="ts">
	import type { Currency } from '../../type/Currency';
	import { currencyUAH } from '../../constants/currency';

	export let currencies: Currency[];

	currencies.push(currencyUAH);
	console.log(currencies);

	const convertCurrency = (fromCurrency: string, toCurrency: string, amount: number): number => {
		if (fromCurrency && toCurrency && fromAmount) {
			const fromRate: number =
				currencies.find((currency) => currency.cc === fromCurrency)?.rate || 1;
			const toRate: number = currencies.find((currency) => currency.cc === toCurrency)?.rate || 1;

			return parseFloat(((amount * fromRate) / toRate).toFixed(2));
		}
		return 1;
	};

	let fromCurrency = 'USD';
	let toCurrency = 'UAH';
	let fromAmount: number = 1;
	let toAmount: number = convertCurrency(fromCurrency, toCurrency, fromAmount);

	const handleFromAmountChange = (event: Event) => {
		fromAmount = parseFloat((event.target as HTMLInputElement).value);
		toAmount = convertCurrency(fromCurrency, toCurrency, fromAmount);
	};

	const handleToAmountChange = (event: Event) => {
		toAmount = parseFloat((event.target as HTMLInputElement).value);
		fromAmount = convertCurrency(toCurrency, fromCurrency, toAmount);
	};

	const handleFromCurrencyChange = (event: Event) => {
		fromCurrency = (event.target as HTMLSelectElement).value;
		fromAmount = convertCurrency(toCurrency, fromCurrency, toAmount as number);
	};

	const handleToCurrencyChange = (event: Event) => {
		toCurrency = (event.target as HTMLSelectElement).value;
		toAmount = convertCurrency(fromCurrency, toCurrency, fromAmount as number);
	};
</script>

<div>
	<div>
		<input type="number" min="1" bind:value={fromAmount} on:input={handleFromAmountChange} />
		<select bind:value={fromCurrency} on:change={handleFromCurrencyChange}>
			{#each currencies as currency}
				<option value={currency.cc}>{currency.cc}</option>
			{/each}
		</select>
	</div>
	<div>
		<input type="number" min="1" bind:value={toAmount} on:input={handleToAmountChange} />
		<select bind:value={toCurrency} on:change={handleToCurrencyChange}>
			{#each currencies as currency}
				<option value={currency.cc}>{currency.cc}</option>
			{/each}
		</select>
	</div>
</div>

<style>
	select,
	input {
		margin: 5px;
	}
</style>
