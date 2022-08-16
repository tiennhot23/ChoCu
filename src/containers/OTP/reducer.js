import {otpState} from './state'
import {otpAction} from './action'

const otpReducer = (state = otpState, action) => {
  switch (action.type) {
    case otpAction.START_GET_OTP_CODE:
      return {
        ...state,
        dataOtp: {},
        stateAction: {
          isDone: false,
          message: '',
          isError: false
        },
        stateOtp: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case otpAction.STOP_GET_OTP_CODE:
      return {
        ...state,
        dataOtp: action.dataOtp,
        stateAction: {
          isDone: false,
          message: '',
          isError: false
        },
        stateOtp: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case otpAction.START_VERIFY_OTP:
      return {
        ...state,
        stateAction: {
          isDone: false,
          message: '',
          isError: false
        },
        stateOtp: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case otpAction.STOP_VERIFY_OTP:
      return {
        ...state,
        dataOtp: {...state.dataOtp, ...action.dataOtp},
        stateAction: {
          isDone: false,
          message: '',
          isError: false
        },
        stateOtp: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case otpAction.START_ACTION:
      return {
        ...state,
        stateAction: {
          isFetching: true,
          isDone: false,
          message: '',
          isError: false
        }
      }
    case otpAction.STOP_ACTION:
      return {
        ...state,
        dataOtp: action.isDone ? {} : state.dataOtp,
        stateAction: {
          isFetching: false,
          isDone: action.isDone,
          message: action.message,
          isError: action.isError
        }
      }
    default:
      return state
  }
}

export {otpReducer}
