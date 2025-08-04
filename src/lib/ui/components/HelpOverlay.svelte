<script lang="ts">
	import { tick, untrack } from 'svelte';
	import Page from '$lib/global/page.svelte';
	import type { Action } from 'svelte/action';
	import { tv } from 'tailwind-variants';
	import { fade } from 'svelte/transition';
	import { tr } from '$lib/locale/locale.svelte';
	// 1. Define los IDs de los elementos que quieres resaltar.

	const maskableIds: string[] = ['keyboard', 'keylog'] as const; // 2. Define el padding (espacio) alrededor de los elementos resaltados.

	const PADDING = 8; // --- LÓGICA INTERNA DEL SISTEMA (MODIFICADA) ---

	let overlayElement: HTMLDivElement | undefined = $state(undefined);
	let clipPathStyle = $state('');
	let resizeObserver: ResizeObserver;
	// Variable para guardar el ID del intervalo y poder limpiarlo después.
	let pollInterval: ReturnType<typeof setInterval>; /**
	 * Calcula y actualiza la máscara CSS. (Sin cambios)
	 */

	const updateMask = () => {
		if (!overlayElement) return;
		let path = `M0,0 H${overlayElement.clientWidth} V${overlayElement.clientHeight} H0 Z`;
		for (const id of maskableIds) {
			const targetEl = document.getElementById(id);
			if (targetEl) {
				const targetRect = targetEl.getBoundingClientRect();
				const overlayRect = overlayElement.getBoundingClientRect();
				const x = targetRect.left - overlayRect.left;
				const y = targetRect.top - overlayRect.top;
				path += ` M${x - PADDING},${y - PADDING} h${targetRect.width + PADDING * 2} v${
					targetRect.height + PADDING * 2
				} h-${targetRect.width + PADDING * 2} z`;
			}
		}
		clipPathStyle = `path(evenodd, '${path}')`;
	};

	/**
	 * Intenta inicializar la máscara.
	 * Busca los elementos y si los encuentra todos, configura el observer y detiene el sondeo.
	 */
	const tryInitializeMask = () => {
		const targetElements = maskableIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null); // Filtra los nulos y asegura el tipo

		// Si encontramos todos los elementos que buscábamos y el overlay existe...
		if (targetElements.length === maskableIds.length && overlayElement) {
			// 1. ¡Éxito! Detenemos el sondeo.
			clearInterval(pollInterval);

			// 2. Configuramos el ResizeObserver para el overlay y los elementos encontrados.
			const elementsToObserve = [overlayElement, ...targetElements];
			resizeObserver = new ResizeObserver(updateMask);
			elementsToObserve.forEach((el) => resizeObserver.observe(el));

			// 3. Calculamos la máscara por primera vez.
			updateMask();
		}
	};

	$effect(() => {
		const _ = [Page.keyboardType, Page.showHelp];
		return untrack(() => {
			pollInterval = setInterval(tryInitializeMask, 100);

			return () => {
				// Limpiamos tanto el observer como el intervalo para evitar fugas de memoria.
				resizeObserver?.disconnect();
				clearInterval(pollInterval);
			};
		});
	});

	// La Svelte Action 'follow' no necesita cambios.
	const follow: Action<HTMLDivElement, { id: string; padding?: number }> = (
		element,
		{ id, padding = 8 }
	) => {
		let observer: ResizeObserver;
		const setPosition = (targetElement: HTMLElement) => {
			const { top, left, width, height } = targetElement.getBoundingClientRect();
			Object.assign(element.style, {
				position: 'absolute',
				top: `${top - padding}px`,
				left: `${left - padding}px`,
				width: `${width + padding * 2}px`,
				height: `${height + padding * 2}px`
			});
		};
		const initialize = async () => {
			await tick();
			const targetElement = document.getElementById(id);
			if (targetElement) {
				setPosition(targetElement);
				observer = new ResizeObserver(() => {
					setPosition(targetElement);
				});
				observer.observe(targetElement);
			}
		};
		initialize();
		return {
			update({ id, padding = 0 }) {
				const targetElement = document.getElementById(id);
				if (targetElement) {
					setPosition(targetElement);
				}
			},
			destroy() {
				observer?.disconnect();
			}
		};
	};

	const { overlay, container } = tv({
		slots: {
			overlay: 'rounded-md ring',
			container:
				'text-sm flex-row flex flex-wrap items-start justify-start gap-2 pointer-events-auto absolute -bottom-0 left-0 translate-y-full w-full p-2 select-text [&_h1]:font-black [&_h1]:text-lg [&_h1]:-mb-1'
		}
	})({});
</script>

{#if Page.showHelp}
	<button
		transition:fade={{ duration: 200 }}
		onclick={() => (Page.showHelp = false)}
		class="pointer-events-auto absolute top-0 left-0 z-50 h-full w-full text-left"
	>
		<div
			bind:this={overlayElement}
			class="h-full w-full bg-background"
			style:clip-path={clipPathStyle}
			style:-webkit-clip-path={clipPathStyle}
		></div>

		{#each maskableIds as id (id)}
			{@const keyStates = tr('help.keyboard.keystates') ?? undefined}
			<div use:follow={{ id }} class={overlay({})}>
				<div class={container({})}>
					<p class="w-full list-disc">{@html tr(`help.${id}` as any)}</p>
					<div class="w-full border-b"></div>
					<div class="flex w-full flex-row">
						<img
							class="pointer-events-none h-min rounded-lg border shadow-md"
							src="help-{id}.png"
							alt=""
						/>
						<div class="flex w-full flex-row items-start justify-between gap-2">
							<ol class="ml-6 w-2/3 list-decimal">
								{@html tr(`help.${id}.legend` as any)}
							</ol>
							{#if id === 'keyboard' && keyStates}
								<div
									class="flex w-1/2 flex-col gap-0.5 text-right text-xs [&_span]:mr-2 [&_span]:flex [&_span]:rounded-sm [&_span]:border [&_span]:px-1 [&_span]:select-none"
								>
									{#each keyStates.split('\n') as line (line)}
										<p class="flex flex-row-reverse gap-2 text-nowrap">{@html line}</p>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}

		<div class="absolute bottom-2 w-full animate-pulse text-center text-xl">{tr('help.close')}</div>
	</button>
{/if}
