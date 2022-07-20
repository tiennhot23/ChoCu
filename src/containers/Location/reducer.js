import {locationState} from './state'
import {locationAction} from './action'

const locationReducer = function (state = locationState, action) {
  switch (action.type) {
    case locationAction.GET_DATA_PROVINCES:
      return {
        ...state,
        provinces: action.provinces,
        districts: [],
        wards: []
      }
    case locationAction.GET_DATA_DISTRICTS:
      return {
        ...state,
        districts: action.districts,
        wards: []
      }
    case locationAction.GET_DATA_WARDS:
      return {
        ...state,
        wards: action.wards
      }
    default:
      return state
  }
}

export {locationReducer}
