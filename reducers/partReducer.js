import{REQUEST_SAVE_PART, RECEIVE_SAVE_PART} from '../constants/ActionTypes'
var initialState={}
export default function partReducer(state=initialState, action){
  switch(action.type){
    case REQUEST_SAVE_PART:
      console.log('dddddddddddd')
      console.log(state)
      return Object.assign({}, state, {partId:action.partId, updatingPartId:action.partId, isUpdatingPart:true})
    case RECEIVE_SAVE_PART:
      let newPartList = Object.assign({}, state.orderParts, action.partItem)
      console.log('xxxxxxxxxxxxxx')
      console.log(newPartList)
      console.log('bbbbbbbbbbbbbbb')
      console.log(state)
      return Object.assign({}, state, {orderParts:newPartList, updatingPartId:action.partId, isUpdatingPart:false})
    default:
      return state
  }
}
