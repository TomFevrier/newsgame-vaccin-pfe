<script>
	import { Button, Content, Modal, Navigation } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	export let state;

	const outro = texts.outro.map(slide => slide.replace(/{{ LAB }}/g, localStorage.getItem('lab').toUpperCase()));

	let index = 0;

	// const startGame = () => {
	// 	localStorage.setItem('lab', labName);
	// 	GAME.start();
	// 	setTimeout(() => state = 'game', 500);
	// }
</script>

<Modal height={0.5}>
	<Content>
		<p>{@html typografix(outro[index])}</p>
	</Content>
	{#if index === outro.length - 1}
		<Button on:click={() => GAME.goToState('menu')}>
			Retour au menu
		</Button>
	{/if}
	<Navigation length={outro.length} bind:index />
</Modal>

<style lang='scss'>
	@import '../global.scss';
</style>
