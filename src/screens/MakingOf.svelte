<script>
	import { Button, LongText, Spacer } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	export let visible = false;
</script>

{#if visible}
	<LongText>
		<h2>Coulisses</h2>
		{#each texts.makingOf as section}
			<h3>{@html typografix(section.title)}</h3>
			{#each section.text as p}
				<p>{@html typografix(p)}</p>
			{/each}
			<Spacer height='1rem' />
		{/each}
		<a href='https://github.com/TomFevrier/newsgame-vaccin-pfe' target='_blank'>
			<Button>Voir le code source</Button>
		</a>
		<Spacer height='1rem' />
		<Button on:click={() => visible = false}>
			Retour au menu
		</Button>
	</LongText>
{/if}

<style lang='scss'>
	h2 {
		text-align: center;
	}
</style>
