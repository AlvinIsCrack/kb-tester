<script lang="ts">
	import { tv } from 'tailwind-variants';
	import KeyboardButton from '../common/KeyboardButton.svelte';
	import Page from '$lib/global/page.svelte';
	import { Key } from '$lib/global/keyboard.svelte';
	import Button from '../common/Button.svelte';
	import Show from '$lib/icons/show.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import Hide from '$lib/icons/hide.svelte';
	import { slide } from 'svelte/transition';

	const gap = 'gap-0.5';
	const { keyboard, keyboardRow, navKeys, arrowKeys, numpad, specialRow } = tv({
		slots: {
			keyboard: 'transition-[margin] duration-200 relative flex-col',
			keyboardRow: 'flex-row w-full',
			navKeys: `grid grid-cols-3 grid-rows-2 ${gap} justify-center items-center`,
			arrowKeys: `grid grid-cols-3 grid-rows-2 ${gap} justify-center items-center`,
			numpad: `grid grid-cols-4 grid-rows-5 ${gap} w-fit justify-center items-center`,
			specialRow: `flex ${gap} items-center mb-4 flex-row w-full top-0 justify-start`
		},
		compoundSlots: [
			{
				slots: ['keyboard', 'keyboardRow'],
				class: `flex ${gap} justify-end items-center`
			}
		],
		variants: {
			size: {
				full: {
					keyboard: 'w-auto '
				},
				addon: {
					keyboard: 'w-fit ml-5'
				}
			}
		},
		defaultVariants: {
			size: 'addon'
		}
	})({});

	const layout = $derived(Page.layout);
	let numpadToggleCooldown = $state(false);
	$effect(() => {
		const _ = Page.numpadEnabled;

		numpadToggleCooldown = true;
		const timeout = setTimeout(() => (numpadToggleCooldown = false), 500);
		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<div class="flex flex-row justify-center will-change-transform">
	<div class={keyboard({ size: 'full' })}>
		<div class="{specialRow({ size: 'full' })} justify-between!">
			<KeyboardButton key={Key.Escape} />

			{#each [[Key.F1, Key.F2, Key.F3, Key.F4], [Key.F5, Key.F6, Key.F7, Key.F8], [Key.F9, Key.F10, Key.F11, Key.F12]] as row, i (i)}
				<div class="w-full"></div>
				{#each row as key, j (j)}
					<KeyboardButton {key} />
				{/each}
			{/each}
		</div>

		{#each layout as row, i (i)}
			<div class={keyboardRow({})}>
				{#each row as key, j (j)}
					<KeyboardButton {key} />
				{/each}
			</div>
		{/each}
	</div>

	<div class="{keyboard({})} justify-between!">
		<div class={specialRow({ size: 'full' })}>
			{#each [Key.PrintScreen, Key.ScrollLock, Key.Pause] as key, i (i)}
				<KeyboardButton {key} />
			{/each}
		</div>
		<div class={navKeys({})}>
			{#each [Key.Insert, Key.Home, Key.PageUp, Key.Delete, Key.End, Key.PageDown] as key (key)}
				<KeyboardButton {key} />
			{/each}
		</div>
		<div class="h-full"></div>
		<div class={arrowKeys({})}>
			<div></div>
			<KeyboardButton key={Key.ArrowUp} />
			<div></div>
			<KeyboardButton key={Key.ArrowLeft} />
			<KeyboardButton key={Key.ArrowDown} />
			<KeyboardButton key={Key.ArrowRight} />
		</div>
	</div>

	<div class="{keyboard({})} mt-auto {!Page.numpadEnabled ? 'ml-6' : ''}">
		{#if Page.numpadEnabled}
			<div transition:slide={{ axis: 'x' }} class={numpad({})}>
				{#each [Key.NumLock, Key.NumpadDivide, Key.NumpadMultiply, Key.NumpadSubtract, Key.Numpad7, Key.Numpad8, Key.Numpad9, Key.NumpadAdd, Key.Numpad4, Key.Numpad5, Key.Numpad6, Key.Numpad1, Key.Numpad2, Key.Numpad3, Key.NumpadEnter, Key.Numpad0, Key.NumpadDecimal] as key (key)}
					{#if key === Key.Numpad0}
						<KeyboardButton {key} class="col-span-2" />
					{:else if key === Key.NumpadAdd || key === Key.NumpadEnter}
						<KeyboardButton {key} class="row-span-2" />
					{:else if key === Key.NumpadDecimal}
						<KeyboardButton {key} />
					{:else}
						<KeyboardButton {key} />
					{/if}
				{/each}
			</div>
		{/if}

		<div
			class="{Page.numpadEnabled
				? 'peer'
				: ''} absolute right-0 bottom-0 z-10 -m-4 origin-top scale-80 transition-all duration-200"
		>
			<Button
				tooltip={tr('buttons.toggle-numpad')}
				onclick={() => (Page.numpadEnabled = !Page.numpadEnabled)}
				size={'icon'}
			>
				{#if Page.numpadEnabled}
					<Hide />
				{:else}
					<Show />
				{/if}
			</Button>
		</div>

		<div
			class="pointer-events-none absolute top-1/2 left-1/2 transition-all duration-200 {Page.numpadEnabled
				? 'h-[104%] w-[105%]'
				: 'h-full w-full'} -translate-1/2 rounded-sm mix-blend-screen {!numpadToggleCooldown
				? 'peer-hover:bg-foreground/10'
				: ''}"
		></div>
	</div>
</div>
