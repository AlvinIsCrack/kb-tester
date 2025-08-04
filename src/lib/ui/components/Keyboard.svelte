<script lang="ts">
	import { tv } from 'tailwind-variants';
	import KeyboardButton from '../common/KeyboardButton.svelte';
	import Page from '$lib/global/page.svelte';
	import { Key } from '$lib/global/keyboard.svelte';
	import { slide } from 'svelte/transition';
	import { getKeyboardConfig } from '$lib/utils/KeyboardHelper';

	const config = $derived(getKeyboardConfig(Page.keyboardType));

	const gap = 'gap-0.5';
	const { keyboard, keyboardRow, navKeys, arrowKeys, numpad, specialRow } = $derived(
		tv({
			slots: {
				keyboard: 'pointer-events-none transition-[margin] duration-200 relative flex-col',
				keyboardRow: 'pointer-events-none flex-row w-full',
				navKeys: `grid ${config.compact ? `translate-x-12 translate-y-13 grid-cols-1 ${!config.fnKeys?.length ? '-mt-13' : ''}` : 'grid-cols-3 grid-rows-2'} ${gap} justify-center items-center h-min flex-nowrap`,
				arrowKeys: `grid grid-cols-3 grid-rows-2 ${gap} justify-center items-center`,
				numpad: `grid grid-cols-4 grid-rows-5 ${gap} w-fit justify-center items-center`,
				specialRow: `flex ${gap} items-center ${!config.compact ? 'mb-4' : ''} flex-row w-full top-0 justify-start`
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
						keyboard: 'w-auto'
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
</script>

<div id="keyboard" class="flex flex-row justify-center">
	<div class={keyboard({ size: 'full' })}>
		{#if config.fnKeys?.length}
			<div
				transition:slide|global={{ axis: 'y' }}
				class="{specialRow({ size: 'full' })} justify-between!"
			>
				{#each config.fnKeys as row, i (i)}
					{#if i > 0}
						<div class="w-full"></div>
					{/if}
					{#each row as key, j (j)}
						<KeyboardButton {key} />
					{/each}
				{/each}
			</div>
		{/if}
		{#each config.mainKeys as row, i (i)}
			<div class={keyboardRow({})}>
				{#each row as key (key)}
					<KeyboardButton {key} />
				{/each}
			</div>
		{/each}
	</div>

	{#if config.navKeys?.length || config.showArrows}
		<div transition:slide={{ axis: 'x' }} class="{keyboard({})} justify-between!">
			{#if config.specialKeys.length > 0}
				<div
					transition:slide|global={{ axis: 'y', duration: 1 }}
					class={specialRow({ size: 'full' })}
				>
					{#each config.specialKeys as key, i (i)}
						<KeyboardButton {key} />
					{/each}
				</div>
			{/if}

			{#if config.navKeys}
				<div class={navKeys({})}>
					{#each config.navKeys as key (key)}
						<KeyboardButton {key} />
					{/each}
				</div>
				<div class="h-full"></div>
			{/if}
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
