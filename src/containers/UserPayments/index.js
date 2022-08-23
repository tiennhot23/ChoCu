import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ListUserPayments from './screens/ListUserPayments'

const Stack = createNativeStackNavigator()

export default function UserOPayments({route, navigation}) {
  const {theme, user_id} = route.params
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true, headerShadowVisible: false}}>
      <Stack.Screen
        name={'userpayments'}
        component={ListUserPayments}
        initialParams={{theme, user_id}}
      />
      {/* <Stack.Screen
          name={'onlinepayments'}
          component={CreateDetails}
          initialParams={{theme}}
        /> */}
    </Stack.Navigator>
  )
}
