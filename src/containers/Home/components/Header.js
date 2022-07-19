import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {Icon} from '@components'

export default function Header({style, onSearchBarPress, onChatBoxPress}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: style.colors.primaryForeground,
        alignItems: 'center'
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          fontSize: 20,
          color: style.colors.primaryText,
          padding: 12,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: style.colors.primaryBackground
        }}
        onPress={onSearchBarPress}>
        <Text>Tìm kiếm trên chợ cũ</Text>
        <Icon
          name="search-outline"
          size={24}
          color={style.colors.primaryText}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onChatBoxPress}>
        <Icon
          name="chatbox-outline"
          style={{
            fontSize: 24,
            color: style.colors.backgroundMedium,
            padding: 12
          }}
        />
      </TouchableOpacity>
    </View>
  )
}
