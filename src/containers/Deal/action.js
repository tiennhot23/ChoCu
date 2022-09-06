import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {
  API_REQUEST_CREATE_DEAL,
  API_REQUEST_GET_DEAL,
  API_REQUEST_RATE_DEAL,
  API_REQUEST_GET_DEAL_RATING
} from 'src/constants/api'

const START_GET_DEAL = 'START_GET_DEAL'
const STOP_GET_DEAL = 'STOP_GET_DEAL'
const START_RATE_DEAL = 'START_RATE_DEAL'
const STOP_RATE_DEAL = 'STOP_RATE_DEAL'

export const dealAction = {
  START_GET_DEAL,
  STOP_GET_DEAL,
  START_RATE_DEAL,
  STOP_RATE_DEAL
}

export const requestGetDeal =
  ({deal_id}) =>
  (dispatch, getState) => {
    dispatch(startGetDeal())
    apiBase(API_REQUEST_GET_DEAL + `/${deal_id}`, METHOD_GET)
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data) && helper.isValidObject(data[0])) {
          dispatch(stopGetDeal({dataDeal: data[0]}))
        } else {
          dispatch(
            stopGetDeal({
              dataDeal: {},
              message: res.message || '',
              isEmpty: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopGetDeal({
            dataDeal: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestCreateDeal =
  ({deal}) =>
  (dispatch, getState) => {
    const body = {
      buyer_id: deal.buyer_id,
      post_id: deal.post_id,
      receive_address: deal.receive_address,
      deal_price: deal.deal_price,
      online_deal: deal.online_deal
    }
    dispatch(startGetDeal())
    apiBase(API_REQUEST_CREATE_DEAL + `/${deal.post_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          dispatch(stopGetDeal({dataDeal: data[0], message: message}))
        } else {
          dispatch(
            stopGetDeal({
              dataDeal: {},
              message: message || '',
              isEmpty: true,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopGetDeal({
            dataDeal: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestRateDeal =
  ({deal_id, rate_numb, rate_content}) =>
  (dispatch, getState) => {
    const body = {
      rate_numb,
      rate_content
    }
    dispatch(startRateDeal())
    apiBase(API_REQUEST_RATE_DEAL + `/${deal_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          dispatch(stopRateDeal({dataRating: data[0], message: message}))
        } else {
          dispatch(
            stopRateDeal({
              dataRating: {},
              message: message || '',
              isEmpty: true,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRateDeal({
            dataRating: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startGetDeal = () => {
  return {
    type: START_GET_DEAL
  }
}

export const stopGetDeal = ({
  dataDeal,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_DEAL,
    dataDeal,
    isEmpty,
    message,
    isError
  }
}

export const startRateDeal = () => {
  return {
    type: START_RATE_DEAL
  }
}

export const stopRateDeal = ({
  dataRating,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_RATE_DEAL,
    dataRating,
    isEmpty,
    message,
    isError
  }
}
