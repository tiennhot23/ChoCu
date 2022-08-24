import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ListPostTurnServices from './screens/ListPostTurnServices'

const Stack = createNativeStackNavigator()

export default function PostTurnServices({route, navigation}) {
  const {theme, user_id} = route.params
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true, headerShadowVisible: false}}>
      <Stack.Screen
        name={'postturnservices'}
        options={{
          headerTitle: 'Dịch vụ mua lượt đăng tin'
        }}
        component={ListPostTurnServices}
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
