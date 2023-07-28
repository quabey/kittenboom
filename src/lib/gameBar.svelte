<script>
	// =========== STORES =========== //
	import { cardStack, playedCards } from './../stores-game.js';
	import { players } from './../stores-players.js';
	import { gameStates, playerStates, popupValues, debugStates } from './../stores-game.js';

	function getCurrentPlayer() {
		return $players[$gameStates.currentPlayer];
	}

	function handleDrawCard() {
		if ($cardStack.length <= 1) {
			toast.error('Card stack is empty');
			console.error('Card stack is empty');
			return;
		}

		let card = $cardStack[0];
		$cardStack = [...$cardStack.slice(1)];

		console.log($cardStack);
		let currentPlayer = getCurrentPlayer();
		if (currentPlayer !== undefined) {
			cardsComponent.handleIncomingDrawnCard(card.name, currentPlayer.player_id);
		} else {
			console.error('Current player is undefined');
			toast.error('Current player is undefined');
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
		<button on:click={handleDrawCard}>Draw Card</button>
		<button on:click={() => ($debugStates.debugWindow = true)}>Open Debug</button>
		<button on:click={() => ($gameStates.gameState = 'none')}>Stop Game</button>
	</div>
	<div class="Quick-Infos">
		Quick Infos
		<p>Top card: {$cardStack[0].name}</p>
		<p>Current Player: {getCurrentPlayer().name}</p>
	</div>
</div>

<style>
	p {
		margin: 0;
	}

	.container {
		display: flex;
		flex-direction: row;
	}

	.Actions {
		display: flex;
		flex-direction: column;
	}

	.Quick-Infos {
		display: flex;
		flex-direction: column;
	}
</style>
