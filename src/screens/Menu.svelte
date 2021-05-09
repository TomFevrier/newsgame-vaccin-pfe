<script>
	import { fade } from 'svelte/transition';

	import { Levels, MakingOf, Credits } from './index';
	import { Button, Content, Modal } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	console.log(texts)

	export let state;

	let modalVisible = window.matchMedia('(min-aspect-ratio: 9/16)').matches;
	let levelsVisible = false;
	let makingOfVisible = false;
	let creditsVisible = false;
</script>

<div class='menu'>
	<img src='img/syringe-large.png' />
	<h1>Fabriquez votre vaccin<br />contre le Covid-19</h1>
	<Button width='12rem' on:click={() => GAME.goToState('intro')}>
		Nouvelle partie
	</Button>
	<Button width='12rem' on:click={() => levelsVisible = true}>
		Niveaux
	</Button>
	<Button width='12rem' on:click={() => makingOfVisible = true}>
		Coulisses
	</Button>
	<Button width='12rem' on:click={() => creditsVisible = true}>
		Crédits
	</Button>
	{#if modalVisible}
		<div class='overlay' out:fade={{ duration: 300 }}>
			<Modal width={0.75} closable on:close={() => modalVisible = false}>
				<Content>
					<div class='icon-mobile'>
						<span class='fi fi-mobile-alt'></span>
					</div>
					<p>Ce jeu est optimisé pour une expérience sur mobile. Nous vous conseillons donc d'y jouer depuis votre téléphone, sur un navigateur comme Firefox ou Chrome.</p>
				</Content>
			</Modal>
		</div>
	{/if}
	<Levels bind:state bind:visible={levelsVisible} />
	<!-- <MakingOf bind:visible={makingOfVisible} /> -->
	<!-- <Credits bind:visible={creditsVisible} /> -->
</div>


<style lang='scss'>
	@import '../global.scss';

	.menu {
		@include cover;

		max-height: calc(100% * 16/9);
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 42;

		background-color: $background-color;
		// background-color: #FFFAFA;
		// border: 0.5rem solid #00A9A0;

		img {
			display: block;
			width: 5rem;
			margin: 0.5rem auto;
		}

		h1 {
			line-height: 110%;
			text-align: center;
			font: bold 1.8rem 'Gotham', sans-serif;
		}
	}

	.overlay {
		@include cover;
		background: $background-semi;

		.icon-mobile {
			@include icon;

			width: 3rem;
			height: 3rem;
			cursor: default;
			margin: 1rem auto;

			.fi {
				font-size: 1.8rem;
			}
		}
	}
</style>
