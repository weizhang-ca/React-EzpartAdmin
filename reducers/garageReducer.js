import {SAVE_GARAGE, REMOVE_GARAGE, ADD_GARAGE, GET_GARAGE_LIST, DISPLAY_SUPPLIERLIST,
  REQUEST_GARAGE_LIST, RECEIVE_GARAGE_LIST,FETCH_GARAGELIST_FAILED, REQUEST_UPDATE_GARAGE,
  RECEIVE_UPDATE_GARAGE, FAILED_UPDATE_GARAGE } from '../constants/ActionTypes';
import assign from 'object-assign';
const initialState = {garageList:{}};
export default function garageReducer(state=initialState, action){
  console.log(action.type);
  switch(action.type){
    case GET_GARAGE_LIST:
      //console.log('Display garage list...')
      return {
        garageList: action.garageList
      };
    case SAVE_GARAGE: // DO NOT CHANGE PASSED-IN STATE! Return new state
      //console.log('Save garage to state...');
      var newStateGarageList = assign({}, state.garageList);
      newStateGarageList[action.garageId] = action.garage;
      return {garageList: newStateGarageList}
    case REQUEST_GARAGE_LIST:
      return Object.assign({}, state, {isFetchingGarageList: true})
    case RECEIVE_GARAGE_LIST:
      //console.log(action.garageList);
      return Object.assign({}, state, {garageList: action.garageList, isFetchingGarageList:false})
    case FETCH_GARAGELIST_FAILED:
      return Object.assign({}, state, {isFetchingGarageList: false, fetchGarageListFailed:true, error:action.error})
    case REQUEST_UPDATE_GARAGE:
      return Object.assign({}, state, {isUpdatingGarage: true, updatingGarageId: action.garageId})
    case RECEIVE_UPDATE_GARAGE:
      return Object.assign({}, state, {isUpdatingGarage: false, updatingGarageId: action.garageId})
    case FAILED_UPDATE_GARAGE:
      return Object.assign({}, state, {error:action.error, asyncOpGarageId:action.garageId})
    default:
      return state;
  }
}
