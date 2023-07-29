<script>
	import { cards } from './../stores-cards.js';
	// =========== STORES =========== //
	import { cardStack, playedCards } from './../stores-game.js';
	import { players } from './../stores-players.js';
	import {
		gameStates,
		playerStates,
		popupValues,
		debugStates,
		toastSettings
	} from './../stores-game.js';

	// =========== COMPONENTS =========== //
	import Cards from '$lib/cards.svelte';

	// =========== VARIABLES =========== //
	let cardsComponent;

	// =========== FUNCTIONS =========== //
	/**
	 * Get current player as object
	 * @returns {object} Current player
	 * @function getCurrentPlayer
	 * @description Get current player as object
	 * @example
	 * let currentPlayer = getCurrentPlayer();
	 */
	function getCurrentPlayer() {
		return $players[$gameStates.currentPlayer];
	}

	/**
	 * Handles drawing a card
	 * @returns {void}
	 * @function handleDrawCard
	 * @implements {cardsComponent.handleIncomingDrawnCard}
	 * @description Handles drawing a card, check if card stack is empty
	 */
	function handleDrawCard() {
		// Check if card stack is empty
		if ($cardStack.length <= 1) {
			toast.error('Card stack is empty', $toastSettings);
			console.error('Card stack is empty');
			return;
		}

		// Remove card from stack
		let card = $cardStack[0];
		$cardStack = [...$cardStack.slice(1)];

		console.log($cardStack);

		let currentPlayer = getCurrentPlayer();
		if (currentPlayer !== undefined) {
			cardsComponent.handleIncomingDrawnCard(card.name, currentPlayer.player_id);
		} else {
			console.error('Current player is undefined');
			toast.error('Current player is undefined', $toastSettings);
		}
		$gameStates.currentPlayer++;
		if ($gameStates.currentPlayer >= $players.length) {
			$gameStates.currentPlayer = 0;
		}
	}
</script>

<div class="container">
	<div class="Actions">
		Actions
		<div class="ActionButtons">
			<button on:click={handleDrawCard}>Draw Card</button>
			<button on:click={() => ($debugStates.debugWindow = true)}>Open Debug</button>
			<button on:click={() => ($gameStates.gameState = 'none')}>Stop Game</button>
		</div>
	</div>
	<div class="Quick-Infos">
		Quick Infos
		<p>Top card: {$cardStack[0].name}</p>
		<p>Current Player: {getCurrentPlayer().name}</p>
	</div>
	<div class="playedCards">
		Played Cards
		<div class="playedCardsList overflow-scroll" />
		{#each $playedCards as card}
			<p>{card.name}</p>
		{/each}
	</div>
</div>

<Cards bind:this={cardsComponent} />

<style>
	.playedCardsList {
		display: flex;
		flex-direction: row;
		overflow: scroll;
		height: 100px;
	}

	.playedCards {
		display: flex;
		flex-direction: column;
		width: 30%;
		height: 100px;
	}

	.container {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100px;
	}

	.Actions {
		display: flex;
		flex-direction: column;
		width: 30%;
	}

	.Quick-Infos {
		display: flex;
		flex-direction: column;
		border-right: black solid 1px;
		border-left: black solid 1px;
		width: 30%;
	}
</style>
