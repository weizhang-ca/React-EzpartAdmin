import{REQUEST_UPDATE_PART, RECEIVE_UPDATE_PART, REQUEST_PART_LIST, RECEIVE_PART_LIST,
        FAILED_FETCH_PART_LIST, FAILED_UPDATE_PART} from '../constants/ActionTypes'
var initialState={partList:[], isFetchingPartList:false, isUpdatingPart:false, failedFetchPartList:false, failedUpdatePart:false}
export default function partReducer(state=initialState, action){
  switch(action.type){
    case REQUEST_UPDATE_PART:
      return Object.assign({}, state, {updatingPartId:action.partId, isUpdatingPart:true})
    case RECEIVE_UPDATE_PART:
      if(action.isSuccess===true){
        state.partList.some((part)=>{
          if(part.partId == action.part.partId){
            Object.assign(part, action.part)
            return true
          }
        })
      }
      return Object.assign({}, state, { isUpdatingPart:false, isSuccess:action.isSuccess, info:action.info})
    case REQUEST_PART_LIST:
      return Object.assign({}, state, {isFetchingPartList:true})
    case RECEIVE_PART_LIST:
      return Object.assign({}, state, {isFetchingPartList:false, partList:action.partList})
    case FAILED_FETCH_PART_LIST:
      return Object.assign({}, state, {isFetchingPartList:false, failedFetchPartList:true, error:action.error})
    case FAILED_UPDATE_PART:
      return Object.assign({}, state, {isUpdatingPart:false, failedUpdatePart:true, error:action.error})
    default:
      return state
  }
}
