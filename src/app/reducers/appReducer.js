import { 
    SELECT_LEVEL,
    NEW_GAME,
    ACTIVATE_FIELDS,
    PLAY_GAME,
    SET_MAX_LEVEL,
    SET_LIFE
 } from '../actions/actionTypes';

const initialState = {
    levelSelected: 1,
    maxLevel: 1,
    game: [],
    activeFields: [],
    visitedFields: [],
    life: 0
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
        case SET_LIFE:
        return {
            ...state,
            life: action.life
        }        
        default:
        return state;   
    } 
}
