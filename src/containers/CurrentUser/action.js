import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {getTokenNotification} from 'src/common/notify'
import {getItem, removeMulti, setItem} from 'src/common/storage'
import {
  API_LOGOUT,
  API_LOGOUT_ADMIN,
  API_REQUEST_UPDATE_USER_INFO,
  API_REQUEST_USER_DATA
} from 'src/constants/api'
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  NOTIFICATIONS,
  NOTIFY_TOKEN_FCM
} from 'src/constants/storage'
import database from '@react-native-firebase/database'
import {clear_all_notify} from '../Notification/action'

const START_ACTION_USER_DATA = 'START_ACTION_USER_DATA'
const SAVE_USER = 'SAVE_USER'
const REMOVE_USER = 'REMOVE_USER'
const START_REQUEST_USER_DATA = 'START_REQUEST_USER_DATA'
export const currentUserAction = {
  START_REQUEST_USER_DATA,
  SAVE_USER,
  REMOVE_USER,
  START_ACTION_USER_DATA
}

export const requestUserData = () => async (dispatch, getState) => {
  // const user = await getItem(CURRENT_USER)
  // if (user && helper.isNonEmptyString(user))
  //   dispatch(
  //     saveUser({
  //       userData: JSON.parse(user)
  //     })
  //   )
  // else {
  dispatch(startRequest())
  apiBase(API_REQUEST_USER_DATA, METHOD_GET)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        const userData = response.data[0]
        if (helper.isValidObject(userData)) {
          await setItem(CURRENT_USER, JSON.stringify(userData))
          dispatch(
            saveUser({
              userData: userData
            })
          )
        }
      }
    })
    .catch((err) => {
      dispatch(
        saveUser({
          userData: {},
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
  // }
}

export const requestUpdateUserInfo =
  ({formData}) =>
  async (dispatch, getState) => {
    dispatch(startAction())
    apiBase(API_REQUEST_UPDATE_USER_INFO, METHOD_POST, formData, {
      contentType: CONTENT_TYPE_MULTIPART
    })
      .then(async (response) => {
        if (helper.isNonEmptyArray(response.data)) {
          const data = response.data[0]
          if (helper.isValidObject(data)) {
            let userData = getState().currentUserReducer.userData
            userData = {
              ...userData,
              ...data
            }
            await setItem(CURRENT_USER, JSON.stringify(userData))
            dispatch(
              saveUser({
                userData: userData
              })
            )
          }
        }
      })
      .catch((err) => {
        dispatch(
          saveUser({
            userData: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestLogoutUser = () => async (dispatch, getState) => {
  const fcm_token = await getTokenNotification()
  const body = {fcm_token}
  apiBase(API_LOGOUT, METHOD_POST, body)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        let user = await getItem(CURRENT_USER)
        user = JSON.parse(user)
        database()
          .ref(`/users/${user.user_id}`)
          .update({
            ...user,
            isOnline: false
          })
          .then((val) => console.log(val))
      }
    })
    .finally(() => {
      dispatch(removeUser())
      dispatch(clear_all_notify())
    })
}

export const requestLogoutAdmin = () => async (dispatch, getState) => {
  const fcm_token = await getTokenNotification()
  const body = {fcm_token}
  apiBase(API_LOGOUT_ADMIN, METHOD_POST, body).then(async (response) => {
    if (helper.isNonEmptyArray(response.data)) {
      let admin = await getItem(CURRENT_USER)
      admin = JSON.parse(admin)
      database()
        .ref(`/users/${admin.user_id}`)
        .update({
          ...admin,
          isOnline: false
        })
        .then((val) => console.log(val))
      dispatch(removeUser())
    }
  })
}

export const startRequest = () => {
  return {
    type: START_REQUEST_USER_DATA
  }
}

export const startAction = () => {
  return {
    type: START_ACTION_USER_DATA
  }
}

export const saveUser = ({
  userData,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: SAVE_USER,
    userData,
    isEmpty,
    message,
    isError
  }
}

export const removeUser = () => {
  removeMulti([CURRENT_USER, NOTIFY_TOKEN_FCM, ACCESS_TOKEN, NOTIFICATIONS])
  return {
    type: REMOVE_USER
  }
}
