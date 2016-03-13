import expect from 'expect'
import partReducer from '../reducers/partReducer'
import * as types from '../constants/ActionTypes'

describe('part reducer', ()=>{
  it('should handle init state', ()=>{
    expect(
      partReducer(
        undefined,
        {}
      )
    ).toEqual({
      partList:[], isFetchingPartList:false, isUpdatingPart:false, failedUpdatePart:false,  failedFetchPartList:false
    })
  })
  it('should handle REQUEST_PART_LIST', ()=>{
    expect(
      partReducer(
        {isFetchingPartList:false},
        {type: types.REQUEST_PART_LIST}
      )
    ).toEqual({isFetchingPartList:true})
  })
  it('should handle RECEIVE_PART_LIST', ()=>{
    let partList = [
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
    expect(
      partReducer(
        {isFetchingPartList: true},
        {type: types.RECEIVE_PART_LIST, partList}
      )
    ).toEqual({isFetchingPartList:false, partList})
  })

  it('should handle FAILED_FETCH_PART_LIST', ()=>{
    let error = new Error(400)
    expect(
      partReducer(
        {isFetchingPartList:true},
        {
          type: types.FAILED_FETCH_PART_LIST,
          error
        }
      )
    ).toEqual({
      isFetchingPartList: false,  failedFetchPartList:true, error
    })
  })

  it('should handle REQUEST_UPDATE_PART', ()=>{
    let part = {
      partId:1, partName:'Test Part 1', partNumber:'123456', partList:50.00,
      partNet: 45.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
      dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
      partStatus:'Returned'
    }
    expect(
      partReducer(
        {isUpdatingPart:false},
        {
          type: types.REQUEST_UPDATE_PART,
          partId:part.partId
        }
      )
    ).toEqual({
      isUpdatingPart:true, updatingPartId: part.partId
    })
  })

  it('should handle RECEIVE_UPDATE_PART when update part succeeds', ()=>{
    let partList = [
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
    let part = {
      partId:1, partName:'Test Part 1X', partNumber:'123456', partList:50.00,
      partNet: 45.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
      dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
      partStatus:'Returned'
    }
    expect(
      partReducer(
        {isUpdatingPart:true, updatingPartId:2, partList},
        {
          type: types.RECEIVE_UPDATE_PART,
          isSuccess: true,
          info: 'success',
          part
        }
      )
    ).toEqual({
      isUpdatingPart:false, updatingPartId:2, isSuccess:true, info:'success',
      partList: [
        {
          partId:1, partName:'Test Part 1X', partNumber:'123456', partList:50.00,
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
    })
  })
  it('should handle RECEIVE_UPDATE_PART when update part fails due to violation of constraints', ()=>{
    let partList = [
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
    let part = {
      partId:1, partName:'Test Part 1X', partNumber:'123456', partList:50.00,
      partNet: 45.00, partType:'OEM', dateOrder:'2016-01-01', dateBo:'2016-01-01',
      dateShip:'2016-01-02', dateReceive:'2016-01-03', dateReturn:'2016-01-10',
      partStatus:'Returned'
    }
    expect(
      partReducer(
        {isUpdatingPart:true, updatingPartId:2, partList},
        {
          type: types.RECEIVE_UPDATE_PART,
          isSuccess: false,
          info: 'net price must not be greater than list price',
          part
        }
      )
    ).toEqual({
      isUpdatingPart:false, updatingPartId:2, isSuccess:false, info:'net price must not be greater than list price',
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
    })
  })

  it('should handle FAILED_UPDATE_PART', ()=>{
    let error = new Error(400)
    expect(
      partReducer(
        {isUpdatingPart:true, updatingPartId:2},
        {
          type: types.FAILED_UPDATE_PART,
          error
        }
      )
    ).toEqual({
      isUpdatingPart:false, updatingPartId:2, failedUpdatePart:true, error
    })
  })
})
