import {BaseText} from '@components'
import React from 'react'
import {View} from 'react-native'

export default function RowItem({style, title, content}) {
  return (
    <View style={style.row_item}>
      <BaseText
        text={title}
        style={[style.nor_text, {color: style.color.primaryText, fontSize: 16}]}
      />
      <BaseText text={content} style={[style.nor_text]} />
    </View>
  )
}
