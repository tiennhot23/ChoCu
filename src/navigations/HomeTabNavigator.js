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

const Tab = createBottomTabNavigator()

export default function HomeTabNavigator() {
  const notifyReducer = useSelector((state) => state.notifyReducer)
  const unreadNotify = notifyReducer.dataNotify.filter((item) => !item.isRead)

  return (
    <ThemeConsumer>
      {(theme) => (
        <Tab.Navigator
          initialRouteName={PERSONAL_SCR}
          screenOptions={{
            headerShown: false,
            tabBarActiveBackgroundColor: theme.colors.primaryBackground,
            tabBarInactiveBackgroundColor: theme.colors.secondaryBackground,
            tabBarActiveTintColor: theme.colors.primaryText,
            tabBarInactiveTintColor: theme.colors.secondaryText
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="home-outline"
                  color={theme.colors.primaryForeground}
                  size={20}
                />
              )
            }}
            name={HOME_SCR}
            component={Home}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="newspaper-outline"
                  color={theme.colors.primaryForeground}
                  size={20}
                />
              )
            }}
            name={POSTS_MANAGER_SCR}
            component={PostsManager}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="pencil-outline"
                  color={theme.colors.primaryForeground}
                  size={20}
                />
              )
            }}
            name={CREATE_POST_SCR}
            component={CreatePost}
          />
          <Tab.Screen
            options={{
              tabBarBadge: unreadNotify.length > 0 ? unreadNotify.length : null,
              tabBarIcon: ({color}) => (
                <Icon
                  name="notifications-outline"
                  color={theme.colors.primaryForeground}
                  size={20}
                />
              )
            }}
            name={NOTIFICATION_SCR}
            component={Notification}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  name="person-outline"
                  color={theme.colors.primaryForeground}
                  size={20}
                />
              )
            }}
            name={PERSONAL_SCR}
            component={Personal}
          />
        </Tab.Navigator>
      )}
    </ThemeConsumer>
  )
}
