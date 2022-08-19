import {appNavigateState} from './state'
import {appNavigateAction} from './action'

const appNavigateReducer = (state = appNavigateState, action) => {
  switch (action.type) {
    case appNavigateAction.NAVIGATE_TO_MAIN_SCREEN:
      return {
        ...state,
        adminStack: false,
        mainStack: true,
        authStack: false
      }
    case appNavigateAction.NAVIGATE_TO_LOGIN_SCREEN:
      return {
        ...state,
        adminStack: false,
        mainStack: false,
        authStack: true
      }
    case appNavigateAction.NAVIGATE_TO_ADMIN_SCREEN:
      return {
        ...state,
        adminStack: true,
        mainStack: false,
        authStack: false
      }
    default:
      return state
  }
}

export {appNavigateReducer}
