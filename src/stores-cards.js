import { writable } from "svelte/store";

export const cards = writable([
    {
        card_id: 0,
        title: "EXPLODING KITTEN",
        name: "exploding_kitten",
        image: "",
        description: "Show this card immediately",
        color: "#0A0D1C"
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
    {
        card_id: 3,
        title: "ATTACK",
        name: "attack",
        image: "",
        description: "End your turn without drawing a card and force the next player to take two turns in a row",
        color: "#F59A00"
    },
    {
        card_id: 4,
        title: "FAVOR",
        name: "favor",
        image: "",
        description: "Force another player to give you one card from their hand",
        color: "#393642"
    },
    {
        card_id: 5,
        title: "SHUFFLE",
        name: "shuffle",
        image: "",
        description: "Shuffle the draw pile without viewing the cards",
        color: "#D8C59F"
    },
    {
        card_id: 6,
        title: "SEE THE FUTURE",
        name: "see_future",
        image: "",
        description: "View the top three cards from the draw pile",
        color: "#FA4498"
    },
    {
        card_id: 7,
        title: "NOPE",
        name: "nope",
        image: "",
        description: "Stop any action except for an exploding kitten or a defuse card",
        color: "#A01018"
    },
    {
        card_id: 8,
        title: "CHANGE THE FUTURE",
        name: "change_future",
        image: "",
        description: "View the top three cards from the draw pile and put them back in any order",
        color: "#41044A"
    },
    {
        card_id: 9,
        title: "TARGETED ATTACK",
        name: "targeted_attack",
        image: "",
        description: "Attack a specific player",
        color: "#F59A00"
    },
    {
        card_id: 10,
        title: "DRAW FROM THE BOTTOM",
        name: "draw_bottom",
        image: "",
        description: "Draw a card from the bottom of the draw pile",
        color: "#08d1c4"
    },
]);