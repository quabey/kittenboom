<script>
	// =========== STORES =========== //
	import { cards } from './../stores-cards.js';

	// =========== COMPONENTS =========== //
	import Cards from '$lib/cards.svelte';

	// =========== OTHER =========== //
	import { getCardByName } from '$lib/functions.js';
	import { onMount } from 'svelte';

	// =========== PROPS =========== //
	export let card_name;

	// =========== VARIABLES =========== //
	let card = $cards.find((card) => card.name === card_name);
	let cardsComponent;

	const card_title = card.title;
	const card_description = card.description;
	const card_image = card.image;
	const card_color = card.color;

	const dark_colors = ['#41044A', '#0A0D1C', '#393642'];
	// send text color based on card color
	let text_color = dark_colors.includes(card_color) ? 'white' : 'black';

	// =========== FUNCTIONS =========== //
	/**
	 * Handles the click event on the card
	 * @returns {void}
	 * @function handleClick
	 * @implements {cardsComponent.handleIncomingPlayedCard}
	 * @description Handles the click event on the card, if the card is a defuse card, it will not be played. Otherwise it will be played and the cardsComponent will handle the played card
	 */
	function handleClick() {
		if (card_name === 'defuse') {
			console.log('Defuse card cannot be played');
			return;
		}
		console.log('============ Card Played ============');
		console.log('Card: ' + card_name + ' played, handling played card');
		cardsComponent.handleIncomingPlayedCard(getCardByName(card_name).name);
	}
</script>

<Cards bind:this={cardsComponent} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="container"
	on:click={handleClick}
	style="--color:{card_color}; --text-color:{text_color}"
>
	<div class="card_title">{card_title}</div>
	<p class="card_text">
		{card_description}
	</p>
</div>

<style>
	.card_text {
		font-size: 0.8em;
	}

	p {
		margin: 0;
		padding: 0;
	}

	.container {
		border: 1px solid black;
		border-radius: 5px;
		padding: 10px;
		margin: 10px;
		width: 120px;
		height: 180px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--color);
		color: var(--text-color);
	}
</style>
