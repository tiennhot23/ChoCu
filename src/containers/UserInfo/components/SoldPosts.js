import {BaseText} from '@components'
import {font} from '@styles'
import React, {useEffect} from 'react'
import {FlatList, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {requestUserPosts} from '../action'
import PostItem from './PostItem'

export default function SoldPosts({
  color = 'black',
  backgroundColor = 'white',
  navigate,
  push
}) {
  const posts = useSelector((state) => state.userInfoReducer.userPosts)
  const activePosts = posts.filter((e) => e.post_state === 'sold')

  return (
    <View
      style={{
        paddingVertical: 20,
        borderBottomColor: color,
        borderBottomWidth: 0.7
      }}>
      <BaseText
        text={`Tin đã bán: `}
        style={{
          fontSize: font.FONT_SIZE_16,
          color: 'black',
          marginLeft: 4,
          fontWeight: 'bold',
          padding: 5
        }}
      />
      {activePosts.length === 0 && (
        <BaseText
          text={`Không có tin nào`}
          style={{
            fontSize: font.FONT_SIZE_12,
            marginLeft: 4,
            padding: 5,
            alignSelf: 'center'
          }}
        />
      )}
      {activePosts?.map((item) => (
        <PostItem post={item} navigate={navigate} push={push} />
      ))}
    </View>
  )
}
