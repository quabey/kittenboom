<script>
	// =========== STORES =========== //
	import { cardStack, playedCards } from './../../stores-game.js';
	import { players } from './../../stores-players.js';
	import {
		gameStates,
		playerStates,
		popupValues,
		debugStates,
		roomStore
	} from './../../stores-game.js';

	// =========== COMPONENTS =========== //
	import Cards from '$lib/cards.svelte';
	import Debug from '$lib/debug.svelte';
	import CardButton from '$lib/cardButton.svelte';
	import Popup from '$lib/popup.svelte';
	import NewGame from '$lib/newGame.svelte';
	import GameBar from '$lib/gameBar.svelte';
	import Chat from '$lib/chat.svelte';

	// =========== OTHER =========== //
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let cardsComponent;

	// ===================================================//
	// ====================== CODE ====================== //
	// ===================================================//

	/**
	 * Returns the current player
	 * @returns {object} The current player
	 * @function getCurrentPlayer
	 * @description Returns the current player as an object
	 */
	function getCurrentPlayer() {
		return $players[$gameStates.currentPlayer];
	}

	console.table($gameStates);
	console.log('Current player: ' + getCurrentPlayer().name);

	onMount(() => {
		if (!$roomStore) {
			goto('/');
			console.error('No room found');
		} else console.log('Room found', $roomStore);
	});
</script>

<!--  -->
<Cards bind:this={cardsComponent} />

<div class="gamebar">
	<GameBar />
</div>

{#if $debugStates.debugWindow}
	<div class="debugWindow">
		<Debug />
	</div>
{/if}

{#if $gameStates.gameState == 'none'}
	<div class="newGameScreen">
		<NewGame />
	</div>
{/if}

{#if $popupValues.popupOpen}
	<div class="Popup-Screen">
		<Popup title={$popupValues.title} text={$popupValues.text} type={$popupValues.type} />
	</div>
{/if}

{#each $players as player}
	Player: {player.name}
	<div class="playerCards">
		{#if player.handCards.length == 0}
			<p>Player has no cards</p>
		{/if}
		{#each $players[player.player_id].handCards as card}
			<CardButton card_name={card} />
		{/each}
	</div>
{/each}

<hr />

<Chat />

<style>
	.playerCards {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.newGameScreen {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('background.svg');
		z-index: 100;
	}

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
