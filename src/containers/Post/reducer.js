import {postAction} from './action'
import {postState} from './state'

const postReducer = (state = postState, action) => {
  switch (action.type) {
    case postAction.START_GET_POST:
      return {
        ...state,
        dataPost: {},
        statePost: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    case postAction.STOP_GET_POST:
      return {
        ...state,
        dataPost: action.post,
        statePost: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    default:
      return state
  }
}

export {postReducer}
