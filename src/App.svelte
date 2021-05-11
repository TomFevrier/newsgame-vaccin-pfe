<script>
	import Game from './Game.svelte';

	Object.defineProperty(Array.prototype, 'last', {
		value: function() {
			return this[this.length - 1];
		}
	});

	Object.defineProperty(Array.prototype, 'random', {
		value: function() {
			return this[~~(Math.random() * this.length)];
		}
	});

	Object.defineProperty(Array.prototype, 'shuffle', {
		value: function() {
			return this.sort((a, b) => 0.5 - Math.random());
		}
	});

</script>

<main>
	<Game />
</main>

<style lang='scss'>
	@import './global.scss';

	:global(a) {
		color: $main;
		font-weight: bold;
		text-decoration: none;
	}

	main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		overflow: hidden;
	}
</style>
