import { writable } from "svelte/store";

export const cards = writable([
    {
        card_id: 0,
        title: "EXPLODING KITTEN",
        name: "exploding_kitten",
        image: "",
        description: "Show this card immediately",
        color: "#d10816"
    },
    {
        card_id: 1,
        title: "DEFUSE",
        name: "defuse",
        image: "",
        description: "Defuse the exploding kitten",
        color: "#19d108"
    },
    {
        card_id: 2,
        title: "SKIP",
        name: "skip",
        image: "",
        description: "Skip your turn without drawing a card",
        color: "#08d1c4"
    },
]);