<script lang="ts">
	export let context: Context;
</script>

{#if context.alteredQuery}
	<div>
		Showing results for "{context.alteredQuery}".
		<a href="/?q={encodeURIComponent(context.alterationOverrideQuery)}"
			>Search for "{context.originalQuery}" instead?</a
		>
	</div>
{/if}

<style>
	div {
		margin: 1em 0;
	}
</style>
