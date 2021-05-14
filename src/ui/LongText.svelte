<script>
	import { fly } from 'svelte/transition';

	import { Content } from './index';

	export let style = '';
</script>

<div class='long-text' transition:fly={{ y: 500 }}>
	<div class='container'>
		<Content style='{style} margin: 2rem 0; max-height: none !important;'>
			<slot></slot>
		</Content>
	</div>
</div>

<style lang='scss'>
	@import '../global.scss';

	.long-text {
		@include cover;

		background-color: $background;
		border: 0.5rem solid $main;
		padding: 1rem;

		.container {
			font-size: 1.1rem !important;
			height: 100%;
			overflow-y: scroll;
			mask-image: linear-gradient(to bottom, transparent 0, black 2rem, black calc(100% - 2rem), transparent 100%);

			&::-webkit-scrollbar {
				display: none;
			}
			-ms-overflow-style: none;
			scrollbar-width: none;

			:global(p) {
				hyphens: auto;
			}
		}

		:global(h2) {
			margin-bottom: 2rem;
		}

		:global(h3) {
			margin-bottom: 0.5rem;
		}
	}
</style>
