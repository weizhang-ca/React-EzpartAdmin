import expect from 'expect'
import garageReducer from '../reducers/garageReducer'
import * as types from '../constants/ActionTypes'

describe('garage reducer', () => {
  it('should return the initial state', () => {
    expect(
      garageReducer(undefined, {})
    ).toEqual(
      {
        garageList:[],
        isFetchingGarageList:false,
        isUpdatingGarage:false,
        failedFetchGarageList:false,
        failedUpdateGarage: false
      }
    )
  })

  it('should handle REQUEST_GARAGE_LIST', () => {
    expect(
      garageReducer({}, {
        type: types.REQUEST_GARAGE_LIST
      })
    ).toEqual(
        {
          isFetchingGarageList:true
        }
    )

    expect(
      garageReducer(
        {isFetchingGarageList:false},
        {
          type: types.REQUEST_GARAGE_LIST
        }
        )
    ).toEqual(
      {isFetchingGarageList:true}
    )
  })

  it('should handle RECEIVE_GARAGE_LIST', ()=>{
    expect(
      garageReducer(
        {garageList:[],isFetchingGarageList:true},
        {
          type: types.RECEIVE_GARAGE_LIST,
          garageList:[{'garageId':1,'garageName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                        'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                        'phone':'12345678','email':'test1@ezpartorder.com'}]
        }
      )
    ).toEqual(
      {
        garageList:[{'garageId':1,'garageName':'Test Shop 1','address':'1st Avenue','city':'Montreal',
                      'region':'Quebec','country':'Canada','masterId':1,'master':'Advantage',
                      'phone':'12345678','email':'test1@ezpartorder.com'}],
        isFetchingGarageList:false
      }
    )
  })

  it('should handle FAILED_FETCH_GARAGE_LIST', ()=>{
    let error = new Error(400)
    expect(
      garageReducer(
        {
          isFetchingGarageList:true
        },
        {
          type: types.FAILED_FETCH_GARAGE_LIST,
          error
        }
    )
  ).toEqual({
    isFetchingGarageList: false,
    failedFetchGarageList: true,
    error
  })
  })
  it('should handle REQUEST_UPDATE_GARAGE', ()=>{
    expect(
      garageReducer(
        {isUpdatingGarage:false},
        {type:types.REQUEST_UPDATE_GARAGE, garageId:1}
      )
    ).toEqual({
      isUpdatingGarage:true, updatingGarageId:1
    })
  })

  it('should handle RECEIVE_UPDATE_GARAGE', ()=>{
    expect(
      garageReducer(
        {isUpdatingGarage:true, updatingGarageId:'2'},
        {type:types.RECEIVE_UPDATE_GARAGE}
      )
    ).toEqual({
      isUpdatingGarage:false, updatingGarageId:'2'
    })
  })

  it('should handle FAILED_UPDATE_GARAGE', ()=>{
    let error = new Error(400)
    expect(
      garageReducer(
        {
          isUpdatingGarage:true,
          updatingGarageId: 2
        },
        {
          type: types.FAILED_UPDATE_GARAGE,
          error
        }
      )
    ).toEqual({
      isUpdatingGarage:false,
      failedUpdateGarage: true,
      error,
      updatingGarageId: 2
    })
  })
})
