<script>
	import { fade } from 'svelte/transition';
</script>

<div class='loading-screen' out:fade={{ duration: 300 }}>
	<div class='bar'>
		<div class='bar-full'></div>
	</div>
</div>


<style lang='scss'>
	@import '../global.scss';

	.loading-screen {
		@include cover;

		z-index: 101;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $background-color;

		.bar {
			width: 60%;
			height: 2rem;
			border-radius: 1rem;
			overflow: hidden;
			background-color: $background-semi;

			.bar-full {
				background-color: $main;
				border-radius: 1rem;
				height: 100%;
				animation: load 3s ease-out;
			}
		}
	}

	@keyframes load {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
</style>
