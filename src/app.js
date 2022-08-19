import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect, useRef, useState} from 'react'
import {AppState, LogBox, SafeAreaView, Text} from 'react-native'
import {useAppTheme} from './common/hooks'
import {getItem} from './common/storage'
import {CURRENT_USER} from './constants/storage'
import {ThemeProvider} from './context/ThemeContext'
import RootNavigator from './navigations/RootNavigator'
import database from '@react-native-firebase/database'

export default function app() {
  const [u, setU] = useState(null)

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = (nextAppState) => {
    console.log(nextAppState)
    if (nextAppState === 'active') {
      getItem(CURRENT_USER)
        .then((res) => {
          return JSON.parse(res)
        })
        .then((user) => {
          setU(user)
          if (user?.user_id)
            database()
              .ref(`/users/${user.user_id}`)
              .set({
                ...user,
                isOnline: true
              })
        })
    } else {
      if (u?.user_id)
        database()
          .ref(`/users/${u.user_id}`)
          .update({
            ...u,
            isOnline: false
          })
          .then((val) => console.log(val))
    }
  }
  // const sub = AppState.addEventListener('change', handleAppStateChange)
  useEffect(() => {
    const getCurrentUser = async () => {
      let u = JSON.parse(await getItem(CURRENT_USER))
      await database()
        .ref(`/users/${u.user_id}`)
        .set({
          ...u,
          isOnline: true
        })
      return u
    }

    const user = getCurrentUser()

    return () => {
      // sub.remove()
      if (user)
        database()
          .ref(`/users/${user.user_id}`)
          .set({
            ...user,
            isOnline: false
          })
    }
  }, [])

  LogBox.ignoreAllLogs(true)
  const appTheme = useAppTheme()
  return (
    <ThemeProvider value={appTheme}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: appTheme.primaryBackground}}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  )
}
