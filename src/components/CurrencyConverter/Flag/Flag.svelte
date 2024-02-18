<script lang="ts">
	import { hasFlag } from 'country-flag-icons';
	import { flagUrl } from '../../../constants/currenciesConst';
	export let currency: string;
	$: currencyForFlag = currency.slice(0, -1);
</script>

{#if hasFlag(currencyForFlag)}
	<img alt="Flag Country" src={`${flagUrl}/${currencyForFlag}.svg`} />
{/if}
