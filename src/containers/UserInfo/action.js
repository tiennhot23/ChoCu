import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {
  API_LOGOUT,
  API_REQUEST_UPDATE_USER_INFO,
  API_REQUEST_USER_DATA,
  API_REQUEST_USER_POSTS
} from 'src/constants/api'

const START_REQUEST_USER_DATA = 'START_REQUEST_USER_DATA'
const STOP_REQUEST_USER_DATA = 'STOP_REQUEST_USER_DATA'
const START_REQUEST_USER_POSTS = 'START_REQUEST_USER_POSTS'
const STOP_REQUEST_USER_POSTS = 'STOP_REQUEST_USER_POSTS'
export const userInfoAction = {
  START_REQUEST_USER_DATA,
  STOP_REQUEST_USER_DATA,
  START_REQUEST_USER_POSTS,
  STOP_REQUEST_USER_POSTS
}

export const requestUserInfo =
  ({user_id}) =>
  async (dispatch, getState) => {
    dispatch(startRequestUserInfo())
    apiBase(API_REQUEST_USER_DATA + `/${user_id}`, METHOD_GET)
      .then(async (response) => {
        if (helper.isNonEmptyArray(response.data)) {
          const userData = response.data[0]
          if (helper.isValidObject(userData)) {
            dispatch(
              stopRequestUserInfo({
                userData: userData
              })
            )
          }
        } else {
          dispatch(
            stopRequestUserInfo({
              userData: {},
              isEmpty: true,
              message: response.message,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestUserInfo({
            userData: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestUserPosts =
  ({user_id}) =>
  async (dispatch, getState) => {
    dispatch(startRequestUserPosts())
    apiBase(API_REQUEST_USER_POSTS + `/${user_id}`, METHOD_GET)
      .then(async (response) => {
        if (helper.isNonEmptyArray(response.data)) {
          const userPosts = response.data
          if (helper.isNonEmptyArray(userPosts)) {
            dispatch(
              stopRequestUserPosts({
                userPosts: userPosts
              })
            )
          }
        } else {
          dispatch(
            stopRequestUserPosts({
              userPosts: [],
              isEmpty: true,
              message: response.message,
              isError: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopRequestUserPosts({
            userPosts: [],
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startRequestUserInfo = () => {
  return {
    type: START_REQUEST_USER_DATA
  }
}

export const stopRequestUserInfo = ({
  userData,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_USER_DATA,
    userData,
    isEmpty,
    message,
    isError
  }
}

export const startRequestUserPosts = () => {
  return {
    type: START_REQUEST_USER_POSTS
  }
}

export const stopRequestUserPosts = ({
  userPosts,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_USER_POSTS,
    userPosts,
    isEmpty,
    message,
    isError
  }
}
