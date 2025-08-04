<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { tv } from 'tailwind-variants';
	import { tooltip } from './Tooltip.svelte';

	const button = tv({
		base: 'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:text-muted-foreground disabled:pointer-events-none disabled:opacity-60 cursor-pointer active:bg-primary/40 border [&>svg]:h-full [&>svg]:w-auto [&>svg]:aspect-square [&>svg]:p-1.5',
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground hover:bg-primary/60',
				ghost: 'bg-secondary/40 text-foreground hover:bg-secondary'
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
		href,
		class: _class,
		tooltip: _tooltip,
		size,
		...props
	}: Variant &
		HTMLButtonAttributes & {
			href?: string;
			startDecorator?: Component;
			tooltip?: string | Snippet<[]>;
		} = $props();
</script>

<button
	use:tooltip={{ content: _tooltip }}
	class={button({ variant, size, class: _class })}
	{...props}
>
	{#if startDecorator}
		{@const Decorator = startDecorator}
		<Decorator class="-ml-2.5 inline" />
	{/if}
	{@render children?.()}
	{#if href}
		<a class="absolute top-0 left-0 h-full w-full" aria-label="link" {href}></a>
	{/if}
</button>
