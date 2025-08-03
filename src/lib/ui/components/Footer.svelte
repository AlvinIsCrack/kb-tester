<script lang="ts">
	import Kofi from '$lib/icons/kofi.svelte';
	import { fly } from 'svelte/transition';
	import Button from '../common/Button.svelte';
	import Mail from '$lib/icons/mail.svelte';
	import { tr } from '$lib/locale/locale.svelte';
</script>

<div
	transition:fly={{ delay: 1000, y: 5 }}
	class="absolute bottom-0 flex w-full flex-row items-end justify-between p-4 text-sm"
>
	<div></div>
	<div class="flex flex-row items-center justify-end gap-1">
		<Button startDecorator={Kofi} href="https://ko-fi.com/O5O71IYJ9E" size="sm" variant="ghost">
			Kofi
		</Button>
		<Button startDecorator={Mail} href="mailto:lvim@kb-tester.com" size="sm" variant="ghost">
			{tr('buttons.contact')}
		</Button>
	</div>
</div>
