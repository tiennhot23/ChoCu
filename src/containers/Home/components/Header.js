import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {Icon} from '@components'

export default function Header({theme, onSearchBarPress, onChatBoxPress}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          fontSize: 20,
          color: theme.primaryText,
          padding: 12,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: theme.primaryForeground,
          borderWidth: 1
        }}
        activeOpacity={0}
        onPress={onSearchBarPress}>
        <Text>Tìm kiếm trên chợ cũ</Text>
        <Icon name="search-outline" size={24} color={theme.primaryText} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onChatBoxPress}>
        <Icon
          name="chatbox-outline"
          style={{
            fontSize: 24,
            color: theme.backgroundMedium,
            padding: 12
          }}
        />
      </TouchableOpacity>
    </View>
  )
}
