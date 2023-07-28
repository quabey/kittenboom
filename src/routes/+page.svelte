<script>
	import { cardStack } from './../stores-game.js';
	import { players } from './../stores-players.js';
	import { gameStates, playerStates, playedCards, popupValues, debugStates} from './../stores-game.js';

	import Cards from '$lib/cards.svelte';
	import Debug from '$lib/debug.svelte';
	import CardButton from '$lib/cardButton.svelte';
	import Popup from '$lib/popup.svelte';
	import toast from 'svelte-french-toast';

	let cardsComponent;

	function getCurrentPlayer() {
		return $players[$gameStates.currentPlayer];
	}

	console.log(getCurrentPlayer());
	console.log($players);
	console.log($gameStates);
	console.log($gameStates.currentPlayer);

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

<Cards bind:this={cardsComponent} />

{#if $debugStates.debugWindow}
	<div class="debugWindow">	
		<Debug />
	</div>
{/if}

<button on:click={() => $debugStates.debugWindow = true}>Open Debug</button>


<h1>Game</h1>

{#if $popupValues.popupOpen}
<div class="Popup-Screen">
	<Popup title={$popupValues.title} text={$popupValues.text} type={$popupValues.type} />
</div>
{/if}

<p>Top card: {$cardStack[0].name}</p>
<p>Current Player: {getCurrentPlayer().name}</p>

<button on:click={handleDrawCard}>Draw Card</button>

<hr />

{#each $players as player}
	Player: {player.name}
	<br />
	{#each $players[player.player_id].handCards as card}
	    <CardButton card_name={card} />
	{/each}
{/each}

<hr />

Played Cards

{#each $playedCards as card}
	{card.name} <br />
{/each}


<style>

	.debugWindow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.Popup-Screen {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
</style>