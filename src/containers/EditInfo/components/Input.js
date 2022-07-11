import {BaseText, Icon} from '@components'
import React from 'react'
import {TextInput, View} from 'react-native'

export default function Input({title, style}) {
  return (
    <View style={style.border_input}>
      <BaseText text={title} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput style={{flex: 1}} />
        <Icon
          name={'create-outline'}
          size={28}
          color={style.color.secondaryText}
        />
      </View>
    </View>
  )
}
