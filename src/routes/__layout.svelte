<script lang="ts">
	import "../app.css";
</script>

<main>
	<slot />
</main>

<footer>
	&copy; 2022 <a href="https://florian.janke.me/">Florian</a> &mdash; Do not abuse this service
</footer>

<style>
	main,
	footer {
		max-width: var(--max-width);
		margin: auto;
	}

	footer {
		opacity: 0.6;
	}

	footer a {
		color: inherit;
	}
</style>
