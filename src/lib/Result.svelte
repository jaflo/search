<script lang="ts">
	import ConditionalRenderHtml from "./ConditionalRenderHtml.svelte";

	export let title: string;
	export let url = "";
	export let renderHtml = false;

	function snipUrl(url: string) {
		const hostname = new URL(url).hostname;
		const pieces = url.split("/");
		if (hostname === "www.reddit.com" && pieces.includes("r")) {
			return "r/" + pieces[pieces.indexOf("r") + 1];
		} else {
			return hostname;
		}
	}
</script>

<div class="result">
	<h3>
		{#if url}
			<a href={url}>
				<ConditionalRenderHtml {renderHtml} content={title} />
			</a>
			<span>({snipUrl(url)})</span>
		{:else}
			<ConditionalRenderHtml {renderHtml} content={title} />
		{/if}
	</h3>
	<slot />
</div>

<style>
	div {
		margin-top: 1em;
	}

	h3 {
		font-size: 1.2em;
		margin: 0;
		margin-bottom: 0.5em;
		font-weight: normal;
	}

	span {
		font-weight: normal;
	}
</style>
