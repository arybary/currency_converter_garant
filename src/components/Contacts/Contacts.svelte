<script lang="ts">
	import { meContacts } from '../../constants/contacts';
</script>

<div class="contacts">
	<ul class="contacts__list">
		{#each meContacts as { label, url, icon }}
			<li class="contacts__list__item">
				<a class="contacts__list__item__link" href={url} target="_blank">
					<img
						class="contacts__list__item__link__icon"
						src={icon}
						alt={label}
						width="24"
						height="24"
					/>
					<span>{label}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	@use "/src/styles/variables" as *;

	.contacts {
		width: 100%;
		height: 50vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;

		&__list {
			padding: 0;

			&__item {
				margin-bottom: 10px;

				&__link {
					display: flex;
					align-items: center;
					text-decoration: none;
					color: $color-neutral-colors-black;
					font-size: 2rem;

					&__icon {
						margin-right: 1.5rem;
						width: 3rem;
						height: 3rem;
					}
				}
			}
		}
	}
</style>
