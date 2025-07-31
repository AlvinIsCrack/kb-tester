<script lang="ts">
	import Page from '$lib/global/page.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import { DisplayMode } from '$lib/types/keyboard';
	import Checkbox from '../common/Checkbox.svelte';
	import Drawer from '../common/Drawer.svelte';
	import Select from '../common/Select.svelte';
</script>

<Drawer bind:show={Page.editDrawer}>
	<div class="flex h-80 w-full max-w-1/8 flex-col items-start justify-center gap-4">
		<Checkbox bind:checked={Page.hideKeyLabels} label={tr('visibility.hide-keylabels')} />
		<Checkbox bind:checked={Page.showIntlBackslash} label={tr('visibility.show-intl-backslash')} />
		<Select
			label={tr('visibility.displaymode')}
			id="select-displaymode"
			bind:selected={Page.displayMode}
			items={Object.values(DisplayMode).map((m) => ({
				value: m,
				label: tr(`visibility.displaymode.${m}`)
			}))}
		/>
	</div>
</Drawer>
