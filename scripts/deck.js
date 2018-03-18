var deck = (function() {
    var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    var suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    var innerDeck = [];

    var init = function() {
        resetDeck();
        shuffle();
    }

    var deck = function() {
        return innerDeck;
    }

    var resetDeck = function() {
        var newDeck = new Array();

        suits.map((suit) => {
            cards.map((card) => {
                var newCard = {
                    Value: card,
                    Suit: suit
                }
                newDeck.push(newCard);
            });
        });

        innerDeck = newDeck;
    }

    var deal = function() {
        var card = innerDeck.pop();
        return card;
    }

    //usign Fisher-Yates Shuffle
    var shuffle = function() {
        var currentIndex = innerDeck.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = innerDeck[currentIndex];
            innerDeck[currentIndex] = innerDeck[randomIndex];
            innerDeck[randomIndex] = temporaryValue;
        }
    }

    var getCardUI = function(card)
    {
        var el = document.createElement('div');
        var value = document.createElement('p');
        value.innerHTML = card.Value;
        el.className = 'card suit' + card.Suit.toLowerCase();
        el.appendChild(value);
        return el;
    }

    return {
        init: init,
        deck: deck,
        resetDeck: resetDeck,
        deal: deal,
        shuffle: shuffle,
        getCardUI: getCardUI
    }
})();