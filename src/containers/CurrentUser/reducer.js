import {ENUM} from '@constants'
import {initAppAction} from 'src/initApp'
import {currentUserAction} from './action'
import {currentUserState} from './state'

const currentUserReducer = (state = currentUserState, action) => {
  switch (action.type) {
    case initAppAction.INIT_STORE: {
      return {
        ...state,
        userData: action.currentUser?.userData,
        accessToken: action.currentUser?.accessToken,
        fcmToken: action.currentUser?.fcmToken,
        isLoggedIn: action.currentUser ? true : false
      }
    }
    case currentUserAction.SAVE_USER: {
      return {
        ...state,
        userData: action.userData,
        accessToken: action.accessToken,
        fcmToken: action.fcmToken,
        isLoggedIn: true
      }
    }
    case currentUserAction.REMOVE_USER: {
      return {
        ...state,
        ...currentUserState
      }
    }
    default:
      return state
  }
}

export {currentUserReducer}
