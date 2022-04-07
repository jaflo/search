<script lang="ts">
	import { browser } from "$app/env";
	import Result from "./Result.svelte";

	export let query: string;

	let aiResponse: string;
	let aiError: string;

	async function getAiWisdom() {
		if (!browser) return;

		const response = await fetch("/ai", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query }),
		});
		const data = (await response.json()) as any;

		if (data.error) {
			aiError = data.error;
		} else {
			aiResponse = data.response;
		}
	}

	$: query && getAiWisdom();
</script>

<Result title="Ask AI: {query.endsWith('?') ? query : query + '?'}">
	{#if !aiResponse && !aiError}
		Thinking...
	{:else if aiError}
		Error: {aiError}
	{:else}
		{aiResponse}
	{/if}
</Result>
