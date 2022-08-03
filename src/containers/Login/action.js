import {helper} from '@common'
import {API_CONST} from '@constants'
import {apiBase, METHOD_POST} from 'src/common/api'
import {subscribeNotify} from 'src/common/notify'
import {setItem} from 'src/common/storage'
import {ACCESS_TOKEN} from 'src/constants/storage'

const {API_REQUEST_AUTH_TOKEN} = API_CONST

const START_REQUEST_AUTH_TOKEN = 'START_REQUEST_AUTH_TOKEN'
const STOP_REQUEST_AUTH_TOKEN = 'STOP_REQUEST_AUTH_TOKEN'

export const loginAction = {
  START_REQUEST_AUTH_TOKEN,
  STOP_REQUEST_AUTH_TOKEN
}

export const requestAuthToken =
  ({username, password}) =>
  (dispatch, getState) => {
    const body = {username, password}
    dispatch(startRequestAuthToken())
    apiBase(API_REQUEST_AUTH_TOKEN, METHOD_POST, body)
      .then(async (response) => {
        if (response.data.length === 0)
          dispatch(
            stopRequestAuthToken({message: response.message, isError: true})
          )
        else {
          const {access_token} = response.data[0]
          if (helper.isNonEmptyString(access_token)) {
            await setItem(ACCESS_TOKEN, access_token)
            subscribeNotify()
            dispatch(stopRequestAuthToken({message: '', isError: false}))
          } else {
            dispatch(
              stopRequestAuthToken({
                message: 'Authentication failed',
                isError: true
              })
            )
          }
        }
      })
      .catch((err) =>
        dispatch(
          stopRequestAuthToken({
            message: err.message,
            isError: true
          })
        )
      )
  }

const startRequestAuthToken = () => {
  return {
    type: START_REQUEST_AUTH_TOKEN
  }
}

const stopRequestAuthToken = ({message, isError}) => {
  return {
    type: STOP_REQUEST_AUTH_TOKEN,
    message: message,
    isError: isError
  }
}
