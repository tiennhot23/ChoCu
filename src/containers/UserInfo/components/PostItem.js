import moment from 'moment'
import React from 'react'
import {Image, View, Text, TouchableOpacity} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'
import {POST_SCR} from 'src/constants/constant'

export default function PostItem({
  color = 'black',
  backgroundColor = 'white',
  post,
  navigate,
  push,
  onPress
}) {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'column'
      }}
      key={post.post_id}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={() => push(POST_SCR, {postId: post.post_id})}>
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
            {moment(post.time_updated).fromNow()}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            marginVertical: 5,
            color: 'red'
          }}>
          {post.default_price} d
        </Text>
      </TouchableOpacity>
    </View>
  )
}
