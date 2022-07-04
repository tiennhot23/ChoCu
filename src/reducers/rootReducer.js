import {combineReducers} from 'redux'

import {initAppAction} from '../initApp'
import {appThemeReducer} from '../containers/AppTheme/reducer'
import {loginReducer} from 'src/containers/Login/reducer'

const inintAppReducer = (state = {}, action) => {
  switch (action.type) {
    case initAppAction.INIT_STORE: {
      return state
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  appThemeReducer,
  inintAppReducer,
  loginReducer
})
export default rootReducer
