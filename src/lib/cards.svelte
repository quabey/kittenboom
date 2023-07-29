<script>
	// =========== STORES =========== //
	import { gameStates, playedCards, toastSettings, popupValues } from '../stores-game';
	import { players } from '../stores-players';
	import { cards } from '../stores-cards';
	// =========== COMPONENTS =========== //
	// =========== OTHER =========== //
	import toast from 'svelte-french-toast';

	// =========== FUNCTIONS =========== //

	/**
	 * Handles incoming played card
	 * @param {string} card_name
	 * @returns {void}
	 * @function handleIncomingPlayedCard
	 * @description Handles incoming played card, adds it to played cards and removes it from the player's hand cards
	 * @example
	 * handleIncomingPlayedCard('attack');
	 */
	export function handleIncomingPlayedCard(card_name) {
		console.log('Handling incoming played card: ' + card_name);
		addToPlayedCards(card_name);
		switch (card) {
			case card.name === 'skip':
				handleCardSkip();
				break;
			case card.name === 'favor':
				handleCardFavor();
				break;
			case card.name === 'target_attack':
				handleCardTargetAttack();
				break;
			default:
				toast.error('Card not found', $toastSettings);
				break;
		}
		console.log('Removing ' + card_name + ' from ' + $gameStates.currentPlayer + ' hand cards');
		removeFromHandCards(card_name, $gameStates.currentPlayer);
		let card = $cards.find((c) => c.name === card_name);
	}

	/**
	 * Handles card skip
	 * @returns {void}
	 * @function handleCardSkip
	 * @description Handles card skip, skips the next player
	 * @example
	 * handleCardSkip();
	 */
	function handleCardSkip() {
		console.log('Handling card skip');
		$gameStates.currentPlayer++;
		if ($gameStates.currentPlayer >= $players.length) {
			$gameStates.currentPlayer = 0;
		}
	}

	/**
	 * Handles card favor
	 * @returns {void}
	 * @function handleCardFavor
	 * @description Handles card favor, lets the current player choose a card from another player
	 * @example
	 * handleCardFavor();
	 */
	async function handleCardFavor() {
		console.log('Handling card favor');
		$popupValues.popupOpen = true;
		$popupValues.title = 'Choose a player';
		$popupValues.text = 'Choose a player to take a random card from';
		$popupValues.type = 'favor';

		const buttonPressPromise = new Promise((resolve) => {
			if ($gameStates.popupButtonPressed) {
				console.log('Popup button pressed');
				resolve();
			}
		});

		await buttonPressPromise;
	}

	async function handleCardTargetAttack() {
		console.log('Handling card target attack');
		$popupValues.popupOpen = true;
		$popupValues.title = 'Choose a player';
		$popupValues.text = 'Choose a player to attack';
		$popupValues.type = 'target_attack';

		const buttonPressPromise = new Promise((resolve) => {
			if ($gameStates.popupButtonPressed) {
				resolve();
			}
		});

		await buttonPressPromise;
	}

	/**
	 * Handles incoming drawn card
	 * @param {string} card_name
	 * @param {int} player_id
	 * @returns {void}
	 * @function handleIncomingDrawnCard
	 * @description Handles incoming drawn card, adds it to the player's hand cards
	 * @example
	 * handleIncomingDrawnCard('attack', 0);
	 */
	export function handleIncomingDrawnCard(card_name, player_id) {
		console.log('Handling incoming drawn card: ' + card_name);

		if (card_name === 'exploding_kitten') {
			console.log(handleKitten(player_id));
			return;
		}
		addToHandCards(card_name, player_id);
	}

	/**
	 * Handles exploding kitten
	 * @param {int} player_id
	 * @returns {string} Message
	 * @function handleKitten
	 * @description Handles exploding kitten, checks if player has defuse, if not, player dies
	 * @example
	 * handleKitten(0);
	 */
	function handleKitten(player_id) {
		console.log('Handling kitten');

		if ($players[player_id].handCards.includes('defuse')) {
			console.log('Player has defuse');
			removeFromHandCards('defuse', player_id);
			toast.success('Player: ' + $players[player_id].name + ' defused the kitten', $toastSettings);
			return 'Player: ' + $players[player_id].name + 'defused the kitten';
		}

		console.log('Player does not have defuse');
		$players[player_id].alive = false;
		toast('Player: ' + $players[player_id].name + ' exploded', { icon: '💥', $toastSettings });
		return 'Player: ' + $players[player_id].name + ' died';
	}

	/**
	 * Adds card to played cards
	 * @param card_name
	 * @returns {void}
	 * @function addToPlayedCards
	 * @description Adds card to played cards,
	 */
	export function addToPlayedCards(card_name) {
		console.log('Adding ' + card_name + ' to played cards');
		toast.success('Played: ' + card_name, $toastSettings);
		$playedCards = $playedCards.concat([{ played_id: $playedCards.length, name: card_name }]);
	}

	/**
	 * Adds card to hand cards
	 * @param {string} card_name
	 * @param {int} player_id
	 * @returns {void}
	 * @function addToHandCards
	 * @description Adds card to hand cards
	 */
	export function addToHandCards(card_name, player_id) {
		console.log('Adding ' + card_name + ' to ' + player_id + ' hand cards');
		$players[player_id].handCards = $players[player_id].handCards.concat([card_name]);
	}

	// todo removes all cards with the same name not just one

	/**
	 * Removes card from hand cards
	 * @param {string} card_name
	 * @param {int} player_id
	 * @returns {void}
	 * @function removeFromHandCards
	 * @description Removes card from hand cards
	 * @todo removes all cards with the same name not just one
	 * @todo does not work
	 */
	export function removeFromHandCards(card_name, player_id) {
		console.log('Trying to removing ' + card_name + ' from ' + player_id + ' hand cards');
		const index = $players[player_id].handCards.indexOf(card_name);
		if (index !== -1) {
			$: $players[player_id].handCards.splice(index, 1);
			let temp = $players[player_id].handCards;
			$players[player_id].handCards = temp;
			console.log($players[player_id].handCards);
			return;
		}
		console.error(card_name + ' card not found in hand cards of ' + player_id);
		console.log($players[player_id].handCards);
	}
</script>
