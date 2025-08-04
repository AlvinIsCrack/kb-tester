<script module lang="ts">
	export const kButtonContainer = tv({
		base: 'h-12 aspect-[.925]',
		variants: {
			key: {
				// Fila 1
				[Key.Backspace]: 'aspect-[1.85] w-full', // 2u

				// Fila 2
				[Key.Tab]: 'aspect-[1.3875] justify-center', // 1.5u
				[Key.Backslash]: 'aspect-[1.3875] justify-end text-end', // 1.5u

				// Fila 3
				[Key.CapsLock]: 'w-full justify-start text-left', // 1.75u
				[Key.Enter]: 'aspect-[2] w-full justify-center', // 2.25u

				// Fila 4
				[Key.ShiftLeft]: `w-full justify-start`, // 2.25u
				[Key.ShiftRight]: `w-full justify-end`, // 2.75u

				// Fila 5 (Bottom Row)
				[Key.ControlLeft]: 'aspect-[1.2] justify-center', // 1.25u
				[Key.MetaLeft]: 'aspect-[1.2]', // 1.25u
				[Key.AltLeft]: 'aspect-[1.2] justify-center', // 1.25u
				[Key.Space]: 'w-full', // El espacio es un caso especial
				[Key.Space2]: 'w-full', // El espacio es un caso especial

				[Key.AltRight]: 'aspect-[1.2] justify-center', // 1.25u
				[Key.ContextMenu]: 'aspect-[1.2]', // 1.25u
				[Key.ControlRight]: `aspect-[1.2] justify-center`, // 1.25u

				// Numpad (estos ya tenían un manejo especial)
				[Key.NumpadAdd]: 'h-full aspect-auto row-span-2',
				[Key.NumpadEnter]: 'h-full aspect-auto row-span-2',
				[Key.Numpad0]: 'w-full aspect-auto col-span-2'
			}
		}
	});

	const kButton = tv({
		base: 'key pointer-events-auto relative text-center text-muted-foreground rounded-sm bg-background select-none flex justify-center items-center text-nowrap gap-1 p-2 px-3 border-2 hover:ring-3 hover:cursor-pointer hover:ring-foreground',
		variants: {
			wasPressed: {
				false: '',
				true: 'bg-keyused text-keyused-foreground'
			},
			active: {
				false: '',
				true: 'bg-keyactive inset-shadow-none text-keyactive-foreground ring-inset ring-2 ring-background/50'
			},
			display: {
				false: '',
				true: 'cursor-default! w-6 h-6 border-1 text-sm rounded-sm scale-90 shadow-sm p-4 justify-center bg-keyused text-keyused-foreground'
			},
			speed: {
				[KeyPressSpeed.Normal]: '',
				[KeyPressSpeed.Fast]: 'ring-foreground/50 bg-keyalert text-keyalert-foreground',
				[KeyPressSpeed.VeryFast]: 'ring-foreground/50 bg-keywarning text-keywarning-foreground',
				[KeyPressSpeed.DangeourslyFast]:
					'ring-foreground/50 bg-keycritical  text-keycritical-foreground'
			}
		}
	});
</script>

<script lang="ts">
	// Se eliminó la definición local de `tv`, ya que ahora está en `context="module"`
	import Input from '$lib/global/input.svelte';
	import {
		DisplayMode,
		Key,
		keyDisplays,
		KeyPressSpeed,
		keyTypeMapping
	} from '$lib/global/keyboard.svelte';
	import Page from '$lib/global/page.svelte';
	import { untrack } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tooltip } from './Tooltip.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import { tv } from 'tailwind-variants';
	import { fade } from 'svelte/transition';

	const {
		key,
		display = false,
		class: _class,
		...props
	}: {
		key: Key;
		display?: boolean;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const active = $derived(!display && Input.keyboard.keys[key]);
	const wasRecentlyFast = $derived(Input.wasRecentlyFast(key));

	const speed = $derived.by(() => {
		const _ = display || active;
		return Input.getSpeedOfKey(key);
	});
	const timesPressed = $derived.by(() => {
		const _ = active;
		return untrack(() => Input.timesPressed(key));
	});

	const layoutKeys = $derived(
		keyDisplays[key as keyof typeof keyDisplays] ?? {
			text: key.replace(/digit|numpad|key/i, '')
		}
	);

	const typeKey = $derived(
		Page.displayMode === DisplayMode.KeyType ? keyTypeMapping[key] : undefined
	);
</script>

<div
	in:fade|global={{ duration: 200 }}
	use:tooltip={{
		content: [
			tr(`key.${key}.tooltip` as any),
			...(typeKey
				? [
						`<span class="keytype-overlay-${typeKey} rounded-sm border px-1 ml-1">${tr(`keytype.${typeKey}`)}</span>`
					]
				: [])
		].join(' ')
	}}
	onclick={() => {
		if (display) return;
	}}
	class="{kButton({
		active,
		speed: active || display || wasRecentlyFast ? speed : KeyPressSpeed.Normal,
		wasPressed: Input.wasPressed(key),
		display
	})} {kButtonContainer({
		key: key as any
	})} {_class}"
	{...props}
>
	{#if timesPressed > 0}
		<div
			class="pointer-events-none absolute top-0 right-0 px-1 text-xs opacity-50 {display
				? 'flex aspect-square translate-x-1/3 -translate-y-1/3 items-center justify-center font-bold text-foreground opacity-100 text-shadow-sm/100 text-shadow-background'
				: ''}"
		>
			{timesPressed}
		</div>
	{/if}

	{#if (display || !Page.hideKeyLabels) && layoutKeys.icon}
		{@const Icon = layoutKeys.icon}
		<div class="absolute flex h-full w-full items-center justify-center">
			<Icon class="inline scale-150" />
		</div>
	{/if}

	{#if (display || !Page.hideKeyLabels) && layoutKeys.text}
		<div
			style:text-align="inherit"
			class="absolute text-center leading-3.5 {layoutKeys.text.replace(/\s+/g, '').length >= 3
				? 'text-sm'
				: ''}"
		>
			{#each layoutKeys.text.split('\n') as line (line)}
				<p>{line}</p>
			{/each}
		</div>
	{/if}

	{#if !display && typeKey}
		<div
			class="pointer-events-none absolute top-0 left-0 z-20 h-full w-full overflow-hidden rounded-sm border-2 keytype-overlay-{typeKey}"
		></div>
	{/if}
</div>
