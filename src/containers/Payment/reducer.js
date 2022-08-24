import {paymentsAction} from './action'
import {paymentsState} from './state'

const paymentsReducer = (state = paymentsState, action) => {
  switch (action.type) {
    case paymentsAction.START_GET_LIST_PAYMENTS:
      return {
        ...state,
        dataPayments: [],
        statePayments: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case paymentsAction.STOP_GET_LIST_PAYMENTS:
      return {
        ...state,
        dataPayments: action.dataPayments,
        statePayments: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case paymentsAction.START_GET_LIST_USER_PAYMENTS:
      return {
        ...state,
        dataUserPayments: [],
        stateUserPayments: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case paymentsAction.STOP_GET_LIST_USER_PAYMENTS:
      return {
        ...state,
        dataUserPayments: action.dataUserPayments,
        stateUserPayments: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case paymentsAction.START_ACTION_USER_PAYMENT:
      return {
        ...state,
        stateUserPayments: {
          ...state.stateUserPayments,
          isActioning: true,
          isActionDone: false
        }
      }
    case paymentsAction.STOP_ACTION_USER_PAYMENT:
      return {
        ...state,
        stateUserPayments: {
          isActioning: false,
          isActionDone: action.isError ? false : true,
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

export {paymentsReducer}
