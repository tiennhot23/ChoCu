import {Icon} from '@components'
import {constant} from '@constants'
import React from 'react'
import {Text, View} from 'react-native'

export default function Header({colors}) {
  return (
    <View
      style={{
        backgroundColor: colors.primaryForeground,
        height: constant.headerHeight,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <Text
        style={{fontSize: 20, color: colors.primaryText, fontWeight: '800'}}>
        Đăng tin
      </Text>
      <Icon
        name="close-outline"
        size={28}
        color={colors.primaryText}
        style={{
          position: 'absolute',
          right: 0
        }}
      />
    </View>
  )
}
