import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  EDIT_INFO_SCR,
  HOME_NAV,
  POST_SCR,
  SEARCH_SCR,
  USER_INFO_SCR
} from 'src/constants/constant'
import HomeTabNavigator from './HomeTabNavigator'
import UserInfo from 'src/containers/UserInfo'
import {ThemeConsumer} from 'src/context/ThemeContext'
import EditInfo from 'src/containers/EditInfo'
import Post from 'src/containers/Post'
import PostMenu from 'src/containers/Post/components/PostMenu'
import {Button, StatusBar} from 'react-native'
import Search from 'src/containers/Search'

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  return (
    <ThemeConsumer>
      {(theme) => {
        return (
          <>
            <StatusBar
              backgroundColor={theme.colors.primaryBackground}
              barStyle="dark-content"
            />
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name={HOME_NAV}
                component={HomeTabNavigator}
              />
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name={POST_SCR} component={Post} />
                <Stack.Screen name={SEARCH_SCR} component={Search} />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: theme.colors.primaryForeground
                  }
                }}>
                <Stack.Screen name={USER_INFO_SCR} component={UserInfo} />
                <Stack.Screen name={EDIT_INFO_SCR} component={EditInfo} />
              </Stack.Group>
            </Stack.Navigator>
          </>
        )
      }}
    </ThemeConsumer>
  )
}
