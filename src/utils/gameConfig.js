const gameOptions = [
    [0, 3], [0, -3], [3, 0], [-3, 0], [2, 2], [-2, -2], [-2, 2], [2, -2]
]

export function createGame(field, level, options, game) {
    if (level == undefined || level == 0) {
        return game;
    } else {
        var x = field.charAt(0);
        var y = field.charAt(1);
        var index = Math.floor(Math.random() * options.length)
        var move = options[index];
        var newX = parseInt(x) + move[0];
        var newY = parseInt(y) + move[1];
        if (newX < 0 || newX > 9 || newY < 0 || newY > 9) {
            let tempOptions = options.filter(element => element !== move);
            if (tempOptions.length > 0) {
                return createGame(field, level, tempOptions, game);
            } else {
                return createGame(field, level, gameOptions, game.slice(0, -1));
            }
        } else {
            var nextField = newX.toString() + newY.toString()
            if (game.includes(nextField)) {
                let tempOptions = options.filter(element => element !== move);
                if (tempOptions.length > 0) {
                    return createGame(field, level, tempOptions, game);
                } else {
                    return createGame(field, level, gameOptions, game.slice(0, -1));
                }
            } else {
                game.push(nextField);
                return createGame(nextField, level - 1, gameOptions, game)
            }
        }
    }
}
