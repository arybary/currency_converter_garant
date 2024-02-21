<script lang="ts">
	import { hasFlag } from 'country-flag-icons';
	import { flagUrl } from '../../../constants/currenciesConst';
	export let currency: string;
	$: currencyForFlag = currency.slice(0, -1);
</script>

{#if hasFlag(currencyForFlag)}
	<img class="flag" alt="Flag Country" src={`${flagUrl}/${currencyForFlag}.svg`} />
{/if}

<style lang="scss">
	.flag {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 1rem;
		padding: 0.4rem;
	}
</style>
