import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {API_REQUEST_END_POST, API_REQUEST_POSTS} from 'src/constants/api'

const START_GET_USER_POSTS = 'START_GET_USER_POSTS'
const STOP_GET_USER_POSTS = 'STOP_GET_USER_POSTS'
const END_POST = 'END_POST'

export const userPostsAction = {
  START_GET_USER_POSTS,
  STOP_GET_USER_POSTS,
  END_POST
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

export const requestEndPost =
  ({post_id}) =>
  (dispatch, getState) => {
    const body = {}
    apiBase(API_REQUEST_END_POST + `/${post_id}`, METHOD_POST, body)
      .then((res) => {
        const {code, message, data} = res
        if (code === 200)
          dispatch(endPost({post: data[0], message: message || ''}))
      })
      .catch((err) => {
        dispatch(
          endPost({
            post: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const endPost = ({
  post,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: END_POST,
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
