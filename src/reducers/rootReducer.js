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
import {userPostsReducer} from 'src/containers/PostsManager/reducer'
import {paymentsReducer} from 'src/containers/Payment/reducer'
import {dealReducer} from 'src/containers/Deal/reducer'
import {userDealsReducer} from 'src/containers/DealManager/reducer'
import {otpReducer} from 'src/containers/OTP/reducer'
import {userInfoReducer} from 'src/containers/UserInfo/reducer'
import {postTurnServicesReducer} from 'src/containers/PostTurnServices/reducer'

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
  postReducer,
  userPostsReducer,
  paymentsReducer,
  dealReducer,
  userDealsReducer,
  otpReducer,
  userInfoReducer,
  postTurnServicesReducer
})
export default rootReducer
