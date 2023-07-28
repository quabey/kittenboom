<script>
    import { players } from "../stores-players";
    import { gameStates, playedCards, playerStates } from "../stores-game";

    export let title;
    export let text;
    // export let color;
    export let type;

    let playerTarget;
    let cardTarget;

    function closePopup() {
        $gameStates.popupOpen = false;
    }

    function handlePlayerSelect() {
        console.log(playerTarget);
    }

    function handleCardSelect() {
    console.log("Adding" + cardTarget);
    $players[$gameStates.currentPlayer].handCards = $players[$gameStates.currentPlayer].handCards.concat([cardTarget]);
    }
</script>

<div class="popup-container" class:hidden={$gameStates.popupOpen}>
    <h1 class="popup-title">{title}</h1>
    <p class="popup-text">{text}</p>
    <button class="popup-button" on:click={closePopup}>Close</button>
    {#if type === "target"}
    <select name="target" id="target" bind:value={playerTarget}>
        {#each $players as player}
        <option value={player.name}>{player.name}</option>
        {/each}
    </select>
    <button on:click={handlePlayerSelect}>
        Select
    </button>
    {:else if type === "2_same"}
        Todo
    {:else if type === "3_same"}
        Todo
    {:else if type === "5_different"}
        {#if $playedCards.length > 0}
            <select name="cardSelect" id="cardSelect" bind:value={cardTarget}>
                {#each $playedCards as card}
                <option value={card.name}>{card.name}</option>
                {/each}
            </select>
            <button on:click={handleCardSelect}>
                Select
            </button>
        {/if}
    {/if}
</div>



<style>
    .hidden {
        display: none;
    }
</style>


