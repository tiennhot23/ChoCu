import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {
  API_CREATE_ACCOUNT,
  API_FORGOT_PASSWORD,
  API_REQUEST_GET_OTP,
  API_REQUEST_VERIFY_OTP
} from 'src/constants/api'

const START_GET_OTP_CODE = 'START_GET_OTP_CODE'
const STOP_GET_OTP_CODE = 'STOP_GET_OTP_CODE'
const START_VERIFY_OTP = 'START_VERIFY_OTP'
const STOP_VERIFY_OTP = 'STOP_VERIFY_OTP'
const START_ACTION = 'START_ACTION'
const STOP_ACTION = 'STOP_ACTION'

export const otpAction = {
  START_GET_OTP_CODE,
  STOP_GET_OTP_CODE,
  START_VERIFY_OTP,
  STOP_VERIFY_OTP,
  START_ACTION,
  STOP_ACTION
}

export const requestGetOTP =
  ({phone}) =>
  (dispatch, getState) => {
    const body = {phone}
    console.log(body)
    dispatch(startGetOTP())
    apiBase(API_REQUEST_GET_OTP, METHOD_POST, body)
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data)) {
          dispatch(stopGetOTP({dataOtp: data[0]}))
        } else {
          dispatch(
            stopGetOTP({
              dataOtp: {},
              message: res.message || '',
              isEmpty: true,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopGetOTP({
            dataOtp: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestVerifyOTP =
  ({otp_code}) =>
  (dispatch, getState) => {
    const phone = getState().otpReducer.dataOtp.phone
    const body = {phone, otp_code}
    dispatch(startVerifyOTP())
    apiBase(API_REQUEST_VERIFY_OTP, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          dispatch(stopVerifyOTP({dataOtp: data[0], message: message}))
        } else {
          dispatch(
            stopVerifyOTP({
              dataOtp: {},
              message: message || '',
              isEmpty: true,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopVerifyOTP({
            dataOtp: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestActionForgotPassword =
  ({password}) =>
  (dispatch, getState) => {
    const phone = getState().otpReducer.dataOtp.phone
    const verify_code = getState().otpReducer.dataOtp.verify_code
    const body = {password, phone, verify_code}
    dispatch(startAction())
    apiBase(API_FORGOT_PASSWORD, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          dispatch(stopAction({isDone: true, message}))
        } else {
          dispatch(
            stopAction({
              isDone: false,
              message: message || '',
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopAction({
            isDone: false,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestActionCreateAccount =
  ({password}) =>
  (dispatch, getState) => {
    const phone = getState().otpReducer.dataOtp.phone
    const verify_code = getState().otpReducer.dataOtp.verify_code
    const body = {password, phone, verify_code}
    dispatch(startAction())
    apiBase(API_CREATE_ACCOUNT, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          dispatch(stopAction({isDone: true, message}))
        } else {
          dispatch(
            stopAction({
              isDone: false,
              message: message || '',
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopAction({
            isDone: false,
            message: err.message,
            isError: true
          })
        )
      })
  }

const startGetOTP = () => {
  return {
    type: START_GET_OTP_CODE
  }
}

export const stopGetOTP = ({
  dataOtp,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_OTP_CODE,
    dataOtp,
    isEmpty,
    message,
    isError
  }
}

const startVerifyOTP = () => {
  return {
    type: START_VERIFY_OTP
  }
}

export const stopVerifyOTP = ({
  dataOtp,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_OTP_CODE,
    dataOtp,
    isEmpty,
    message,
    isError
  }
}

const startAction = () => {
  return {
    type: START_ACTION
  }
}

export const stopAction = ({isDone = false, message = '', isError = false}) => {
  return {
    type: STOP_ACTION,
    isDone,
    message,
    isError
  }
}
