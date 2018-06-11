// function return array of field witch length is same as level

import { moveOptions } from './constants';

const createGame = (level, options, game) => {
  if (level === undefined || level === 0) {
    return game;
  }

  let optionsTemp = options;

  const currentField = game[game.length - 1];
  let nextFieldTemp = '';

  while (optionsTemp.length > 0) {
    const x = currentField.charAt(0);
    const y = currentField.charAt(1);

    const index = Math.floor(Math.random() * optionsTemp.length);
    const move = optionsTemp[index];

    const newX = parseInt(x, 10) + move[0];
    const newY = parseInt(y, 10) + move[1];
    nextFieldTemp = newX.toString() + newY.toString();

    if (newX >= 0 && newX <= 9 && newY >= 0 && newY <= 9 &&
       !game.includes(nextFieldTemp)) {
      game.push(nextFieldTemp);
      const result = createGame(level - 1, moveOptions, game);
      if (result !== false) {
        return result;
      }
      game.pop();
    }
    optionsTemp = optionsTemp.filter(element => element !== move);
  }

  return false;
};

export default createGame;
