import {BaseText, Icon} from '@components'
import {constant} from '@constants'
import React from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {FONT_SIZE_16} from 'src/styles/fonts'

export default function PersonalFuncItem({
  title,
  subTitle,
  icon,
  theme,
  sourceIcon,
  subIcon,
  onPress
}) {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row'
      }}>
      {icon && (
        <Icon
          name={icon}
          color={theme.primaryForeground}
          size={constant.normalIcon}
        />
      )}
      {sourceIcon && (
        <Image source={{uri: sourceIcon}} size={constant.largeIcon} />
      )}
      <TouchableOpacity
        activeOpacity={1}
        style={{justifyContent: 'center', padding: 10}}
        onPress={onPress}>
        <BaseText
          text={title}
          style={{
            color: theme.primaryText,
            marginLeft: 5,
            fontWeight: 'bold',
            fontSize: FONT_SIZE_16
          }}
        />
        {subTitle && (
          <BaseText
            text={subTitle}
            style={{
              color: theme.secondaryText,
              marginLeft: 4
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}
