<script>
	import { cardStack } from './../stores-game.js';
    import { players } from './../stores-players.js';
    import { gameStates, playerStates, playedCards, popupValues } from './../stores-game.js';

    import Cards from '$lib/cards.svelte';
    import Debug from '$lib/debug.svelte';
    import CardButton from '$lib/cardButton.svelte';
    import Popup from '$lib/popup.svelte';

    let cardsComponent;

    function getCurrentPlayer() {
        return $players[$gameStates.currentPlayer];
    }

    console.log(getCurrentPlayer());
    console.log($players);
    console.log($gameStates);
    console.log($gameStates.currentPlayer);


    function handleDrawCard() {

        if ($cardStack.length <= 1) {
            console.log("Card stack is empty");
            return;
        }

        let card = $cardStack[0];
        $cardStack = [...$cardStack.slice(1)];

        console.log($cardStack);
        let currentPlayer = getCurrentPlayer();
        if(currentPlayer !== undefined) {
            cardsComponent.handleIncomingDrawnCard(card.name, currentPlayer.player_id);
        } else {
            console.error('Current player is undefined');
        }
        $gameStates.currentPlayer++;
        if ($gameStates.currentPlayer >= $players.length) {
            $gameStates.currentPlayer = 0;
        }
    }



</script>
<Cards bind:this={cardsComponent} />
<Debug />

<h1>
    Game
</h1>

<div class="Popup">
    <Popup  title={$popupValues.title} text={$popupValues.text} type={$popupValues.type}/>
</div>


<p>Top card: { $cardStack[0].name}</p>
<p>Current Player: { getCurrentPlayer().name } </p>

<button on:click={handleDrawCard}>Draw Card</button>

<hr>

{#each $players as player}
     Player: {player.name}
    <br>
    {#each player.handCards as card}
        <CardButton card_name={card} />
    {/each}
{/each}

<hr>

Played Cards

{#each $playedCards as card}
    {card.name} <br>
{/each}