<script lang="ts">
	import Input from '$lib/global/input.svelte';
	import { Key, KeyPressSpeed } from '$lib/global/keyboard.svelte';
	import { untrack } from 'svelte';
	import { fade } from 'svelte/transition';

	const log = $derived(Input.log);
	// svelte-ignore non_reactive_update
	let lastPressed = 0;
	let lastKey: Key;
	let pressed = $state(0);
	let timeout: number;

	$effect(() => {
		const _ = log.length;

		untrack(() => {
			const key = log.at(-1);
			if (!key) return;

			if (timeout) clearTimeout(timeout);
			if (key === lastKey) lastPressed = pressed;
			lastKey = key;
			pressed = Date.now();
			timeout = setTimeout(() => (pressed = 0), 500);
		});
	});
</script>

{#if pressed}
	<div
		out:fade
		class="pointer-events-none fixed z-40 h-full w-full ring-8 ring-foreground ring-inset"
	>
		{#key pressed}
			{@const delay = pressed - lastPressed}
			<div
				class="background-ring absolute h-full w-full ring-16
            {delay >= KeyPressSpeed.Normal
					? 'ring-foreground/80'
					: delay >= KeyPressSpeed.Fast
						? 'alert ring-keyalert/30'
						: delay >= KeyPressSpeed.VeryFast
							? 'warning ring-keywarning/60'
							: 'critical ring-keycritical'} ring-inset"
			></div>
		{/key}
	</div>
{/if}

<style>
	:global(.background-ring) {
		--key-type-duration: 0.2s;
		opacity: 0;
		animation: background-ring-animation var(--key-type-duration) ease-out;
	}

	:global(.alert),
	:global(.warning),
	:global(.critical) {
		--key-type-duration: 2s;
	}

	@keyframes -global-background-ring-animation {
		from {
			opacity: 1;
		}
	}
</style>
