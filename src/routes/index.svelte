<script lang="ts">
	import ResultPage from "$lib/ResultPage.svelte";

	export let context: Context | undefined;
	export let websites: Website[] | undefined;
	export let computation: Computation | undefined;
	export let entities: Entity[] | undefined;
	export let timeZone: TimeZone | undefined;

	$: query = context?.alteredQuery || context?.originalQuery || "";

	const appName = "Search";
</script>

<svelte:head>
	{#if query}
		<title>{query} &mdash; {appName}</title>
	{:else}
		<title>{appName}</title>
	{/if}
</svelte:head>

<h1>
	<a href="/">{appName}</a>
</h1>

<form action="/" method="get">
	<input name="q" placeholder="Enter search query" value={query} autocomplete="off" autofocus />
</form>

{#if query}
	<ResultPage {context} {websites} {computation} {entities} {timeZone} />
{:else}
	<div class="disclaimer">Your searches will be shared with Microsoft and OpenAI.</div>
{/if}

<style>
	input {
		padding: 0.6em;
		font: inherit;
		width: 100%;
		box-sizing: border-box;
		border-radius: 5px;
		border: 2px solid rgba(0, 0, 0, 0.1);
	}

	input:focus {
		outline: none;
		border-color: blue;
	}

	.disclaimer {
		margin: 1em 0;
	}
</style>
