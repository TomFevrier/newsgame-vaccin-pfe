<script>
	import { Button, Content, Modal, More, Navigation } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	const outro = texts.outro.text.map(slide => slide.replace(/{{ LAB }}/g, localStorage.getItem('lab')));

	let index = 0;

	let moreVisible = false;
</script>

<Modal fixedHeight>
	<Content>
		<p>{@html typografix(outro[index])}</p>
	</Content>
	{#if index === outro.length - 1}
		<div>
			{#if texts.outro.more}
				<Button on:click={() => moreVisible = true}>
					En savoir plus
				</Button>
			{/if}
			<Button on:click={() => GAME.goToState('menu')}>
				Retour au menu
			</Button>
		</div>
	{/if}
	<Navigation length={outro.length} bind:index />
</Modal>
<More
	title='La levée des brevets, vraiment utile ?'
	more={texts.outro.more}
	buttonText='Retour au menu'
	visible={moreVisible}
	on:click={() => GAME.goToState('menu')} />

<style lang='scss'>
	@import '../global.scss';
</style>
