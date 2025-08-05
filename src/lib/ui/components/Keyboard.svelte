<script lang="ts">
	import { tv } from 'tailwind-variants';
	import KeyboardButton, { kButtonContainer } from '../common/KeyboardButton.svelte';
	import Page from '$lib/global/page.svelte';
	import { Key } from '$lib/global/keyboard.svelte';
	import { slide } from 'svelte/transition';
	import { getKeyboardConfig } from '$lib/utils/KeyboardHelper';
	import { flip } from 'svelte/animate';
	import { circOut } from 'svelte/easing';

	const DURATION = 250;
	const STAGGER = 150;

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
				in:slide|global={{ axis: 'y', duration: DURATION, delay: 0 }}
				out:slide|global={{ axis: 'y', duration: DURATION, delay: STAGGER * 2 }}
				class="{specialRow({ size: 'full' })} justify-between!"
			>
				{#each config.fnKeys as row, i (i)}
					{#if i > 0}
						<div class="w-full"></div>
					{/if}
					{#each row as key (key)}
						<div
							animate:flip={{ duration: 200, easing: circOut }}
							class={kButtonContainer({ key: key as any })}
						>
							<KeyboardButton {key} />
						</div>
					{/each}
				{/each}
			</div>
		{/if}
		{#each config.mainKeys as row, j (j - config.mainKeys.length + 1)}
			<div class={keyboardRow({})}>
				{#each row as key (key)}
					<div
						animate:flip={{ duration: 200, easing: circOut }}
						class={kButtonContainer({ key: key as any })}
					>
						<KeyboardButton {key} />
					</div>
				{/each}
			</div>
		{/each}
	</div>

	{#if config.navKeys?.length || config.showArrows}
		<div
			in:slide={{ axis: 'x', duration: DURATION, delay: STAGGER }}
			out:slide={{ axis: 'x', duration: DURATION, delay: STAGGER }}
			class="{keyboard({})} justify-between!"
		>
			{#if config.specialKeys.length > 0}
				<div
					transition:slide|global={{ axis: 'y', duration: 1 }}
					class={specialRow({ size: 'full' })}
				>
					{#each config.specialKeys as key, i (i)}
						<div
							animate:flip={{ duration: 200, easing: circOut }}
							class={kButtonContainer({ key: key as any })}
						>
							<KeyboardButton {key} />
						</div>
					{/each}
				</div>
			{/if}

			{#if config.navKeys}
				<div class={navKeys({})}>
					{#each config.navKeys as key (key)}
						<div
							animate:flip={{ duration: 200, easing: circOut }}
							class={kButtonContainer({ key: key as any })}
						>
							<KeyboardButton {key} />
						</div>
					{/each}
				</div>
				<div class="h-full"></div>
			{/if}
			<div class={arrowKeys({})}>
				{#each [Key.ArrowUp, Key.ArrowLeft, Key.ArrowDown, Key.ArrowRight] as key (key)}
					<div
						animate:flip={{ duration: 200, easing: circOut }}
						class="{kButtonContainer({ key: key as any })} {key === Key.ArrowUp
							? 'col-span-3 flex w-full items-center justify-center'
							: ''}"
					>
						<KeyboardButton {key} />
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if config.showNumpad}
		<div
			in:slide={{ axis: 'x', duration: DURATION, delay: STAGGER * 2 }}
			out:slide={{ axis: 'x', duration: DURATION, delay: 0 }}
			class="{keyboard({})} {numpad({})} mt-auto"
		>
			{#each [Key.NumLock, Key.NumpadDivide, Key.NumpadMultiply, Key.NumpadSubtract, Key.Numpad7, Key.Numpad8, Key.Numpad9, Key.NumpadAdd, Key.Numpad4, Key.Numpad5, Key.Numpad6, Key.Numpad1, Key.Numpad2, Key.Numpad3, Key.NumpadEnter, Key.Numpad0, Key.NumpadDecimal] as key (key)}
				<div
					animate:flip={{ duration: 200, easing: circOut }}
					class={kButtonContainer({ key: key as any })}
				>
					<KeyboardButton {key} />
				</div>
			{/each}
		</div>
	{/if}
</div>
