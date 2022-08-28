import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {
  API_REQUEST_SELL_DEALS,
  API_REQUEST_BUY_DEALS,
  API_REQUEST_UPDATE_DEAL_STATE,
  API_REQUEST_POSTS,
  API_REQUEST_ADMIN_ALL_POSTS,
  API_REQUEST_APPROVE_POST,
  API_REQUEST_DENY_POST,
  API_REQUEST_DELETE_POST
} from 'src/constants/api'
import {removePostReports} from '../AdminReportManager/action'

const START_GET_ALL_ADMIN_POSTS = 'START_GET_ALL_ADMIN_POSTS'
const STOP_GET_ALL_ADMIN_POSTS = 'STOP_GET_ALL_ADMIN_POSTS'
const UPDATE_ADMIN_POSTS_STATE = 'UPDATE_ADMIN_POSTS_STATE'
const START_ACTION = 'START_ACTION'

export const adminPostsManagerAction = {
  START_GET_ALL_ADMIN_POSTS,
  STOP_GET_ALL_ADMIN_POSTS,
  UPDATE_ADMIN_POSTS_STATE,
  START_ACTION
}

export const requestAllPosts = () => (dispatch, getState) => {
  dispatch(startGetAllPosts())
  apiBase(API_REQUEST_ADMIN_ALL_POSTS, METHOD_GET)
    .then((res) => {
      const {data} = res
      if (helper.isNonEmptyArray(data)) {
        dispatch(stopGetAllPosts({postsData: data}))
      } else {
        dispatch(
          stopGetAllPosts({
            postsData: [],
            message: res.message || '',
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopGetAllPosts({
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
    dispatch(startAction())
    apiBase(API_REQUEST_APPROVE_POST + `/${post_id}`, METHOD_POST)
      .then(async (response) => {
        const {data, message} = response
        if (helper.isNonEmptyArray(response.data)) {
          postsData = postsData.map((e) => {
            if (e.post_id === post_id) {
              e.post_state = 'active'
            }
            return e
          })
        }

        dispatch(updatePostState({postsData, message: message || ''}))
      })
      .catch((err) => {
        dispatch(
          updatePostState({
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
    dispatch(startAction())
    apiBase(API_REQUEST_DENY_POST + `/${post_id}`, METHOD_POST)
      .then(async (response) => {
        const {data, message} = response
        if (helper.isNonEmptyArray(response.data)) {
          postsData = postsData.filter((e) => e.post_id !== data[0].post_id)
        }

        dispatch(updatePostState({postsData, message: message || ''}))
      })
      .catch((err) => {
        dispatch(
          updatePostState({
            postsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const deletePost =
  ({post_id}) =>
  async (dispatch, getState) => {
    let postsData = [...getState().adminPostsManagerReducer.postsData]
    dispatch(startAction())
    apiBase(API_REQUEST_DELETE_POST + `/${post_id}`, METHOD_POST)
      .then(async (response) => {
        const {data, message} = response
        if (helper.isNonEmptyArray(response.data)) {
          postsData = postsData.map((e) => {
            if (e.post_id === post_id) {
              e.post_state = 'deleted'
            }
            return e
          })

          dispatch(removePostReports({post_id}))
        }

        dispatch(updatePostState({postsData, message: message || ''}))
      })
      .catch((err) => {
        dispatch(
          updatePostState({
            postsData,
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const updatePostState = ({
  postsData,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: UPDATE_ADMIN_POSTS_STATE,
    postsData,
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

export const startGetAllPosts = () => {
  return {
    type: START_GET_ALL_ADMIN_POSTS
  }
}

export const stopGetAllPosts = ({
  postsData,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_ALL_ADMIN_POSTS,
    postsData,
    isEmpty,
    message,
    isError
  }
}
