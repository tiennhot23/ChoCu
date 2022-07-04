import {ENUM} from '@constants'
import {initAppAction} from 'src/initApp'
import {appThemeAction} from './action'
import {appThemeState} from './state'

const appThemeReducer = (state = appThemeState, action) => {
  switch (action.type) {
    case initAppAction.INIT_STORE: {
      return {
        ...state,
        currentTheme: action.currentTheme
      }
    }
    case appThemeAction.SWITCH_APP_THEME: {
      return {
        ...state,
        currentTheme:
          state.currentTheme === ENUM.TAG_THEME.light
            ? ENUM.TAG_THEME.dark
            : ENUM.TAG_THEME.light
      }
    }
    default:
      return state
  }
}

export {appThemeReducer}
