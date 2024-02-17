<script lang="ts">
  export let amount: number;
  export let onAmountChange: (event: Event) => void;
</script>

<input type="number" min="1" bind:value={amount} on:input={onAmountChange} />