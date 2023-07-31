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
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { getRooms, createOrJoin, joinRoom, sendMessage } from '$lib/gameserver.js';

	// =========== VARIABLES =========== //
	let password;
	let cardToAdd = '';
	let cardToGive = [];

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

	function handleKillPlayer(player_id, player_name) {
		$players[player_id].alive = false;
		let killed = 'Killed ' + player_name;
		console.log(killed + ' ' + player_name);
		toast(killed, {
			position: 'top-right',
			duration: 10000,
			dismissible: false,
			pauseOnHover: true,
			icon: '💀'
		});
	}

	function handleKickPlayer(player_id, player_name) {
		console.log('todo');
	}

	function sendTestMessage() {
		console.log('Sending test message');
		sendMessage('message', 'test');
	}
</script>

<div class="debug-container">
	{#if $debugStates.debugMode}
		<Tabs style="underline">
			<TabItem>
				<div slot="title" class="flex items-center gap-2">
					<svg
						aria-hidden="true"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/>
					</svg>
					Overview
				</div>
				<div class="debug-options">
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
							<Dropdown bind:current_name={cardToAdd} options={$cards} />

							<button
								on:click={() =>
									($cardStack = $cardStack.concat([
										{ stack_id: $cardStack.lenght, name: cardToAdd }
									]))}
							>
								Add
							</button>
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
			</TabItem>
			<!-- Player Tab -->
			<TabItem open>
				<div slot="title" class="flex items-center gap-2">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path
							d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"
						/>
					</svg>
					Players
				</div>
				<div class="Player-Options h-[63vh] border-red-600 border-solid border-2 overflow-y-scroll">
					{#each $players as player}
						<div class="border-2 border-green-600 bg-gray-300 my-1 rounded-lg p-2">
							<div class="flex flex-row">
								<div class="w-1/2 border-r-2 border-black">
									<div class="text-lg font-bold">
										{player.name}
									</div>
									<h2 class="text-md">Infos:</h2>
									<div class="text-sm">
										Player ID: {player.player_id} <br />
										Player Server ID: {player.playerServer_id} <br />
										Alive: {player.alive}
									</div>
									<h2 class="text-md">Actions:</h2>
									<div class="text-sm">
										<button on:click={handleKillPlayer(player.player_id, player.name)}>
											Kill
										</button>
										<button on:click={handleKickPlayer(player.player_id, player.name)}>
											Kick
										</button> <br />
										<Dropdown bind:current_name={cardToGive[player.player_id]} options={$cards} />
									</div>
								</div>
								<div class="w-1/2">
									<h2 class="text-md">Cards:</h2>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</TabItem>
			<TabItem>
				<div slot="title" class="flex items-center gap-2">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path
							d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-7.5 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM2 16V8h16v8H2Z"
						/>
					</svg>
					Popup
				</div>
				Content
			</TabItem>
			<TabItem>
				<div slot="title" class="flex items-center gap-2">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
						/>
					</svg>
					Gamestates
				</div>
				Content
			</TabItem>
			<TabItem>
				<div slot="title" class="flex items-center gap-2">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 16 3"
					>
						<path
							d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
						/>
					</svg>
					Other
				</div>
				<div class="debug-other">
					<button on:click={handleDisableDebug}>Disable Debug Mode</button>
					<button on:click={sendTestMessage}> Send test message </button>
				</div>
			</TabItem>
		</Tabs>
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
		height: 60vh;
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
</style>
