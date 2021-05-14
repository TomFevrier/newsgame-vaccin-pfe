<script>
	import { Button, LongText, Spacer } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	export let visible;
</script>

{#if visible}
	<LongText style='text-align: center;'>
		<h2>Crédits</h2>
		{#each texts.credits as section}
			<p>
				{@html typografix(section.label)}
				<br />
				{#if Array.isArray(section.items)}
					{#each section.items as item}
						<b>{@html typografix(item)}</b>
						<br />
					{/each}
				{:else}
					<b>{@html typografix(section.items)}</b>
				{/if}
			</p>
			<Spacer height='0.5rem' />
		{/each}
		<Spacer height='1rem' />
		<Button on:click={() => visible = false}>
			Retour au menu
		</Button>
	</LongText>
{/if}
