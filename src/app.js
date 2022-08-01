import React from 'react'
import {SafeAreaView, Text} from 'react-native'
import {useAppTheme} from './common/hooks'
import {ThemeProvider} from './context/ThemeContext'

export default function app() {
  const appTheme = useAppTheme()
  return (
    <ThemeProvider value={appTheme}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: appTheme.primaryBackground}}>
        <Text style={{color: appTheme.primaryText}}>TET</Text>
      </SafeAreaView>
    </ThemeProvider>
  )
}
