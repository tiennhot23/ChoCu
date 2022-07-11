import {BaseText, Icon} from '@components'
import {dimen} from '@styles'
import React from 'react'
import {Image, View} from 'react-native'
import {calcWidth} from 'src/constants/constant'
import {FONT_SIZE_16} from 'src/styles/fonts'

export default function PostItem({
  title,
  subTitle,
  icon,
  theme,
  sourceIcon,
  subIcon
}) {
  return (
    <View
      style={{
        padding: calcWidth(10),
        flexDirection: 'row'
      }}>
      {icon && (
        <Icon
          name={icon}
          color={theme.colors.primaryForeground}
          size={dimen.largeIcon}
        />
      )}
      {sourceIcon && (
        <Image source={{uri: sourceIcon}} size={dimen.largeIcon} />
      )}
      <View style={{justifyContent: 'center', padding: calcWidth(5)}}>
        <BaseText
          text={title}
          style={{
            color: theme.colors.primaryText,
            marginLeft: 5,
            fontWeight: 'bold',
            fontSize: FONT_SIZE_16
          }}
        />
        {subTitle && (
          <BaseText
            text={subTitle}
            style={{
              color: theme.colors.secondaryText,
              marginLeft: 4
            }}
          />
        )}
      </View>
    </View>
  )
}
