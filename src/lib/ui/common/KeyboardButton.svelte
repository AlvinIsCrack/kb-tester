<script lang="ts">
	import Input from '$lib/global/input.svelte';
	import {
		DisplayMode,
		Key,
		keyDisplays,
		KeyPressSpeed,
		keyTypeMapping
	} from '$lib/global/keyboard.svelte';
	import { tv } from 'tailwind-variants';
	import Page from '$lib/global/page.svelte';
	import { untrack } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tooltip } from './Tooltip.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import { fade } from 'svelte/transition';

	const keyboardButton = $derived.by(() => {
		const _ = [Page.showIntlBackslash];

		return tv({
			base: 'relative text-muted-foreground bg-background select-none flex justify-center items-center text-nowrap h-12 aspect-[.925] rounded-xs gap-1 p-2 px-3 border-1 hover:ring-3 hover:cursor-pointer hover:ring-foreground',
			variants: {
				wasPressed: {
					false: '',
					true: 'bg-keyused text-keyused-foreground'
				},
				active: {
					false: '',
					true: 'bg-keyactive inset-shadow-none text-keyactive-foreground ring-inset ring-2 ring-background/50'
				},
				key: {
					// Fila 1
					[Key.Backspace]: 'aspect-[1.85] w-full', // 2u

					// Fila 2
					[Key.Tab]: 'aspect-[1.3875] justify-center', // 1.5u
					[Key.Backslash]: 'aspect-[1.3875] justify-end', // 1.5u

					// Fila 3
					[Key.CapsLock]: 'aspect-[1.61875] justify-start text-left', // 1.75u
					[Key.Enter]: 'aspect-[2.08125] w-full justify-center', // 2.25u

					// Fila 4
					[Key.ShiftLeft]: `${
						Page.showIntlBackslash ? 'w-full' : 'aspect-[2.08125]'
					} justify-start`, // 2.25u
					[Key.ShiftRight]: 'aspect-[2.54375] w-full justify-end', // 2.75u

					// Fila 5 (Bottom Row)
					[Key.ControlLeft]: 'aspect-[1.15625] justify-center', // 1.25u
					[Key.MetaLeft]: 'aspect-[1.15625]', // 1.25u
					[Key.AltLeft]: 'aspect-[1.15625] justify-center', // 1.25u
					[Key.Space]: 'w-full', // El espacio es un caso especial

					[Key.AltRight]: 'aspect-[1.15625] justify-center', // 1.25u
					[Key.ContextMenu]: 'aspect-[1.15625]', // 1.25u
					[Key.ControlRight]: 'aspect-[1.15625] justify-center', // 1.25u

					// Teclas especiales sin ancho modificado
					[Key.Escape]: 'justify-start',

					// Numpad (estos ya tenían un manejo especial)
					[Key.NumpadAdd]: 'h-full aspect-auto',
					[Key.NumpadEnter]: 'h-full aspect-auto',
					[Key.Numpad0]: 'w-full aspect-auto'
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
						'ring-foreground/50 bg-keycritical  text-keycritical-foreground'
				}
			}
		});
	});

	const {
		key,
		display = false,
		class: _class,
		...props
	}: { key: Key; display?: boolean } & HTMLAttributes<HTMLDivElement> = $props();

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

	const layoutKeys = $derived.by(() => {
		const base = keyDisplays[key as keyof typeof keyDisplays] ?? {
			text: key.replace(/digit|numpad|key/i, '')
		};

		return base;
	});

	let ready = $state(false);

	$effect(() => {
		setTimeout(() => {
			ready = true;
		}, 200);
	});
</script>

{#if key !== Key.IntlBackslash || Page.showIntlBackslash}
	{@const typeKey = Page.displayMode === DisplayMode.KeyType ? keyTypeMapping[key] : undefined}
	<div
		use:tooltip={{
			content: [
				tr(`key.${key}.tooltip`),
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
		class="{keyboardButton({
			active,
			speed: active || display || wasRecentlyFast ? speed : KeyPressSpeed.Normal,
			key: key as any,
			wasPressed: Input.wasPressed(key),
			display
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
			<div
				transition:fade={{ duration: 100 }}
				class="absolute flex h-full w-full items-center justify-center"
			>
				<Icon class="inline scale-150" />
			</div>
		{/if}

		{#if (display || !Page.hideKeyLabels) && layoutKeys.text}
			<div
				transition:fade={{ duration: 100 }}
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
				transition:fade={{ duration: 200 }}
				class="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden rounded-sm keytype-overlay-{typeKey}"
			></div>
		{/if}
	</div>
{/if}
