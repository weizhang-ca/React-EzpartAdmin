import {combineReducers} from 'redux'
import garageReducer from './garageReducer'
import supplierReducer from './supplierReducer'
const rootReducer = combineReducers({
  garage:garageReducer,
  supplier:supplierReducer
});

export default rootReducer;
