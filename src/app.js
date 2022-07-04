import React from 'react'
import {SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {Provider as PaperProvider} from 'react-native-paper'

import RootNavigator from './navigations/RootNavigator'
import {useAppTheme} from './common/hooks'
import {ThemeConsumer, ThemeProvider} from './context/ThemeContext'

export default function app() {
  const appTheme = useAppTheme()

  return (
    <PaperProvider theme={appTheme}>
      <ThemeProvider value={appTheme}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: appTheme.colors.background}}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </PaperProvider>
  )
}
