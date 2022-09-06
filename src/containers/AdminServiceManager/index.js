import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import CreateService from './screens/CreateService'
import ListServices from './screens/ListServices'

const Stack = createNativeStackNavigator()

export default function AdminServiceManager({route, navigation}) {
  const {theme} = route.params
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, headerShadowVisible: false}}>
      <Stack.Screen
        name={'services'}
        component={ListServices}
        initialParams={{theme}}
      />
      <Stack.Screen
        name={'createservices'}
        component={CreateService}
        initialParams={{theme}}
      />
    </Stack.Navigator>
  )
}
