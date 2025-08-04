<script lang="ts">
	import Input from '$lib/global/input.svelte';
	import { DisplayMode, KeyboardType, KeyType } from '$lib/global/keyboard.svelte';
	import Page from '$lib/global/page.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import { fly } from 'svelte/transition';
	import Button from '../common/Button.svelte';
	import Setting from '$lib/icons/setting.svelte';
	import Reset from '$lib/icons/reset-.svelte';
	import ClearKeylog from '$lib/icons/clear-keylog.svelte';
	import Help from '$lib/icons/help .svelte';
	import Select from '../common/Select.svelte';
	import KeyboardLayouts from '$lib/global/kb_layouts.svelte';
	import Keyboard from '$lib/icons/keyboard.svelte';
</script>

<div class="flex flex-row flex-nowrap justify-between gap-2">
	<div class="relative w-full flex-1">
		<Button
			tooltip={tr('buttons.tooltip.settings')}
			size="sm"
			startDecorator={Setting}
			onclick={() => (Page.showOptions = true)}
		>
			{tr('buttons.settings')}
		</Button>
		<Button tooltip={tr('buttons.tooltip.reset')} size="icon" onclick={Input.reset} variant="ghost">
			<Reset />
		</Button>
		<Button
			tooltip={tr('buttons.tooltip.clear-log')}
			disabled={!Input.log.length}
			size="icon"
			onclick={Input.clearKeylog}
			variant="ghost"
		>
			<ClearKeylog />
		</Button>

		{#if Page.displayMode === DisplayMode.KeyType}
			<div
				transition:fly={{ y: 20, duration: 200 }}
				class="absolute mt-2 grid w-full grid-cols-4 grid-rows-2 gap-1 text-xs"
			>
				{#each Object.values(KeyType) as keytype (keytype)}
					<div
						class="keytype-overlay-{keytype} flex items-center justify-center rounded-sm border px-2 text-center text-nowrap overflow-ellipsis text-shadow-xs/50"
					>
						<p>{tr(`keytype.${keytype}`)}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="flex w-full flex-1 flex-row justify-end gap-1">
		<Select
			class="text-xs"
			tooltip={tr('settings.keyboardlayout')}
			id="select-keyboardlayout"
			bind:selected={Page.layoutKey}
			items={KeyboardLayouts.available.map((m) => ({
				value: m
			}))}
		/>
		<Select
			icon={Keyboard}
			tooltip={tr('settings.keyboardtype')}
			class="text-xs"
			id="select-size"
			bind:selected={Page.keyboardType}
			items={Object.values(KeyboardType).map((m) => ({
				value: m,
				label: tr(`settings.keyboardtype.${m}` as any)
			}))}
		/>
		<Button
			tooltip={tr('buttons.tooltip.show-help')}
			startDecorator={Help}
			size="sm"
			onclick={() => (Page.showHelp = true)}
			variant="ghost"
		>
			{tr('buttons.show-help')}
		</Button>
	</div>
</div>
