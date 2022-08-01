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

const Tab = createBottomTabNavigator()

export default function HomeTabNavigator() {
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