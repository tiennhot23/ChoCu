import { storageHelper } from '@common'

/* ======== STORE ========== */

const INIT_STORE = 'INIT_STORE'
export const initAppAction = {
  INIT_STORE
}

export const initStore = (result) => {
  console.log(result)
  return {
    type: INIT_STORE,
    currentTheme: result[0][1]
  }
}

export const getAsyncStorage = () => (dispatch) => {
  storageHelper.getInitStoreData().then((result) => dispatch(initStore(result)))
}
