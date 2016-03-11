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
          let orderId = 2
          let error = new Error(400)
          console.log(error)
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
})
