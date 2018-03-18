function renderDeck()
{
	deck.deck().map(card => {
		document.getElementById("deck").appendChild(deck.getCardUI(card));
	});
}

function dealCards(){
    players.players().map((player) => {
        switch(player.type){
            case 'human':
                while(player.hand.length < 2) {
                    hit(player, deck.deal());
                }
                break;
            case 'auto':
            default:
                hit(player, deck.deal());
                break;
        }
    });
}

var hit = function(player, card){
    player.hand.push(card);
};

var stay = function(player){
    return;
}

function start()
{
    deck.init();
    console.log(deck.deck());
    
    players.init();
    players.newPlayer('player1');
    dealCards();
    console.log(players.players());
    console.log(deck.deck());
}

window.onload = start;