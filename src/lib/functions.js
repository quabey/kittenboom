import { get } from 'svelte/store';
import { cards } from '../stores-cards'; // replace with your path

export function getCardByName(cardName) {
	const allCards = get(cards);
	return allCards.find((card) => card.name === cardName);
}
