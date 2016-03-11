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
    var error = new Error(response.status)
    //error.response = response
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
  return{
    type: types.RECEIVE_GARAGE_LIST,
    garageList
  }
}
function FailedFetchGarageList(error){
  return{
    type: types.FETCH_GARAGELIST_FAILED,
    error
  }
}
export function fetchGarageList(criteria=null){
    return (dispatch)=>{
      dispatch(requestGarageList())
      fetch('http://localhost/garage',{method:'get'})
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
  return {
    type: types.RECEIVE_UPDATE_GARAGE,
    garageId: result.garageId
  }
}
function failedUpdateGarage(error){
  return{
    type: types.FAILED_UPDATE_GARAGE,
    error
  }
}
export function fetchUpdateGarage(garage){
  //console.log('xxxxxxxxxxxxx')
  return (dispatch)=>{
    dispatch(requestUpdateGarage(garage.garageId))
    fetch('http://localhost/json/garage',{
      method:'POST',
      header:postHeader,
      body:JSON.stringify(garage)
    }).then(checkHttpReponseStatus)
      .then(parseJSON)
      .then((json)=>dispatch(receiveUpdateGarage(json)))
      .catch((error)=>{dispatch(failedUpdateGarage(error))})
  }
}
function requestSupplierList(){
  return {
    type: types.REQUEST_SUPPLIER_LIST
  }
}
function receiveSupplierList(supplierList){
  return{
    type: types.RECEIVE_SUPPLIER_LIST,
    supplierList
  }
}
function FailedFetchSupplierList(error){
  return{
    type: types.FAILED_FETCH_SUPPLIER_LIST,
    error
  }
}
export function fetchSupplierList(criteria=null){
    return (dispatch)=>{
      dispatch(requestSupplierList())
      fetch('http://localhost/json/suppliers')
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receiveSupplierList(json)))
        .catch((error)=>{
          dispatch(FailedFetchSupplierList(error))
        })
    }
  }
function requestUpdateSupplier(supplierId){
  return {
    type: types.REQUEST_UPDATE_SUPPLIER,
    supplierId
  }
}
function receiveUpdateSupplier(result){
  return {
    type: types.RECEIVE_UPDATE_SUPPLIER,
    supplierId:result.supplierId
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
    dispatch(requestUpdateSupplier(supplier.supplierId))
    fetch('http://localhost/json/suppliers',{
      method:'post',
      header:postHeader,
      body:JSON.stringify(supplier)
    }).then(checkHttpReponseStatus)
      .then(parseJSON)
      .then((json)=>dispatch(receiveUpdateSupplier(json)))
      .catch((error)=>{dispatch(failedUpdateSupplier(error))})
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
  return{
    type: types.RECEIVE_ORDER_LIST,
    orderList
  }
}
function FailedFetchOrderList(error){
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
      fetch('http://localhost/json/orders',
          {
            method:'post',
            body:filter
          })
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receiveOrderList(json)))
        .catch((error)=>{dispatch(FailedFetchOrderList(error))})
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
  console.log('xxxxxxxxxxxxx')
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
  console.log('aaaaaaaaaa')
  console.log(error)
  return{
    type: types.FAILED_FETCH_PART_LIST
  }
}
export function fetchPartList(orderId=''){
  return function(dispatch){
    dispatch(requestPartList(orderId))
    fetch('http://localhost/json/parts')
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receivePartList(json)))
        .catch((error)=>failedFetchPartList(error))
  }
}

function requestUpdateOrder(orderId){
  return{
    type: types.REQUEST_UPDATE_ORDER,
    orderId
  }
}
/*
* The message should contain isSuccess and if fails,
* unsuccessful info . E.g., the PO is not a valid number
*/
function receiveUpdateOrder(message, order){
  return{
    type: types.RECEIVE_UPDATE_ORDER,
    isSuccess:message.isSuccess,
    info: message.info,
    order
  }
}
function failedUpdateOrder(error, orderId){
  return{
    type: types.FAILED_UPDATE_ORDER,
    orderId,
    error
  }
}
export function updateOrder(order){
  return (dispatch)=>{
    dispatch(requestUpdateOrder(order.orderId))
    fetch('http://localhost/json/orders',
      {
        method: 'PUT',
        body: JSON.stringify(order)
      })
      .then(checkHttpReponseStatus)
      .then(parseJSON)
      .then((json)=>(dispatch(receiveUpdateOrder(json, order))))
      .catch((error)=>failedUpdateOrder(error, order.orderId))
  }
}

function requestUpdatePart(partId){
  return{
    type: types.REQUEST_UPDATE_PART,
    partId
  }
}
function receiveUpdatePart(message){
  return{
    type: types.RECEIVE_UPDATE_PART,
    isSuccess: message.isSuccess,
    info: message.info
  }
}
function failedUpdatePart(error, partId){
  return{
    type: types.FAILED_UPDATE_PART,
    partId
  }
}
export function updatePart(part){
  return (dispatch)=>{
    dispatch(requestUpdatePart(part.partId))
    fetch('http://locahost/json/parts',
        {
          method: 'PUT',
          body: JSON.stringify(part)
        })
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>{dispatch(receiveUpdatePart(json))})
        .catch((error)=>{failedUpdatePart(error, part.partId)})
  }
}

function requestCarMakeList(){
  return {
    type: types.REQUEST_CARMAKE_LIST
  }
}
function receiveCarMakeList(carMakeList){
  return{
    type: types.RECEIVE_CARMAKE_LIST,
    carMakeList
  }
}
function FailedFetchCarMakeList(error){
  //console.log(error)
  return{
    type: types.FAILED_FETCH_CARMAKE_LIST,
    error
  }
}
export function fetchCarMakeList(){
    return (dispatch)=>{
      dispatch(requestCarMakeList())
      fetch('http://localhost/json/carmakes/')
        .then(checkHttpReponseStatus)
        .then(parseJSON)
        .then((json)=>dispatch(receiveCarMakeList(json)))
        //.catch((error)=>{dispatch(FailedFetchOrderList(error))})
    }
}
function requestSaveCarMake(){
  return{
    type:types.REQUEST_SAVE_CARMAKE
  }
}
function receiveSaveCarMake(){
  return{
    type:types.RECEIVE_SAVE_CARMAKE,
  }
}
function failedSaveCarMake(error){
  return{
    type:types.FAILED_SAVE_CARMAKE,
    error
  }
}
export function saveCarMake(carMake){
  return (dispatch)=>{
    dispatch(requestSaveCarMake)
    fetch('http://localhost/json/updateCarMake/',{
      method:'post',
      header:postHeader,
      body:JSON.stringify(carMake)
    }).then(checkHttpReponseStatus)
      .then(parseJSON)
      .then((json)=>{dispatch(receiveSaveCarMake)})
  }
}
