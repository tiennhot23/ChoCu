import React, {useEffect, useState} from 'react'
import {FlatList, View} from 'react-native'
import {useSelector} from 'react-redux'
import {POST_SCR} from 'src/constants/constant'
import PostItem from '../components/PostItem'

export default function ActivePosts({route, navigation}) {
  const userPosts = useSelector((state) => state.userPostsReducer.dataUserPosts)
  const [posts, setPosts] = useState([...userPosts])

  useEffect(() => {
    console.log('changed')
    setPosts(userPosts.filter((item) => item.post_state === 'active'))
  }, [userPosts])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        renderItem={({item, index}) => (
          <PostItem
            post={item}
            onPress={() =>
              navigation.navigate(POST_SCR, {postId: item.post_id})
            }
          />
        )}
      />
    </View>
  )
}
