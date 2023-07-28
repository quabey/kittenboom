<script>
	import { players } from './../stores-players';
    import { gameStates, deck, cardStack } from './../stores-game';
	import toast from 'svelte-french-toast';

    function startGame() {
        if (players.length < 2) {
            toast.error('Not enough players to start game');
            return;
        }


        populatePlayerHands();
        console.log('Starting game with ' + $players.length + ' players');
        toast.success('Starting game with ' + $players.length + ' players');
        console.log($players);
        $gameStates.gameState = "running";
    }

    function drawRandomCard() {
        const randomNum = Math.floor(Math.random() * $deck.length); 
        let randomCard = $deck[randomNum];
        $deck.splice(randomNum, 1);
        return randomCard;
    }

    function populatePlayerHands() {
        // clear handCards
        $players.forEach(player => {
            player.handCards = ["defuse"];
        });

        // loop through all players 7 times and give them a random card from the stack wach time
        for (let cardAmount = 0; cardAmount < 7; cardAmount++) {
            $players.forEach(player => {
                let randomCard = drawRandomCard();
                player.handCards.push(randomCard);
            });
        }
        $players = $players;
    }

</script>

<div class="newgame-container">
    <h3>Exploding Kittens</h3>
    <div class="">
        Current players({$players.length}):
        <ul>
            {#each $players as player}
                <li>{player.name}</li>
            {/each}
        </ul>
    </div>
    <button on:click={startGame}>Start Game</button>
</div>

<style>
    .newgame-container {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        border-radius: 10px;
        width: 300px;
        height: 200px;
    }
</style>