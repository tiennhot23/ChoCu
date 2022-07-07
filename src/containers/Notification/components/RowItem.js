import {BaseText, Icon} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import moment from 'moment'
import React from 'react'
import {Image, View} from 'react-native'
import {calcWidth} from 'src/constants/constant'
import {FONT_SIZE_16} from 'src/styles/fonts'

export default function RowItem({title, content, image, time, theme, isRead}) {
  return (
    <View
      style={{
        padding: calcWidth(10),
        flexDirection: 'row',
        backgroundColor: isRead
          ? theme.colors.primaryBackground
          : theme.colors.secondaryBackground,
        borderBottomWidth: 0.7,
        borderBottomColor: theme.colors.primaryForeground
      }}>
      {image && (
        <Image
          source={{uri: image}}
          style={{
            width: dimen.largeIcon,
            height: dimen.largeIcon,
            alignSelf: 'center'
          }}
        />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: 'row'
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10
          }}>
          <BaseText
            text={title}
            style={{
              fontSize: FONT_SIZE_16,
              color: theme.colors.primaryText,
              marginLeft: 4,
              fontWeight: 'bold'
            }}
          />
          <BaseText
            text={content}
            style={{
              color: theme.colors.secondaryText,
              marginLeft: 4
            }}
          />
          <BaseText
            text={moment(time).fromNow()}
            style={{
              color: theme.colors.secondaryText,
              marginLeft: 4
            }}
          />
        </View>
      </View>
      <Icon
        name="trash-outline"
        color={theme.colors.primaryText}
        size={dimen.smallIcon}
        style={{
          alignSelf: 'center'
        }}
      />
    </View>
  )
}
