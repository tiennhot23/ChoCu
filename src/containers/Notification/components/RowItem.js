import {BaseText, Icon} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import moment from 'moment'
import React from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {FONT_SIZE_16, FONT_WEIGHT_BOLD} from 'src/styles/fonts'

export default function RowItem({item, index, theme, onRead, onDelete}) {
  const {
    notify_id,
    notify_detail_id,
    notify_type,
    title,
    message,
    time_created,
    isRead
  } = item
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        padding: constant.calcWidth(10),
        margin: 10,
        elevation: 5,
        flexDirection: 'row',
        backgroundColor: isRead
          ? theme.primaryBackground
          : theme.secondaryBackground
      }}
      onPress={() => onRead(index)}>
      {/* {image && (
        <Image
          source={{uri: image}}
          style={{
            width: dimen.largeIcon,
            height: dimen.largeIcon,
            alignSelf: 'center'
          }}
        />
      )} */}
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
            color={theme.primaryText}
            size={FONT_SIZE_16}
            weight={FONT_WEIGHT_BOLD}
            style={{
              marginLeft: 4
            }}
          />
          <BaseText
            text={message}
            color={theme.secondaryText}
            style={{
              marginLeft: 4
            }}
          />
          <BaseText
            text={moment(time_created).fromNow()}
            color={theme.secondaryText}
            style={{
              marginLeft: 4
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'center'
        }}
        onPress={() => onDelete(index)}>
        <Icon
          name="trash-outline"
          color={theme.primaryText}
          size={constant.smallIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
