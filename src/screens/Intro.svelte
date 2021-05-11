<script>
	import { Button, Content, Modal, Navigation } from '../ui';

	import { typografix, generateRandomName } from '../utils';

	import texts from '../texts';

	export let state;

	const intro = texts.intro.map(slide => slide.replace('{{ NB_VACCINATIONS }}', GAME.nbVaccinations));

	let index = 0;

	let labName = generateRandomName();

	let icon;
	let spinning = false;

	const startGame = () => {
		localStorage.clear();
		localStorage.setItem('lab', labName.slice(0, 15).toUpperCase());
		localStorage.setItem('level', 0);
		GAME.start();
		setTimeout(() => state = 'game', 500);
	}

	const generateNewName = () => {
		spinning = true;
		labName = generateRandomName();
		setTimeout(() => spinning = false, 500);
	}
</script>

<Modal fixedHeight>
	<Content>
		<p>{@html typografix(intro[index])}</p>
		{#if index === intro.length - 1}
			<div class='input-container'>
				<input bind:value={labName} maxlength={15} required />
				<div class='random-icon' class:spinning on:click={generateNewName}>
					<span class='fi fi-spinner-rotate-forward'></span>
				</div>
			</div>
		{/if}
	</Content>
	{#if index === intro.length - 1}
		<Button on:click={startGame}>
			Commencer
		</Button>
	{/if}
	<Navigation length={intro.length} bind:index />
</Modal>

<style lang='scss'>
	@import '../global.scss';

	.input-container {
		display: flex;
		justify-content: center;
		margin: 1rem 0;

		input {
			outline: none;
			padding: auto 0.5rem;
			font-size: 1.1rem;
			font-weight: bold;
			text-transform: uppercase;
			width: 100%;
			max-width: 12rem;
			margin-right: 0.5rem;
		}

		.random-icon {
			@include icon;

			flex-shrink: 0;

			&.spinning {
				animation: spin 0.5s linear infinite;
			}
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
