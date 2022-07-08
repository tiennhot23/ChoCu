import React, {useEffect} from 'react'
import {SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {Provider as PaperProvider} from 'react-native-paper'

import RootNavigator from './navigations/RootNavigator'
import {useAppTheme} from './common/hooks'
import {ThemeConsumer, ThemeProvider} from './context/ThemeContext'
import PushNotification from 'react-native-push-notification'
import {Platform} from 'react-native'

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification)
  },
  requestPermissions: Platform.OS === 'ios'
})

export default function app() {
  const appTheme = useAppTheme()

  useEffect(() => {
    createChannel()
  })

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'channel-id', // (required)
      channelName: 'My channel' // (required)
    })
  }

  // useEffect(() => {
  //   const unsubscribe = firebase
  //     .messaging()
  //     .onMessage(async (remoteMessage) => {
  //       console.log('remoteMessage', JSON.stringify(remoteMessage))
  //       DisplayNotification(remoteMessage)
  //       localDisplayNotification()
  //       // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     })
  //   return unsubscribe
  // }, [])

  // async function DisplayNotification(remoteMessage) {
  //   // Create a channel
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel'
  //   })

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: remoteMessage.notification.title,
  //     body: remoteMessage.notification.body,
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_launcher' // optional, defaults to 'ic_launcher'.
  //     }
  //   })
  // }

  // async function localDisplayNotification() {
  //   // Create a channel
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel'
  //   })

  //   // Display a notification
  //   notifee.displayNotification({
  //     title:
  //       '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
  //     subtitle: '&#129395;',
  //     body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
  //     android: {
  //       channelId,
  //       color: '#4caf50',
  //       actions: [
  //         {
  //           title: '<b>Dance</b> &#128111;',
  //           pressAction: {id: 'dance'}
  //         },
  //         {
  //           title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
  //           pressAction: {id: 'cry'}
  //         }
  //       ]
  //     }
  //   })
  // }

  return (
    <PaperProvider theme={appTheme}>
      <ThemeProvider value={appTheme}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: appTheme.colors.background}}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </PaperProvider>
  )
}
