<script lang="ts">
	import Input from '$lib/global/input.svelte';
	import { untrack } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import KeyboardButton from '../common/KeyboardButton.svelte';
	import type { Key } from '$lib/global/keyboard.svelte';
	import { flip } from 'svelte/animate';
	import { circOut } from 'svelte/easing';
	import Time from '$lib/utils/Time';
	import Page from '$lib/global/page.svelte';
	import Tooltip from '../common/Tooltip.svelte';
	import { tr } from '$lib/locale/locale.svelte';

	const log = $derived(Input.log);
	let visibleKeys: { key: Key; date: number }[] = $state([]);

	$effect(() => {
		const _ = log.length;

		untrack(() => {
			const last = log.at(-1);
			if (!last) {
				visibleKeys = [];
				return;
			}

			visibleKeys.push({
				key: last as Key,
				date: Date.now()
			});
			visibleKeys = visibleKeys.slice(-40);
		});
	});

	let initialized = $state(false);
	$effect(() => {
		setTimeout(() => {
			initialized = true;
		}, 200);
	});
</script>

{#if initialized}
	<!-- <div
		transition:fly={{ delay: 200, y: -20 }}
		class="absolute top-0 flex h-min w-[100vw] flex-col items-center justify-start"
	>
		<div class="h-10 w-full bg-gradient-to-b from-keyactive/40 to-transparent"></div>
	</div> -->
	<div
		transition:fly={{ duration: 200, y: -5 }}
		class="mt-2 flex h-fit w-1/2 flex-col items-center justify-center gap-10 overflow-visible rounded-lg"
	>
		<div class="relative flex h-min w-full flex-row items-center justify-center gap-1">
			{#if visibleKeys.length}
				<div
					transition:fade={{ duration: 200 }}
					style="--mask-opacity: {(1 - Math.min(visibleKeys.length / 20, 1)) * 100}%"
					class="keylog flex flex-row items-center justify-end px-8 py-8 will-change-transform"
				>
					{#each visibleKeys as { date, key }, i (date)}
						{@const group = (() => {
							if (i === visibleKeys.length - 1) return true; // El último elemento siempre es parte de un grupo
							for (let j = i + 1; j < visibleKeys.length; j++) {
								const timeDiff = visibleKeys[j].date - visibleKeys[j - 1].date;
								if (timeDiff >= 1000) {
									return false; // Si hay un salto de más de 1s después de este botón, no es parte del grupo
								}
							}
							return true; // Todos los siguientes botones están dentro de 1s, por lo que es parte de un grupo
						})()}
						<div class="relative h-min" animate:flip={{ duration: 200, easing: circOut }}>
							<KeyboardButton display {key} />
							<div
								class="absolute top-0 flex w-full origin-top -translate-y-[100%] scale-90 flex-col items-center justify-center text-center text-sm text-nowrap text-muted-foreground italic"
							>
								{#if i > 0}
									{@const time = Time.formatMS(date - visibleKeys[i - 1].date)}
									{@const timeUnit = time.match(/[^\d]+/)?.at(0) ?? ''}

									{#if timeUnit === 'ms'}
										<div class="flex flex-row">
											<span class="opacity-50">+</span>
											{time.match(/\d+/)}
										</div>
									{/if}
								{/if}
							</div>
							{#if group}
								<div
									transition:fly={{ y: -2 }}
									class="pointer-events-none absolute -bottom-1 flex h-full w-full justify-center"
								>
									<div
										class="w-full animate-[group-in-animation_200ms_ease-out] border-b-2 border-foreground duration-200"
									></div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global(.keylog) {
		mask-image: linear-gradient(to right, oklch(1 0 0 / var(--mask-opacity)) 5%, white 25%);
	}

	@keyframes -global-group-in-animation {
		from {
			opacity: 0%;
		}
	}
</style>
