<script lang="ts">
	import { tr } from '$lib/locale/locale.svelte';
</script>

<div class="mt-1 flex flex-col gap-2 text-left">
	{#each tr('help.colors').split('\n') as line, i (i)}
		<p>{@html line}</p>
	{/each}
</div>
