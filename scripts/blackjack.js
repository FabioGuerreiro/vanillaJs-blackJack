var blackjack = (function() {
    var currentPlayer = 0;

    var init = function(){
        reset();
        deck.init();
        players.init();
        players.newPlayer('player1');

        createPlayersUI();

        dealCards();

        currentPlayer = players.players().length - 1;

        updateActivePlayer(players.players()[currentPlayer]);
    }

    var reset = function(){
        var div_status = document.getElementById('status');
        div_status.classList.remove('active');

        var p_status_text = document.getElementById('status-text');
        p_status_text.innerHTML = "";

        document.getElementById('players').innerHTML = '';
        document.getElementById('house').innerHTML = '';
    }

    var dealCards = function() {
        players.players().map((player) => {
            switch(player.type){
                case 'human':
                    while(player.hand.length < 2) {
                        hit(player, true);
                    }
                    break;
                case 'auto':
                default:
                    hit(player, true);
                    break;
            }
        });
    }

    var handlePoints = function(player){
        // to handle aces last
        var orderedCards = [];
        var points = 0;

        if (player.hand.length > 0) {
            player.hand.map((card) => {
                if (card.Value === "A") {
                    orderedCards.push(card);
                } else {
                    orderedCards.unshift(card);
                }
            });
            
            orderedCards.map((card) => {
                points += cardWeight(card, points);
            });
            
            player.points = points;
        }
        updatePlayerPoints(player);

        checkWinners(player);
    }

    var cardWeight = function(card, currentPoints){
        var faces = ["J", "Q", "K"];
        
        var weight = parseInt(card.Value);

        if (faces.indexOf(card.Value) > -1){
            weight = 10;
        }

        if (card.Value === "A") {
            weight = currentPoints + 11 > 21 ? 1 : 11;
        }
        return weight;
    }
    
    var hit = function(player, dealing = false){
        var card = deck.deal();
        player.hand.push(card);
        handlePoints(player);
        renderCard(card, player);
        updateDeck();

        if (!dealing && player.type != 'human') {
            autoPlay(player);
        }
    };

    var stay = function(player){
        currentPlayer--;
        if (currentPlayer >= 0) {
            updateActivePlayer(players.players()[currentPlayer]);

            if (players.players()[currentPlayer].type != 'human') {
                autoPlay(players.players()[currentPlayer]);
            }
        } else {
            endGame();
        }
    }

    var autoPlay = function(player){
        var highestScore = 0;

        players.players().map((p) => {
            if (p.id != player.id && p.points <= 21 && p.points > highestScore) {
                highestScore = p.points;
            }
        });

        window.setTimeout(() => {
            // if points are inferior to other players have to hit
            if (player.points <= highestScore) {
                hit(player);
            } else { 
                stay(player);
            }
        }, 1000);
    }

    var endGame = function(){
        var highestScore = 0;
        var winner = {};

        players.players().map((p) => {
            if (p.points <= 21 && p.points > highestScore) {
                highestScore = p.points;
                winner = p;
            }
        });

        updateStatus(winner.name + " wins!", winner.type == 'human');
    }

    var checkWinners = function(player){
        if (player.points == 21) {
            updateStatus(player.name + " wins!", true);
        } else if (player.points > 21) {
            updateStatus(player.name + " busted!", false);
            stay(player);
        }
    }

    var createPlayersUI = function (){
        document.getElementById('players').innerHTML = '';
        document.getElementById('house').innerHTML = '';

        players.players().map((player) => {
            var div_player = document.createElement('div');
            var div_playerid = document.createElement('div');
            var div_hand = document.createElement('div');
            var span_points = document.createElement('span');
            var div_actions = document.createElement('div');

            span_points.className = 'points';
            span_points.id = 'points_' + player.id;
            div_player.id = 'player_' + player.id;
            div_player.className = 'player';
            div_hand.id = 'hand_' + player.id;
            div_hand.className = 'hand';
            div_actions.id = 'actions_' + player.id;

            div_playerid.innerHTML = player.name + ": ";
            div_playerid.appendChild(span_points);
            div_player.appendChild(div_playerid);
            div_player.appendChild(div_hand);
            div_player.appendChild(div_actions);

            switch (player.type) {
                case 'human':
                    document.getElementById('players').appendChild(div_player);
                    break;
                case 'auto':
                default:
                    document.getElementById('house').appendChild(div_player);
                    break;
            }
        });
    }

    var renderCard = function(card, player)
    {
        var hand = document.getElementById('hand_' + player.id);
        hand.appendChild(deck.getCardUI(card));
    }

    var updateDeck = function ()
    {
        document.getElementById('deckcount').innerHTML = deck.deck().length;
    }

    var updateActivePlayer = function(activePlayer) {
        players.players().map((player) => {
            if (player.id === activePlayer.id) {
                document.getElementById('player_' + player.id).classList.add('active');
                
                if (player.type === 'human') {
                    var div_buttons = document.createElement('div');
                    var btn_hit = document.createElement('button');
                    var btn_stay = document.createElement('button');

                    btn_hit.innerHTML = "Hit me!";
                    btn_hit.addEventListener('click', function(){ hit(player); }, false);

                    btn_stay.innerHTML = "Stay";
                    btn_stay.addEventListener('click', function(){ stay(player); }, false);

                    div_buttons.appendChild(btn_hit);
                    div_buttons.appendChild(btn_stay);
                    
                    document.getElementById('actions_' + player.id).appendChild(div_buttons);
                }
            } else {
                document.getElementById('player_' + player.id).classList.remove('active');
                document.getElementById('actions_' + player.id).innerHTML = '';
            }
        });
        var div_status = document.getElementById('status');
        div_status.classList.remove('active');
    }

    var updatePlayerPoints = function(player) {
        document.getElementById('points_' + player.id).innerHTML = player.points;
    }

    var updateStatus = function(text, win) {
        var div_status = document.getElementById('status');
        div_status.classList.add('active');

        var div_status_content = document.getElementById('status-content');
        if (win){
            div_status_content.classList.remove('red');
        } else {
            div_status_content.classList.add('red');
        }

        var p_status_text = document.getElementById('status-text');
        p_status_text.innerHTML = text;
    }

    return {
        init: init,
        reset: reset
    }
})();

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        blackjack.init();
    }
}