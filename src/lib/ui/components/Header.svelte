<script lang="ts">
	import Warning from '$lib/icons/warning.svelte';
	import { tr } from '$lib/locale/locale.svelte';
</script>

<div class="absolute top-0 left-0 m-4 w-full">
	<h1 class="text-4xl font-black">KB-Tester</h1>
	<div class="max-w-1/5 text-sm font-light">
		<p><Warning class="mr-2 inline scale-120" />{@html tr('app.warning.fnkeys')}</p>
	</div>
</div>
