import {SAVE_GARAGE, REMOVE_GARAGE, ADD_GARAGE, GET_GARAGE_LIST} from '../constants/ActionTypes';
import assign from 'object-assign';
const initialState = {garageList:{}};
export default function garageReducer(state=initialState, action){
  switch(action.type){
    case GET_GARAGE_LIST:
      return {
        garageList: action.garageList
      };
    case SAVE_GARAGE: // DO NOT CHANGE PASSED-IN STATE! Return new state
      console.log('Save garage to state...');
      var newStateGarageList = assign({}, state.garageList);
      newStateGarageList[action.garageId] = action.garage;
      console.log('old state is');
      console.log( state.garageList);
      console.log('new state is');
      console.log(newStateGarageList);
      return {garageList: newStateGarageList};
    case DISPLAY_SUPPLIERLIST:
      return {
        supplierList: action.supplierList
      }
    default:
      return state;
  }
}
