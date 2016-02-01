import {combineReducers} from 'redux'
import garageReducer from './garageReducer'
import supplierReducer from './supplierReducer'
import orderReducer from './orderReducer'
const rootReducer = combineReducers({
  garage:garageReducer,
  supplier:supplierReducer,
  order: orderReducer
});

export default rootReducer;
