<script>
	import { slide } from 'svelte/transition';
	import { currencies } from '../../../store/currencyConverterStore';
	import { onDestroy } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import Flag from '../Flag/Flag.svelte';

	let currentIndex = 0;
	const sliceSize = 3;
	const timeSlide = 10000;

	$: currenciesForSlider = $currencies.slice(
		currentIndex * sliceSize,
		currentIndex * sliceSize + sliceSize
	);

	const autoSlide = () => {
		currentIndex = (currentIndex + 1) % ($currencies.length / sliceSize);
	};

	const interval = setInterval(autoSlide, timeSlide);

	onDestroy(() => {
		clearInterval(interval);
	});

	const prevSlide = () => {
		currentIndex =
			(currentIndex - 1 + $currencies.length / sliceSize) % ($currencies.length / sliceSize);
	};

	const nextSlide = () => {
		currentIndex = (currentIndex + 1) % ($currencies.length / sliceSize);
	};
</script>

<div class="slider">
	<ul class="slider__list">
		{#each currenciesForSlider as { cc, r030, txt, rate, exchangedate }, index (index)}
			{#key currentIndex}
				<div
					transition:slide|global={{ duration: 300, easing: quintOut, axis: 'x' }}
					class="slider__list__item"
				>
					<button class="slider__list__item__image"><Flag currency={cc} /></button>
					<div class="slider__list__item__info">
						<p>{cc}</p>
						<p>Курс: {rate}</p>
						<p>{txt}</p>
					</div>
				</div>
			{/key}
		{/each}
	</ul>
	<div class="slider__btns">
		<button class="slider__btns" on:click={prevSlide}>&lt;</button>
		<button class="slider__btns" on:click={nextSlide}>&gt;</button>
	</div>
</div>

<style lang="scss">
	@use '/src/styles/variables' as *;

	.slider {
		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;
		gap: 1rem;
		&__list {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $color-primary-green;
			padding: 1rem;
			gap: 1rem;
			border-radius: 1rem;
			border-bottom: 0.2rem solid $color-primary-dark-green;

			&__item {
				display: flex;
				flex-direction: column;
				padding: 1rem;
				gap: 1rem;
				height: 10rem;

				font-size: 1rem;
				align-items: center;
				justify-content: space-between;
				background-color: $color-primary-light-green;

				&__image {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 4rem;
					height: 3rem;
				}

				&__info {
					display: flex;
					flex-direction: column;
					gap: 0.2rem;
					font-family: $secondary-font;
					font-size: 1rem;
					font-weight: 600;
				}
			}
		}
		&__btns {
			cursor: pointer;
			display: flex;
			padding: 1rem;
			border-radius: 1rem;
			background-color: $color-primary-dark-green;
			color: $color-neutral-colors-white;
		}
	}
</style>
