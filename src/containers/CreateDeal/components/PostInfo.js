import moment from 'moment'
import React from 'react'
import {View, Image, Text} from 'react-native'

export default function PostInfo({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  post
}) {
  return (
    <View
      style={{
        width,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <Image
        source={{uri: post.picture[0], width: 100, height: 100}}
        style={{aspectRatio: 1, margin: 5}}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 5
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '800',
            letterSpacing: 0.5,
            marginVertical: 4,
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
          {moment(post.time_updated).fromNow()}
        </Text>
      </View>
    </View>
  )
}
