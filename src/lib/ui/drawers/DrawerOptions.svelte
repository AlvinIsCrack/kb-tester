<script lang="ts">
	import Page from '$lib/global/page.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import { DisplayMode } from '$lib/global/keyboard.svelte';
	import Checkbox from '../common/Checkbox.svelte';
	import Drawer from '../common/Drawer.svelte';
	import Select from '../common/Select.svelte';
	import Themes from '$lib/global/themes.svelte';
</script>

<Drawer containerClass="max-h-100" bind:show={Page.showOptions}>
	<div class="flex h-full w-full items-center justify-center py-10">
		<div class="flex max-h-full w-full max-w-1/3 flex-wrap items-center justify-center gap-4">
			<Select
				label={tr('settings.displaymode')}
				id="select-displaymode"
				bind:selected={Page.displayMode}
				items={Object.values(DisplayMode).map((m) => ({
					value: m,
					label: tr(`settings.displaymode.${m}`)
				}))}
			/>
			<Select
				label={tr('settings.theme')}
				id="select-theme"
				bind:selected={Themes.current}
				items={Themes.available.map(([k, v]) => ({
					value: v,
					label: tr(`settings.theme.${v}` as any) ?? k
				}))}
			/>
			<Checkbox bind:checked={Page.hideKeyLabels} label={tr('settings.hide-keylabels')} />
			<Checkbox bind:checked={Page.showIntlBackslash} label={tr('settings.show-intl-backslash')} />
			<Checkbox
				tooltip={tr('settings.tooltip.single-press-detection')}
				bind:checked={Page.singlePressDetection}
				label={tr('settings.single-press-detection')}
			/>
		</div>
	</div>
</Drawer>
