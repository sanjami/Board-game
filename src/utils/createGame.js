import { moveOptions } from './constants';

const createGame = (field, level, options, game) => {
  if (level === undefined || level === 0) {
    return game;
  }

  const x = field.charAt(0);
  const y = field.charAt(1);
  const index = Math.floor(Math.random() * options.length);
  const move = options[index];
  const newX = parseInt(x, 10) + move[0];
  const newY = parseInt(y, 10) + move[1];

  if (newX < 0 || newX > 9 || newY < 0 || newY > 9) {
    const tempOptions = options.filter(element => element !== move);
    if (tempOptions.length > 0) {
      return createGame(field, level, tempOptions, game);
    }
    return createGame(field, level + 1, moveOptions, game.slice(0, -1));
  }

  const nextField = newX.toString() + newY.toString();

  if (game.includes(nextField)) {
    const tempOptions = options.filter(element => element !== move);
    if (tempOptions.length > 0) {
      return createGame(field, level, tempOptions, game);
    }
    return createGame(field, level + 1, moveOptions, game.slice(0, -1));
  }
  game.push(nextField);
  return createGame(nextField, level - 1, moveOptions, game);
};

export default createGame;
