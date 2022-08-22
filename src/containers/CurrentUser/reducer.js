import {ENUM} from '@constants'
import {initAppAction} from 'src/initApp'
import {currentUserAction} from './action'
import {currentUserState} from './state'

const currentUserReducer = (state = currentUserState, action) => {
  switch (action.type) {
    case initAppAction.INIT_STORE: {
      return {
        ...state,
        userData: JSON.parse(action.currentUser ? action.currentUser : '{}'),
        accessToken: action.accessToken,
        fcmToken: action.fcmToken,
        isLoggedIn: action.accessToken ? true : false
      }
    }
    case currentUserAction.START_REQUEST_USER_DATA: {
      return {
        ...state,
        stateUser: {
          isFetching: true,
          isEmpty: false,
          message: '',
          isError: false
        }
      }
    }
    case currentUserAction.SAVE_USER: {
      return {
        ...state,
        userData: action.userData,
        isLoggedIn: true,
        stateUser: {
          isFetching: false,
          isEmpty: action.isEmpty,
          message: action.message,
          isError: action.isError
        }
      }
    }
    case currentUserAction.REMOVE_USER: {
      return {
        ...state,
        userData: {
          userId: '',
          name: '',
          avatar: '',
          phone: '',
          email: '',
          address: ''
        },
        stateUser: {
          isFetching: false,
          isEmpty: false,
          message: '',
          isError: false
        },
        accessToken: '',
        fcmToken: '',
        isLoggedIn: false
      }
    }
    default:
      return state
  }
}

export {currentUserReducer}
