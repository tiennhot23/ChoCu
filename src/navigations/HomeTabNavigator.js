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
import {useSelector} from 'react-redux'
import {constant} from '@constants'
import NotifService from 'src/common/notify/NotifService'

const Tab = createBottomTabNavigator()

export default function HomeTabNavigator() {
  const notifyReducer = useSelector((state) => state.notifyReducer)
  const unreadNotify = notifyReducer.dataNotify.filter((item) => !item.isRead)

  const onRegister = (token) => {
    console.log('onRegister', token)
  }
  const onNotification = (notification) => {
    console.log('onNotification', notification)
    // const { data } = notification;
    // if (helper.IsNonEmptyString(data?.custom_notification)) {
    //     const { title, body } = JSON.parse(data?.custom_notification);
    //     Alert.alert(title, body);
    // }
  }
  const _notify = new NotifService(onRegister, onNotification)

  useEffect(() => {
    global._notify = _notify
  }, [])

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
