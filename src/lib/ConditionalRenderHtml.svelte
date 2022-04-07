<script lang="ts">
	export let content: string;
	export let renderHtml = false;
</script>

{#if renderHtml}
	{@html content}
{:else}
	{content}
{/if}
