import {storageHelper} from '@common'
import {ACCESS_TOKEN, CURRENT_THEME, CURRENT_USER} from './constants/storage'

/* ======== STORE ========== */

const INIT_STORE = 'INIT_STORE'
export const initAppAction = {
  INIT_STORE
}

export const initStore = (storageData) => {
  console.log('storageData', storageData)
  return {
    type: INIT_STORE,
    currentTheme: storageData.currentTheme,
    currentUser: storageData.currentUser,
    accessToken: storageData.accessToken
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
        default:
          break
      }
    })
    dispatch(initStore(storageData))
  })
}
