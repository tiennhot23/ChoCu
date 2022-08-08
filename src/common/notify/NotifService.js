import PushNotification, {Importance} from 'react-native-push-notification'
import NotificationHandler from './NotificationHandler'

class NotifService {
  constructor(onRegister, onNotification) {
    this.lastId = 0
    this.lastChannelCounter = 0
    this.createDefaultChannels()
    NotificationHandler.attachRegister(onRegister)
    NotificationHandler.attachNotification(onNotification)
    //clear badge number when start app
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0)
      }
    })
    PushNotification.getChannels((channels) => {
      console.log('All channelId', channels)
    })
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'chocu-channel-id', // (required)
        channelName: 'ChoCu channel', // (required)
        importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
        playSound: true,
        soundName: 'default'
      },
      (created) =>
        console.log(
          `Local channelId 'chocu-channel-id' ${
            created ? 'created' : 'existed'
          }`
        )
    )
    PushNotification.createChannel(
      {
        channelId: 'sound-channel-id', // (required)
        channelName: 'Sound channel', // (required)
        importance: Importance.HIGH // (optional) default: 4. Int value of the Android notification importance
      },
      (created) =>
        console.log(
          `Local channelId 'sound-channel-id' ${
            created ? 'created' : 'existed'
          }`
        )
    )
  }

  createOrUpdateChannel = () => {
    this.lastChannelCounter += 1
    PushNotification.createChannel(
      {
        channelId: 'custom-channel-id', // (required)
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => {
        console.log(
          `channelId 'custom-channel-id' ${created ? 'created' : 'existed'}`
        ) // (optional) callback returns whether the channel was created, false means it already existed.
      }
    )
  }

  localNotify = (notification) => {
    this.lastId += 1
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'chocu-channel-id',
      // ticker: 'My Notification Ticker', // (optional)
      //   showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      // largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      // smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      // bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      // subText: 'This is a subText', // (optional) default: none
      //   bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      //   bigLargeIcon: 'ic_launcher', // (optional) default: undefined
      //   bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
      color: '#FF0000', // (optional) default: system default
      //   vibrate: true, // (optional) default: true
      //   vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      //   tag: '', // (optional) add tag to message
      group: 'ChoCu', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      //   priority: 'high', // (optional) set notification priority, default: high
      //   visibility: 'private', // (optional) set notification visibility, default: private
      //   ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      //   shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      //   onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
      // actions: ['Bỏ qua', 'Xem'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      // timeoutAfter: 5000, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      //   messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: '', // (optional) default: empty string
      //   subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: notification.title, // (optional)
      message: notification.message, // (required)
      // userInfo: notification.data, // (optional) default: {} (using null throws a JSON value '<null>' error)
      userInfo: {id: '1', ...notification.data}, // for iOS
      importance: 'high',
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10 // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    })
  }

  scheduleNotif = (soundName) => {
    this.lastId += 1
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30 * 1000), // in 30 secs
      /* Android Only Properties */
      channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
      ticker: 'My Notification Ticker', // (optional)
      //   showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      //   bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      //   bigLargeIcon: 'ic_launcher', // (optional) default: undefined
      //   bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
      color: '#0000FF', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      //   priority: 'high', // (optional) set notification priority, default: high
      //   visibility: 'private', // (optional) set notification visibility, default: private
      //   ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      //   shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      //   onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      //   messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: '', // (optional) default: empty string
      //   subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: 'Scheduled Notification', // (optional)
      message: 'My Notification Message', // (required)
      userInfo: {sceen: 'home'}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: !!soundName, // (optional) default: true
      soundName: soundName || 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10 // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    })
  }

  checkPermissions = (cbk) => {
    return PushNotification.checkPermissions(cbk)
  }

  requestPermissions = () => {
    return PushNotification.requestPermissions()
  }

  cancelNotification = () => {
    PushNotification.cancelLocalNotifications({id: `${this.lastId}`})
  }

  cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications()
  }

  abandonPermissions = () => {
    PushNotification.abandonPermissions()
  }

  getScheduledLocalNotifications = (callback) => {
    PushNotification.getScheduledLocalNotifications(callback)
  }

  getDeliveredNotifications = (callback) => {
    PushNotification.getDeliveredNotifications(callback)
  }
}
export default NotifService
