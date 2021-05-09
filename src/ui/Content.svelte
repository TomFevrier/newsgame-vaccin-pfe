<script>
	export let style = '';
</script>

<div class='content' {style}>
	<slot></slot>
</div>

<style lang='scss'>
	@import '../global.scss';

	.content {
		font-size: 1.2rem;

		@include sm {
			font-size: 1rem;
		}

		@include xs {
			font-size: 0.9rem;
		}

		:global(h2) {
			font-size: 1.5em;
			margin: 1rem 0;
			line-height: 110%;
		}

		:global(h3) {
			font-size: 1.2em;
			margin: 0.5rem 0;
			line-height: 110%;
		}

		:global(p) {
			font-size: 1em;
			margin: 0.5rem 0;
		}

		:global(img) {
			width: 6rem;
			display: block;
			margin: 0 auto;

			@include sm {
				width: 4rem;
			}
		}
	}
</style>
