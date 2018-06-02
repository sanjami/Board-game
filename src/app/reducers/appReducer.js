import { 
    SELECT_LEVEL,
    NEW_GAME,
    ACTIVATE_FIELDS,
    PLAY_GAME,
    SET_MAX_LEVEL,
    SET_START_LEVEL,
    SET_LIVES,
    SET_LEVELS_COMPLETED
 } from '../actions/actionTypes';

const initialState = {
    levelSelected: 1,
    maxLevel: 1,
    startLevel: 1,
    game: [],
    activeFields: [],
    visitedFields: [],
    lives: 0,
    levelsCompleted: []
}

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_LEVEL:
            return {
                ...state,
                levelSelected: action.level
            }
        case NEW_GAME:
            return {
                ...state,
                game: action.game
            }
        case ACTIVATE_FIELDS:
            return {
                ...state,
                activeFields: action.activeFields
            }
        case PLAY_GAME:
            return {
                ...state,
                visitedFields: action.visitedFields
            }
        case SET_MAX_LEVEL:
            return {
                ...state,
                maxLevel: action.maxLevel
            }
        case SET_START_LEVEL:
            return {
                ...state,
                startLevel: action.minLevel
            }
        case SET_LIVES:
        return {
            ...state,
            lives: action.lives
        }
        case SET_LEVELS_COMPLETED:
        return {
            ...state,
            levelsCompleted: action.levelCompleted
        }     
        default:
        return state;   
    } 
}
