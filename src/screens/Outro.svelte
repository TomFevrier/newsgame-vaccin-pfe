<script>
	import { Button, Content, Modal, Navigation } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	export let state;

	const outro = texts.outro.map(slide => slide.replace(/{{ LAB }}/g, localStorage.getItem('lab')));

	let index = 0;
</script>

<Modal fixedHeight>
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
