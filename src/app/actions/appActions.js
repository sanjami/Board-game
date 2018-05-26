import { 
  SELECT_LEVEL,
  SELECT_FIRST_FIELD,
  NEW_GAME,
  ACTIVATE_FIELDS,
  PLAY_GAME
 } from './actionTypes'


export function selectLevel(level) {
    return {
      type: SELECT_LEVEL,
      level
    };
  }

export function selectFirstField(field) {
  return {
    type: SELECT_FIRST_FIELD,
    field
  }
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