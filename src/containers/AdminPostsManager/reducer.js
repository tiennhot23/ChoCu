import {adminPostsManagerAction} from './action'
import {adminPostsManagerState} from './state'

const adminPostsManagerReducer = (state = adminPostsManagerState, action) => {
  switch (action.type) {
    case adminPostsManagerAction.START_GET_ALL_ADMIN_POSTS: {
      return {
        ...state,
        postsData: [],
        postsState: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        },
        isActioning: false,
        isActionDone: false
      }
    }
    case adminPostsManagerAction.STOP_GET_ALL_ADMIN_POSTS: {
      return {
        ...state,
        postsData: action.postsData,
        postsState: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        },
        isActioning: false,
        isActionDone: false
      }
    }
    case adminPostsManagerAction.START_ACTION: {
      return {
        ...state,
        isActioning: true,
        isActionDone: false
      }
    }
    case adminPostsManagerAction.UPDATE_ADMIN_POSTS_STATE: {
      return {
        ...state,
        postsData: action.postsData,
        postsState: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        },
        isActioning: false,
        isActionDone: action.isError ? false : true
      }
    }
    default:
      return state
  }
}

export {adminPostsManagerReducer}
