<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { tv } from 'tailwind-variants';
	import { tooltip, type TooltipContentParameter } from './Tooltip.svelte';
	import Help from '$lib/icons/help .svelte';

	const checkbox = tv({
		base: 'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
	});

	const container = tv({
		base: 'flex items-center space-x-2'
	});

	let {
		checked = $bindable(),
		label,
		tooltip: _tooltip,
		...props
	}: {
		checked?: boolean | 'indeterminate';
		label?: Snippet<[]> | string;
		tooltip?: TooltipContentParameter;
	} & HTMLInputAttributes = $props();

	let id = `checkbox-${Math.random().toString(36).substring(2, 9)}`;
</script>

<div use:tooltip={{ content: _tooltip }} class={container()}>
	<input type="checkbox" class={checkbox()} bind:checked {id} {...props} />
	{#if label}
		<label for={id} class="cursor-pointer text-sm leading-none">
			{#if typeof label === 'string'}
				{@html label}
			{:else}
				{@render label()}
			{/if}
			{#if _tooltip}
				<Help class="pointer-events-none inline opacity-50" />
			{/if}
		</label>
	{/if}
</div>
