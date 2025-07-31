<script lang="ts">
	import { clickOutside } from '$lib/helpers/actions';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { tv } from 'tailwind-variants';

	const dialog = tv({
		base: 'absolute pointer-events-auto top-0 left-0 z-[1000] flex h-full w-full items-center justify-center bg-black/50',
		slots: {
			container: 'relative shadow-lg/50 rounded-lg border p-4 bg-background text-foreground pt-10',
			closeButton:
				'absolute top-2 right-2 p-1 rounded-sm aspect-square w-6 h-6 flex justify-center cursor-pointer hover:bg-keycritical/50 items-center bg-keycritical text-keycritical-foreground text-sm font-bold'
		}
	});
	const { base, container, closeButton } = dialog({});

	let {
		show = $bindable(),
		children,
		closeOnOutsideClick = true,
		disableContainer = false,
		...props
	}: {
		show?: boolean;
		closeOnOutsideClick?: boolean;
		disableContainer?: boolean;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

{#if show}
	<div transition:fade={{ duration: 200 }} class={base({})} {...props}>
		{#if disableContainer}
			<button class="{closeButton()} top-8 right-8" onclick={() => (show = false)}> X </button>
			{@render children?.()}
		{:else}
			<div
				use:clickOutside={{
					callbackFunction() {
						if (closeOnOutsideClick) {
							// Solo cierra si la prop es verdadera
							show = false;
						}
					}
				}}
				class={container({})}
			>
				<button onclick={() => (show = false)} class={closeButton()}> X </button>
				{@render children?.()}
			</div>
		{/if}
	</div>
{/if}
