<script>
	export let length;
	export let index;
</script>

<div class='navigation'>
	<div
		class='icon'
		class:hidden={index === 0}
		on:click={() => index = Math.max(index - 1, 0)}
	>
		<span class='fi fi-angle-left'></span>
	</div>
	<div class='dots'>
		{#each Array.from({ length }) as _, i}
			<div class='dot' class:selected={index === i}></div>
		{/each}
	</div>
	<div
		class='icon'
		class:hidden={index === length - 1}
		on:click={() => index++}
	>
		<span class='fi fi-angle-right'></span>
	</div>
</div>

<style lang='scss'>
	@import '../global.scss';

	.navigation {
		display: flex;
		justify-content: space-between;

		.icon {
			@include icon;
			margin: 0.5rem;

			&.hidden {
				visibility: hidden;
				pointer-events: none;
			}
		}

		.dots {
			display: flex;
			justify-content: center;
			align-items: center;

			.dot {
				width: 0.5rem;
				height: 0.5rem;
				border-radius: 50%;
				background-color: lightgrey;
				margin: 0.5rem;

				&.selected {
					background-color: $main;
				}
			}
		}
	}
</style>
