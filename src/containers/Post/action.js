import {helper} from '@common'
import {
  apiBase,
  CONTENT_TYPE_MULTIPART,
  METHOD_GET,
  METHOD_POST
} from 'src/common/api'
import {API_REQUEST_CREATE_POST, API_REQUEST_POSTS} from 'src/constants/api'

const START_GET_POST = 'START_GET_POST'
const STOP_GET_POST = 'STOP_GET_POST'

export const postAction = {
  START_GET_POST,
  STOP_GET_POST
}

export const requestPost =
  ({post_id}) =>
  (dispatch, getState) => {
    dispatch(startGetPost())
    apiBase(API_REQUEST_POSTS + `/${post_id}`, METHOD_GET)
      .then((res) => {
        const {data} = res
        if (helper.isNonEmptyArray(data) && helper.isValidObject(data[0])) {
          dispatch(stopGetPost({post: data[0]}))
        } else {
          dispatch(
            stopGetPost({
              post: {},
              message: res.message || '',
              isEmpty: true
            })
          )
        }
      })
      .catch((err) => {
        dispatch(
          stopGetPost({
            post: {},
            isEmpty: true,
            message: err.message,
            isError: true
          })
        )
      })
  }

export const startGetPost = () => {
  return {
    type: START_GET_POST
  }
}

export const stopGetPost = ({
  post,
  isEmpty = false,
  message = '',
  isError = false
}) => {
  return {
    type: STOP_GET_POST,
    post,
    isEmpty,
    message,
    isError
  }
}
