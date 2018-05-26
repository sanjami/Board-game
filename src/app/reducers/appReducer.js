import { 
    SELECT_LEVEL,
    SELECT_FIRST_FIELD,
    NEW_GAME,
    ACTIVATE_FIELDS,
    PLAY_GAME
 } from '../actions/actionTypes';

const initialState = {
    levelSelected: 0,
    maxLevel: 99,
    firstField: 0,
    game: [],
    activeFields: '',
    visitedFields: []
}

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_LEVEL:
            return {
                ...state,
                levelSelected: action.level
            }
        case SELECT_FIRST_FIELD:
            return {
                ...state,
                firstField: action.field
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
        default:
        return state;   
    } 
}
