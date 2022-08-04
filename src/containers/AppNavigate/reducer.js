import {appNavigateState} from './state'
import {appNavigateAction} from './action'

const appNavigateReducer = (state = appNavigateState, action) => {
  switch (action.type) {
    case appNavigateAction.NAVIGATE_TO_MAIN_SCREEN:
      return {
        ...state,
        mainStack: true,
        authStack: false
      }
    case appNavigateAction.NAVIGATE_TO_LOGIN_SCREEN:
      return {
        ...state,
        mainStack: false,
        authStack: true
      }
    default:
      return state
  }
}

export {appNavigateReducer}
