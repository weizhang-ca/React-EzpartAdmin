import {combineReducers} from 'redux'
import garageReducer from './garageReducer'
import supplierReducer from './supplierReducer'
import orderReducer from './orderReducer'
import partReducer from './partReducer'
import carmakeReducer from './carmakeReducer'
const rootReducer = combineReducers({
  garage:garageReducer,
  supplier:supplierReducer,
  order: orderReducer,
  part: partReducer,
  carmake: carmakeReducer
});

export default rootReducer;
