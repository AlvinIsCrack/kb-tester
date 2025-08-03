<script lang="ts">
	import { tv } from 'tailwind-variants';
	import type { ClassValue, HTMLSelectAttributes } from 'svelte/elements';
	import { tooltip, type TooltipParameters } from './Tooltip.svelte';
	import type { Component } from 'svelte';

	/** Define el tipo para cada opción en la lista del select. */
	export type Item = {
		label?: string;
		value: string;
	};

	/**
	 * tailwind-variants para estilizar las partes del componente.
	 * Esto permite una personalización limpia y centralizada.
	 */
	const selectTv = tv({
		slots: {
			// Contenedor principal que envuelve el label y el select.
			wrapper: 'h-fit w-full space-y-1',
			// El label opcional que se muestra encima del select.
			label: 'block text-sm font-medium text-foreground',
			// Contenedor relativo para el trigger visual y el select oculto.
			triggerWrapper: 'relative group',
			// El elemento visual que parece un botón.
			trigger:
				'flex h-8 w-full items-center rounded-md border border-input group-hover:bg-muted bg-background text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden',
			// El área que muestra el valor seleccionado o el placeholder.
			value: 'flex-1 px-3 align-middle text-left whitespace-nowrap overflow-hidden text-ellipsis',
			// El separador visual entre el texto y el icono.
			separator: 'h-8 w-px bg-border self-center',
			// Contenedor para el icono de chevron.
			icon: 'flex items-center justify-center px-2 text-muted-foreground',
			// El elemento <select> real, que es invisible pero funcional.
			select:
				'absolute inset-0 opacity-0 flex h-fit w-full items-center justify-between rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
		}
	});

	const {
		wrapper,
		label: labelTv,
		triggerWrapper,
		trigger,
		value,
		separator,
		icon,
		select
	} = selectTv();

	let {
		items,
		selected = $bindable(),
		placeholder = 'Select an option...',
		label,
		class: _class,
		id,
		tooltip: _tooltip,
		wrapperClass,
		icon: Icon,
		...props
	}: {
		items: Item[];
		selected?: string;
		placeholder?: string;
		tooltip?: TooltipParameters['content'];
		wrapperClass?: ClassValue;
		icon?: Component;
		label?: string;
		id: string;
	} & HTMLSelectAttributes = $props();

	/**
	 * Estado derivado para mostrar el texto correcto.
	 * Muestra el label del item seleccionado, o su valor como fallback.
	 * Si no hay nada seleccionado, muestra el placeholder.
	 */
	const displayLabel = $derived.by(() => {
		if (selected) {
			const item = items.find((i) => i.value === selected);
			return item?.label ?? item?.value;
		}
		return placeholder;
	});
</script>

<!-- Contenedor principal con tooltip y clases personalizadas -->
<div use:tooltip={{ content: _tooltip }} class={wrapper({ class: wrapperClass as any })}>
	<!-- Label opcional, asociado al 'id' del select -->
	{#if label}
		<label class={labelTv()} for={id}>
			{label}
		</label>
	{/if}

	<!-- Contenedor relativo que aloja el trigger y el select oculto -->
	<div class={triggerWrapper()}>
		<!-- 
            El "botón" visual. Es inerte a los eventos de puntero para que los clics
            lleguen al <select> invisible que está encima.
        -->
		<div class={trigger({ class: _class as any })} aria-hidden="true">
			<span class={value()}>
				{#if Icon}
					<Icon class="mr-2 inline-block scale-150" />
				{/if}
				{@html displayLabel}
			</span>
			<div class={separator()}></div>
			<div class={icon()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" />
				</svg>
			</div>
		</div>

		<!-- 
            El <select> real. Es invisible pero ocupa todo el espacio del trigger.
            Recibe el 'bind:value', el 'id' para el label, y los demás props.
        -->
		<select class={select()} bind:value={selected} {id} {...props}>
			{#if placeholder && !selected}
				<option value="" disabled selected hidden>{placeholder}</option>
			{/if}

			{#each items as item (item.value)}
				<option value={item.value}>
					{@html item.label ?? item.value}
				</option>
			{/each}
		</select>
	</div>
</div>
