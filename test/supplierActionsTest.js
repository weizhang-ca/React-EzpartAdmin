import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/ezpartActions'
import * as types from '../constants/ActionTypes'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async supplier operations', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_SUPPLIER_LIST when fetching suppliers has been done', (done) => {
    nock('http://localhost')
      .get('/json/suppliers')
      .reply(200, [{'supplierId':1,'supplierName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test1@ezpartorder.com'}
                  ,{'supplierId':2,'supplierName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test2@ezpartorder.com'}])

    const expectedActions = [
      { type: types.REQUEST_SUPPLIER_LIST },
      { type: types.RECEIVE_SUPPLIER_LIST,
        supplierList:  [{'supplierId':1,'supplierName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test1@ezpartorder.com'},
                  {'supplierId':2,'supplierName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test2@ezpartorder.com'}]  }
    ]
    const store = mockStore({ supplier: {} }, expectedActions, done)
    store.dispatch(actions.fetchSupplierList())
  })

  it('creates FAILED_FETCH_SUPPLIER_LIST when API replies 400+', (done) => {
    nock('http://localhost')
      .get('/json/suppliers')
      .reply(400)
    let error = new Error('400')
    const expectedActions = [
      { type: types.REQUEST_SUPPLIER_LIST },
      { type: types.FAILED_FETCH_SUPPLIER_LIST,
        error}
    ]
    const store = mockStore({ supplier: {} }, expectedActions, done)
    store.dispatch(actions.fetchSupplierList())
  })

    it('creates RECEIVE_UPDATE_SUPPLIER when update supplier succeeds', (done)=>{
      //nock.disableNetConnect();
      //nock.enableNetConnect('127.0.0.1');
      nock('http://localhost')
        .post('/json/suppliers', {
          'supplierId':2,'supplierName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
            'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
            'phone':'12345678','email':'test2xx@ezpartorder.com'
        })
        .reply(201, {isSuccess:true, info:'success'})
        let supplier = {'supplierId':2,'supplierName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
          'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
          'phone':'12345678','email':'test2xx@ezpartorder.com'}
        const expectedActions = [
          {
            type: types.REQUEST_UPDATE_SUPPLIER,
            supplierId:2
          },
          {
            type: types.RECEIVE_UPDATE_SUPPLIER,
            isSuccess:true,
            info:'success',
            supplier
          }
        ]
        const store = mockStore({}, expectedActions, done)
        store.dispatch(actions.fetchUpdateSupplier(supplier))
    })
    it('creates RECEIVE_UPDATE_SUPPLIER when update supplier fails due to violation of constraints', (done)=>{
      //nock.disableNetConnect();
      //nock.enableNetConnect('127.0.0.1');
      let supplier = {'supplierId':2,'supplierName':'Test Shop @@','address':'2xxst Avenue','city':'Montreal',
        'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
        'phone':'12345678','email':'test2xx@ezpartorder.com'}
      nock('http://localhost')
        .post('/json/suppliers', supplier)
        .reply(201, {isSuccess:false, info:'invalid supplier name'})
        const expectedActions = [
          {
            type: types.REQUEST_UPDATE_SUPPLIER,
            supplierId:supplier.supplierId
          },
          {
            type: types.RECEIVE_UPDATE_SUPPLIER,
            isSuccess:false,
            info:'invalid supplier name',
            supplier
          }
        ]
        const store = mockStore({}, expectedActions, done)
        store.dispatch(actions.fetchUpdateSupplier(supplier))
    })

    it('creates FAILED_UPDATE_SUPPLIER when API replies 400+', (done)=>{
      //nock.disableNetConnect();
      //nock.enableNetConnect('127.0.0.1');
      nock('http://localhost')
        .post('/json/suppliers', {
          'supplierId':2,'supplierName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
            'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
            'phone':'12345678','email':'test2xx@ezpartorder.com'
        })
        .reply(400)
        let error = new Error(400)
        const expectedActions = [
          {
            type: types.REQUEST_UPDATE_SUPPLIER,
            supplierId:'2'
          },
          {
            type: types.FAILED_UPDATE_SUPPLIER,
            error
          }
        ]
        let supplier = {'supplierId':2,'supplierName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
          'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
          'phone':'12345678','email':'test2xx@ezpartorder.com'}
        const store = mockStore({}, expectedActions, done)
        store.dispatch(actions.fetchUpdateSupplier(supplier))
    })
})
