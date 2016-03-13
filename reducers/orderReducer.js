import {
  RECEIVE_ORDER_LIST, REQUEST_ORDER_LIST, REQUEST_UPDATE_ORDER, RECEIVE_UPDATE_ORDER,
  FAILED_FETCH_ORDER_LIST, FAILED_UPDATE_ORDER
} from '../constants/ActionTypes'

var initialState = {orderList:{}, isFetchingOrderList:false, isUpdatingOrder: false, failedUpdateOrder: false, failedFetchingOrderList:false}
export default function orderReducer(state=initialState, action){
  switch(action.type){
    case REQUEST_ORDER_LIST:
      return Object.assign({}, state, {isFetchingOrderList:true})
    case RECEIVE_ORDER_LIST:
      return Object.assign({}, state, {isFetchingOrderList:false, orderList:action.orderList})
    case FAILED_FETCH_ORDER_LIST:
      return Object.assign({}, state, {isFetchingOrderList:false, error:action.error})
    case REQUEST_UPDATE_ORDER:
      return Object.assign({}, state, {isUpdatingOrder: true, updatingOrderId:action.orderId})
    case RECEIVE_UPDATE_ORDER:
      if(action.isSuccess === true){
          state.orderList.some((order)=>{
            if(order.orderId == action.order.orderId){
              order = Object.assign(order, action.order)
              return true
            }
          })
      }
      return Object.assign({}, state, {isUpdatingOrder: false,isUpdatingSuccess:action.isSuccess, info:action.info})
    case FAILED_UPDATE_ORDER:
      return Object.assign({}, state, {isUpdatingOrder: false, failedUpdateOrder:true, error: action.error})
    default:
      return state
  }
}
