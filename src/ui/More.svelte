<script>
	import { Button, LongText, Spacer } from './index';

	import { typografix } from '../utils';

	export let title;
	export let more;
	export let buttonText;
	export let visible;
</script>

{#if visible}
	<LongText>
		<div class='info-icon'>
			<span class='fi fi-info'></span>
		</div>
		<h2>{title}</h2>
		{#each more as p}
			<p>{@html typografix(p)}</p>
		{/each}
		<Spacer height='1rem' />
		<Button on:click>
			{buttonText}
		</Button>
	</LongText>
{/if}

<style lang='scss'>
	@import '../global.scss';

	.info-icon {
		@include icon;

		margin: 0.5rem auto;
		cursor: default;
	}

	h2 {
		text-align: center;
	}
</style>
