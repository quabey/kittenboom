import { writable } from "svelte/store";

export const cardStack = writable([
    {
        stack_id: 1,
        name: "skip"
    },
    {
        stack_id: 2,
        name: "exploding_kitten"
    },
    {
        stack_id: 3,
        name: "exploding_kitten"
    }
]);

export const popupValues = writable({
    popupOpen: false,
    title: "Test",
    text: "Test",
    color: "red",
    type: "target"
});

// possible game states: 
//      running 
//      paused 
//      ended

export const gameStates = writable(
    {
        gameState: "running",
        players: 2,
        cardsInStack: 3,
        currentPlayer: 0,
        popupOpen: false,
    }
);

export const playerStates = writable(
    {
        player_id: 1,
        isTurn: true,
    }
);

export const playedCards = writable([
    {
        played_id: 0,
        name: "skip",
    }, 
    {
        played_id: 1,
        name: "defuse",
    }
]);