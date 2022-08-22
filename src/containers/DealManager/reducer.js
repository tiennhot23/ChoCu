import {dealAction} from '../Deal/action'
import {userDealsAction} from './action'
import {userDealsState} from './state'

const userDealsReducer = (state = userDealsState, action) => {
  switch (action.type) {
    case userDealsAction.START_GET_SELL_DEALS:
      return {
        ...state,
        dataSellDeals: [],
        stateSellDeals: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case userDealsAction.STOP_GET_SELL_DEALS:
      return {
        ...state,
        dataSellDeals: action.dataSellDeals,
        stateSellDeals: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case userDealsAction.START_GET_BUY_DEALS:
      return {
        ...state,
        dataBuyDeals: [],
        stateBuyDeals: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case userDealsAction.STOP_GET_BUY_DEALS:
      return {
        ...state,
        dataBuyDeals: action.dataBuyDeals,
        stateBuyDeals: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case userDealsAction.START_ACTION: {
      return {
        ...state,
        isActionDone: false
      }
    }
    case userDealsAction.UPDATE_SELL_DEAL_STATE: {
      let newData = [...state.dataSellDeals]
      if (!action.isError) {
        const index = newData.findIndex(
          (e) => e.deal_id === action.deal?.deal_id
        )
        if (index > -1)
          newData[index] = {
            ...newData[index],
            deal_state: action.deal?.deal_state
          }
      }
      return {
        ...state,
        dataSellDeals: newData,
        stateSellDeals: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        },
        isActionDone: action.isError ? false : true
      }
    }
    case userDealsAction.UPDATE_BUY_DEAL_STATE: {
      let newData = [...state.dataBuyDeals]
      if (!action.isError) {
        const index = newData.findIndex(
          (e) => e.deal_id === action.deal?.deal_id
        )
        if (index > -1)
          newData[index] = {
            ...newData[index],
            deal_state: action.deal?.deal_state
          }
      }
      return {
        ...state,
        dataBuyDeals: newData,
        stateBuyDeals: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        },
        isActionDone: action.isError ? false : true
      }
    }
    case dealAction.STOP_RATE_DEAL:
      let newData = [...state.dataBuyDeals]
      if (!action.isError) {
        const index = newData.findIndex(
          (e) => e.deal_id === action.dataRating?.deal_id
        )
        if (index > -1)
          newData[index] = {
            ...newData[index],
            rate_numb: action.dataRating?.rate_numb,
            deal_state: 'done'
          }
      }
      return {
        ...state,
        dataBuyDeals: newData
      }
    default:
      return state
  }
}

export {userDealsReducer}
