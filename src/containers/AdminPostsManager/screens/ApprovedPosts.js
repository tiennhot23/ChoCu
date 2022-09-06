import React, {useEffect, useState} from 'react'
import {FlatList, Image, View} from 'react-native'
import {useSelector} from 'react-redux'
import {DEAL_SCR, POST_SCR} from 'src/constants/constant'
import PostItem from '../components/PostItem'

export default function ApprovedPosts({route, navigation}) {
  const postsData = useSelector(
    (state) => state.adminPostsManagerReducer.postsData
  )
  const [posts, setPosts] = useState([...postsData])

  useEffect(() => {
    let a = postsData.filter(
      (item) =>
        item.post_state === 'active' ||
        item.post_state === 'hidden' ||
        item.post_state === 'sold'
    )
    a = a.sort((a, b) => b.time_updated.localeCompare(a.time_updated))

    setPosts(a)
  }, [postsData])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {posts.length === 0 ? (
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGQUxg5bo2JPoK87B8lN9hrwXGYAHVNmvO8nryc56N8YrVms-dI403_VM5ZQ2pnRcvuw&usqp=CAU'
          }}
          style={{
            width: '50%',
            height: '50%',
            alignSelf: 'center',
            justifyContent: 'center'
          }}
          resizeMode="contain"
        />
      ) : (
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          renderItem={({item, index}) => (
            <PostItem
              post={item}
              onPress={() => {
                navigation.navigate(POST_SCR, {
                  postId: item.post_id,
                  onActionDone: () => {
                    navigation.jumpTo('DELETEDPOSTS')
                  }
                })
              }}
            />
          )}
        />
      )}
    </View>
  )
}
