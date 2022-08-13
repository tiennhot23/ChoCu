import React from 'react'
import {FlatList, View} from 'react-native'
import {useSelector} from 'react-redux'
import PostItem from '../components/PostItem'

export default function ActivePosts() {
  const userPosts = useSelector((state) => state.userPostsReducer.dataUserPosts)
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={userPosts.filter((item) => item.post_state === 'active')}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        renderItem={({item, index}) => <PostItem post={item} />}
      />
    </View>
  )
}
