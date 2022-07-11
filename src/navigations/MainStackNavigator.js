import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HOME_NAV, POST_SCR, USER_INFO_SCR} from 'src/constants/constant'
import HomeTabNavigator from './HomeTabNavigator'
import Post from 'src/containers/Post'
import UserInfo from 'src/containers/UserInfo'
import {ThemeConsumer} from 'src/context/ThemeContext'

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  return (
    <ThemeConsumer>
      {(theme) => {
        return (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name={HOME_NAV}
              component={HomeTabNavigator}
            />
            <Stack.Group
              screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: theme.colors.primaryForeground
                }
              }}>
              <Stack.Screen name={POST_SCR} component={Post} />
              <Stack.Screen name={USER_INFO_SCR} component={UserInfo} />
            </Stack.Group>
          </Stack.Navigator>
        )
      }}
    </ThemeConsumer>
  )
}
