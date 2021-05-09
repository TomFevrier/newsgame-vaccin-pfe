<script>
	export let width = null;
</script>

<div class='button' on:click style='width: {width};'>
	<slot></slot>
</div>

<style lang='scss'>
	@import '../global.scss';

	.button {
		width: fit-content;
		height: 2.5rem;
		border-radius: 1.25rem;
		background-color: $main;
		color: white;
		font-size: 1.2rem;
		font-weight: bold;
		padding: 0 1rem;
		margin: 1rem auto 0;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}
</style>
