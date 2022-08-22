import {dealAction} from './action'
import {dealState} from './state'

const dealReducer = (state = dealState, action) => {
  switch (action.type) {
    case dealAction.START_GET_DEAL:
      return {
        ...state,
        dataDeal: {},
        stateDeal: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case dealAction.STOP_GET_DEAL:
      return {
        ...state,
        dataDeal: action.dataDeal,
        stateDeal: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case dealAction.START_RATE_DEAL:
      return {
        ...state,
        dataRating: {},
        stateRating: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case dealAction.STOP_RATE_DEAL:
      return {
        ...state,
        dataDeal: {
          ...state.dataDeal,
          deal: {...state.dataDeal?.deal, deal_state: 'done'},
          rating: action.dataRating
        },
        dataRating: action.dataRating,
        stateRating: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    default:
      return state
  }
}

export {dealReducer}
