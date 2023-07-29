import { writable } from 'svelte/store';

export const players = writable([
	{
		player_id: 0,
		name: 'Barbie',
		alive: true,
		handCards: []
	},
	{
		player_id: 1,
		name: 'Oppenheimer',
		alive: true,
		handCards: []
	},
	{
		player_id: 2,
		name: 'Einstein',
		alive: true,
		handCards: []
	}
]);
