<script lang="ts">
	import Result from "./Result.svelte";

	export let computation: Computation;
</script>

<Result title={computation.value}>
	{computation.expression}
</Result>
