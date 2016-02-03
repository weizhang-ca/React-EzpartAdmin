import {
  DISPLAY_ORDERLIST, DISPLAY_ORDERPARTS, REQUEST_ORDERPARTS, RECEIVE_ORDERPARTS,
  RECEIVE_ORDERS, REQUEST_ORDERS
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
      return{orderParts:{}, isFetchingOrderParts: true, orderId:action.orderId, orderList:state.orderList}
    case RECEIVE_ORDERPARTS:
      console.log('receive orderparts...')
      console.log(action)
      let orderParts={}
      orderParts[action.orderId] = action.orderParts
      return{orderParts:orderParts, isFetchingOrderParts:false, orderId:action.orderId, orderList:state.orderList}
    case REQUEST_ORDERS:
      console.log('request orders...')
      return{orders:{}, isFetchingOrders: true}
    case RECEIVE_ORDERS:
      console.log('receive orders...')
      return{orderList:action.orderList, isFetchingOrders:false}
    default:
      return state
  }
}
