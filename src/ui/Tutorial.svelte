<script>
	import { createEventDispatcher } from 'svelte';

	import { Button, Content, Modal, More, Navigation } from './index';

	import { typografix } from '../utils';

	export let title;
	export let slides;
	export let more;
	export let visible = false;

	const dispatch = createEventDispatcher();

	let index = 0;

	let moreVisible = false;
</script>

<svelte:options accessors={true}/>
{#if visible}
	<Modal fixedHeight closable on:close>
		<Content>
			<h3>{@html typografix(title)}</h3>
			<p>{@html typografix(slides[index])}</p>
		</Content>
		{#if index === slides.length - 1}
			{#if GAME.finished && more}
				<Button on:click={() => moreVisible = true}>
					En savoir plus
				</Button>
			{:else}
				<Button on:click={() => dispatch('close')}>
					À vous de jouer !
				</Button>
			{/if}
		{/if}
		<Navigation length={slides.length} bind:index />
	</Modal>
	<More
		{title} {more}
		buttonText='Retour au tutoriel'
		visible={moreVisible}
		on:click={() => moreVisible = false} />
{/if}
