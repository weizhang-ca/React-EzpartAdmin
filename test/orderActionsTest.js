import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/ezpartActions'
import * as types from '../constants/ActionTypes'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async order operations', ()=>{
  afterEach(() => {
    nock.cleanAll()
  })

  it('create RECEIVE_ORDER_LIST when fetching order list is done', (done)=>{
    nock('http://localhost')
      .post('/json/orders')
      .reply(200, [
        {
          orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
          shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
          totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
        },
        {
          orderId:2, gargeName:'Test Shop 2', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
          shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'54321', orderNote:'Test 2',
          totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
        }
      ])
      const expectedActions = [
        {type: types.REQUEST_ORDER_LIST},
        {
          type: types.RECEIVE_ORDER_LIST,
          orderList:[
            {
              orderId:1, gargeName:'Test Shop 1', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
              shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
              totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
            },
            {
              orderId:2, gargeName:'Test Shop 2', supplierName:'Test Supplier 2', orderDate:'2016-01-01',
              shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'54321', orderNote:'Test 2',
              totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
            }
          ]
        }
      ]
      const store = mockStore({}, expectedActions, done)
      store.dispatch(actions.fetchOrderList())
  })

  it('create FAILED_FETCH_ORDER_LIST when API replies 400+', (done)=>{
    nock('http://localhost')
      .post('/json/orders')
      .reply(400)
      let error = new Error(400)
      const expectedActions = [
        {type: types.REQUEST_ORDER_LIST},
        {
          type: types.FAILED_FETCH_ORDER_LIST,
          error
        }
      ]
      const store = mockStore({}, expectedActions, done)
      store.dispatch(actions.fetchOrderList())
  })

  it('create RECEIVE_UPDATE_ORDER when update order succeeds', (done)=>{
    let order = {
      orderId:1, gargeName:'Test Shop 1x', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
      shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
      totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
    }
    nock('http://localhost')
      .intercept('/json/orders', 'PUT', order)
      .reply(201, {isSuccess:true, info:'success'})
      const expectedActions=[
        {
          type: types.REQUEST_UPDATE_ORDER,
          orderId: 1
        },
        {
          type: types.RECEIVE_UPDATE_ORDER,
          order,
          isSuccess:true,
          info: 'success'
        }
      ]
      const store = mockStore({}, expectedActions, done)
      store.dispatch(actions.updateOrder(order))
  })

  it('create RECEIVE_UPDATE_ORDER when update order fails due to violation of constraints', (done)=>{
    let order = {
      orderId:1, gargeName:'Test Shop 1x', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
      shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
      totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
    }
    nock('http://localhost')
      .intercept('/json/orders', 'PUT', order)
      .reply(201, {isSuccess:false, info:'po number is invalid'})
      const expectedActions=[
        {
          type: types.REQUEST_UPDATE_ORDER,
          orderId: 1
        },
        {
          type: types.RECEIVE_UPDATE_ORDER,
          order,
          isSuccess:false,
          info: 'po number is invalid'
        }
      ]
      const store = mockStore({}, expectedActions, done)
      store.dispatch(actions.updateOrder(order))
  })

  it('create FAILED_UPDATE_ORDER when API replies 400+ code', (done)=>{
    let order = {
      orderId:1, gargeName:'Test Shop 1x', supplierName:'Test Supplier 1', orderDate:'2016-01-01',
      shipDate:'2016-01-01', receiveDate:'2016-01-01', poNumber:'12345', orderNote:'Test 1',
      totalList:100.00, totalNet:90.00, totalPart:12, claim:'123321'
    }
    nock('http://localhost')
      .intercept('/json/orders','PUT', order)
      .reply(400)
    let error = new Error(400)
    const expectedActions = [
      {
        type: types.REQUEST_UPDATE_ORDER,
        orderId: order.orderId
      },
      {
        type: types.FAILED_UPDATE_ORDER,
        error
      }
    ]
    const store = mockStore({}, expectedActions, done)
    store.dispatch(actions.updateOrder(order))
  })
})
