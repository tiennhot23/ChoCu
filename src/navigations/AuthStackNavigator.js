import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  FORGOT_PASSWORD_SCR,
  LOGIN_SCR,
  SIGN_UP_SCR
} from 'src/constants/constant'
import SignUp from 'src/containers/SignUp'
import Login from 'src/containers/Login/index'
import ForgotPassword from 'src/containers/Login/ForgotPassword'

const Stack = createNativeStackNavigator()

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={LOGIN_SCR} component={Login} />
      <Stack.Screen name={SIGN_UP_SCR} component={SignUp} />
      <Stack.Screen name={FORGOT_PASSWORD_SCR} component={ForgotPassword} />
    </Stack.Navigator>
  )
}
