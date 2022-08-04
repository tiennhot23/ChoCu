import React, {useState} from 'react'
import AuthStackNavigator from './AuthStackNavigator'
import MainStackNavigator from './MainStackNavigator'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {AUTH_NAV, MAIN_NAV} from 'src/constants/constant'
import {useSelector} from 'react-redux'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const appNavigate = useSelector((state) => state.appNavigateReducer)
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {appNavigate.mainStack ? (
        <Stack.Screen name={MAIN_NAV} component={MainStackNavigator} />
      ) : (
        <Stack.Screen name={AUTH_NAV} component={AuthStackNavigator} />
      )}
    </Stack.Navigator>
  )
}
