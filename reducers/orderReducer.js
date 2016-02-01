import {DISPLAY_ORDERLIST, DISPLAY_ORDERPARTS} from '../constants/ActionTypes'

var initialState = {orderList:{}, orderParts:{}}
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
    default:
      return state
  }
}
