import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {LOGIN_SCR, SIGN_UP_SCR} from 'src/constants/constant'
import SignUp from 'src/containers/SignUp'
import Login from 'src/containers/Login'

const Stack = createNativeStackNavigator()

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={LOGIN_SCR} component={Login} />
      <Stack.Screen name={SIGN_UP_SCR} component={SignUp} />
    </Stack.Navigator>
  )
}
