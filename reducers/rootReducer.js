import {combineReducers} from 'redux';
import garageReducer from './garageReducer';

const rootReducer = combineReducers({
  garage:garageReducer
});

export default rootReducer;
