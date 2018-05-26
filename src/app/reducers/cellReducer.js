import { CELL_CLICKED } from '../actions/actionTypes';

const initialState = {
    cellSelected: []
}

export default function cellReducer (state = initialState, action) {
    switch (action.type) {
        case CELL_CLICKED:
            return {
                ...state,
                cellSelected: [...state.cellSelected, parseInt(action.position)]
            }
        default:
        return state;   
    } 
}
