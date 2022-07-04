import React, {useEffect, useState} from 'react'
import {
  createDrawerNavigator,
  useDrawerProgress
} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, {
  interpolateNode,
  useAnimatedStyle,
  Extrapolation
} from 'react-native-reanimated'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {StyleSheet} from 'react-native'
import {DrawerContent} from 'src/containers/Sidebar'
import MainStackNavigator from './MainStackNavigator'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const Screens = ({navigation}) => {
  const progress = useDrawerProgress()

  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  })
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 10]
  })

  const animatedStyles = {borderRadius, transform: [{scale}]}

  return (
    <Animated.View style={[styles.stack, animatedStyles]}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <Icon
              name="menu-outline"
              color={'black'}
              size={28}
              onPress={() => navigation.openDrawer()}
            />
          )
        }}>
        <Stack.Screen name="MainNav">
          {(props) => <MainStackNavigator {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  )
}

export default function SidebarNavigation() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent',
        sceneContainerStyle: {backgroundColor: 'transparent'},
        drawerStyle: styles.drawerStyles,
        drawerContentContainerStyle: {flex: 1}
      }}>
      <Drawer.Screen name="Screens">
        {(props) => <Screens {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: 'hidden'
  },
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'}
})
