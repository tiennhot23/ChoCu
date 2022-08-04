import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {getTokenNotification} from 'src/common/notify'
import {getItem, removeMulti, setItem} from 'src/common/storage'
import {API_LOGOUT, API_REQUEST_USER_DATA} from 'src/constants/api'
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  NOTIFY_TOKEN_FCM
} from 'src/constants/storage'

const SAVE_USER = 'SAVE_USER'
const REMOVE_USER = 'REMOVE_USER'
const REQUEST_USER_DATA = 'REQUEST_USER_DATA'
export const currentUserAction = {
  REQUEST_USER_DATA,
  SAVE_USER,
  REMOVE_USER
}

export const requestUserData = () => async (dispatch, getState) => {
  const user = await getItem(CURRENT_USER)
  if (user && helper.isNonEmptyString(user))
    dispatch(saveUser(JSON.parse(user)))
  else
    apiBase(API_REQUEST_USER_DATA, METHOD_GET).then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        const userData = response.data[0]
        if (helper.isValidObject(userData)) {
          await setItem(CURRENT_USER, JSON.stringify(userData))
          dispatch(saveUser(userData))
        }
      }
    })
}

export const requestLogoutUser = () => async (dispatch, getState) => {
  const fcm_token = await getTokenNotification()
  const body = {fcm_token}
  apiBase(API_LOGOUT, METHOD_POST, body).then(async (response) => {
    if (helper.isNonEmptyArray(response.data)) {
      dispatch(removeUser())
    }
  })
}

export const saveUser = (userData) => {
  return {
    type: SAVE_USER,
    userData
  }
}

export const removeUser = () => {
  removeMulti([CURRENT_USER, NOTIFY_TOKEN_FCM, ACCESS_TOKEN])
  return {
    type: REMOVE_USER
  }
}
