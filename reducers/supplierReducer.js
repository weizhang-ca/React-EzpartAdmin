import {DISPLAY_SUPPLIERLIST, ADD_SUPPLIER, REQUEST_SUPPLIER_LIST, RECEIVE_SUPPLIER_LIST,
        FAILED_FETCH_SUPPLIER_LIST, REQUEST_UPDATE_SUPPLIER,RECEIVE_UPDATE_SUPPLIER,
        FAILED_UPDATE_SUPPLIER, REQUEST_ADD_SUPPLIER, RECEIVE_ADD_SUPPLIER,
        FAILED_ADD_SUPPLIER} from '../constants/ActionTypes'
import assign from 'object-assign'
const initialState = {supplierList:[], isFetchingSupplierList:false, isUpdatingSupplier:false,
                      failedFetchSupplierList:false, failedUpdateSupplier:false}
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
        return Object.assign({}, state, {isFetchingSupplierList: false, failedFetchSupplierList:true})
      case REQUEST_UPDATE_SUPPLIER:
        return Object.assign({}, state, {isUpdatingSupplier:true, updatingSupplierId:action.supplierId})
      case RECEIVE_UPDATE_SUPPLIER:
        if(action.isSuccess===true){
          state.supplierList.some((supplier)=>{
            if(supplier.supplierId == action.supplier.supplierId){
              Object.assign(supplier, action.supplier)
              return true
            }
          })
        }
        return Object.assign({}, state, {isUpdatingSupplier:false, isSuccess:action.isSuccess, info:action.info})
      case FAILED_UPDATE_SUPPLIER:
        return Object.assign({}, state, {isUpdatingSupplier:false, failedUpdateSupplier:true, error:action.error})
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
