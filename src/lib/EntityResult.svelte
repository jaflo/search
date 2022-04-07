<script lang="ts">
	import Result from "./Result.svelte";

	export let entity: Entity;
</script>

<Result title={entity.name} url={entity.url}>
	{entity.description}
</Result>
