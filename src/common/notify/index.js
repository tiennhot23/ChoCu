import messaging, {firebase} from '@react-native-firebase/messaging'
import {STORAGE_CONST, API_CONST} from '@constants'
import {getItem, removeItem, setItem} from '../storage'
import {api, helper} from '@common'
import {METHOD_POST} from '../api'
const {API_SUBSCRIBE_NOTIFY, API_UNSUBSCRIBE_NOTIFY} = API_CONST
const {apiBase} = api

export const getTokenNotification = async () => {
  let tokenFCM = ''
  try {
    const authorizationStatus = await messaging().requestPermission()
    if (authorizationStatus == 1) {
      tokenFCM = await getItem(STORAGE_CONST.NOTIFY_TOKEN_FCM)
      if (!tokenFCM) {
        if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
          await firebase.messaging().registerDeviceForRemoteMessages()
        }
        tokenFCM = await messaging().getToken()
        setItem(STORAGE_CONST.NOTIFY_TOKEN_FCM, tokenFCM)
      }
    }
  } catch (error) {
    console.log('getTokenNotification error', error)
  }
  return tokenFCM
}

export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(onReceiveBackground)
}

export const subscribeNotify = async () => {
  const fcm_token = await getTokenNotification()
  const body = {fcm_token}
  try {
    const response = await apiBase(API_SUBSCRIBE_NOTIFY, METHOD_POST, body)
    const subcribed = response?.data[0].subcribed
    if (subcribed) setItem(STORAGE_CONST.NOTIFY_TOKEN_FCM, fcm_token)
    return true
  } catch (error) {
    throw error
  }
}

export const unSubscribeNotify = async () => {
  const body = {fcm_token: await getItem(STORAGE_CONST.NOTIFY_TOKEN_FCM)}
  try {
    const response = await apiBase(API_UNSUBSCRIBE_NOTIFY, METHOD_POST, body)
    const unsubcribed = response?.data[0].unsubcribed
    if (unsubcribed) removeItem(STORAGE_CONST.NOTIFY_TOKEN_FCM)
    return true
  } catch (error) {
    return error
  }
}

const onReceiveBackground = async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage)
}
