<script>
	// =========== STORES =========== //
	import { gameStates, playedCards, toastSettings } from '../stores-game';
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
		console.log('Removing ' + card_name + ' from ' + $gameStates.currentPlayer + ' hand cards');
		removeFromHandCards(card_name, $gameStates.currentPlayer);
		let card = $cards.find((c) => c.name === card_name);
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
