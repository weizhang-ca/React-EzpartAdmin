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
export function displayGarageList(garageList){
  return {
      type: types.GET_GARAGE_LIST,
      garageList: garageList
  }
}
export function dispalySupplierList(supplierList){
  return {
      type: types.DISPLAY_SUPPLIERLIST,
      supplierList: supplierList
  }
}
export function addSupplier(supplier){
  return{
    type: types.ADD_SUPPLIER,
    supplier:supplier
  }
}
export function displayOrderList(orderList){
  return{
    type: types.DISPLAY_ORDERLIST,
    orderList: orderList
  }
}
export function displayOrderParts(orderParts){
  return{
    type: types.DISPLAY_ORDERPARTS,
    orderParts: orderParts
  }
}
