import * as types from '../constants/ActionTypes';

export function saveGarage(garageId, garage){
  return {type: types.SAVE_GARAGE, garageId:garageId, garage:garage}
}
export function removeGarage(key){
  return {type: types.REMOVE_GARAGE, key:key}
}
export function addGarage(garage){
  return {type: types.ADD_GARAGE, garage:garage}
}
export function getGarageList(garageList){
  return {
      type: types.GET_GARAGE_LIST,
      garageList: garageList
  }
}