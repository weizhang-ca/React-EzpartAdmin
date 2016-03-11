import expect from 'expect'
import orderReducer from '../reducers/orderReducer'
import * as types from '../constants/ActionTypes'

describe('order reducer', ()=>{
  it('should return initial state', ()=>{
    expect(
      orderReducer(undefined, {})
    ).toEqual({
      orderList:{}, isFetchingOrderList:false, isUpdatingOrder: false
    })
  })

  it('should handle REQUEST_ORDER_LIST', ()=>{
    expect(
      orderReducer(
      {isFetchingOrderList:false},
      {
        type: types.REQUEST_ORDER_LIST
      })
    ).toEqual({
      isFetchingOrderList:true
    })
  })

  it('should handle RECEIVE_ORDER_LIST', ()=>{
    expect(
      orderReducer(
        {isFetchingOrderList:true},
        {
          type: types.RECEIVE_ORDER_LIST,
          orderList:[{
            orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
            shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
            totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
          }]
        }
      )
    ).toEqual({
        isFetchingOrderList:false,
        orderList:[{
          orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
          shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
          totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
        }]
      })
  })

  it('should handle FAILED_FETCH_ORDER_LIST', ()=>{
    let error = new Error(400)
    expect(
      orderReducer(
        {isFetchingOrderList:true},
        {
          type: types.FAILED_FETCH_ORDER_LIST,
          error
        }
      )
    ).toEqual({
      isFetchingOrderList:false,
      error
    })
  })

  it('should handle REQUEST_UPDATE_ORDER', ()=>{
    expect(
      orderReducer(
        {isUpdatingOrder:false},
        {
          type: types.REQUEST_UPDATE_ORDER,
          orderId:'2'
        }
      )
    ).toEqual({
      isUpdatingOrder:true,
      updatingOrderId:'2'
    })
  })

  it('should handle RECEIVE_UPDATE_ORDER succeed', ()=>{
    expect(
      orderReducer(
        {
          isUpdatingOrder:true,
          updatingOrderId:2,
          orderList:[
          {
            orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
            shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
            totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
          },
          {
            orderId:2, gargeName:'Test Shop 2', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
            shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 2',
            totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
          }]
        },
        {
          type: types.RECEIVE_UPDATE_ORDER,
          order:{
            orderId:2, gargeName:'Test Shop 2x', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
            shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 2',
            totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
          },
          isSuccess: true,
          info:'success'
        }
      )
    ).toEqual({
      isUpdatingOrder:false,
      updatingOrderId:2,
      orderList:[
        {
          orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
          shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
          totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
        },
        {
          orderId:2, gargeName:'Test Shop 2x', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
          shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 2',
          totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
        }
      ],
      isUpdatingSuccess:true,
      info:'success'
    })
  })

  it('should handle RECEIVE_UPDATE_ORDER fail', ()=>{
    expect(
      orderReducer(
        {
          isUpdatingOrder:true,
          updatingOrderId:2,
          orderList:[
          {
            orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
            shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
            totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
          },
          {
            orderId:2, gargeName:'Test Shop 2', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
            shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 2',
            totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
          }]
        },
        {
          type: types.RECEIVE_UPDATE_ORDER,
          order:{
            orderId:2, gargeName:'Test Shop 2x', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
            shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 2',
            totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
          },
          isSuccess: false,
          info:'po number is invalid'
        }
      )
    ).toEqual({
      isUpdatingOrder:false,
      updatingOrderId:2,
      orderList:[
        {
          orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
          shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
          totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
        },
        {
          orderId:2, gargeName:'Test Shop 2', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
          shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 2',
          totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
        }
      ],
      isUpdatingSuccess:false,
      info:'po number is invalid'
    })
  })
})
