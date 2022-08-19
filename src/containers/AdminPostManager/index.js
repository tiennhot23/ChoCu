import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, Image, FlatList, Text} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {baseUrl} from 'src/constants/api'
import {POST_SCR} from 'src/constants/constant'
import {requestPendingPosts} from './action'

export default function AdminPostManager({
  route,
  navigation,
  color = 'black',
  backgroundColor = 'white',
  ...props
}) {
  const posts = useSelector((state) => state.adminPostsManagerReducer.postsData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestPendingPosts())
  }, [])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            key={item.post_id}
            onPress={() =>
              navigation.navigate(POST_SCR, {postId: item.post_id})
            }>
            <Image
              source={{uri: item.picture[0], width: 70, height: 70}}
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
                {item.title}
              </Text>
              <Text
                style={{
                  color: color
                }}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {moment(item.time_updated).fromNow()}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                marginVertical: 5,
                color: 'red'
              }}>
              {item.default_price} d
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
