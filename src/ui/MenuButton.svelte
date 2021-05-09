<script>
</script>

<div class='menu-button' on:click>
	<span class='fi fi-home'></span>
</div>

<style lang='scss'>
	@import '../global.scss';

	.menu-button {
		@include icon;

		position: absolute;
		left: 1rem;
		top: 1rem;
		width: 3rem;
		height: 3rem;

		.fi {
			font-size: 1.8rem;
		}
	}
</style>
