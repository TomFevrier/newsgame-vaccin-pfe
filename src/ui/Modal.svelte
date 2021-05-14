<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let width;
	export let fixedHeight = false;
	export let closable = false;
	export let transition = () => {};

	const dispatch = createEventDispatcher();

	const style = `
		width: ${width ? `${width * 100}%` : '90%'};
		--game-height: ${window.GAME && GAME.height}px;
	`;
</script>

<div
	class='modal'
	class:fixed-height={fixedHeight}
	in:transition out:fade={{ duration: 250 }}
	{style}
>
	<slot></slot>
	<div class='rect border'></div>
	<div class='rect background'></div>
	{#if closable}
		<div
			class='close-button'
			on:click={() => dispatch('close')}
		>
			<span class='fi fi-close-a'></span>
		</div>
	{/if}
</div>

<style lang='scss'>
	@import '../global.scss';

	.modal {
		@include center;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&.fixed-height {
			height: 40%;
			min-height: calc(0.4 * var(--game-height));

			@include sm {
				height: 50%;
				min-height: calc(0.5 * var(--game-height));
			}

			@include xs {
				height: 55%;
				min-height: calc(0.55 * var(--game-height));
			}
		}

		.close-button {
			@include icon;

			position: absolute;
			top: 0;
			right: 0;
			transform: translate(42%, -42%);
			z-index: 25;
		}

		.rect {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: -1;

			&.border {
				width: 100%;
				height: 100%;
				background-color: $main;
				clip-path: polygon(2rem 0%, 100% 0%, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0% 100%, 0% 2rem);

			}

			&.background {
				width: calc(100% - 1rem);
				height: calc(100% - 1rem);
				background-color: $background;
				clip-path: polygon(1.8rem 0%, 100% 0%, 100% calc(100% - 1.8rem), calc(100% - 1.8rem) 100%, 0% 100%, 0% 1.8rem);
			}
		}
	}
</style>
