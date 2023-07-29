// =========== IMPORTS =========== //
import { get } from 'svelte/store';
import { cards } from '../stores-cards'; // replace with your path

/**
 * Returns a card object by its name
 * @param {string} cardName
 * @returns {object} card
 * @function getCardByName
 * @example
 * const card = getCardByName('cardName');
 * @description Returns a card object by its name
 */
export function getCardByName(cardName) {
	const allCards = get(cards);
	return allCards.find((card) => card.name === cardName);
}
