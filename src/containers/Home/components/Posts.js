import {constant} from '@constants'
import React from 'react'
import {FlatList, Image, View, Text} from 'react-native'
import {FONT_SIZE_16} from 'src/styles/fonts'

export function PostsHeader({style}) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: style.colors.primaryBackground,
        borderTopColor: style.colors.secondaryBackground,
        borderTopWidth: 10
      }}>
      <Text
        style={{
          fontSize: FONT_SIZE_16,
          color: style.colors.primaryText,
          fontWeight: '600',
          letterSpacing: 1
        }}>
        Các bài đăng dành cho bạn
      </Text>
    </View>
  )
}

export const PostCard = ({
  style,
  id,
  image,
  title,
  price,
  time,
  location,
  haveOnlinePayment
}) => {
  return (
    <View
      style={{
        width: '50%',
        padding: 10,
        flexDirection: 'column'
      }}
      key={id}>
      <Image source={{uri: image}} style={{width: '100%', aspectRatio: 1}} />
      <Text
        style={{
          fontSize: 18,
          color: style.colors.primaryText
        }}
        ellipsizeMode={'tail'}
        numberOfLines={2}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          marginVertical: 5,
          color: style.colors.red
        }}>
        {price} d
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Text
          style={{
            color: style.colors.secondaryText
          }}
          ellipsizeMode={'tail'}
          numberOfLines={2}>
          {time}
        </Text>
        <Text
          style={{
            color: style.colors.secondaryText
          }}
          ellipsizeMode={'tail'}
          numberOfLines={2}>
          {location}
        </Text>
      </View>
      <Image
        source={require('../../../assets/images/online_payment.png')}
        style={{width: 80, height: 50, position: 'absolute'}}
        resizeMode={'contain'}
      />
    </View>
  )
}
