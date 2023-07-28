<script>
	import { cards } from './../stores-cards.js';
    import Cards from '$lib/cards.svelte';

    export let card_name;

    let card = $cards.find(card => card.name === card_name);
    let cardsComponent;

    console.log(card);

    const card_title = card.title;
    const card_description = card.description;
    const card_image = card.image;
    const card_color = card.color;

    function handleClick() {
        console.log(card_name + " played");
        cardsComponent.handleIncomingPlayedCard(card_name);
    }


</script>

<Cards bind:this={cardsComponent} />

<style>
    .container {
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        width: 200px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color);
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="container" 
    on:click={handleClick}  
    style="--color:{card_color}">
        {card_title}
        {card_description}
</div>