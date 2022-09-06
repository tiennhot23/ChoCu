import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {
  API_REQUEST_ADMIN_ALL_USERS,
  API_REQUEST_LOCK_ACCOUNT,
  API_REQUEST_UNLOCK_ACCOUNT
} from 'src/constants/api'

const START_REQUEST_USERS = 'START_REQUEST_USERS'
const STOP_REQUEST_USERS = 'STOP_REQUEST_USERS'
const START_REQUEST_LOCK_ACCOUNT = 'START_REQUEST_LOCK_ACCOUNT'
const STOP_REQUEST_LOCK_ACCOUNT = 'STOP_REQUEST_LOCK_ACCOUNT'

export const adminAccountManagerAction = {
  START_REQUEST_LOCK_ACCOUNT,
  STOP_REQUEST_LOCK_ACCOUNT,
  START_REQUEST_USERS,
  STOP_REQUEST_USERS
}

export const requestAllUsers = () => async (dispatch, getState) => {
  dispatch(startRequestUser())
  apiBase(API_REQUEST_ADMIN_ALL_USERS, METHOD_GET)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        dispatch(stopRequestUser({usersData: response.data}))
      } else {
        dispatch(stopRequestUser({usersData: [], message: response.message}))
      }
    })
    .catch((err) => {
      dispatch(
        stopRequestUser({
          usersData: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestLockAccount =
  ({username, reason}) =>
  async (dispatch, getState) => {
    const body = {
      reason
    }
    dispatch(startRequest())
    apiBase(API_REQUEST_LOCK_ACCOUNT + `/${username}`, METHOD_POST, body)
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          dispatch(stopRequest({accountData: data[0], isActionDone: true}))
        } else {
          dispatch(stopRequest({accountData: {}, message: response.message}))
        }
      })
      .catch((err) => {
        dispatch(
          stopRequest({
            accountData: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestUnlockAccount =
  ({username}) =>
  async (dispatch, getState) => {
    dispatch(startRequest())
    apiBase(API_REQUEST_UNLOCK_ACCOUNT + `/${username}`, METHOD_POST)
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          dispatch(stopRequest({accountData: data[0], isActionDone: true}))
        } else {
          dispatch(stopRequest({accountData: {}, message: response.message}))
        }
      })
      .catch((err) => {
        dispatch(
          stopRequest({
            accountData: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startRequest = () => {
  return {
    type: START_REQUEST_LOCK_ACCOUNT
  }
}

export const stopRequest = ({
  accountData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_LOCK_ACCOUNT,
    accountData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}

export const startRequestUser = () => {
  return {
    type: START_REQUEST_USERS
  }
}

export const stopRequestUser = ({
  usersData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_USERS,
    usersData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}
