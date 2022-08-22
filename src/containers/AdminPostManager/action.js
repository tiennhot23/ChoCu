import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {
  API_REQUEST_APPROVE_POST,
  API_REQUEST_DENY_POST,
  API_REQUEST_PENDING_POST
} from 'src/constants/api'

const START_REQUEST_PENDING_POSTS = 'START_REQUEST_PENDING_POSTS'
const STOP_REQUEST_PENDING_POSTS = 'STOP_REQUEST_PENDING_POSTS'

export const adminPostsManagerAction = {
  START_REQUEST_PENDING_POSTS,
  STOP_REQUEST_PENDING_POSTS
}

export const requestPendingPosts = () => async (dispatch, getState) => {
  dispatch(startRequest())
  apiBase(API_REQUEST_PENDING_POST, METHOD_GET)
    .then(async (response) => {
      if (helper.isNonEmptyArray(response.data)) {
        dispatch(stopRequest({postsData: response.data}))
      } else {
        dispatch(stopRequest({postsData: [], message: response.message}))
      }
    })
    .catch((err) => {
      dispatch(
        stopRequest({
          postsData: [],
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const approvePost =
  ({post_id}) =>
  async (dispatch, getState) => {
    let postsData = [...getState().adminPostsManagerReducer.postsData]
    dispatch(startRequest())
    apiBase(API_REQUEST_APPROVE_POST + `/${post_id}`, METHOD_POST)
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          postsData = postsData.filter((e) => e.post_id !== data[0].post_id)
          dispatch(stopRequest({postsData, isActionDone: true}))
        } else {
          dispatch(stopRequest({postsData, message: response.message}))
        }
      })
      .catch((err) => {
        dispatch(
          stopRequest({
            postsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const denyPost =
  ({post_id}) =>
  async (dispatch, getState) => {
    let postsData = [...getState().adminPostsManagerReducer.postsData]
    dispatch(startRequest())
    apiBase(API_REQUEST_DENY_POST + `/${post_id}`, METHOD_POST)
      .then(async (response) => {
        const {data} = response
        if (helper.isNonEmptyArray(response.data)) {
          postsData = postsData.filter((e) => e.post_id !== data[0].post_id)
          dispatch(stopRequest({postsData, isActionDone: true}))
        } else {
          dispatch(stopRequest({postsData, message: response.message}))
        }
      })
      .catch((err) => {
        dispatch(
          stopRequest({
            postsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startRequest = () => {
  return {
    type: START_REQUEST_PENDING_POSTS
  }
}

export const stopRequest = ({
  postsData,
  isActionDone = false,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_REQUEST_PENDING_POSTS,
    postsData,
    isActionDone,
    isEmpty,
    message,
    isError
  }
}
