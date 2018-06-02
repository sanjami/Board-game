import {
  SET_CURRENT_LEVEL,
  SET_MAX_LEVEL,
  SET_MIN_LEVEL,
  SET_REMAINING_FIELDS,
  SET_ACTIVE_FIELDS,
  SET_VISITED_FIELDS,
  SET_LIVES,
  RESET_GAME,
  SET_LEVELS_COMPLETED
} from './actionTypes'


export function setLevel(level) {
  return {
    type: SET_CURRENT_LEVEL,
    level
  };
}

export function setMaxLevel(maxLevel) {
  return {
    type: SET_MAX_LEVEL,
    maxLevel
  }
}

export function setMinLevel(minLevel) {
  return {
    type: SET_MIN_LEVEL,
    minLevel
  }
}

export function setRemainingFields(remainingFields) {
  return {
    type: SET_REMAINING_FIELDS,
    remainingFields
  }
}

export function setActiveFields(activeFields) {
  return {
    type: SET_ACTIVE_FIELDS,
    activeFields
  }
}

export function setVisitedFields(visitedFields) {
  return {
    type: SET_VISITED_FIELDS,
    visitedFields
  }
}

export function setLives(lives) {
  return {
    type: SET_LIVES,
    lives
  }
}

export function resetGame() {
  return {
    type: RESET_GAME
  }
}

export function setLevelsCompleted(levelCompleted) {
  return {
    type: SET_LEVELS_COMPLETED,
    levelCompleted
  }
}