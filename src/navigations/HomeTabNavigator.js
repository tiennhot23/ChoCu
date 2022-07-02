import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from 'src/containers/Home'
import PostsManager from 'src/containers/PostsManager'
import CreatePost from 'src/containers/CreatePost'
import Personal from 'src/containers/Personal'
import {
  CREATE_POST_SCR,
  HOME_SCR,
  PERSONAL_SCR,
  POSTS_MANAGER_SCR
} from 'src/constants/constant'

const Tab = createBottomTabNavigator()

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={HOME_SCR} component={Home} />
      <Tab.Screen name={POSTS_MANAGER_SCR} component={PostsManager} />
      <Tab.Screen name={CREATE_POST_SCR} component={CreatePost} />
      <Tab.Screen name={PERSONAL_SCR} component={Personal} />
    </Tab.Navigator>
  )
}
