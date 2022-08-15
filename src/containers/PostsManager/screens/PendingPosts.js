import React, {useState, useEffect} from 'react'
import {FlatList, View} from 'react-native'
import {useSelector} from 'react-redux'
import PostItem from '../components/PostItem'

export default function PendingPosts({route, navigation}) {
  const userPosts = useSelector((state) => state.userPostsReducer.dataUserPosts)
  const [posts, setPosts] = useState([...userPosts])

  useEffect(() => {
    setPosts(userPosts.filter((item) => item.post_state === 'pending'))
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
