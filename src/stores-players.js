import { writable } from 'svelte/store';

export const players = writable([
	{
		player_id: 0,
		playerServer_id: 'sadadas',
		name: 'Barbie',
		alive: true,
		handCards: []
	},
	{
		player_id: 1,
		playerServer_id: 'safjhol',
		name: 'Oppenheimer',
		alive: true,
		handCards: []
	},
	{
		player_id: 2,
		playerServer_id: 'klvjdfsnhgl',
		name: 'Ken',
		alive: true,
		handCards: []
	}
]);
