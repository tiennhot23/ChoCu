import {constant} from '@constants'
import React from 'react'
import {FlatList, Image, View, Text, TouchableOpacity} from 'react-native'
import {FONT_SIZE_16} from 'src/styles/fonts'

export function PostsHeader({color = 'black', backgroundColor = 'white'}) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: backgroundColor,
        borderTopColor: backgroundColor,
        borderTopWidth: 10
      }}>
      <Text
        style={{
          fontSize: FONT_SIZE_16,
          color: color,
          fontWeight: '600',
          letterSpacing: 1
        }}>
        Các bài đăng phù hợp
      </Text>
    </View>
  )
}

export const PostCard = ({
  theme,
  id,
  image,
  title,
  price,
  time,
  location,
  haveOnlinePayment,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={{
        width: '50%',
        padding: 10,
        flexDirection: 'column'
      }}
      key={id}
      onPress={() => onPress(id)}>
      <Image source={{uri: image}} style={{width: '100%', aspectRatio: 1}} />
      <Text
        style={{
          fontSize: 18,
          color: theme.primaryText
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
          color: theme.red
        }}>
        {price.toLocaleString('en-US', {style: 'currency', currency: 'VND'})}
      </Text>
      <Text
        style={{
          color: theme.secondaryText
        }}
        ellipsizeMode={'tail'}
        numberOfLines={2}>
        {location}
      </Text>
      <Text
        style={{
          color: theme.secondaryText
        }}
        ellipsizeMode={'tail'}
        numberOfLines={2}>
        {time}
      </Text>
      {/* <Image
        source={require('../../../assets/images/online_payment.png')}
        style={{width: 80, height: 50, position: 'absolute'}}
        resizeMode={'contain'}
      /> */}
    </TouchableOpacity>
  )
}
