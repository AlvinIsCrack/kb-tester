<script lang="ts">
	import { tv } from 'tailwind-variants';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import Dropdown from '$lib/icons/dropdown.svelte';

	/** Define el tipo para cada opción en la lista del select. */
	export type Item = {
		label?: string;
		value: string;
	};

	const selectTv = tv({
		base: 'flex h-fit w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer',
		slots: {
			icon: 'absolute opacity-50 right-3 top-0 h-full pointer-events-none scale-150',
			label: 'block text-sm text-foreground'
		}
	});

	const { base, icon, label: labelTv } = selectTv();

	let {
		items,
		selected = $bindable(),
		placeholder,
		label,
		id,
		...props
	}: {
		items: Item[];
		selected?: string;
		placeholder?: string;
		label?: string;
		id: string;
	} & HTMLSelectAttributes = $props();
</script>

<div class="h-fit w-full">
	{#if label}
		<label class={labelTv()} for={id}>
			{label}
		</label>
	{/if}

	<div class="relative h-fit w-full">
		<select class={base()} bind:value={selected} {...props} {id}>
			{#if placeholder}
				<option value="" disabled selected hidden>{placeholder}</option>
			{/if}

			{#each items as item (item.value)}
				<option value={item.value}>
					{item.label ?? item.value}
				</option>
			{/each}
		</select>

		<Dropdown class={icon()} />
	</div>
</div>
