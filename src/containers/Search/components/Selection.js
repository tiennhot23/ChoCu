import {BaseText} from '@components'
import React from 'react'
import {FlatList, Image, View} from 'react-native'

export default function Selection({style, data}) {
  return (
    <View style={style.wrapper}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View style={{flexDirection: 'row'}} key={index}>
            <Image source={{uri: item.icon}} style={{width: 30, height: 30}} />
            <BaseText
              style={{marginHorizontal: 10}}
              text={`${item.title}: ${item.content}`}
            />
          </View>
        )}
      />
    </View>
  )
}
