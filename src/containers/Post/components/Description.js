import {BaseText} from '@components'
import React from 'react'
import {Image, View} from 'react-native'

export default function Description({style, description, details}) {
  return (
    <View style={style.sub_container}>
      <BaseText
        style={[
          style.small_text,
          {
            letterSpacing: 1,
            maxWidth: '85%'
          }
        ]}
        text={description}
      />
      {details?.map((value, index, array) => (
        <View style={style.details_item} key={index}>
          <Image
            source={{uri: value.details_icon}}
            style={{width: 30, height: 30}}
          />
          <BaseText
            style={{marginHorizontal: 10}}
            text={`${value.details_title}: ${value.content}`}
          />
        </View>
      ))}
    </View>
  )
}
