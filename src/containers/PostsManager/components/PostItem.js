import moment from 'moment'
import React from 'react'
import {Image, View, Text, TouchableOpacity} from 'react-native'

export default function PostItem({
  color = 'black',
  backgroundColor = 'white',
  post,
  onPress
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}
      key={post.post_id}
      onPress={onPress}>
      <Image
        source={{uri: post.picture[0], width: 70, height: 70}}
        style={{aspectRatio: 1, margin: 5}}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 5,
          justifyContent: 'center'
        }}>
        <Text
          style={{
            fontSize: 18,
            color: color
          }}
          ellipsizeMode={'tail'}
          numberOfLines={2}>
          {post.title}
        </Text>
        <Text
          style={{
            color: color
          }}
          ellipsizeMode={'tail'}
          numberOfLines={2}>
          {moment(post.time_created).fromNow()}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          marginVertical: 5,
          color: 'red'
        }}>
        {post.default_price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'VND'
        })}
      </Text>

      {/* <Image
    source={require('../../../assets/images/online_payment.png')}
    style={{width: 80, height: 50, position: 'absolute'}}
    resizeMode={'contain'}
  /> */}
    </TouchableOpacity>
  )
}
