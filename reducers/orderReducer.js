import {
  DISPLAY_ORDERLIST, DISPLAY_ORDERPARTS, REQUEST_ORDERPARTS, RECEIVE_ORDERPARTS,
  RECEIVE_ORDER_LIST, REQUEST_ORDER_LIST, CLEAR_ORDERPARTS, REQUEST_SAVE_ORDER, RECEIVE_SAVE_ORDER
} from '../constants/ActionTypes'

var initialState = {orderList:{}, orderParts:{}, isFetching:false}
export default function orderReducer(state=initialState, action){
  console.log('action type is')
  console.log(action.type)
  switch(action.type){
    case DISPLAY_ORDERLIST:
      console.log('display orderlist...')
      console.log(state)
      var newOrderList = Object.assign({}, state.orderList)
      newOrderList = action.orderList
      return {orderList: newOrderList}
    case DISPLAY_ORDERPARTS:
      console.log('display orderparts...')
      console.log(state)
      var newOrderParts = Object.assign({}, state.orderParts)
      newOrderParts = action.orderParts
      return {orderParts: newOrderParts, orderList:state.orderList}
    case REQUEST_ORDERPARTS:
      console.log('request orderparts...')
      return{orderParts:{}, isFetchingOrderParts: true, partFetchingOrderId:action.orderId, orderList:state.orderList}
    case RECEIVE_ORDERPARTS:
      console.log('receive orderparts...')
      console.log(action)
      let orderParts={}
      orderParts[action.orderId] = action.orderParts
      return{orderParts:orderParts, isFetchingOrderParts:false, partFetchingOrderId:action.orderId, orderList:state.orderList}
    case REQUEST_ORDER_LIST:
      console.log('request orders...')
      return Object.assign({}, state, {isFethingOrderList:true})
    case RECEIVE_ORDER_LIST:
      console.log('receive orders...')
      return Object.assign({}, state, {isFetchingOrderList:false, orderList:action.orderList})
    case CLEAR_ORDERPARTS:
      console.log('clear order parts...')
      orderParts={}
      orderParts[action.orderId] = action.orderParts
      //return{orderParts:orderParts, isFetchingOrderParts:false, partFetchingOrderId:0, orderList:state.orderList}
      return Object.assign({},  state, {partFetchingOrderId:0, orderParts:orderParts})
    case REQUEST_SAVE_ORDER:
      console.log('request save order')
      console.log('order id is: '+action.orderId)
      return Object.assign({}, state, {isUpdatingOrder: true, updatingOrderId:action.orderId})
    case RECEIVE_SAVE_ORDER:
      console.log('receive save order')
      var newOrderList = Object.assign({}, state.orderList, action.orderItem)
      console.log(newOrderList)
      return Object.assign({}, state, {orderList: newOrderList, isUpdatingOrder: false, isEditingOrder:false, updatingOrderId:action.orderId})
    default:
      return state
  }
}
