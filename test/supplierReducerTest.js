import expect from 'expect'
import supplierReducer from '../reducers/supplierReducer'
import * as types from '../constants/ActionTypes'

describe('supplier reducer', () => {
  it('should return the initial state', () => {
    expect(
      supplierReducer(undefined, {type:''})
    ).toEqual(
      {
        supplierList:[], isFetchingSupplierList:false, isUpdatingSupplier:false,failedFetchSupplierList:false,
        failedUpdateSupplier:false
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

  it('should handle RECEIVE_UPDATE_SUPPLIER when update supplier succeeds', ()=>{
    let supplier = {'supplierId':1,'supplierName':'Test Shop 1XX','address':'1st Avenue','city':'Montreal',
                  'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                  'phone':'12345678','email':'test1@ezpartorder.com'}
    expect(
      supplierReducer(
        {
          isUpdatingSupplier:true, updatingSupplierId:'1',
          supplierList:[{'supplierId':1,'supplierName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                      'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                      'phone':'12345678','email':'test1@ezpartorder.com'},
                    {'supplierId':2,'supplierName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                      'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                      'phone':'12345678','email':'test2@ezpartorder.com'}]
        },
        {
          type:types.RECEIVE_UPDATE_SUPPLIER,
          isSuccess:true,
          info: 'success',
          supplier
        }
      )
    ).toEqual({
      isUpdatingSupplier:false, updatingSupplierId:'1', isSuccess:true, info:'success',
      supplierList:[{'supplierId':1,'supplierName':'Test Shop 1XX','address':'1st Avenue','city':'Montreal',
                  'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                  'phone':'12345678','email':'test1@ezpartorder.com'},
                {'supplierId':2,'supplierName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                  'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                  'phone':'12345678','email':'test2@ezpartorder.com'}]
    })
  })

  it('should handle RECEIVE_UPDATE_SUPPLIER when update supplier fails due to violation of constraints', ()=>{
    let supplier = {'supplierId':1,'supplierName':'Test Shop @@','address':'1st Avenue','city':'Montreal',
                  'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                  'phone':'12345678','email':'test1@ezpartorder.com'}
    expect(
      supplierReducer(
        {
          isUpdatingSupplier:true, updatingSupplierId:'1',
          supplierList:[{'supplierId':1,'supplierName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                      'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                      'phone':'12345678','email':'test1@ezpartorder.com'},
                    {'supplierId':2,'supplierName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                      'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                      'phone':'12345678','email':'test2@ezpartorder.com'}]
        },
        {
          type:types.RECEIVE_UPDATE_SUPPLIER,
          isSuccess:false,
          info: 'invalid supplier name',
          supplier
        }
      )
    ).toEqual({
      isUpdatingSupplier:false, updatingSupplierId:'1', isSuccess:false, info:'invalid supplier name',
      supplierList:[{'supplierId':1,'supplierName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                  'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                  'phone':'12345678','email':'test1@ezpartorder.com'},
                {'supplierId':2,'supplierName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                  'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                  'phone':'12345678','email':'test2@ezpartorder.com'}]
    })
  })
  it('should handle FAILED_UPDATE_SUPPLIER', ()=>{
    let error = new Error(400)
    expect(
      supplierReducer(
        {isUpdatingSupplier:true, updatingSupplierId:2},
        {
          type: types.FAILED_UPDATE_SUPPLIER,
          error
        }
      )
    ).toEqual({
      isUpdatingSupplier: false, updatingSupplierId:2, error, failedUpdateSupplier:true
    })
  })
})
