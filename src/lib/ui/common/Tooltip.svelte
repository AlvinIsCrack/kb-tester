<script lang="ts" module>
	import { tv } from 'tailwind-variants';
	import type { Action } from 'svelte/action';

	type Snippet = import('svelte').Snippet;

	// Opcional: Define las variantes del tooltip. El 'base' ya no necesita 'absolute'
	// porque el elemento real del tooltip se posicionará.
	const tooltipClasses = tv({
		base: 'absolute z-[900] w-max max-w-xs bg-tooltip text-tooltip-foreground px-3 py-1 rounded-md border text-sm shadow-md pointer-events-none whitespace-nowrap',
		variants: {
			position: {
				top: 'origin-bottom',
				bottom: 'origin-top',
				left: 'origin-right',
				right: 'origin-left'
			}
		},
		defaultVariants: {
			position: 'bottom'
		}
	});

	export type TooltipContentParameter = string | Snippet;

	// Definición de tipos para los parámetros de la acción
	export type TooltipParameters = {
		content?: TooltipContentParameter;
		position?: 'top' | 'bottom' | 'left' | 'right';
	};

	/**
	 * Crea un tooltip para el elemento al que se aplica.
	 * @param node El elemento HTML al que se aplica la acción.
	 * @param parameters Los parámetros iniciales para el tooltip (content, position).
	 */
	export const tooltip: Action<HTMLElement, TooltipParameters> = (node, parameters) => {
		if (!parameters?.content) return;

		let currentContent = parameters.content;
		let currentPosition = parameters.position || 'bottom';

		let tooltipElement: HTMLDivElement | null = null;
		let portalElement: HTMLElement | null = null;

		// No podemos usar $state directamente en el ámbito global de la acción.
		// Svelte 5 usa $state en el script principal de componentes.
		// Para acciones, podemos usar un enfoque similar con let y reasignaciones,
		// o importar 'state' de 'svelte/motion' para una reactividad más explícita si se necesita
		// que el estado interno sea reactivo a cambios no controlados por update().
		let visible = false;
		let style = '';
		let actualPosition: 'top' | 'bottom' | 'left' | 'right' = currentPosition;

		// Helper para gestionar la visibilidad y el DOM del tooltip
		const setVisible = (newVisible: boolean) => {
			if (visible === newVisible) return;
			visible = newVisible;

			if (visible) {
				// Crear y adjuntar el tooltip al portal
				if (!tooltipElement) {
					tooltipElement = document.createElement('div');
					tooltipElement.setAttribute('role', 'tooltip');
					if (typeof currentContent === 'string') {
						tooltipElement.innerHTML = currentContent;
					} else {
						console.warn(
							'Los snippets como contenido de tooltip no son soportados directamente en la acción. Por favor, provea un string HTML.'
						);
					}

					if (!portalElement) {
						portalElement = document.querySelector('#tooltip-portal');
						if (!portalElement) {
							console.error('El elemento #tooltip-portal no se encontró para adjuntar el tooltip.');
							return;
						}
					}
					portalElement.appendChild(tooltipElement);
				} else {
					// Actualizar contenido si ya existe
					if (typeof currentContent === 'string') {
						tooltipElement.innerHTML = currentContent;
					}
					tooltipElement.style.display = '';
				}

				// --- MODIFICACIÓN ---
				// Establecer el estado inicial para la animación de entrada.
				// El tooltip parte invisible y ligeramente desplazado/escalado.
				tooltipElement.className = tooltipClasses({ position: currentPosition });
				tooltipElement.style.opacity = '0';
				tooltipElement.style.transform = `translateY(${
					currentPosition === 'top' ? 5 : currentPosition === 'bottom' ? -5 : 0
				}px) translateX(${
					currentPosition === 'left' ? 5 : currentPosition === 'right' ? -5 : 0
				}px) scale(0.95)`;

				// En el siguiente cuadro de animación, calculamos la posición y aplicamos el estado final.
				requestAnimationFrame(() => {
					calculatePosition();
					window.addEventListener('scroll', calculatePosition, { capture: true, passive: true });
					window.addEventListener('resize', calculatePosition);
				});
			} else {
				// La lógica de salida ya tiene una animación, no se necesita cambiar.
				if (tooltipElement) {
					tooltipElement.style.opacity = '0';
					tooltipElement.style.transform = `translateY(${
						actualPosition === 'top' ? 5 : actualPosition === 'bottom' ? -5 : 0
					}px) translateX(${
						actualPosition === 'left' ? 5 : actualPosition === 'right' ? -5 : 0
					}px) scale(0.95)`;
					tooltipElement.style.transition = 'opacity 150ms, transform 150ms';
					setTimeout(() => {
						if (tooltipElement && !visible) {
							tooltipElement.remove();
							tooltipElement = null;
						}
					}, 150);
				}
				window.removeEventListener('scroll', calculatePosition, { capture: true });
				window.removeEventListener('resize', calculatePosition);
			}
		};

		const calculatePosition = () => {
			if (!visible || !node || !tooltipElement) return;

			const triggerRect = node.getBoundingClientRect();
			const tooltipRect = tooltipElement.getBoundingClientRect();

			let x = 0;
			let y = 0;

			const offset = 8;
			const boundaryPadding = 8;
			let tempPosition = currentPosition;

			// Calcular la posición inicial
			switch (currentPosition) {
				case 'top':
					x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
					y = triggerRect.top - tooltipRect.height - offset;
					break;
				case 'bottom':
					x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
					y = triggerRect.bottom + offset;
					break;
				case 'left':
					x = triggerRect.left - tooltipRect.width - offset;
					y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
					break;
				case 'right':
					x = triggerRect.right + offset;
					y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
					break;
			}

			// Ajustar para no salir del viewport (flipping)
			if (y < boundaryPadding) {
				if (
					tempPosition === 'top' &&
					triggerRect.bottom + tooltipRect.height + offset < window.innerHeight - boundaryPadding
				) {
					y = triggerRect.bottom + offset;
					tempPosition = 'bottom';
				} else {
					y = boundaryPadding;
				}
			} else if (y + tooltipRect.height > window.innerHeight - boundaryPadding) {
				if (
					tempPosition === 'bottom' &&
					triggerRect.top - tooltipRect.height - offset > boundaryPadding
				) {
					y = triggerRect.top - tooltipRect.height - offset;
					tempPosition = 'top';
				} else {
					y = window.innerHeight - tooltipRect.height - boundaryPadding;
				}
			}

			// Ajustar horizontalmente para no salir del viewport
			if (x < boundaryPadding) {
				x = boundaryPadding;
			} else if (x + tooltipRect.width > window.innerWidth - boundaryPadding) {
				x = window.innerWidth - tooltipRect.width - boundaryPadding;
			}

			actualPosition = tempPosition;

			tooltipElement.className = tooltipClasses({ position: actualPosition });
			tooltipElement.style.left = `${x}px`;
			tooltipElement.style.top = `${y}px`;
			tooltipElement.style.opacity = '1';
			tooltipElement.style.transform = 'translateY(0) translateX(0) scale(1)';
			tooltipElement.style.transition = 'opacity 150ms, transform 150ms';
		};

		// Event listeners en el nodo (el elemento al que se aplica la acción)
		const handlePointerEnter = () => setVisible(true);
		const handlePointerLeave = () => setVisible(false);
		const handleFocus = () => setVisible(true);
		const handleBlur = () => setVisible(false);
		const handlePointerDown = () => setVisible(false); // Para ocultar al hacer clic

		node.addEventListener('pointerenter', handlePointerEnter);
		node.addEventListener('pointerleave', handlePointerLeave);
		node.addEventListener('focus', handleFocus);
		node.addEventListener('blur', handleBlur);
		node.addEventListener('pointerdown', handlePointerDown);

		// Método update para cuando cambian los parámetros de la acción
		return {
			update(newParameters) {
				if (newParameters.content) currentContent = newParameters.content;
				currentPosition = newParameters.position || 'bottom';
				// Si el tooltip está visible, recalcular la posición y actualizar el contenido/clases
				if (visible && tooltipElement) {
					if (typeof currentContent === 'string') {
						tooltipElement.innerHTML = currentContent;
					}
					// No necesitamos 'actualPosition = currentPosition' aquí si calculatePosition ya lo hace
					calculatePosition();
				}
			},
			destroy() {
				// Limpiar listeners y remover el tooltip del DOM
				node.removeEventListener('pointerenter', handlePointerEnter);
				node.removeEventListener('pointerleave', handlePointerLeave);
				node.removeEventListener('focus', handleFocus);
				node.removeEventListener('blur', handleBlur);
				node.removeEventListener('pointerdown', handlePointerDown);

				window.removeEventListener('scroll', calculatePosition, { capture: true });
				window.removeEventListener('resize', calculatePosition);

				if (tooltipElement) {
					tooltipElement.remove();
					tooltipElement = null;
				}
			}
		};
	};
</script>
