import React, {useEffect} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from 'src/containers/Home'
import PostsManager from 'src/containers/PostsManager'
import CreatePost from 'src/containers/CreatePost'
import Personal from 'src/containers/Personal'
import {
  CREATE_POST_SCR,
  HOME_SCR,
  NOTIFICATION_SCR,
  PERSONAL_SCR,
  POSTS_MANAGER_SCR
} from 'src/constants/constant'
import {Icon} from '@components'
import {ThemeConsumer} from 'src/context/ThemeContext'
import Notification from 'src/containers/Notification'
import {useDispatch, useSelector} from 'react-redux'
import {constant} from '@constants'
import NotifService from 'src/common/notify/NotifService'
import {firebase} from '@react-native-firebase/messaging'
import {helper} from '@common'
import {add_notify} from 'src/containers/Notification/action'
import {getItem, removeItem, setItem} from 'src/common/storage'
import {NOTIFICATIONS} from 'src/constants/storage'

const Tab = createBottomTabNavigator()

export default function HomeTabNavigator() {
  const notifyReducer = useSelector((state) => state.notifyReducer)
  const unreadNotify = notifyReducer.dataNotify.filter((item) => !item.isRead)

  const dispatch = useDispatch()

  const onRegister = (token) => {
    console.log('onRegister', token)
  }
  const onNotification = (notification) => {
    console.log('onNotification', notification)
    // const { data } = notification;
    // if (helper.isValidObject(data?.custom_notification)) {
    //     const { notify_id,
    //       notify_detail_id,
    //       notify_type,
    //       title,
    //       message,
    //       time_created } = JSON.parse(data?.custom_notification);
    // }
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
    if (helper.isNonEmptyString(data?.custom_notification)) {
      dispatch(add_notify(JSON.parse(data?.custom_notification)))
      await addNotifyToStorage(JSON.parse(data?.custom_notification))
    }
  }

  const onReceiveBackground = async (remoteMessage) => {
    const {data} = remoteMessage
    if (helper.isValidObject(data?.custom_notification)) {
      await addNotifyToStorage(JSON.parse(data?.custom_notification))
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
    <ThemeConsumer>
      {(theme) => (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveBackgroundColor: theme.primaryBackground,
            tabBarInactiveBackgroundColor: theme.secondaryBackground,
            tabBarActiveTintColor: theme.primaryText,
            tabBarInactiveTintColor: theme.secondaryText
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="home-outline"
                  color={theme.primaryForeground}
                  size={constant.normalIcon}
                />
              )
            }}
            name={HOME_SCR}
            component={Home}
            initialParams={theme}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="newspaper-outline"
                  color={theme.primaryForeground}
                  size={constant.normalIcon}
                />
              )
            }}
            name={POSTS_MANAGER_SCR}
            component={PostsManager}
            initialParams={theme}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="pencil-outline"
                  color={theme.primaryForeground}
                  size={constant.normalIcon}
                />
              )
            }}
            name={CREATE_POST_SCR}
            component={CreatePost}
            initialParams={theme}
          />
          <Tab.Screen
            options={{
              tabBarBadge: unreadNotify.length > 0 ? unreadNotify.length : null,
              tabBarIcon: ({color}) => (
                <Icon
                  name="notifications-outline"
                  color={theme.primaryForeground}
                  size={constant.normalIcon}
                />
              )
            }}
            name={NOTIFICATION_SCR}
            component={Notification}
            initialParams={theme}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="person-outline"
                  color={theme.primaryForeground}
                  size={constant.normalIcon}
                />
              )
            }}
            name={PERSONAL_SCR}
            component={Personal}
            initialParams={theme}
          />
        </Tab.Navigator>
      )}
    </ThemeConsumer>
  )
}
