import {ENUM} from '@constants'
import {initAppAction} from 'src/initApp'
import {postAction} from '../Post/action'
import {userPostsAction} from '../PostsManager/action'
import {postTurnServicesAction} from '../PostTurnServices/action'
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
    case currentUserAction.START_ACTION_USER_DATA: {
      return {
        ...state,
        stateUser: {
          ...state.state,
          isActioning: true,
          isActionDone: false
        }
      }
    }
    case currentUserAction.SAVE_USER: {
      return {
        ...state,
        userData: action.userData,
        isLoggedIn: true,
        stateUser: {
          isActioning: false,
          isActionDone: action.isError ? false : true,
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
          isActioning: false,
          isActionDone: action.isError ? false : true,
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
    case postTurnServicesAction.STOP_ACTION_ADD_USER_SERVICE: {
      return {
        ...state,
        userData: {
          ...state.userData,
          post_turn: state.userData.post_turn + action.post_turn
        }
      }
    }
    case userPostsAction.STOP_ACTION_POST: {
      return {
        ...state,
        userData: {
          ...state.userData,
          post_turn: action.isError
            ? state.userData.post_turn
            : state.userData.post_turn - 1
        }
      }
    }
    default:
      return state
  }
}

export {currentUserReducer}
