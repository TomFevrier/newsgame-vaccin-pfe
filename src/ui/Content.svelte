<script>
	export let style = '';

	let width;

	$: fontSize = width && Math.min(Math.max(width * 0.05, 12), 20);
</script>

<div
	class='content'
	bind:clientWidth={width}
	style='font-size: {fontSize}px; max-height: {window.GAME && GAME.height * 0.7}px; {style}'
>
	<slot></slot>
</div>

<style lang='scss'>
	@import '../global.scss';

	.content {
		:global(h2) {
			font-size: 1.5em;
			margin: 1rem 0;
			line-height: 110%;
			font-family: 'Gotham', 'Source Sans Pro', sans-serif;
		}

		:global(h3) {
			font-size: 1.2em;
			margin: 0.5rem 0 1rem;
			line-height: 110%;
			font-family: 'Gotham', 'Source Sans Pro', sans-serif;
		}

		:global(p) {
			font-size: 1em;
			margin: 0.5rem 0;
		}

		:global(img) {
			width: 6em;
			display: block;
			margin: 0 auto;
		}

		overflow-y: scroll;

		&::-webkit-scrollbar {
			display: none;
		}
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
