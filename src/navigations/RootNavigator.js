import React, {useState} from 'react'
import AuthStackNavigator from './AuthStackNavigator'
import SidebarDrawNavigator from './SidebarDrawNavigator'

export default function RootNavigator() {
  const [loggedIn, isLoggedIn] = useState(true)
  return <AuthStackNavigator />
}
