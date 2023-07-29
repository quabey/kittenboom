<script>
	// =========== STORES =========== //
	import { cardStack } from './../stores-game.js';
	import { players } from './../stores-players.js';
	import {
		gameStates,
		playerStates,
		playedCards,
		popupValues,
		debugStates,
		toastSettings
	} from './../stores-game.js';
	import { cards } from './../stores-cards.js';
	// =========== COMPONENTS =========== //
	import Dropdown from '$lib/dropdown.svelte';

	// =========== OTHER =========== //
	import toast from 'svelte-french-toast';

	// =========== VARIABLES =========== //
	let password;
	let cardToAdd = '';

	// =========== FUNCTIONS =========== //

	/**
	 * Moves card up in the stack
	 * @param {int} index
	 * @returns {void}
	 * @function moveCardUp
	 * @description Moves card up in the stack, if possible
	 */
	function moveCardUp(index) {
		if (index > 0) {
			let temp = $cardStack[index];
			$cardStack[index] = $cardStack[index - 1];
			$cardStack[index - 1] = temp;
		}
	}

	/**
	 * Moves card down in the stack
	 * @param {int} index
	 * @returns {void}
	 * @function moveCardDown
	 * @description Moves card down in the stack, if possible
	 */
	function moveCardDown(index) {
		if (index < $cardStack.length - 1) {
			let temp = $cardStack[index];
			$cardStack[index] = $cardStack[index + 1];
			$cardStack[index + 1] = temp;
		}
	}

	/**
	 * Removes card from the stack
	 * @param {int} index
	 * @returns {void}
	 * @function addCard
	 * @description Removnes card from the stack, if possible
	 */
	function removeCard(index) {
		if (index < 0 || index > $cardStack.length - 1) return;
		$cardStack.splice(index, 1);
	}

	/**
	 * Handles the opening the popup
	 * @returns {void}
	 * @function handlePopupOpen
	 * @description Handles the opening the popup and closes the debug window
	 */
	function handlePopupOpen() {
		console.log('Popup open');
		$debugStates.debugWindow = false;
		$popupValues.popupOpen = true;
		console.log($popupValues);
	}

	/**
	 * Handles the closing the the debug mode
	 * @returns {void}
	 * @function handleDebugClose
	 * @description Handles the closing the the debug mode
	 */
	function handleDisableDebug() {
		toast.error('Debug mode disabled', $toastSettings);
		$debugStates.debugMode = false;
	}

	/**
	 * Handles the enabling of the debug mode
	 * @returns {void}
	 * @function handleEnableDebug
	 * @description Handles the enabling of the debug mode, requires a password to enable
	 */
	function handleEnableDebug() {
		if (password === 'debug') {
			$debugStates.debugMode = true;
			toast.success('Debug mode enabled', $toastSettings);
			return;
		}
		toast.error('Wrong password', $toastSettings);
	}
</script>

<div class="debug-container">
	<div class="debug-info-bar">
		<h3>Debug Window</h3>
		{#if $debugStates.debugMode}
			<button on:click={handleDisableDebug}>Disable Debug Mode</button>
		{/if}
	</div>
	{#if $debugStates.debugMode}
		<div class="debug-options">
			<div class="Player-Options">
				<p>
					Current Player: {$players[$gameStates.currentPlayer].name} (ID:{$gameStates.currentPlayer})
				</p>

				<p class="overflow-scroll">
					Players({$players.length}):

					{#each $players as player}
						<div>
							<div class:active={$gameStates.currentPlayer == player.player_id}>
								{player.name} (ID: {player.player_id})
								<button on:click={() => ($gameStates.currentPlayer = player.player_id)}
									>Set active</button
								>
							</div>
							<div class="player-handcards">
								{#each $players[player.player_id].handCards as card}
									<div class="player-handcard">
										{card}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</p>
			</div>

			<div class="Popup-Options">
				<p>
					Popup Values:
					<br />
					Title: <input type="text" bind:value={$popupValues.title} />
					<br />
					Text: <input type="text" bind:value={$popupValues.text} />
					<br />
					Color: <input type="text" bind:value={$popupValues.color} />
					<br />
					Type:

					<Dropdown
						class="dropdown"
						bind:current_name={$popupValues.type}
						options={[
							{ title: 'target', name: 'target' },
							{ title: 'target_attack', name: 'target_attack' },
							{ title: '2_same', name: '2_same' },
							{ title: '3_same', name: '3_same' },
							{ title: '5_different', name: '5_different' }
						]}
					/>
					<br />
					Open Popup:
					<button on:click={handlePopupOpen}> Open </button>
				</p>
			</div>

			<div class="CardStack-Options">
				<div class="">
					Clear Card Stack:
					<button on:click={() => ($cardStack = [])}>Clear</button>
				</div>

				<div>
					Add Card to Stack:
					<br />
					<Dropdown class="dropdown" bind:current_name={cardToAdd} options={$cards} />

					<button
						on:click={() =>
							($cardStack = $cardStack.concat([{ stack_id: $cardStack.lenght, name: cardToAdd }]))}
						>Add</button
					>
				</div>
				<ul class="cardList">
					{#each $cardStack as card, i}
						<li>
							{card.name}
							<button on:click={() => moveCardUp(i)}>Up</button>
							<button on:click={() => moveCardDown(i)}>Down</button>
							<button on:click={() => removeCard(i)}>Remove</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{:else}
		<div class="enable-debug">
			<input type="password" bind:value={password} />
			<button on:click={handleEnableDebug}>Enable Debug</button>
		</div>
	{/if}
	<button class="debug-close" on:click={() => ($debugStates.debugWindow = false)}>
		<img src="close.png" alt="Close" height="20px" />
	</button>
</div>

<style>
	h3 {
		margin: 0;
		padding: 0;
		padding-right: 10px;
		width: fit-content;
	}
	.active {
		color: red;
	}

	.enable-debug {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.debug-info-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.debug-options {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 90%;
	}
	.debug-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 10px;
		padding: 20px;
		width: 70%;
		height: 80%;
		border-color: black;
	}

	.debug-close {
		position: absolute;
		top: 30px;
		right: 6px;
		transform: translate(-50%, -50%);
		background: none;
		border: none;
		border-radius: 10%;
		height: 30px;
		width: 30px;
	}

	.debug-close:hover {
		background-color: lightgray;
	}

	.cardList {
		list-style-type: none;
		height: 80%;
		padding: 0;
		overflow: scroll;
		width: 100%;
		overflow-x: hidden;
	}

	.CardStack-Options {
		width: 33%;
		padding: 1%;
	}

	.Popup-Options {
		width: 30%;
		border-right: black solid 2px;
		border-left: black solid 2px;
		padding: 1%;
		padding-right: 2%;
		padding-left: 2%;
	}

	.Player-Options {
		width: 30%;
		padding: 1%;
	}
</style>
