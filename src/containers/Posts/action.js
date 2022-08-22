import {helper} from '@common'
import {apiBase, METHOD_GET, METHOD_POST} from 'src/common/api'
import {API_REQUEST_POSTS} from 'src/constants/api'

const START_GET_POSTS = 'START_GET_POSTS'
const STOP_GET_POSTS = 'STOP_GET_POSTS'
const START_LOAD_MORE_POSTS = 'START_LOAD_MORE_POSTS'
const STOP_LOAD_MORE_POSTS = 'STOP_LOAD_MORE_POSTS'

export const postsAction = {
  START_GET_POSTS,
  STOP_GET_POSTS,
  START_LOAD_MORE_POSTS,
  STOP_LOAD_MORE_POSTS
}

export const requestPosts = (body) => (dispatch, getState) => {
  /**
   * body: {
   *  page,
   *  location,
   *  key_search,
   *  category: {
   *      category_id,
   *      details: [
   *          {
   *              details_id,
   *              content
   *          }
   *      ]
   *  }
   * }
   */
  dispatch(startGetPosts())
  apiBase(API_REQUEST_POSTS, METHOD_POST, body)
    .then((res) => {
      const {data} = res
      if (helper.isNonEmptyArray(data)) {
        dispatch(stopGetPosts({posts: data, isLoadMore: data.length >= 10}))
      } else {
        dispatch(
          stopGetPosts({
            posts: [],
            isLoadMore: false,
            message: res.message || '',
            isEmpty: true
          })
        )
      }
    })
    .catch((err) => {
      dispatch(
        stopGetPosts({
          posts: [],
          isLoadMore: false,
          isEmpty: true,
          message: err.message,
          isError: true
        })
      )
    })
}

export const startGetPosts = () => {
  return {
    type: START_GET_POSTS
  }
}

export const stopGetPosts = ({
  posts,
  isLoadMore,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_POSTS,
    posts,
    isLoadMore,
    isEmpty,
    message,
    isError
  }
}
