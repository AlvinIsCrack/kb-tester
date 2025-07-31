<script lang="ts">
	import Input from '$lib/global/input.svelte';
	import { tr } from '$lib/locale/locale.svelte';

	const data = $derived(Input.data);
</script>

<div class="flex w-full flex-row justify-evenly">
	<p>
		{data.totalKeypresses} <span class="text-sm opacity-50">{tr('app.total-keys-pressed')}</span>
	</p>
</div>
