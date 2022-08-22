import {adminPostsManagerAction} from './action'
import {adminPostsManagerState} from './state'

const adminPostsManagerReducer = (state = adminPostsManagerState, action) => {
  switch (action.type) {
    case adminPostsManagerAction.START_REQUEST_PENDING_POSTS: {
      return {
        ...state,
        postsData: [],
        postsState: {
          isActionDone: false,
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case adminPostsManagerAction.STOP_REQUEST_PENDING_POSTS: {
      return {
        ...state,
        postsData: action.postsData,
        postsState: {
          isActionDone: action.isActionDone,
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    }
    default:
      return state
  }
}

export {adminPostsManagerReducer}
