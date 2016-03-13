import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/ezpartActions'
import * as types from '../constants/ActionTypes'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async part operations', ()=>{
  afterEach(() => {
    nock.cleanAll()
  })

  it('create RECEIVE_PART_LIST when fetch part list is done', (done)=>{
      nock('http://localhost')
        .get('/json/parts')
        .reply(200, [
          {
            partId:1, partName:'Test Part 1', partNumber:'123456', partList:50.00,
            partNet: 45.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
            dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
            partStatus:'Returned'
          },
          {
            partId:2, partName:'Test Part 2', partNumber:'5632123', partList:150.00,
            partNet: 125.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
            dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'',
            partStatus:'Receive'
          }
        ])
        let orderId = 2
        const expectedActions = [
          {type: types.REQUEST_PART_LIST, orderId},
          {
            type: types.RECEIVE_PART_LIST,
            partList: [
              {
                partId:1, partName:'Test Part 1', partNumber:'123456', partList:50.00,
                partNet: 45.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
                dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
                partStatus:'Returned'
              },
              {
                partId:2, partName:'Test Part 2', partNumber:'5632123', partList:150.00,
                partNet: 125.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
                dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'',
                partStatus:'Receive'
              }
            ]
          }
        ]
        const store = mockStore({}, expectedActions, done)
        store.dispatch(actions.fetchPartList(orderId))
  })

    it('create FAILED_FETCH_PART_LIST when something wrong with API of fetching part', (done)=>{
        nock('http://localhost')
          .get('/json/parts')
          .reply(400)
          var orderId = 2
          let error = new Error(400)
          const expectedActions = [
            {type: types.REQUEST_PART_LIST, orderId},
            {
              type: types.FAILED_FETCH_PART_LIST,
              error
            }
          ]
          const store = mockStore({}, expectedActions, done)
          store.dispatch(actions.fetchPartList(orderId))
    })

    it('create RECEIVE_UPDATE_PART when update part succeed', (done)=>{
      let part = {
        partId:1, partName:'Test Part 1', partNumber:'123456', partList:50.00,
        partNet: 45.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
        dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
        partStatus:'Returned'
      }
      nock('http://localhost')
        .intercept('/json/parts', 'PUT', part)
        .reply(201, {isSuccess:true, info:'success'})
      const expectedActions = [
        {
          type: types.REQUEST_UPDATE_PART,
          partId: part.partId
        },
        {
          type: types.RECEIVE_UPDATE_PART,
          part,
          isSuccess: true,
          info: 'success'
        }
      ]
      const store = mockStore({}, expectedActions, done)
      store.dispatch(actions.updatePart(part))
    })

    it('create RECEIVE_UPDATE_PART when update part fails due to violation of constraints', (done)=>{
      let part = {
        partId:1, partName:'Test Part 1', partNumber:'123456', partList:50.00,
        partNet: 55.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
        dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
        partStatus:'Returned'
      }
      nock('http://localhost')
        .intercept('/json/parts', 'PUT', part)
        .reply(201, {isSuccess: false, info:'net price must not be greater than list price'})

      const expectedActions = [
        {
          type: types.REQUEST_UPDATE_PART,
          partId: part.partId
        },
        {
          type: types. RECEIVE_UPDATE_PART,
          isSuccess: false,
          info: 'net price must not be greater than list price',
          part
        }
      ]
      const store = mockStore({}, expectedActions, done)
      store.dispatch(actions.updatePart(part))
    })

    it('create FAILED_UPDATE_PART when API replies 400+', (done)=>{
      let part = {
        partId:1, partName:'Test Part 1', partNumber:'123456', partList:50.00,
        partNet: 55.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
        dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
        partStatus:'Returned'
      }
      nock('http://localhost')
        .intercept('/json/parts', 'PUT', part)
        .reply(400)
      let error = new Error(400)
      const expectedActions = [
        {
          type: types.REQUEST_UPDATE_PART,
          partId: part.partId
        },
        {
          type: types.FAILED_UPDATE_PART,
          error
        }
      ]
      const store = mockStore({}, expectedActions, done)
      store.dispatch(actions.updatePart(part))
    })
})
