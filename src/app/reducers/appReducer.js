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
 } from '../actions/actionTypes';

const initialState = {
    currentLevel: 1,
    maxLevel: 1,
    minLevel: 1,
    remainingFields: [],
    activeFields: [],
    visitedFields: [],
    lives: 0,
    levelsCompleted: []
}

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_LEVEL:
            return {
                ...state,
                currentLevel: action.level
            }
        case SET_MAX_LEVEL:
            return {
                ...state,
                maxLevel: action.maxLevel
            }
        case SET_MIN_LEVEL:
            return {
                ...state,
                minLevel: action.minLevel
            }
        case SET_REMAINING_FIELDS:
            return {
                ...state,
                remainingFields: action.remainingFields
            }
        case SET_ACTIVE_FIELDS:
            return {
                ...state,
                activeFields: action.activeFields
            }
        case SET_VISITED_FIELDS:
            return {
                ...state,
                visitedFields: action.visitedFields
            }
        case SET_LIVES:
            return {
                ...state,
                lives: action.lives
        }
        case RESET_GAME:
            return {
                ...state,
                remainingFields: [],
                visitedFields: [],
                activeFields: []
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
