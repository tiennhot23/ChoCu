import React from 'react'
import {SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {Provider as PaperProvider} from 'react-native-paper'

import RootNavigator from './navigations/RootNavigator'
import {useAppTheme} from './common/hooks'

export default function app() {
  const appTheme = useAppTheme()

  return (
    <PaperProvider theme={appTheme}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: appTheme.colors.background}}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  )
}
