import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/ezpartActions'
import * as types from '../constants/ActionTypes'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('async garage operations', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_GARAGE_LIST when fetching garages has been done', (done) => {
    nock('http://localhost')
      .get('/garage')
      .reply(200, [{'garageId':1,'garageName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test1@ezpartorder.com'}
                  ,{'garageId':2,'garageName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test2@ezpartorder.com'}])

    const expectedActions = [
      { type: types.REQUEST_GARAGE_LIST },
      { type: types.RECEIVE_GARAGE_LIST,
        garageList:  [{'garageId':1,'garageName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test1@ezpartorder.com'},
                  {'garageId':2,'garageName':'Test Shop 2','address':'2st Avenue','city':'Montreal',
                    'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                    'phone':'12345678','email':'test2@ezpartorder.com'}]  }
    ]
    const store = mockStore({ garage: {} }, expectedActions, done)
    store.dispatch(actions.fetchGarageList())
  })

  it('creates FAILED_FETCH_GARAGE_LIST when API replies 400+', (done) => {
    nock('http://localhost')
      .get('/garage')
      .reply(400)
    let error = new Error('400')
    const expectedActions = [
      { type: types.REQUEST_GARAGE_LIST },
      { type: types.FAILED_FETCH_GARAGE_LIST,
        error}
    ]
    const store = mockStore({ garage: {} }, expectedActions, done)
    store.dispatch(actions.fetchGarageList())
  })

    it('creates RECEIVE_UPDATE_GARAGE when update garage is done', (done)=>{
      //nock.disableNetConnect();
      //nock.enableNetConnect('127.0.0.1');
      nock('http://localhost')
        .post('/json/garage', {
          'garageId':2,'garageName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
            'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
            'phone':'12345678','email':'test2xx@ezpartorder.com'
        })
        .reply(201, {garageId:'2'})

        const expectedActions = [
          {
            type: types.REQUEST_UPDATE_GARAGE,
            garageId:'2'
          },
          {
            type: types.RECEIVE_UPDATE_GARAGE,
            garageId:'2'
          }
        ]
        let garage = {'garageId':2,'garageName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
          'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
          'phone':'12345678','email':'test2xx@ezpartorder.com'}
        const store = mockStore({}, expectedActions, done)
        store.dispatch(actions.fetchUpdateGarage(garage))
    })

    it('creates FAILED_UPDATE_GARAGE when API replies 400+', (done)=>{
      //nock.disableNetConnect();
      //nock.enableNetConnect('127.0.0.1');
      nock('http://localhost')
        .post('/json/garage', {
          'garageId':2,'garageName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
            'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
            'phone':'12345678','email':'test2xx@ezpartorder.com'
        })
        .reply(400)
        let error = new Error(400)
        const expectedActions = [
          {
            type: types.REQUEST_UPDATE_GARAGE,
            garageId:'2'
          },
          {
            type: types.FAILED_UPDATE_GARAGE,
            error
          }
        ]
        let garage = {'garageId':2,'garageName':'Test Shop 2xx','address':'2xxst Avenue','city':'Montreal',
          'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
          'phone':'12345678','email':'test2xx@ezpartorder.com'}
        const store = mockStore({}, expectedActions, done)
        store.dispatch(actions.fetchUpdateGarage(garage))
    })

})
