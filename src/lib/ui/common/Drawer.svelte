<script lang="ts">
	import { clickOutside } from '$lib/helpers/actions';
	import { circOut } from 'svelte/easing';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import { tv } from 'tailwind-variants';

	const drawer = tv({
		base: 'fixed pointer-events-auto bottom-0 left-0 z-[800] flex h-full w-full items-end justify-center bg-black/50',
		slots: {
			container:
				'relative shadow-lg/50 border-t min-h-60 rounded-t-lg p-4 bg-background/50 text-foreground pt-10 w-full transition-transform duration-200 ease-out select-none flex justify-center items-center'
		}
	});

	const { base, container } = drawer({});

	let {
		show = $bindable(),
		children,
		closeOnOutsideClick = true,
		containerClass,
		...props
	}: {
		show?: boolean;
		containerClass?: ClassValue;
		closeOnOutsideClick?: boolean;
	} & HTMLAttributes<HTMLDivElement> = $props();

	let startY = 0;
	let translateY = $state(0);
	let isDragging = $state(false);
	const dragThreshold = 50;

	function handlePointerDown(e: PointerEvent) {
		isDragging = true;
		startY = e.clientY;
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp, { once: true });
	}

	function handlePointerMove(e: PointerEvent) {
		e.preventDefault();
		const deltaY = e.clientY - startY;
		// Solo permite arrastrar hacia abajo y actualiza la posición
		translateY = Math.max(0, deltaY);
	}

	function handlePointerUp() {
		isDragging = false;
		window.removeEventListener('pointermove', handlePointerMove);

		if (translateY > dragThreshold) {
			show = false;
		}
		// Anima el drawer para que vuelva a su posición original o resetea para la próxima vez que se abra
		translateY = 0;
	}

	function drawerSlide(
		node: HTMLElement,
		{ delay = 0, duration = 400, easing = circOut, opacity = 0 } = {}
	) {
		const style = getComputedStyle(node);
		const target_opacity = +style.opacity;
		const transform = style.transform === 'none' ? '' : style.transform;
		const od = target_opacity * (1 - opacity);

		return {
			delay,
			duration,
			easing,
			css: (t: number, u: number) => `
			transform: ${transform} translate(0, ${(1 - t) * 100}%);
			opacity: ${target_opacity - od * u}`
		};
	}
</script>

{#if show}
	<div transition:fade={{ duration: 200 }} class={base({})} {...props}>
		<div
			transition:drawerSlide={{ duration: 400 }}
			use:clickOutside={{
				callbackFunction() {
					if (closeOnOutsideClick) show = false;
				}
			}}
			class="{container({})} {containerClass}"
			class:!transition-none={isDragging}
			style:transform="translateY({translateY}px)"
		>
			<div
				onpointerdown={handlePointerDown}
				class="absolute top-2 left-1/2 w-1/8 -translate-x-1/2 cursor-grab p-4"
			>
				<div class="h-1.5 w-full rounded-full bg-muted p-1"></div>
			</div>
			{@render children?.()}
		</div>
	</div>
{/if}
