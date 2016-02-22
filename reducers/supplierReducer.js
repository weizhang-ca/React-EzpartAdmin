import {DISPLAY_SUPPLIERLIST, ADD_SUPPLIER, REQUEST_SUPPLIER_LIST, RECEIVE_SUPPLIER_LIST,
        FAILED_FETCH_SUPPLIER_LIST, REQUEST_UPDATE_SUPPLIER,RECEIVE_UPDATE_SUPPLIER,
        FAILED_UPDATE_SUPPLIER, REQUEST_ADD_SUPPLIER, RECEIVE_ADD_SUPPLIER,
        FAILED_ADD_SUPPLIER} from '../constants/ActionTypes'
import assign from 'object-assign'
var initialState = {supplierList:{}}
export default function supplierReducer(state=initialState, action){
    switch(action.type){
      case DISPLAY_SUPPLIERLIST:
        //console.log("Display garage supplier list...")
        var newSupplierList =  assign({}, state.supplierList)
        newSupplierList = action.supplierList
        //state.supplierList = {}
        return {supplierList: newSupplierList}
      case ADD_SUPPLIER:
        //console.log("Add supplier...")
        var newSupplierList = assign({}, state.supplierList, action.supplier)
        return {supplierList: newSupplierList}
      case REQUEST_SUPPLIER_LIST:
        return Object.assign({}, state, {isFetchingSupplierList:true})
      case RECEIVE_SUPPLIER_LIST:
        return Object.assign({}, state, {isFetchingSupplierList:false, supplierList:action.supplierList})
      case FAILED_FETCH_SUPPLIER_LIST:
        return Object.assign({}, state, {isFetchingSupplierList: false, isFailedFetchSupplierList:true})
      case REQUEST_UPDATE_SUPPLIER:
        return Object.assign({}, state, {isUpdatingSupplier:true, asyncOpSupplierId:action.supplierId})
      case RECEIVE_UPDATE_SUPPLIER:
        return Object.assign({}, state, {isUpdatingSupplier:false, asyncOpSupplierId:action.supplierId})
      case FAILED_UPDATE_SUPPLIER:
        return Object.assign({}, state, {isUpdatingSupplier:false, isFailedUpdateSupplier:true})
      case REQUEST_ADD_SUPPLIER:
        return Object.assign({}, state, {isAddingSupplier:true})
      case RECEIVE_ADD_SUPPLIER:
        return Object.assign({}, state, {isAddingSupplier:false})
      case FAILED_ADD_SUPPLIER:
        return Object.assign({}, state, {isAddingSupplier:false, isFailedAddSupplier:true})
      default:
        return state
    }
}
