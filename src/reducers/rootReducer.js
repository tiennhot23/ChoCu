import {combineReducers} from 'redux'

import {initAppAction} from '../initApp'
import {appThemeReducer} from '../containers/AppTheme/reducer'
import {currentUserReducer} from '../containers/CurrentUser/reducer'
import {loginReducer} from 'src/containers/Login/reducer'
import {appNavigateReducer} from 'src/containers/AppNavigate/reducer'
import {categoriesReducer} from 'src/containers/Categories/reducer'
import {postsReducer} from 'src/containers/Posts/reducer'
import {notifyReducer} from 'src/containers/Notification/reducer'
import {postReducer} from 'src/containers/Post/reducer'

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
  currentUserReducer,
  loginReducer,
  appNavigateReducer,
  categoriesReducer,
  postsReducer,
  notifyReducer,
  postReducer
})
export default rootReducer
