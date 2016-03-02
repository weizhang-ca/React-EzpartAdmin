import {REQUEST_CARMAKE_LIST, RECEIVE_CARMAKE_LIST, FAILED_FETCH_CARMAKE_LIST,
        REQUEST_SAVE_CARMAKE, RECEIVE_SAVE_CARMAKE, FAILED_SAVE_CARMAKE} from '../constants/ActionTypes'
let initialState={carMakeList:[], isFetchingCarMakeList:false, isUpdatingCarMake:false}
export default function carmakeReducer(state=initialState, action){
  switch(action.type){
    case REQUEST_CARMAKE_LIST:
      return Object.assign({}, state, {isFetchingCarMakeList:true})
    case RECEIVE_CARMAKE_LIST:
      return Object.assign({}, state, {carMakeList:action.carMakeList, isFetchingCarMakeList:false})
    case FAILED_FETCH_CARMAKE_LIST:
      return Object.assign({}, state, {error:action.error, isFetchingCarMakeList:false})
    case REQUEST_SAVE_CARMAKE:
      return Object.assign({}, state, {isUpdatingCarMake:true})
    case RECEIVE_SAVE_CARMAKE:
      return Object.assign({}, state, {isUpdatingCarMake:false})
    case FAILED_SAVE_CARMAKE:
      return Object.assign({}, state, {error:action.error})
    default:
      return state
  }
}
