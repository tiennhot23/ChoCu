import React, {useEffect, useState} from 'react'
import AuthStackNavigator from './AuthStackNavigator'
import MainStackNavigator from './MainStackNavigator'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ADMIN_NAV, AUTH_NAV, MAIN_NAV} from 'src/constants/constant'
import {useDispatch, useSelector} from 'react-redux'
import NotifService from 'src/common/notify/NotifService'
import {firebase} from '@react-native-firebase/messaging'
import {helper} from '@common'
import {add_notify} from 'src/containers/Notification/action'
import {NOTIFICATIONS} from 'src/constants/storage'
import {getItem, setItem} from 'src/common/storage'
import AdminStackNavigator from './AdminStackNavigator'
import {requestUserData} from 'src/containers/CurrentUser/action'
import {
  requestBuyDeals,
  requestSellDeals
} from 'src/containers/DealManager/action'
import {requestUserPosts} from 'src/containers/PostsManager/action'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const appNavigate = useSelector((state) => state.appNavigateReducer)
  const dispatch = useDispatch()

  const onRegister = (token) => {
    console.log('onRegister', token)
  }
  const onNotification = (notification) => {
    console.log('onNotification', notification)
  }
  const _notify = new NotifService(onRegister, onNotification)

  useEffect(() => {
    global._notify = _notify
    const unsubcribe = firebase.messaging().onMessage(onReceiveForeground)
    firebase.messaging().setBackgroundMessageHandler(onReceiveBackground)
    return unsubcribe
  }, [])

  const onReceiveForeground = async (remoteMessage) => {
    console.log('onRemoteMessage', remoteMessage)
    const {notification, data} = remoteMessage
    _notify.localNotify({
      title: notification.title,
      message: notification.body
    })
    if (helper.isValidObject(data)) {
      if (notification.title === 'Tài khoản đã bị khoá')
        dispatch(requestUserData())
      else if (data.notify_type === 'deal') {
        dispatch(requestSellDeals())
        dispatch(requestBuyDeals())
      } else if (data.notify_type === 'post') {
        dispatch(requestUserPosts())
      }

      dispatch(add_notify(data))
      await addNotifyToStorage(data)
    }
  }

  const onReceiveBackground = async (remoteMessage) => {
    const {data} = remoteMessage
    if (helper.isValidObject(data)) {
      await addNotifyToStorage(data)
    }
  }

  const addNotifyToStorage = async (notify) => {
    let dataNotify = await getItem(NOTIFICATIONS)
    dataNotify = JSON.parse(dataNotify)
    if (!helper.isArray(dataNotify)) dataNotify = []
    const {
      notify_id = '',
      notify_detail_id,
      notify_type,
      title,
      message,
      time_created = new Date(),
      isRead = false
    } = notify

    if (
      dataNotify.push({
        notify_id,
        notify_detail_id,
        notify_type,
        title,
        message,
        time_created,
        isRead
      }) > 30
    )
      dataNotify = dataNotify.slice(1, 30)
    setItem(NOTIFICATIONS, JSON.stringify(dataNotify))
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {appNavigate.mainStack ? (
        <Stack.Screen name={MAIN_NAV} component={MainStackNavigator} />
      ) : appNavigate.adminStack ? (
        <Stack.Screen name={ADMIN_NAV} component={AdminStackNavigator} />
      ) : (
        <Stack.Screen name={AUTH_NAV} component={AuthStackNavigator} />
      )}
    </Stack.Navigator>
  )
}
