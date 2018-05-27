import { 
  SELECT_LEVEL,
  NEW_GAME,
  ACTIVATE_FIELDS,
  PLAY_GAME,
  SET_MAX_LEVEL,
  SET_LIFE
 } from './actionTypes'


export function selectLevel(level) {
    return {
      type: SELECT_LEVEL,
      level
    };
  }

export function newGame(game) {
  return {
    type: NEW_GAME,
    game
  }
}

export function activateFields(activeFields) {
  return {
    type: ACTIVATE_FIELDS,
    activeFields
  }
}

export function playGame(visitedFields) {
  return {
    type: PLAY_GAME,
    visitedFields
  }
}

export function setMaxLevel(maxLevel) {
  return {
    type: SET_MAX_LEVEL,
    maxLevel
  }
}

export function setLife(life) {
  return {
    type: SET_LIFE,
    life
  }
}