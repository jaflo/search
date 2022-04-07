<script lang="ts">
	import Result from "./Result.svelte";

	export let website: Website;
</script>

<Result title={website.title} url={website.url} renderHtml>
	{@html website.snippet}
</Result>
