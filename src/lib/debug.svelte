<script>
    import { cardStack } from './../stores-game.js';
    import { players } from './../stores-players.js';
    import { gameStates, playerStates, playedCards, popupValues } from './../stores-game.js';
    import { cards } from './../stores-cards.js';

    let cardToAdd = "";


    function moveCardUp(index) {
		if(index > 0) {
			let temp = $cardStack[index];
			$cardStack[index] = $cardStack[index-1];
			$cardStack[index-1] = temp;
		}
	}

	function moveCardDown(index) {
		if(index < $cardStack.length-1) {
			let temp = $cardStack[index];
			$cardStack[index] = $cardStack[index+1];
			$cardStack[index+1] = temp;
		}
	}

	function removeCard(index) {
		$cardStack.splice(index, 1);
	}
</script>


<h1>Debug</h1>

<p>Current Player: {$players[$gameStates.currentPlayer].name} (ID:{$gameStates.currentPlayer}) </p>
<p>Popup Values:
    <br>
    Title: <input type="text" bind:value={$popupValues.title}>
    <br>
    Text: <input type="text" bind:value={$popupValues.text}>
    <br>
    Color: <input type="text" bind:value={$popupValues.color}>
    <br>
    Type: <select name="popuptypes" id="popuptypes" bind:value={$popupValues.type}>
        <option value="target">target</option>
        <option value="2_same">2_same</option>
        <option value="3_same">3_same</option>
        <option value="5_different">5_different</option>
    </select>
</p>

<p>Players({$players.length}):

{#each $players as player}
<div class:active={$gameStates.currentPlayer == player.player_id}>
    {player.name} ({player.player_id}) - {player.handCards}
    <button on:click={() => ($gameStates.currentPlayer = player.player_id)}>Set active</button>
</div> 
{/each}
</p>


<div class="">
    Clear Card Stack: 
    <button on:click={() => ($cardStack = [])}>Clear</button>
</div>

<div>
    Add Card to Stack:
    <br>
    <select name="cardSelect" id="cardSelect" bind:value={cardToAdd}>
        {#each $cards as card}
        <option value={card.name}>{card.name}</option>
        {/each}
    </select>
    <button on:click={() => ($cardStack = $cardStack.concat([{stack_id: $cardStack.lenght, name: cardToAdd}]))}>Add</button>
</div>
<ul>
	{#each $cardStack as card, i}
		<li>
			{card.name}
			<button on:click={() => moveCardUp(i)}>Up</button>
			<button on:click={() => moveCardDown(i)}>Down</button>
			<button on:click={() => removeCard(i)}>Remove</button>
		</li>
	{/each}
</ul>



<style>
    .active {
        color: red;
    }

</style>