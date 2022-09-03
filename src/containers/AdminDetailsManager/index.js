import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import CreateDetails from '../AdminCategoryManager/screens/CreateDetails'
import ListDetails from '../AdminCategoryManager/screens/ListDetails'

const Stack = createNativeStackNavigator()

export default function AdminDetailsManager({route, navigation}) {
  const {theme} = route.params
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, headerShadowVisible: false}}>
      <Stack.Screen
        name={'details'}
        component={ListDetails}
        initialParams={{theme}}
      />
      <Stack.Screen
        name={'createdetails'}
        component={CreateDetails}
        initialParams={{theme}}
      />
    </Stack.Navigator>
  )
}
