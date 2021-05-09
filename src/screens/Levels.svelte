<script>
	import { Button, LongText, Spacer } from '../ui';

	import { typografix } from '../utils';

	import texts from '../texts';

	export let visible = false;
	export let state;

	const savedLevel = localStorage.getItem('level');

	const startLevel = (index) => {
		if (!savedLevel || index > +savedLevel) return;

		GAME.goToLevel(index);
		setTimeout(() => {
			visible = false;
			state = 'game';
		}, 500);
	}

	const goToOutro = () => {
		GAME.goToState('outro');
		setTimeout(() => {
			visible = false;
		}, 500);
	}
</script>

{#if visible}
	<LongText>
		<h2>Niveaux</h2>
		<div class='grid'>
			{#each texts.levels as level, index}
				<div
					class='level'
					class:active={savedLevel && index <= +savedLevel}
					on:click={() => startLevel(index)}
				>
					<h3>{@html typografix(level.title)}</h3>
				</div>
			{/each}
			<div
				class='level outro'
				class:active={GAME.finished}
				on:click={goToOutro}
			>
				<h3>Conclusion</h3>
			</div>
		</div>

		<Spacer height='1rem' />
		<Button on:click={() => visible = false}>
			Retour au menu
		</Button>
	</LongText>
{/if}

<style lang='scss'>
	@import '../global.scss';

	h2 {
		text-align: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;

		.level {
			height: 10rem;
			background: $main;
			border-radius: 0.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: not-allowed;
			opacity: 0.5;

			&.active {
				cursor: pointer;
				opacity: 1;
			}

			&.outro {
				height: 5rem;
				grid-column: span 2;
			}

			h3 {
				font-size: 1.2rem;
				text-align: center;
				color: white;

				@include sm {
					font-size: 1.1rem;
				}
			}
		}

	}
</style>
