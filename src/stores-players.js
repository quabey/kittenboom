import { writable } from "svelte/store";

export const players = writable([
    {
        player_id: 0,
        name: "Player 1",
        alive: true,
        handCards: ["skip", "defuse"],
    },
    {
        player_id: 1,
        name: "Player 2",
        alive: true,
        handCards: ["defuse", "defuse"],
    },
]);


