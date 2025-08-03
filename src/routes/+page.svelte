<script lang="ts">
	import Input from '$lib/global/input.svelte';
	import Foreground from '$lib/ui/components/Foreground.svelte';
	import KeyResume from '$lib/ui/components/KeyResume.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import DrawerOptions from '$lib/ui/drawers/DrawerOptions.svelte';
	import Spinner from '$lib/icons/spinner.svelte';
	import ActionRow from '$lib/ui/components/ActionRow.svelte';
</script>

<div class="relative flex h-full w-full items-center justify-center overflow-hidden">
	{#if Input.initialized}
		{#await Promise.all([
				new Promise(r => setTimeout(r, 400)),
			import('$lib/ui/components/KeyLog.svelte'),
			import('$lib/ui/components/Keyboard.svelte')
		])}
			<div transition:scale={{ duration: 200 }} class="absolute">
				<Spinner class="scale-200" />
			</div>
		{:then [, { default: KeyLog }, { default: Keyboard }]}
			<div
				in:fly={{ duration: 500, y: 40 }}
				class="relative flex flex-col items-center justify-center gap-2"
			>
				<Keyboard />
				<div class="absolute -bottom-2 w-full translate-y-full">
					<ActionRow />
				</div>
			</div>
			<div transition:fade class="pointer-events-none absolute bottom-4">
				<KeyResume />
			</div>
			<div class="absolute top-0 flex h-min w-full items-center justify-center">
				<KeyLog />
			</div>

			<Foreground />
			<DrawerOptions />
			{#await Promise.all([
				new Promise(r => setTimeout(r, 600)),
				import('$lib/ui/components/HelpOverlay.svelte')
			]) then [, { default: HelpOverlay }]}
				<div
					transition:fade={{ duration: 200 }}
					class="pointer-events-none absolute top-0 left-0 h-full w-full"
				>
					<HelpOverlay />
				</div>
			{/await}
		{/await}
	{/if}
</div>
