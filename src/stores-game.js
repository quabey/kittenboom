import { writable } from 'svelte/store';

export const debugStates = writable({
	debugMode: true,
	debugWindow: false
});

export const toastSettings = writable({
	position: 'top-right',
	duration: 10000,
	dismissible: false,
	pauseOnHover: true
});

export const cardStack = writable([
	{
		stack_id: 1,
		name: 'skip'
	},
	{
		stack_id: 2,
		name: 'exploding_kitten'
	},
	{
		stack_id: 3,
		name: 'exploding_kitten'
	}
]);

export const popupValues = writable({
	popupOpen: false,
	title: 'Test',
	text: 'Test',
	color: 'red',
	type: 'target'
});

// possible game states:
//      running
//      paused
//      ended

export const gameStates = writable({
	gameSetuping: false,
	gameState: 'none',
	players: 2,
	cardsInStack: 3,
	currentPlayer: 0,
	loaded: false,
	lastPopupSelect: '',
	popupButtonPressed: false
});

export const playerStates = writable({
	player_id: 1,
	isTurn: true
});

export const playedCards = writable([
	{
		played_id: 0,
		name: 'skip'
	},
	{
		played_id: 1,
		name: 'defuse'
	},
	{
		played_id: 2,
		name: 'exploding_kitten'
	},
	{
		played_id: 3,
		name: 'skip'
	},
	{
		played_id: 4,
		name: 'skip'
	},
	{
		played_id: 5,
		name: 'skip'
	},
	{
		played_id: 6,
		name: 'skip'
	}
]);

export const deck = writable([
	'skip',
	'skip',
	'skip',
	'skip',
	'attack',
	'attack',
	'attack',
	'attack',
	'favor',
	'favor',
	'favor',
	'favor',
	'shuffle',
	'shuffle',
	'shuffle',
	'shuffle',
	'see_future',
	'see_future',
	'see_future',
	'see_future',
	'nope',
	'nope',
	'nope',
	'nope',
	'change_future',
	'change_future',
	'change_future',
	'change_future',
	'targeted_attack',
	'targeted_attack',
	'targeted_attack',
	'targeted_attack',
	'draw_bottom',
	'draw_bottom',
	'draw_bottom',
	'draw_bottom'
]);

export const extraCards = writable([
	'exploding_kitten',
	'exploding_kitten',
	'exploding_kitten',
	'exploding_kitten',
	'defuse',
	'defuse',
	'defuse',
	'defuse'
]);
