import {helper, storageHelper} from '@common'
import {STORAGE_CONST} from '@constants'
import {apiBase, METHOD_GET} from 'src/common/api'
import {getItem} from 'src/common/storage'
import {
  API_REQUEST_PAYMENTS,
  API_REQUEST_USER_PAYMENTS
} from 'src/constants/api'

const START_GET_LIST_PAYMENTS = 'START_GET_LIST_PAYMENTS'
const STOP_GET_LIST_PAYMENTS = 'STOP_GET_LIST_PAYMENTS'
const START_GET_LIST_USER_PAYMENTS = 'START_GET_LIST_USER_PAYMENTS'
const STOP_GET_LIST_USER_PAYMENTS = 'STOP_GET_LIST_USER_PAYMENTS'

export const paymentsAction = {
  START_GET_LIST_PAYMENTS,
  STOP_GET_LIST_PAYMENTS,
  START_GET_LIST_USER_PAYMENTS,
  STOP_GET_LIST_USER_PAYMENTS
}

export const requestPayments = () => (dispatch, getState) => {
  dispatch(startGetListPayments())
  apiBase(API_REQUEST_PAYMENTS, METHOD_GET)
    .then((res) => {
      const {data} = res
      if (helper.isNonEmptyArray(data)) {
        dispatch(stopGetListPayments({dataPayments: data}))
      } else {
        dispatch(
          stopGetListPayments({
            dataPayments: [],
            message: res.message || '',
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopGetListPayments({
          dataPayments: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestUserPayments =
  ({user_id}) =>
  (dispatch, getState) => {
    dispatch(startGetListUserPayments())
    apiBase(API_REQUEST_USER_PAYMENTS + `/${user_id}`, METHOD_GET)
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data)) {
          dispatch(stopGetListUserPayments({dataUserPayments: data}))
        } else {
          dispatch(
            stopGetListUserPayments({
              dataUserPayments: [],
              message: res.message || '',
              isEmpty: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopGetListUserPayments({
            dataUserPayments: [],
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

const startGetListPayments = () => {
  return {type: START_GET_LIST_PAYMENTS}
}

const stopGetListPayments = ({
  dataPayments,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_LIST_PAYMENTS,
    dataPayments,
    isEmpty,
    message,
    isError
  }
}

const startGetListUserPayments = () => {
  return {type: START_GET_LIST_USER_PAYMENTS}
}

const stopGetListUserPayments = ({
  dataUserPayments,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_LIST_USER_PAYMENTS,
    dataUserPayments,
    isEmpty,
    message,
    isError
  }
}
