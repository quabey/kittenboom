<script>
	// =========== STORES =========== //
	import { players } from './../stores-players';
	import { gameStates, deck, cardStack, toastSettings } from './../stores-game';
	// =========== COMPONENTS =========== //
	// =========== OTHER =========== //
	import toast from 'svelte-french-toast';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import * as Colyseus from 'colyseus.js';

	// >> On mount <<
	// Ensure that the game is loaded before starting
	onMount(() => {
		setTimeout(() => {
			$gameStates.loaded = true; // set gamestate to loaded
		}, 3000);
	});

	/**
	 * Starts and initializes the game
	 * @type {function}
	 * @returns {void}
	 * @function startGame
	 * @implements {populatePlayerHands}
	 * @description Starts the game and populates the player hands, requires at least 2 players
	 * @todo Add more checks to ensure that the game can be started
	 */
	function startGame() {
		if (players.length < 2) {
			console.error('Not enough players to start game');
			toast.error('Not enough players to start game', $toastSettings);
			return;
		}
		console.log('========= STARTING GAME =========');
		$gameStates.gameSetuping = true;

		populatePlayerHands();
		console.log('Player hands populated');
		console.log('Starting game with ' + $players.length + ' players');
		toast.success('Starting game with ' + $players.length + ' players', $toastSettings);
		console.table($players);
		console.table($deck);
		setTimeout(() => {
			$gameStates.gameSetuping = false;
			$gameStates.gameState = 'running';
		}, 3000);
	}

	function addPlayer(playerServer_id, name) {
		$players.push({
			player_id: $players.length,
			playerServer_id: playerServer_id,
			name: name,
			alive: true,
			handCards: []
		});
		console.log('Player added');
		console.table($players);
	}

	/**
	 * Draws a random card from the deck
	 * @type {function}
	 * @returns {string} Returns a random card from the deck
	 * @function drawRandomCard
	 * @description Draws a random card from the deck and removes it from the deck
	 */
	function drawRandomCard() {
		const randomNum = Math.floor(Math.random() * $deck.length);
		let randomCard = $deck[randomNum];
		$deck.splice(randomNum, 1);
		return randomCard;
	}

	/**
	 * Populates the player hands with cards
	 * @type {function}
	 * @returns {void}
	 * @function populatePlayerHands
	 * @implements {drawRandomCard}
	 * @description Populates the player hands with cards, using the drawRandomCard function
	 */
	function populatePlayerHands() {
		console.log('Populating player hands');
		// clear handCards
		$players.forEach((player) => {
			player.handCards = ['defuse'];
		});

		// loop through all players 7 times and give them a random card from the stack wach time
		for (let cardAmount = 0; cardAmount < 7; cardAmount++) {
			$players.forEach((player) => {
				let randomCard = drawRandomCard();
				player.handCards.push(randomCard);
			});
		}
		$players = $players;
	}
</script>

<div class="newgame-container">
	<h3 class="text-2xl mb-2 font-bold">Exploding Kittens</h3>

	{#if $gameStates.loaded && !$gameStates.gameSetuping}
		<div class="">
			Current players({$players.length}):
			<ul class="list-item">
				{#each $players as player}
					<li>{player.name}</li>
				{/each}
			</ul>
		</div>
		<button class="scale-125 mt-2" on:click={startGame}>Start Game</button>
	{:else}
		<Spinner />
	{/if}
</div>

<style>
	.newgame-container {
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		padding: 30px;
		transform: translate(-50%, -50%);
		border-radius: 10px;
		width: 350px;
		height: 250px;
	}
</style>
