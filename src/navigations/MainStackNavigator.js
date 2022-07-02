import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HOME_NAV, POST_SCR} from 'src/constants/constant'
import HomeTabNavigator from './HomeTabNavigator'
import Post from 'src/containers/Post'

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={HOME_NAV} component={HomeTabNavigator} />
      <Stack.Screen name={POST_SCR} component={Post} />
    </Stack.Navigator>
  )
}
