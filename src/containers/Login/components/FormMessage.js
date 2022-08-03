import React from 'react'
import {Text, View} from 'react-native'
import {BaseText} from '@components'

export default function FormMessage({message, messageType}) {
  return (
    <View
      style={{
        width: 255
      }}>
      <BaseText
        color={messageType === 'error' ? 'red' : 'black'}
        text={message}
      />
    </View>
  )
}
