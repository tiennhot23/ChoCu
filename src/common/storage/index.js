import AsyncStorage from '@react-native-async-storage/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage'

import {STORAGE_CONST} from '@constants'
import {helper} from '@common'

const {ACCESS_TOKEN, CURRENT_LANGUAGE, CURRENT_THEME, CURRENT_USER} =
  STORAGE_CONST

export const setSecureItem = (key, value) => {
  return new Promise((resolve, reject) => {
    logPrevData()
    EncryptedStorage.setItem(key, value)
      .then((r) => {
        resolve(true)
        logCurrData()
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

export const getSecureItem = (key) => {
  return new Promise((resolve, reject) => {
    EncryptedStorage.getItem(key)
      .then((result) => {
        if (helper.isValidObject(result)) resolve(result)
        else resolve(null)
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

export const setItem = (key, value) => {
  return new Promise((resolve, reject) => {
    logPrevData()
    AsyncStorage.setItem(key, value)
      .then((r) => {
        resolve(true)
        logCurrData()
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

export const getItem = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((result) => {
        if (helper.isValidObject(result)) resolve(result)
        else resolve(null)
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

export const getMulti = (arrKey) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet(arrKey)
      .then((result) => {
        if (helper.isValidObject(result)) resolve(result)
        else resolve(null)
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

export const removeItem = (key) => {
  return new Promise((resolve, reject) => {
    logPrevData()
    AsyncStorage.removeItem(key)
      .then((result) => {
        resolve(true)
        logCurrData()
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

export const removeMulti = (arrKey) => {
  return new Promise((resolve, reject) => {
    logPrevData()
    AsyncStorage.multiRemove(arrKey)
      .then((result) => {
        resolve(true)
        logCurrData()
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

export const clearStorage = () => {
  return new Promise((resolve, reject) => {
    logPrevData()
    AsyncStorage.clear()
      .then((result) => {
        resolve(true)
        logCurrData()
      })
      .catch((err) => {
        resolve(err)
        logError(err)
      })
  })
}

/* ==================================== */

// init store

export const getInitStoreData = async () => {
  const res = await getMulti([CURRENT_THEME])
  if (helper.isError(res))
    return new Error('Storage Error: Cannot get init data')
  if (helper.isValidObject(res)) return res
  return null
}

// theme

export const saveCurrentTheme = async (tagTheme) => {
  if (helper.isString(tagTheme))
    if (helper.isError(await setItem(CURRENT_THEME, tagTheme)))
      return new Error('Storage Error: Cannot save theme')
  return
}

export const getCurrentTheme = async () => {
  const res = await getItem(CURRENT_THEME)
  if (helper.isError(res)) return new Error('Storage Error: Cannot get theme')
  if (helper.isValidObject(res)) return res
  return null
}

/* ===== LOGGER ====== */

const logPrevData = () => {
  if (__DEV__) {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((data) => {
        console.log('STORAGE PREV DATA', JSON.stringify(data))
      })
    })
  }
}

const logCurrData = () => {
  if (__DEV__) {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((data) => {
        console.log('STORAGE CURR DATA', JSON.stringify(data))
      })
    })
  }
}

const logError = (err) => {
  if (__DEV__) console.log('STORAGE ERROR', err)
}
