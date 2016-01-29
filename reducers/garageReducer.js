import {SAVE_GARAGE, REMOVE_GARAGE, ADD_GARAGE, GET_GARAGE_LIST, DISPLAY_SUPPLIERLIST} from '../constants/ActionTypes';
import assign from 'object-assign';
const initialState = {garageList:{}};
export default function garageReducer(state=initialState, action){
  switch(action.type){
    case GET_GARAGE_LIST:
      console.log('Display garage list...')
      return {
        garageList: action.garageList
      };
    case SAVE_GARAGE: // DO NOT CHANGE PASSED-IN STATE! Return new state
      console.log('Save garage to state...');
      var newStateGarageList = assign({}, state.garageList);
      newStateGarageList[action.garageId] = action.garage;
      return {garageList: newStateGarageList};
    default:
      return state;
  }
}
