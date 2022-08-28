import {storageHelper} from '@common'
import {
  ACCESS_TOKEN,
  CURRENT_THEME,
  CURRENT_USER,
  NOTIFICATIONS
} from './constants/storage'
import {navigateToAdminScreen} from './containers/AppNavigate/action'

/* ======== STORE ========== */

const INIT_STORE = 'INIT_STORE'
export const initAppAction = {
  INIT_STORE
}

export const initStore = (storageData) => (dispatch, getState) => {
  console.log('storageData', storageData)
  let user = JSON.parse(
    storageData.currentUser ? storageData.currentUser : '{}'
  )
  if (user?.role_id === 'director') {
    global.adminLogin = true
    dispatch(navigateToAdminScreen())
  } else {
    global.adminLogin = false
  }
  return {
    type: INIT_STORE,
    currentTheme: storageData.currentTheme,
    currentUser: storageData.currentUser,
    accessToken: storageData.accessToken,
    notifications: storageData.notifications
  }
}

export const getAsyncStorage = () => (dispatch) => {
  storageHelper.getInitStoreData().then((result) => {
    let storageData = {}
    result.map((item, index) => {
      switch (item[0]) {
        case CURRENT_THEME:
          storageData.currentTheme = item[1]
          break
        case CURRENT_USER:
          storageData.currentUser = item[1]
          break
        case ACCESS_TOKEN:
          storageData.accessToken = item[1]
          break
        case NOTIFICATIONS:
          storageData.notifications = item[1]
          break
        default:
          break
      }
    })
    dispatch(initStore(storageData))
  })
}
