import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {
  API_REQUEST_CREATE_POST,
  API_REQUEST_END_POST,
  API_REQUEST_POSTS,
  API_REQUEST_REPOST_POST
} from 'src/constants/api'

const START_GET_USER_POSTS = 'START_GET_USER_POSTS'
const STOP_GET_USER_POSTS = 'STOP_GET_USER_POSTS'
const UPDATE_POST = 'UPDATE_POST'
const START_ACTION_POST = 'START_ACTION_POST'
const STOP_ACTION_POST = 'STOP_ACTION_POST'

export const userPostsAction = {
  START_GET_USER_POSTS,
  STOP_GET_USER_POSTS,
  UPDATE_POST,
  START_ACTION_POST,
  STOP_ACTION_POST
}

export const requestUserPosts = () => (dispatch, getState) => {
  dispatch(startGetUserPosts())
  apiBase(API_REQUEST_POSTS, METHOD_GET)
    .then((res) => {
      const {data} = res
      if (helper.isNonEmptyArray(data)) {
        dispatch(stopGetUserPosts({userPosts: data}))
      } else {
        dispatch(
          stopGetUserPosts({
            userPosts: [],
            message: res.message || '',
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopGetPosts({
          userPosts: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const requestCreatePost =
  ({formData}) =>
  (dispatch, getState) => {
    let userPosts = [...getState().userPostsReducer.dataUserPosts]
    dispatch(startAcion())
    apiBase(API_REQUEST_CREATE_POST, METHOD_POST, formData, {
      contentType: CONTENT_TYPE_MULTIPART
    })
      .then((res) => {
        const {data} = res

        if (helper.isNonEmptyArray(data) && helper.isValidObject(data[0])) {
          userPosts.push(data[0])
          dispatch(stopAction({userPosts}))
        } else {
          dispatch(
            stopAction({
              userPosts: userPosts,
              message: res.message || '',
              isEmpty: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopAction({
            userPosts: userPosts,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestEndPost =
  ({post_id}) =>
  (dispatch, getState) => {
    const body = {}
    apiBase(API_REQUEST_END_POST + `/${post_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200)
          dispatch(updatePostState({post: data[0], message: message || ''}))
        else
          dispatch(
            updatePostState({
              post: {},
              isEmpty: true,
              message: message || '',
              isError: true
            })
          )
      })
      .catch((err) => {
        dispatch(
          updatePostState({
            post: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const requestRepostPost =
  ({post_id}) =>
  (dispatch, getState) => {
    const body = {}
    apiBase(API_REQUEST_REPOST_POST + `/${post_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200) {
          dispatch(updatePostState({post: data[0], message: message || ''}))
          dispatch({type: START_ACTION_POST, isError: false})
        } else
          dispatch(
            updatePostState({
              post: {},
              isEmpty: true,
              message: message || '',
              isError: true
            })
          )
      })
      .catch((err) => {
        dispatch(
          updatePostState({
            post: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const updatePostState = ({
  post,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: UPDATE_POST,
    post,
    isEmpty,
    message,
    isError
  }
}

export const startGetUserPosts = () => {
  return {
    type: START_GET_USER_POSTS
  }
}

export const stopGetUserPosts = ({
  userPosts,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_USER_POSTS,
    userPosts,
    isEmpty,
    message,
    isError
  }
}

export const startAcion = () => {
  return {
    type: START_ACTION_POST
  }
}

export const stopAction = ({
  userPosts,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_ACTION_POST,
    userPosts,
    isEmpty,
    message,
    isError
  }
}
