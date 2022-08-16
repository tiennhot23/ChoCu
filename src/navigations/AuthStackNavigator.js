import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  FORGOT_PASSWORD_SCR,
  LOGIN_SCR,
  OTP_SCR,
  SIGN_UP_SCR
} from 'src/constants/constant'
import SignUp from 'src/containers/SignUp'
import Login from 'src/containers/Login'
import ForgotPassword from 'src/containers/Login/ForgotPassword'
import {ThemeConsumer} from 'src/context/ThemeContext'
import OTP from 'src/containers/OTP'
import CreateAccount from 'src/containers/Login/CreateAccount'

const Stack = createNativeStackNavigator()

export default function AuthStackNavigator() {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={LOGIN_SCR}
            component={Login}
            initialParams={theme}
          />
          <Stack.Screen
            name={SIGN_UP_SCR}
            component={CreateAccount}
            initialParams={theme}
          />
          <Stack.Screen
            name={FORGOT_PASSWORD_SCR}
            component={ForgotPassword}
            initialParams={theme}
          />
          <Stack.Screen name={OTP_SCR} component={OTP} initialParams={theme} />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  )
}
