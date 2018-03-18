var players = (function() {
    var innerPlayers = [];

    var init = function() {
        newPlayer('house', 'auto');
    }

    var players = function() {
        return innerPlayers;
    }

    var newPlayer = function(name, type='human'){
        var player = {
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
        newPlayer: newPlayer
    }
})();