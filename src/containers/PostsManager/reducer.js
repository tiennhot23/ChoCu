import {userPostsAction} from './action'
import {userPostsState} from './state'

const userPostsReducer = (state = userPostsState, action) => {
  switch (action.type) {
    case 'RESET_STATE': {
      return {
        ...state,
        stateUserPosts: {
          ...state.stateUserPosts,
          isActioning: false,
          isActionDone: false
        }
      }
    }
    case userPostsAction.START_GET_USER_POSTS:
      return {
        ...state,
        dataUserPosts: [],
        stateUserPosts: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case userPostsAction.STOP_GET_USER_POSTS:
      return {
        ...state,
        dataUserPosts: action.userPosts,
        stateUserPosts: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    case userPostsAction.UPDATE_POST: {
      let newData = [...state.dataUserPosts]
      if (!action.isError) {
        const index = newData.findIndex(
          (e) => e.post_id === action.post?.post_id
        )
        if (index > -1)
          newData[index] = {
            ...newData[index],
            post_state: action.post?.post_state
          }
      }
      return {
        ...state,
        dataUserPosts: newData,
        stateUserPosts: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    }
    case userPostsAction.START_ACTION_POST:
      return {
        ...state,
        stateUserPosts: {
          ...state.stateUserPosts,
          isActioning: true,
          isActionDone: false
        }
      }
    case userPostsAction.STOP_ACTION_POST: {
      return {
        ...state,
        dataUserPosts: action.userPosts,
        stateUserPosts: {
          ...state.stateUserPosts,
          isActioning: false,
          isActionDone: action.isError ? false : true,
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

export {userPostsReducer}
