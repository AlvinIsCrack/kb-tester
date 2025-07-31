<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { tv } from 'tailwind-variants';
	import { tooltip } from './Tooltip.svelte';

	const button = tv({
		base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:text-muted-foreground disabled:pointer-events-none disabled:opacity-60 cursor-pointer active:bg-primary/40 [&>svg]:scale-120',
		variants: {
			variant: {
				primary:
					'bg-primary text-primary-foreground hover:text-primary-foreground/80 hover:ring-2 hover:ring-inset hover:ring-primary-foreground/50',
				ghost: 'bg-secondary/50 text-foreground hover:bg-secondary'
			},
			size: {
				default: 'h-9 px-4 py-1',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-8 w-8 aspect-square'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default'
		}
	});

	type Variant = Parameters<typeof button>[0];

	let {
		variant,
		startDecorator,
		children,
		tooltip: _tooltip,
		size,
		...props
	}: Variant &
		HTMLButtonAttributes & {
			startDecorator?: Component;
			tooltip?: string | Snippet<[]>;
		} = $props();
</script>

<button use:tooltip={{ content: _tooltip }} class={button({ variant, size })} {...props}>
	{#if startDecorator}
		{@const Decorator = startDecorator}
		<Decorator class="mr-2 -ml-1 inline" />
	{/if}
	{@render children?.()}
</button>
