import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import CreateCategory from './screens/CreateCategory'
import CreateDetails from './screens/CreateDetails'
import ListCateDetails from './screens/ListCateDetails'
import ListCategory from './screens/ListCategory'
import ListDetails from './screens/ListDetails'

const Stack = createNativeStackNavigator()

export default function AdminCategoryManager({route, navigation}) {
  const {theme} = route.params
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true, headerShadowVisible: false}}>
      <Stack.Screen
        name={'cate'}
        component={ListCategory}
        initialParams={{theme}}
      />
      <Stack.Screen
        name={'details'}
        component={ListDetails}
        initialParams={{theme}}
      />
      <Stack.Screen
        name={'catedetails'}
        component={ListCateDetails}
        initialParams={{theme}}
      />
      <Stack.Screen
        name={'createcate'}
        component={CreateCategory}
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
