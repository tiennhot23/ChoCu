import {postsAction} from './action'
import {postsState} from './state'

const postsReducer = (state = postsState, action) => {
  switch (action.type) {
    case postsAction.START_GET_POSTS:
      return {
        ...state,
        dataPosts: [],
        statePosts: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        },
        isLoadMore: false
      }
    case postsAction.STOP_GET_POSTS:
      return {
        ...state,
        dataPosts: action.posts,
        statePosts: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        },
        isLoadMore: action.isLoadMore
      }
    default:
      return state
  }
}

export {postsReducer}
