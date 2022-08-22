import {adminAccountManagerAction} from '../AdminAccountManager/action'
import {userInfoAction} from './action'
import {userInfoState} from './state'

const userInfoReducer = (state = userInfoState, action) => {
  switch (action.type) {
    case adminAccountManagerAction.STOP_REQUEST_LOCK_ACCOUNT: {
      return {
        ...state,
        userData: {...state.userData, active: action.accountData.active}
      }
    }
    case userInfoAction.START_REQUEST_USER_DATA: {
      return {
        ...state,
        userData: {},
        stateUser: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case userInfoAction.STOP_REQUEST_USER_DATA: {
      return {
        ...state,
        userData: action.userData,
        stateUser: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    }
    case userInfoAction.START_REQUEST_USER_POSTS: {
      return {
        ...state,
        userPosts: [],
        stateUserPosts: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case userInfoAction.STOP_REQUEST_USER_POSTS: {
      return {
        ...state,
        userPosts: action.userPosts,
        stateUserPosts: {
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

export {userInfoReducer}
