import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  CREATE_POST_SCR,
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
import {Button, StatusBar} from 'react-native'
import Search from 'src/containers/Search'
import CreatePost from 'src/containers/CreatePost'

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  return (
    <ThemeConsumer>
      {(theme) => {
        return (
          <>
            <StatusBar
              backgroundColor={theme.primaryBackground}
              barStyle="dark-content"
            />
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name={HOME_NAV}
                component={HomeTabNavigator}
              />
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen
                  name={POST_SCR}
                  component={Post}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={SEARCH_SCR}
                  component={Search}
                  initialParams={theme}
                />
                <Stack.Screen
                  name={CREATE_POST_SCR}
                  component={CreatePost}
                  initialParams={theme}
                />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: theme.primaryForeground
                  }
                }}>
                <Stack.Screen
                  name={USER_INFO_SCR}
                  component={UserInfo}
                  initialParams={theme}
                />
                <Stack.Screen
                  name={EDIT_INFO_SCR}
                  component={EditInfo}
                  initialParams={theme}
                />
              </Stack.Group>
            </Stack.Navigator>
          </>
        )
      }}
    </ThemeConsumer>
  )
}
