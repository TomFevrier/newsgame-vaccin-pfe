<script>
	import { createEventDispatcher } from 'svelte';

	import { Button, Content, Modal } from './index';

	import { typografix } from '../utils';

	export let text;
	export let visible = false;

	const dispatch = createEventDispatcher();

	const appear = (node, options) => ({
		duration: 300,
		css: (t, u) => `opacity: ${t}; transform: translate(-50%, -50%) scale(${t});`
	});
</script>

<svelte:options accessors={true}/>
{#if visible}
	<Modal transition={appear}>
		<Content>
			<p>{@html typografix(text)}</p>
		</Content>
		<Button on:click={() => dispatch('close')}>
			J’ai compris
		</Button>
	</Modal>
{/if}
