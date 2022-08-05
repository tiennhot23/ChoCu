import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {LogBox, SafeAreaView, Text} from 'react-native'
import {useAppTheme} from './common/hooks'
import {ThemeProvider} from './context/ThemeContext'
import RootNavigator from './navigations/RootNavigator'

export default function app() {
  LogBox.ignoreAllLogs(true)
  const appTheme = useAppTheme()
  return (
    <ThemeProvider value={appTheme}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: appTheme.primaryBackground}}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  )
}
