<script>
    import { gameStates, playedCards } from "../stores-game";
    import { players } from "../stores-players";
    import { cards } from "../stores-cards";
    
    
    export function handleIncomingPlayedCard(card_name) {
        console.log("Handling incoming played card: " + card_name);
        console.log("Adding " + card_name + " to played cards");
        addToPlayedCards(card_name);

        let card = $cards.find(c => c.name === card_name);


    } 


    export function handleIncomingDrawnCard(card_name, player_id) {
        console.log("Handling incoming drawn card: " + card_name);

        if (card_name === "exploding_kitten") {
            console.log(handleKitten(player_id));
            return;
        }

        console.log("Adding " + card_name + " to " + player_id + " hand cards");
        addToHandCards(card_name, player_id);
    }

    function handleKitten(player_id) {
        console.log("Handling kitten");


        if ($players[player_id].handCards.includes("defuse")) {
            console.log("Player has defuse");
            
            return "Player: " + $players[player_id].name + "defused the kitten";
        }
        
        console.log("Player does not have defuse");
        $players[player_id].alive = false;
        return "Player: " + $players[player_id].name + " died";
    }


    // Add/Remove Functions

    export function addToPlayedCards(card_name) {
        console.log("Adding " + card_name + " to played cards");
        $playedCards = $playedCards.concat([{played_id: $playedCards.length, name: card_name}]);
    }

    export function addToHandCards(card_name, player_id) {
        console.log("Adding " + card_name + " to " + player_id + " hand cards");
        $players[player_id].handCards = $players[player_id].handCards.concat([card_name]);
    }


    // todo removes all cards with the same name not just one
    export function removeFromHandCards(card_name, player_id) {
    console.log("Removing " + card_name + " from " + player_id + " hand cards");
    const index = $players[player_id].handCards.indexOf(card_name);
    if(index !== -1){
        $players[player_id].handCards.splice(index, 1);
    }
    else 
        console.log("Card not found");
}



</script>