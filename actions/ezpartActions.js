import * as types from '../constants/ActionTypes';
import thunk from 'redux-thunk'

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

function requestOrderParts(orderId){
  return{
    type: types.REQUEST_ORDERPARTS,
    orderId,
    isFetching:true
  }
}
function receiveOrderParts(orderParts, orderId){
  return{
    type: types.RECEIVE_ORDERPARTS,
    orderParts,
    orderId
  }
}
export function fetchOrderParts(orderId){

  return function(dispatch){
    dispatch(requestOrderParts(orderId))
    var parts={
      1:{partName:'Bumper ASYNC', partNumber:'839182', partList:'100', partNet:'90', partType:'OEM', qty:1},
      2:{partName:'Head light ASYNC', partNumber:'124123', partList:'220', partNet:'190', partType:'OEM', qty:1},
      3:{partName:'Clamp ASYNC', partNumber:'123123', partList:'10', partNet:'8', partType:'Aftermarket', qty:4}
    }
    setTimeout(()=>{return dispatch(receiveOrderParts(parts, orderId))},2000)
  }
}
function requestOrders(){
  return{
    type: types.REQUEST_ORDERS
  }
}
function receiveOrders(orderList){
  return{
    type: types.RECEIVE_ORDERS,
    orderList
  }
}
export function fetchOrders(criteria){
  return (dispatch)=>{
    dispatch(requestOrders())
    var orderList={
      1:{garageId:1, supplierId:1, garageName:'Test Garage1', supplierName:'Test Supplier1', orderDate:'2016-01-30', po:"123123", totalValue:123.31, totalPart:8},
      2:{garageId:1, supplierId:2, garageName:'Test Garage1', supplierName:'Test Supplier2', orderDate:'2016-01-30', po:"444512", totalValue:513.1, totalPart:6},
      3:{garageId:2, supplierId:1, garageName:'Test Garage2', supplierName:'Test Supplier1', orderDate:'2016-01-30', po:"4134", totalValue:636.41, totalPart:2},
      4:{garageId:2, supplierId:2, garageName:'Test Garage2', supplierName:'Test Supplier2', orderDate:'2016-01-30', po:"31414", totalValue:3241.123, totalPart:15}
    }
    setTimeout(()=>{return dispatch(receiveOrders(orderList))}, 2000)
  }
}
