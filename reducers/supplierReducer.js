import {DISPLAY_SUPPLIERLIST, ADD_SUPPLIER} from '../constants/ActionTypes'
import assign from 'object-assign'
var initialState = {supplierList:{}}
export default function supplierReducer(state=initialState, action){
    switch(action.type){
      case DISPLAY_SUPPLIERLIST:
        console.log("Display garage supplier list...")
        var newSupplierList =  assign({}, state.supplierList)
        newSupplierList = action.supplierList
        //state.supplierList = {}
        return {supplierList: newSupplierList}
      case ADD_SUPPLIER:
        console.log("Add supplier...")
        var newSupplierList = assign({}, state.supplierList, action.supplier)
        return {supplierList: newSupplierList}
      default:
        return state
    }
}
