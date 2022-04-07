<script lang="ts">
	export let query: string;
</script>

<a href="https://www.google.com/search?q={encodeURIComponent(query)}">Search on Google &rarr;</a>

<style>
	a {
		display: block;
		padding: 1em 0;
	}
</style>
