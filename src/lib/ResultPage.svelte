<script lang="ts">
	import AiResult from "./AiResult.svelte";
	import Bail from "./Bail.svelte";
	import ComputationResult from "./ComputationResult.svelte";
	import DidYouMean from "./DidYouMean.svelte";
	import EntityResult from "./EntityResult.svelte";
	import TimeZoneResult from "./TimeZoneResult.svelte";
	import WebsiteResult from "./WebsiteResult.svelte";

	export let context: Context;
	export let websites: Website[] | undefined;
	export let computation: Computation | undefined;
	export let entities: Entity[] | undefined;
	export let timeZone: TimeZone | undefined;

	let query = context.alteredQuery || context.originalQuery;
</script>

<DidYouMean {context} />

<div class="columns">
	{#if entities}
		<div class="side">
			{#each entities as entity}
				<EntityResult {entity} />
			{/each}
		</div>
	{/if}
	<div class="main">
		{#if computation}
			<ComputationResult {computation} />
		{/if}
		{#if timeZone}
			<TimeZoneResult {timeZone} />
		{/if}

		<AiResult {query} />

		{#if websites}
			{#each websites as website}
				<WebsiteResult {website} />
			{/each}
		{/if}

		{#if !computation && !timeZone && !entities && !websites}
			No results found.
		{/if}
	</div>
</div>

<Bail {query} />

<style>
	@media only screen and (min-width: 700px) {
		.columns {
			display: flex;
			flex-direction: row-reverse;
		}

		.columns .main {
			flex: 1;
			margin-right: 1em;
		}

		.columns .side {
			width: 40%;
		}
	}
</style>
