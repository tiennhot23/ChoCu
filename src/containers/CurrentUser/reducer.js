import {ENUM} from '@constants'
import {initAppAction} from 'src/initApp'
import {currentUserAction} from './action'
import {currentUserState} from './state'

const currentUserReducer = (state = currentUserState, action) => {
  switch (action.type) {
    case initAppAction.INIT_STORE: {
      return {
        ...state,
        userData: JSON.parse(action.userData ? action.userData : '{}'),
        accessToken: action.accessToken,
        fcmToken: action.fcmToken,
        isLoggedIn: action.accessToken ? true : false
      }
    }
    case currentUserAction.SAVE_USER: {
      return {
        ...state,
        userData: action.userData,
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
