<script>
	// =========== STORES =========== //
	import { popupValues } from './../stores-game.js';
	import { players } from '../stores-players';
	import { gameStates, playedCards, playerStates } from '../stores-game';

	// =========== COMPONENTS =========== //
	import Dropdown from '$lib/dropdown.svelte';

	// =========== PROPS =========== //
	export let title;
	export let text;
	// export let color; // maybe add later
	export let type;

	// =========== VARIABELS =========== //
	let playerTarget;
	let playerOptions = [];
	$: playerOptions = $players.map((player) => ({ name: player.name, title: player.name }));
	let cardTarget;

	// =========== FUNCTIONS =========== //

	/**
	 * Closes the popup
	 * @returns {void}
	 * @function closePopup
	 * @description Closes the popup, by setting the popupOpen store to false
	 */
	function closePopup() {
		$popupValues.popupOpen = false;
	}

	/**
	 * Handles the player select
	 * @returns {void}
	 * @function handlePlayerSelect
	 * @description Handles the player select
	 * @todo Add functionality
	 */
	function handlePlayerSelect() {
		console.log(playerTarget);
	}

	function handleCardSelect() {
		console.log('Adding' + cardTarget);
		$players[$gameStates.currentPlayer].handCards = $players[
			$gameStates.currentPlayer
		].handCards.concat([cardTarget]);
	}
</script>

<div class="popup-container">
	<h1 class="popup-title">{title}</h1>
	<p class="popup-text">{text}</p>
	<button class="popup-button" on:click={closePopup}>
		<img src="close.png" alt="Close" height="20px" />
	</button>
	{#if type === 'target'}
		<div class="Dropdown">
			<Dropdown bind:current_name={playerTarget} options={playerOptions} />
		</div>

		<select name="target" id="target" bind:value={playerTarget}>
			{#each $players as player}
				<option value={player.name}>{player.name}</option>
			{/each}
		</select>
		<button on:click={handlePlayerSelect}> Select </button>
	{:else if type === '2_same'}
		Todo
	{:else if type === '3_same'}
		Todo
	{:else if type === '5_different'}
		{#if $playedCards.length > 0}
			<select name="cardSelect" id="cardSelect" bind:value={cardTarget}>
				{#each $playedCards as card}
					<option value={card.name}>{card.name}</option>
				{/each}
			</select>
			<button on:click={handleCardSelect}> Select </button>
		{/if}
	{/if}
</div>

<style>
	.popup-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 10px;
		padding: 20px;
		width: 300px;
		height: 300px;
		border-color: black;
	}

	.popup-title {
		text-align: center;
	}

	.popup-text {
		text-align: center;
	}

	.popup-button {
		position: absolute;
		top: 20px;
		right: 0%;
		transform: translate(-50%, -50%);
		background: none;
		border: none;
		border-radius: 10%;
		height: 30px;
		width: 30px;
	}

	.popup-button:hover {
		background-color: lightgray;
	}
</style>
