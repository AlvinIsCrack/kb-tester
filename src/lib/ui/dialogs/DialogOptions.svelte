<script lang="ts">
	import Page from '$lib/global/page.svelte';
	import { tr } from '$lib/locale/locale.svelte';
	import Dialog from '../common/Dialog.svelte';
</script>

<Dialog bind:show={Page.showOptions}>
	<div>
		{tr('settings.toggle-backlight')}
	</div>
</Dialog>
