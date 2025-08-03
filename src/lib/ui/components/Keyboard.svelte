<script lang="ts">
	import { tv } from 'tailwind-variants';
	import KeyboardButton from '../common/KeyboardButton.svelte';
	import Page from '$lib/global/page.svelte';
	import { Key } from '$lib/global/keyboard.svelte';
	import { fade, slide } from 'svelte/transition';
	import { getKeyboardConfig } from '$lib/utils/KeyboardHelper';

	const gap = 'gap-[0.12rem]';
	const { keyboard, keyboardRow, navKeys, arrowKeys, numpad, specialRow } = $derived(
		tv({
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
		})({})
	);

	const layout = $derived(Page.layout);
	const config = $derived(getKeyboardConfig(Page.keyboardType));
</script>

<div id="keyboard" class="flex flex-row justify-center will-change-transform">
	<div class={keyboard({ size: 'full' })}>
		{#if config.showFunctionRow}
			<div transition:slide={{ axis: 'y' }} class="{specialRow({ size: 'full' })} justify-between!">
				<KeyboardButton key={Key.Escape} />

				{#each [[Key.F1, Key.F2, Key.F3, Key.F4], [Key.F5, Key.F6, Key.F7, Key.F8], [Key.F9, Key.F10, Key.F11, Key.F12]] as row, i (i)}
					<div class="w-full"></div>
					{#each row as key, j (j)}
						<KeyboardButton {key} />
					{/each}
				{/each}
			</div>
		{/if}

		{#each layout as row, i (i)}
			<div class={keyboardRow({})}>
				{#each row as key, j (j)}
					<KeyboardButton {key} />
				{/each}
			</div>
		{/each}
	</div>

	{#if config.showNavigation || config.showArrows}
		<div transition:slide={{ axis: 'x' }} class="{keyboard({})} justify-between!">
			{#if config.specialKeys.length > 0}
				<div class={specialRow({ size: 'full' })}>
					{#each config.specialKeys as key, i (i)}
						<KeyboardButton {key} />
					{/each}
				</div>
			{/if}

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
	{/if}

	{#if config.showNumpad}
		<div transition:slide={{ axis: 'x' }} class="{keyboard({})} {numpad({})} mt-auto">
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
</div>
