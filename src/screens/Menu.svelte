<script>
	import { fade } from 'svelte/transition';

	import { Levels, MakingOf, Credits } from './index';
	import { Button, Content, Modal } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	console.log(texts)

	export let state;

	let modalVisible = window.matchMedia('(min-aspect-ratio: 1)').matches;
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
				<Content style='text-align: center;'>
					<div class='icon-mobile'>
						<span class='fi fi-mobile-alt'></span>
					</div>
					<p>Ce jeu est optimisé pour une expérience sur mobile. Nous vous conseillons donc d'y jouer depuis votre téléphone, sur un navigateur comme Firefox ou Chrome.</p>
				</Content>
			</Modal>
		</div>
	{/if}
	<!-- <img class='background' id='rna' src='img/rna.svg' />
	<img class='background' id='vial' src='img/vaccine-vial.svg' /> -->
	<Levels bind:state bind:visible={levelsVisible} />
	{#if NODELAY}
		<MakingOf bind:visible={makingOfVisible} />
		<Credits bind:visible={creditsVisible} />
	{/if}
</div>


<style lang='scss'>
	@import '../global.scss';

	.menu {
		@include cover;

		max-height: calc(100% * 16/9);
		display: flex;
		flex-direction: column;
		// padding-top: 5rem;
		justify-content: center;
		z-index: 42;

		background-color: $background-color;
		// background-color: #FFFAFA;
		// border: 0.5rem solid #00A9A0;

		img {
			display: block;
			width: 5rem;
			margin: 0.5rem auto;

			&.background {
				position: absolute;
				bottom: 2rem;
				z-index: -42;
				opacity: 0.7;
				width: 30%;

				&#rna {
					left: 2rem;
				}

				&#vial {
					right: 2rem;
				}
			}
		}

		h1 {
			line-height: 110%;
			text-align: center;
			font: bold 1.8rem 'Gotham', 'Source Sans Pro', sans-serif;

			@include xs {
				font-size: 1.5rem;
			}
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
