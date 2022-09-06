import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {
  API_REQUEST_SELL_DEALS,
  API_REQUEST_BUY_DEALS,
  API_REQUEST_UPDATE_DEAL_STATE
} from 'src/constants/api'

const START_GET_SELL_DEALS = 'START_GET_SELL_DEALS'
const STOP_GET_SELL_DEALS = 'STOP_GET_SELL_DEALS'
const START_GET_BUY_DEALS = 'START_GET_BUY_DEALS'
const STOP_GET_BUY_DEALS = 'STOP_GET_BUY_DEALS'
const UPDATE_SELL_DEAL_STATE = 'UPDATE_SELL_DEAL_STATE'
const UPDATE_BUY_DEAL_STATE = 'UPDATE_BUY_DEAL_STATE'
const START_ACTION = 'START_ACTION'

export const userDealsAction = {
  START_GET_SELL_DEALS,
  STOP_GET_SELL_DEALS,
  START_GET_BUY_DEALS,
  STOP_GET_BUY_DEALS,
  UPDATE_SELL_DEAL_STATE,
  UPDATE_BUY_DEAL_STATE,
  START_ACTION
}

export const requestSellDeals = () => (dispatch, getState) => {
  dispatch(startGetSellDeals())
  apiBase(API_REQUEST_SELL_DEALS, METHOD_GET)
    .then((res) => {
      const {data} = res
      if (helper.isNonEmptyArray(data)) {
        dispatch(stopGetSellDeals({dataSellDeals: data}))
      } else {
        dispatch(
          stopGetSellDeals({
            dataSellDeals: [],
            message: res.message || '',
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopGetSellDeals({
          dataSellDeals: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestBuyDeals = () => (dispatch, getState) => {
  dispatch(startGetBuyDeals())
  apiBase(API_REQUEST_BUY_DEALS, METHOD_GET)
    .then((res) => {
      const {data} = res
      if (helper.isNonEmptyArray(data)) {
        dispatch(stopGetBuyDeals({dataBuyDeals: data}))
      } else {
        dispatch(
          stopGetBuyDeals({
            dataBuyDeals: [],
            message: res.message || '',
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopGetBuyDeals({
          dataBuyDeals: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestCancelDeal =
  ({deal_id, isBuyer}) =>
  (dispatch, getState) => {
    const body = {
      deal_state: 'canceled'
    }
    dispatch(startAction())
    apiBase(API_REQUEST_UPDATE_DEAL_STATE + `/${deal_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          if (isBuyer)
            dispatch(
              updateBuyDealState({deal: data[0], message: message || ''})
            )
          else
            dispatch(
              updateSellDealState({deal: data[0], message: message || ''})
            )
        } else {
          if (isBuyer)
            dispatch(
              updateBuyDealState({
                deal: {},
                message: message || '',
                isEmpty: true,
                isError: true
              })
            )
          else
            dispatch(
              updateSellDealState({
                deal: {},
                message: message || '',
                isEmpty: true,
                isError: true
              })
            )
        }
      })
      .catch((err) => {
        if (isBuyer)
          dispatch(
            updateBuyDealState({
              deal: {},
              isEmpty: true,
              message: err.message,
              isError: true
            })
          )
        else
          dispatch(
            updateSellDealState({
              deal: {},
              isEmpty: true,
              message: err.message,
              isError: true
            })
          )
      })
  }

export const requestDenyDeal =
  ({deal_id}) =>
  (dispatch, getState) => {
    const body = {
      deal_state: 'denied'
    }
    dispatch(startAction())
    apiBase(API_REQUEST_UPDATE_DEAL_STATE + `/${deal_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          dispatch(updateBuyDealState({deal: data[0], message: message || ''}))
        } else {
          dispatch(
            updateBuyDealState({
              deal: {},
              message: message || '',
              isEmpty: true,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          updateBuyDealState({
            deal: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestConfirmedDeal =
  ({deal_id}) =>
  (dispatch, getState) => {
    const body = {
      deal_state: 'confirmed'
    }
    dispatch(startAction())
    apiBase(API_REQUEST_UPDATE_DEAL_STATE + `/${deal_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200)
          dispatch(updateSellDealState({deal: data[0], message: message || ''}))
        else
          dispatch(
            updateSellDealState({
              deal: {},
              message: message || '',
              isEmpty: true,
              isError: true
            })
          )
      })
      .catch((err) => {
        dispatch(
          updateSellDealState({
            deal: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestPaidDeal =
  ({deal_id}) =>
  (dispatch, getState) => {
    const body = {
      deal_state: 'paid'
    }
    dispatch(startAction())
    apiBase(API_REQUEST_UPDATE_DEAL_STATE + `/${deal_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200)
          dispatch(updateBuyDealState({deal: data[0], message: message || ''}))
        else
          dispatch(
            updateBuyDealState({
              deal: {},
              isEmpty: true,
              message: message || '',
              isError: true
            })
          )
      })
      .catch((err) => {
        dispatch(
          updateBuyDealState({
            deal: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestSendingDeal =
  ({deal_id}) =>
  (dispatch, getState) => {
    const body = {
      deal_state: 'delivering'
    }
    dispatch(startAction())
    apiBase(API_REQUEST_UPDATE_DEAL_STATE + `/${deal_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200)
          dispatch(updateSellDealState({deal: data[0], message: message || ''}))
        else
          dispatch(
            updateSellDealState({
              deal: {},
              isEmpty: true,
              message: message || '',
              isError: true
            })
          )
      })
      .catch((err) => {
        dispatch(
          updateSellDealState({
            deal: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestReceivedDeal =
  ({deal_id}) =>
  (dispatch, getState) => {
    const body = {
      deal_state: 'delivered'
    }
    dispatch(startAction())
    apiBase(API_REQUEST_UPDATE_DEAL_STATE + `/${deal_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200)
          dispatch(updateBuyDealState({deal: data[0], message: message || ''}))
        else
          dispatch(
            updateBuyDealState({
              deal: {},
              isEmpty: true,
              message: message || '',
              isError: true
            })
          )
      })
      .catch((err) => {
        dispatch(
          updateBuyDealState({
            deal: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const updateSellDealState = ({
  deal,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: UPDATE_SELL_DEAL_STATE,
    deal,
    isEmpty,
    message,
    isError
  }
}

export const updateBuyDealState = ({
  deal,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: UPDATE_BUY_DEAL_STATE,
    deal,
    isEmpty,
    message,
    isError
  }
}

export const startAction = () => {
  return {
    type: START_ACTION
  }
}

export const startGetSellDeals = () => {
  return {
    type: START_GET_SELL_DEALS
  }
}

export const stopGetSellDeals = ({
  dataSellDeals,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_SELL_DEALS,
    dataSellDeals,
    isEmpty,
    message,
    isError
  }
}

export const startGetBuyDeals = () => {
  return {
    type: START_GET_BUY_DEALS
  }
}

export const stopGetBuyDeals = ({
  dataBuyDeals,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_BUY_DEALS,
    dataBuyDeals,
    isEmpty,
    message,
    isError
  }
}
