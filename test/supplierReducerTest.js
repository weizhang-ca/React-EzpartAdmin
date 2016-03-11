import expect from 'expect'
import supplierReducer from '../reducers/supplierReducer'
import * as types from '../constants/ActionTypes'

describe('supplier reducer', () => {
  it('should return the initial state', () => {
    expect(
      supplierReducer(undefined, {type:''})
    ).toEqual(
      {
        supplierList:[], isFetchingSupplierList:false, isUpdatingSupplier:false,isFailedFetchSupplierList:false,
        isFailedUpdateSupplier:false
      }
    )
  })

  it('should handle REQUEST_SUPPLIER_LIST', () => {
    expect(
      supplierReducer({}, {
        type: types.REQUEST_SUPPLIER_LIST
      })
    ).toEqual(
        {
          isFetchingSupplierList:true
        }
    )

    expect(
      supplierReducer(
        {isFetchingSupplierList:false},
        {
          type: types.REQUEST_SUPPLIER_LIST
        }
        )
    ).toEqual(
      {isFetchingSupplierList:true}
    )
  })

  it('should handle RECEIVE_SUPPLIER_LIST', ()=>{
    expect(
      supplierReducer(
        {supplierList:[],isFetchingSupplierList:true},
        {
          type: types.RECEIVE_SUPPLIER_LIST,
          supplierList:[{'supplierId':1,'supplierName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                        'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                        'phone':'12345678','email':'test1@ezpartorder.com'}]
        }
      )
    ).toEqual(
      {
        supplierList:[{'supplierId':1,'supplierName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                      'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                      'phone':'12345678','email':'test1@ezpartorder.com'}],
        isFetchingSupplierList:false
      }
    )
  })

  it('should handle REQUEST_UPDATE_SUPPLIER', ()=>{
    expect(
      supplierReducer(
        {isUpdatingSupplier:false},
        {type:types.REQUEST_UPDATE_SUPPLIER, supplierId:1}
      )
    ).toEqual({
      isUpdatingSupplier:true, updatingSupplierId:1
    })
  })

  it('should handle RECEIVE_UPDATE_SUPPLIER', ()=>{
    expect(
      supplierReducer(
        {isUpdatingSupplier:true},
        {type:types.RECEIVE_UPDATE_SUPPLIER, supplierId:'2'}
      )
    ).toEqual({
      isUpdatingSupplier:false, updatingSupplierId:'2'
    })
  })
})
