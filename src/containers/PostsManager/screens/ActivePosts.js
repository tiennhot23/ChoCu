import React, {useEffect, useState} from 'react'
import {FlatList, Image, View} from 'react-native'
import {useSelector} from 'react-redux'
import {POST_SCR} from 'src/constants/constant'
import PostItem from '../components/PostItem'

export default function ActivePosts({route, navigation}) {
  const userPosts = useSelector((state) => state.userPostsReducer.dataUserPosts)
  const [posts, setPosts] = useState([...userPosts])

  useEffect(() => {
    console.log('changed')
    setPosts(
      userPosts
        .filter((item) => item.post_state === 'active')
        .sort((a, b) => b.time_updated.localeCompare(a.time_updated))
    )
  }, [userPosts])

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
              onPress={() =>
                navigation.navigate(POST_SCR, {
                  postId: item.post_id,
                  onGoBack: () => navigation.jumpTo('HIDDENPOSTS')
                })
              }
            />
          )}
        />
      )}
    </View>
  )
}
