<script lang="ts">
	import Input from '$lib/global/input.svelte';
	import Page from '$lib/global/page.svelte';
	import Foreground from '$lib/ui/components/Foreground.svelte';
	import Keyboard from '$lib/ui/components/Keyboard.svelte';
	import KeyLog from '$lib/ui/components/KeyLog.svelte';
	import KeyResume from '$lib/ui/components/KeyResume.svelte';
	import DialogOptions from '$lib/ui/dialogs/DialogOptions.svelte';
	import { fade, fly } from 'svelte/transition';
	import Edit from '$lib/icons/edit.svelte';
	import Button from '$lib/ui/common/Button.svelte';
	import DrawerEdit from '$lib/ui/drawers/DrawerEdit.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import Reset from '$lib/icons/reset-.svelte';
	import ClearKeylog from '$lib/icons/clear-keylog.svelte';
	import Show from '$lib/icons/show.svelte';
	import { DisplayMode, KeyType } from '$lib/types/keyboard';
	import Footer from '$lib/ui/components/Footer.svelte';
</script>

<div class="relative flex h-full w-full items-center justify-center overflow-hidden">
	{#if Input.initialized}
		<div
			in:fly={{ duration: 500, y: 40 }}
			class="relative flex flex-col items-center justify-center gap-2"
		>
			<Keyboard />

			<div class="absolute -bottom-2 flex w-full translate-y-full flex-row gap-2">
				<div class="relative">
					<Button
						tooltip={tr('buttons.tooltip.visibility')}
						size="sm"
						startDecorator={Show}
						onclick={() => (Page.editDrawer = true)}
						variant="ghost"
					>
						{tr('buttons.visibility')}
					</Button>
					<Button
						tooltip={tr('buttons.tooltip.reset')}
						startDecorator={Reset}
						size="sm"
						onclick={Input.reset}
						variant="ghost"
					>
						{tr('buttons.reset')}
					</Button>
					<Button
						tooltip={tr('buttons.tooltip.clear-log')}
						disabled={!Input.log.length}
						startDecorator={ClearKeylog}
						size="sm"
						onclick={Input.clearKeylog}
						variant="ghost"
					>
						{tr('buttons.clear-log')}
					</Button>

					{#if Page.displayMode === DisplayMode.KeyType}
						<div
							transition:fly={{ y: 20, duration: 200, delay: 500 }}
							class="absolute mt-2 flex w-full flex-row flex-wrap gap-1 text-xs"
						>
							{#each Object.values(KeyType) as keytype (keytype)}
								<span class="keytype-overlay-{keytype} rounded-sm border px-2 text-shadow-xs/50">
									{tr(`keytype.${keytype}`)}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div transition:fade class="pointer-events-none absolute bottom-4">
			<KeyResume />
		</div>
		<div class="absolute top-0 flex h-min w-full items-center justify-center">
			<KeyLog />
		</div>
		<div class="absolute right-0 bottom-0 m-4">
			<Footer />
		</div>

		<DrawerEdit />
		<Foreground />
		<DialogOptions />
	{/if}
</div>
