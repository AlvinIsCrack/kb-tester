<script lang="ts">
	import KeyboardLayouts from '$lib/global/kb_layouts.svelte';
	import Page from '$lib/global/page.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import { DisplayMode } from '$lib/global/keyboard.svelte';
	import Checkbox from '../common/Checkbox.svelte';
	import Drawer from '../common/Drawer.svelte';
	import Select from '../common/Select.svelte';
	import Themes from '$lib/global/themes.svelte';
</script>

<Drawer bind:show={Page.editDrawer}>
	<div class="flex h-fit w-full max-w-1/8 flex-col items-start justify-center gap-4 py-10">
		<Select
			label={tr('visibility.theme')}
			id="select-theme"
			bind:selected={Themes.current}
			items={Themes.available.map((m) => ({
				value: m,
				label: tr(`visibility.theme.${m}` as any)
			}))}
		/>
		<Select
			label={tr('visibility.keyboardlayout')}
			id="select-keyboardlayout"
			bind:selected={Page.layoutKey}
			items={KeyboardLayouts.available.map((m) => ({
				value: m
			}))}
		/>
		<Select
			label={tr('visibility.displaymode')}
			id="select-displaymode"
			bind:selected={Page.displayMode}
			items={Object.values(DisplayMode).map((m) => ({
				value: m,
				label: tr(`visibility.displaymode.${m}`)
			}))}
		/>
		<Checkbox bind:checked={Page.hideKeyLabels} label={tr('visibility.hide-keylabels')} />
		<Checkbox bind:checked={Page.showIntlBackslash} label={tr('visibility.show-intl-backslash')} />
	</div>
</Drawer>
