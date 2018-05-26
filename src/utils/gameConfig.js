
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
            return createGame(field, level, options, game)
        } else {
            var nextField = newX.toString() + newY.toString()
            if (game.includes(nextField)) {
                return createGame(field, level, options, game)
            } else {
                game.push(nextField);
                return createGame(nextField, level - 1, options, game)
            }
        }
    }
}
