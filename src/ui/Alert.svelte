<script>
	import { createEventDispatcher } from 'svelte';
	import { cubicOut, bounceOut } from 'svelte/easing';

	import { Button, Content, Modal, More } from './index';

	import { typografix } from '../utils';

	export let key;
	export let title;
	export let alerts;
	export let more;
	export let visible = false;

	$: alert = alerts && alerts[key];

	let moreVisible = false;

	const dispatch = createEventDispatcher();

	const formatText = (text) => text
		.replace(/{{ LAB }}/g, localStorage.getItem('lab').toUpperCase())
		.replace(/de A/g, `d'A`)
		.replace(/{{ JOUR }}/g, new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(new Date()));

	const appear = (node, options) => ({
		duration: 1000,
		easing: bounceOut,
		css: (t, u) => `transform: translate(-50%, -50%) scale(${t});`
	});
</script>

<svelte:options accessors={true}/>
{#if visible}
	<Modal transition={appear}>
		<Content>
			<img src='sprites/logo-aip.png' />
			<h3>{@html typografix(formatText(alert.title))}</h3>
			{#each alert.text.split('\n') as p}
				<p>{@html typografix(formatText(p))}</p>
			{/each}
		</Content>
		{#if key === 'win' && more}
			<Button on:click={() => moreVisible = true}>
				En savoir plus
			</Button>
		{/if}
		<Button on:click={() => dispatch('close')}>
			{key === 'win' ? 'Niveau suivant' : 'Recommencer'}
		</Button>
	</Modal>
	<More
		{title} {more}
		buttonText='Niveau suivant'
		visible={moreVisible}
		on:click={() => dispatch('close')} />
{/if}
