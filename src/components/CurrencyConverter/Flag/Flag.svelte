<script lang="ts">
	import { hasFlag } from 'country-flag-icons';
	import { flagUrl } from '../../../constants/currenciesConst';
	export let currency: string;
	const currencyForFlag: string = currency.slice(0, -1);
</script>

{#if hasFlag(currencyForFlag)}
	<img alt="United States" src={`${flagUrl}/${currencyForFlag}.svg`} />
{/if}
