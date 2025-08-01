<script lang="ts">
	import Github from '$lib/icons/github.svelte';
	import Kofi from '$lib/icons/kofi.svelte';
	import { fly } from 'svelte/transition';
	import Button from '../common/Button.svelte';
</script>

<div
	transition:fly={{ delay: 1000, y: 5 }}
	class="absolute bottom-0 flex w-full flex-row items-end justify-between p-4 text-sm"
>
	<img class="pointer-events-none inline" src="/cl.png" alt="Chile Flag" />
	<div class="flex flex-row items-center justify-end gap-1">
		<Button href="https://ko-fi.com/O5O71IYJ9E" size="sm" variant="ghost">
			<Kofi class="mr-2 inline" /> Kofi
		</Button>
		<Button href="https://github.com/AlvinIsCrack" size="sm" variant="ghost">
			<Github class="mr-2 inline" /> Github
		</Button>
	</div>
</div>
