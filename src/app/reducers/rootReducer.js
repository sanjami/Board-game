import {combineReducers} from 'redux';
import cellReducer from './cellReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    cellReducer,
    appReducer,
});

export default rootReducer;
