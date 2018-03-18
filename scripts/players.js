var players = (function() {
    var innerPlayers = [];

    var init = function() {
        reset();
        newPlayer('house', 'auto');
    }

    var reset = function() {
        innerPlayers = [];
    }

    var players = function() {
        return innerPlayers;
    }

    var newPlayer = function(name, type='human'){
        var player = {
            id: innerPlayers.length + 1,
            name: name,
            type: type,
            hand: [],
            points: 0
        }

        innerPlayers.push(player);
    }

    return {
        init: init,
        players: players,
        newPlayer: newPlayer,
        reset: reset
    }
})();