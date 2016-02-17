import {combineReducers} from 'redux'
import garageReducer from './garageReducer'
import supplierReducer from './supplierReducer'
import orderReducer from './orderReducer'
import partReducer from './partReducer'
const rootReducer = combineReducers({
  garage:garageReducer,
  supplier:supplierReducer,
  order: orderReducer,
  part: partReducer
});

export default rootReducer;
