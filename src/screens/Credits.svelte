<script>
	import { Button, LongText, Spacer } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	export let visible;
</script>

{#if visible}
	<LongText style='text-align: center;'>
		<h2>Crédits</h2>
		<p>Conçu et développé par<br /><b>Tom Février</b></p>
		<p>
			Réalisé avec
			<br />
			<b>PIXI.js</b>
			<br />
			<b>Svelte</b>
			<br />
			<b>GSAP</b>
			<br />
			<b>Howler</b>
			<br />
			<b>Fontisto</b>
		</p>
		<p>Musiques et effets sonores<br /><b>Freesound</b></p>
		<p>
			Avec l'aide précieuse de
			<br />
			<b>Florence Débarre</b>
			<br />
			<b>Steve Pascolo</b>
			<br />
			<b>Mounia Hocine</b>
			<br />
			<b>Marie Mawad</b>
		</p>
		<Spacer height='1rem' />
		<Button on:click={() => visible = false}>
			Retour au menu
		</Button>
	</LongText>
{/if}
