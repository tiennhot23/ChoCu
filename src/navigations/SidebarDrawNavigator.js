import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import MainStackNavigator from './MainStackNavigator'

const Drawer = createDrawerNavigator()

export default function SidebarDrawNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="MainNav" component={MainStackNavigator} />
    </Drawer.Navigator>
  )
}
