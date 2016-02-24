import * as types from '../constants/ActionTypes';
import thunk from 'redux-thunk'
require('es6-promise').polyfill()
require('isomorphic-fetch')
var postHeader = {
  'Accept':'application/json',
  'Content-Type':'application/json'
}

function checkHttpReponseStatus(response){
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
function parseJSON(response) {
  return response.json()
}

export function saveGarage(garageId, garage){
  return {type: types.SAVE_GARAGE, garageId:garageId, garage:garage}
}
export function removeGarage(key){
  return {type: types.REMOVE_GARAGE, key:key}
}
export function addGarage(garage){
  return {type: types.ADD_GARAGE, garage:garage}
}
function requestGarageList(){
  return {
    type: types.REQUEST_GARAGE_LIST
  }
}
function receiveGarageList(garageList){
  console.log(garageList)
  return{
    type: types.RECEIVE_GARAGE_LIST,
    garageList
  }
}
function FailedFetchGarageList(error){
  console.log(error)
  return{
    type: types.FETCH_GARAGELIST_FAILED,
    error
  }
}
export function fetchGarageList(criteria=null){
    return (dispatch)=>{
      dispatch(requestGarageList())
      fetch('http://localhost/json/')
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receiveGarageList(json)))
        .catch((error)=>{
          dispatch(FailedFetchGarageList(error))
        })
    }
  }
function requestUpdateGarage(garageId){
  return {
    type: types.REQUEST_UPDATE_GARAGE,
    garageId
  }
}
function receiveUpdateGarage(result){
  console.log('garageId is: '+result.garageId)
  return {
    type: types.RECEIVE_UPDATE_GARAGE,
    garageId: result.garageId
  }
}
function failedUpdateGarage(error){
  console.log(error)
  return{
    type: types.FAILED_UPDATE_GARAGE,
    error
  }
}
export function fetchUpdateGarage(garage){
  return (dispatch)=>{
    dispatch(requestUpdateGarage(garage.garageId))
    fetch('http://localhost/json/updateGarage/',{
      method:'post',
      header:postHeader,
      body:JSON.stringify(garage)
    }).then(checkHttpReponseStatus)
      .then(parseJSON)
      .then((json)=>dispatch(receiveUpdateGarage(json)))
      //.catch((error)=>{dispatch(failedUpdateGarage(error))})
  }
}
function requestSupplierList(){
  return {
    type: types.REQUEST_SUPPLIER_LIST
  }
}
function receiveSupplierList(supplierList){
  console.log(supplierList)
  return{
    type: types.RECEIVE_SUPPLIER_LIST,
    supplierList
  }
}
function FailedFetchSupplierList(error){
  console.log(error)
  return{
    type: types.FAILED_FETCH_SUPPLIER_LIST,
    error
  }
}
export function fetchSupplierList(criteria=null){
    return (dispatch)=>{
      dispatch(requestSupplierList())
      fetch('http://localhost/json/suppliers/')
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receiveSupplierList(json)))
        .catch((error)=>{
          dispatch(FailedFetchSupplierList(error))
        })
    }
  }
function requestUpdateSupplier(garageId){
  return {
    type: types.REQUEST_UPDATE_SUPPLIER,
    garageId
  }
}
function receiveUpdateSupplier(garageId){
  return {
    type: types.RECEIVE_UPDATE_SUPPLIER,
    garageId
  }
}
function failedUpdateSupplier(error){
  return{
    type: types.FAILED_UPDATE_SUPPLIER,
    error
  }
}
export function fetchUpdateSupplier(supplier){
  return (dispatch)=>{
    dispatch(requestUpdateGarage(supplier.supplierId))
    fetch('http://localhost/json/updateGarage/',{
      method:'post',
      header:postHeader,
      body:JSON.stringify(supplier)
    }).then(checkHttpReponseStatus)
      .then(parseJSON)
      .then((json)=>dispatch(receiveUpdateGarage(json)))
      .catch((error)=>{dispatch(failedUpdateGarage(error))})
  }
}
function requestAddSupplier(){
  return {
    type: types.REQUEST_ADD_SUPPLIER
  }
}
function receiveAddSupplier(supplier){
  return {
    type: types.RECEIVE_ADD_SUPPLIER,
    supplier
  }
}
function failedAddSupplier(error){
  return {
    type: types.FAILED_ADD_SUPPLIER,
    error
  }
}
export function fetchAddSupplier(supplier){
  return (dispatch)=>{
    dispatch(requestAddSupplier())
    fetch('http://localhost/json/addSupplier/',{
      method:'post',
      header:postHeader,
      body:JSON.stringify(supplier)
    }).then(checkHttpReponseStatus)
      .then(parseJSON)
      .then((json)=>dispatch(receiveAddSupplier(supplier)))
      .catch((error)=>{dispatch(failedAddSupplier(error))})
  }
}
function requestOrderList(){
  return {
    type: types.REQUEST_ORDER_LIST
  }
}
function receiveOrderList(orderList){
  console.log(orderList)
  return{
    type: types.RECEIVE_ORDER_LIST,
    orderList
  }
}
function FailedFetchOrderList(error){
  console.log(error)
  return{
    type: types.FAILED_FETCH_ORDER_LIST,
    error
  }
}
var defaultFetchOrderCriteria={
  garageId:'', supplierId:'', dateFrom:'', dateTo:'', insurer:''
}
export function fetchOrderList(criteria=defaultFetchOrderCriteria){
    var filter = 'garageId='+criteria.garageId+'&supplierId='+criteria.supplierId
                  +'&dateFrom='+criteria.dateFrom+'&dateTo='+criteria.dateTo
                  +'&insurer='+criteria.insurer

    return (dispatch)=>{
      dispatch(requestOrderList())
      fetch('http://localhost/json/orders/?filter='+filter)
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receiveOrderList(json)))
        //.catch((error)=>{dispatch(FailedFetchOrderList(error))})
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

function requestPartList(orderId){
  return{
    type: types.REQUEST_PART_LIST,
    orderId
  }
}
function receivePartList(partList){
  return{
    type: types.RECEIVE_PART_LIST,
    partList
  }
}
function failedFetchPartList(error){
  return{
    type: types.FAILED_FETCH_PART_LIST,
    error
  }
}
export function fetchPartList(orderId){
  return function(dispatch){
    dispatch(requestPartList(orderId))
    fetch('http://localhost/json/parts/')
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receivePartList(json)))
        .catch((error)=>failedFetchPartList(error))
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
    setTimeout(()=>{return dispatch(receiveOrders(orderList))}, 1000)
  }
}
export function clearOrderParts(orderId){
  return {
    type: types.CLEAR_ORDERPARTS,
    orderId:orderId,
    orderParts: {}
  }
}

function requestSaveOrder(orderId){
  console.log("dispatch requestSaveOrder")
  return{
    type: types.REQUEST_SAVE_ORDER,
    orderId
  }
}
function receiveSaveOrder(orderItem, orderId){
  return{
    type: types.RECEIVE_SAVE_ORDER,
    orderItem,
    orderId
  }
}
export function saveOrder(orderItem, orderId){
  return (dispatch)=>{
    dispatch(requestSaveOrder(orderId))
    var orderItem={
      1:{garageId:1, supplierId:1, garageName:'Test Garage', supplierName:'Test Supplier', orderDate:'2016-01-22', po:"123123", totalValue:123.31, totalPart:8},
    }
    setTimeout(()=>{return dispatch(receiveSaveOrder(orderItem, orderId))}, 2000)
  }
}

function requestSavePart(partId){
  return{
    type: types.REQUEST_SAVE_PART,
    partId
  }
}
function receiveSavePart(partItem, partId){
  return{
    type: types.RECEIVE_SAVE_PART,
    partItem,
    partId
  }
}
export function savePart(partItem, partId){
  return (dispatch)=>{
    dispatch(requestSavePart(partId))
    var newPartItem={
      1:{partName:'Bumper ASYNC', partNumber:'839182XXX', partList:'100', partNet:'90', partType:'OEM', qty:1}
    }
    setTimeout(()=>{return dispatch(receiveSavePart(newPartItem, partId))}, 1000)
  }
}
