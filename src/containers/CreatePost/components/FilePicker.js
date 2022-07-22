import {Icon} from '@components'
import React from 'react'
import {TouchableOpacity, Text, View, TextInput} from 'react-native'
import {height} from 'src/constants/constant'

export default function FilePicker({colors, title, file, icon, onPress}) {
  return (
    <View
      style={{
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.primaryForeground,
        backgroundColor: colors.secondaryBackground,
        borderStyle: 'dashed',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Icon name={icon} size={40} color={colors.primaryForeground} />
        <Text
          style={{
            marginEnd: 5,
            color: colors.secondaryText,
            fontWeight: '800'
          }}>
          {title}
        </Text>
      </View>
    </View>
  )
}
