import{REQUEST_UPDATE_PART, RECEIVE_UPDATE_PART, REQUEST_PART_LIST, RECEIVE_PART_LIST,
        FAILED_FETCH_PART_LIST, FAILED_UPDATE_PART} from '../constants/ActionTypes'
var initialState={}
export default function partReducer(state=initialState, action){
  switch(action.type){
    case REQUEST_UPDATE_PART:
      return Object.assign({}, state, {partId:action.partId, updatingPartId:action.partId, isUpdatingPart:true})
    case RECEIVE_UPDATE_PART:
      let newPartList = Object.assign({}, state.orderParts, action.partItem)
      return Object.assign({}, state, {orderParts:newPartList, updatingPartId:action.partId, isUpdatingPart:false})
    case REQUEST_PART_LIST:
      return Object.assign({}, state, {isFetchingPartList:true})
    case RECEIVE_PART_LIST:
      return Object.assign({}, state, {isFetchingPartList:false, partList:action.partList})
    case FAILED_FETCH_PART_LIST:
      return Object.assign({}, state, {isFailedFetchPartList:false, error:action.error})
    case FAILED_UPDATE_PART:
      return Object.assign({}, state, {})
    default:
      return state
  }
}
