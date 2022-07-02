import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import RootNavigator from './navigations/RootNavigator'

export default function app() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}
