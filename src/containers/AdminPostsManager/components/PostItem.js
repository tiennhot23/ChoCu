import moment from 'moment'
import React from 'react'
import {Image, View, Text, TouchableOpacity} from 'react-native'
import {Rating, AirbnbRating} from 'react-native-ratings'

export default function PostItem({
  color = 'black',
  backgroundColor = 'white',
  post,
  onPress,
  onActionPress
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
            {}
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
      </TouchableOpacity>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: color,
          borderBottomWidth: 1,
          borderStyle: 'dotted'
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: 200,
            alignItems: 'flex-start'
          }}>
          <Text numberOfLines={2} style={{color: 'gray'}}>
            {post.sell_address}
          </Text>
        </View>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            alignSelf: 'center',
            color: 'gray'
          }}>
          {moment(post.time_updated).fromNow()}
        </Text>
      </View>
    </View>
  )
}
