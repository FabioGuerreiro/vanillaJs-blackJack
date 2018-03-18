var players = (function() {
    var players = [];

    var newPlayer = function(name, type='human'){
        var player = {
            name: name,
            type: type,
            hand: [],
            points: 0
        }
    }

    var hit = function(card){
        hand.push(card);
    }

    return {
        hand: hand
    }
})();