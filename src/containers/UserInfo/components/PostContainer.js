import {BaseText} from '@components'
import React from 'react'
import {View} from 'react-native'

export default function PostContainer({style, title, onMorePress}) {
  return (
    <View style={style.posts_container}>
      <BaseText text={`${title}`} style={style.bold_text} />
      <View style={style.list_container}>
        <View
          style={{
            height: 150,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <BaseText text={`Không có tin nào`} style={style.nor_text} />
        </View>
      </View>
      <BaseText text={`Xem thêm >>`} style={style.link_text} />
    </View>
  )
}
