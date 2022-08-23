import {helper, storageHelper} from '@common'
import {STORAGE_CONST} from '@constants'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {getItem} from 'src/common/storage'
import {
  API_REQUEST_ADD_USER_PAYMENTS,
  API_REQUEST_PAYMENTS,
  API_REQUEST_REMOVE_USER_PAYMENTS,
  API_REQUEST_USER_PAYMENTS
} from 'src/constants/api'

const START_GET_LIST_PAYMENTS = 'START_GET_LIST_PAYMENTS'
const STOP_GET_LIST_PAYMENTS = 'STOP_GET_LIST_PAYMENTS'
const START_GET_LIST_USER_PAYMENTS = 'START_GET_LIST_USER_PAYMENTS'
const STOP_GET_LIST_USER_PAYMENTS = 'STOP_GET_LIST_USER_PAYMENTS'
const START_ACTION_USER_PAYMENT = 'START_ACTION_USER_PAYMENT'
const STOP_ACTION_USER_PAYMENT = 'STOP_ACTION_USER_PAYMENT'

export const paymentsAction = {
  START_GET_LIST_PAYMENTS,
  STOP_GET_LIST_PAYMENTS,
  START_GET_LIST_USER_PAYMENTS,
  STOP_GET_LIST_USER_PAYMENTS,
  START_ACTION_USER_PAYMENT,
  STOP_ACTION_USER_PAYMENT
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

export const linkPayment =
  ({payment_id, user_payment_info}) =>
  (dispatch, getState) => {
    dispatch(startActionUserPayments())
    apiBase(API_REQUEST_ADD_USER_PAYMENTS, METHOD_POST, {
      payment_id,
      user_payment_info
    })
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data)) {
          dispatch(stopActionUserPayements({data: data[0], isActionDone: true}))
        } else {
          dispatch(
            stopActionUserPayements({
              data: {},
              message: res.message || '',
              isEmpty: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopActionUserPayements({
            data: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const unlinkPayment =
  ({payment_id}) =>
  (dispatch, getState) => {
    dispatch(startActionUserPayments())
    apiBase(API_REQUEST_REMOVE_USER_PAYMENTS, METHOD_POST, {payment_id})
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data)) {
          dispatch(stopActionUserPayements({data: data[0], isActionDone: true}))
        } else {
          dispatch(
            stopActionUserPayements({
              data: {},
              message: res.message || '',
              isEmpty: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopActionUserPayements({
            data: {},
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

const startActionUserPayments = () => {
  return {
    type: START_ACTION_USER_PAYMENT
  }
}

const stopActionUserPayements = ({
  data,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_ACTION_USER_PAYMENT,
    data,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}
