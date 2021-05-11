<script>
	import { onMount, tick } from 'svelte';

	import { Game } from './classes';
	import { LoadingScreen, Menu, Intro, Outro } from './screens';

	let width;
	let view;

	let state = SKIP_MENU ? '' : 'menu';
	let loading = true;

	onMount(async () => {
		view.style.maxWidth = `${window.innerHeight * 9/16}px`;

		window.GAME = new Game(Math.min(width, window.innerHeight * 9/16), view);

		GAME.setState = (newState) => state = newState;

		await GAME.preload();

		loading = false;

		if (SKIP_MENU) GAME.start();
	});

	// $: console.log(state)
</script>

<div
	class='game'
	bind:this={view}
	bind:clientWidth={width}
>
	<canvas></canvas>
	{#if state === 'menu'}
		<Menu bind:state />
	{:else if state === 'intro'}
		<Intro bind:state />
	{:else if state === 'outro'}
		<Outro bind:state />
	{/if}
	{#if loading}
		<LoadingScreen />
	{/if}
	<div class='overlay'></div>
</div>

<!-- on:mouseover={() => GAME && GAME.app.ticker.start()}
on:mouseout={() => GAME && GAME.app.ticker.stop()} -->

<style lang='scss'>
	@import './global.scss';

	.game {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: Min(100vh, calc(100% * 16/9));
		overflow: hidden;

		@media (min-aspect-ratio: 1) {
			max-width: calc(100vh * 9/16) !important;
			padding-top: 100vh;
		}

		canvas {
			@include cover;
		}

		.overlay {
			@include cover;

			background: $background;
			z-index: 1000;
			pointer-events: none;
			opacity: 0;
			transition: opacity 0.5s ease-in-out;

			&.visible {
				opacity: 1;
			}

		}
	}
</style>
