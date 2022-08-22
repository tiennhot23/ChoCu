import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {API_REQUEST_LOCK_ACCOUNT} from 'src/constants/api'

const START_REQUEST_LOCK_ACCOUNT = 'START_REQUEST_LOCK_ACCOUNT'
const STOP_REQUEST_LOCK_ACCOUNT = 'STOP_REQUEST_LOCK_ACCOUNT'

export const adminAccountManagerAction = {
  START_REQUEST_LOCK_ACCOUNT,
  STOP_REQUEST_LOCK_ACCOUNT
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
