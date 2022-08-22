import {Icon} from '@components'
import React, {useEffect} from 'react'
import {Platform, Text, TouchableOpacity, View} from 'react-native'
import {CHAT_BOX_SCR, CREATE_DEAL_SCR} from 'src/constants/constant'
import {Linking} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {approvePost, denyPost} from 'src/containers/AdminPostManager/action'

export default function BottomAdminButtons({theme, navigation}) {
  const post = useSelector((state) => state.postReducer.dataPost.post)
  const postsState = useSelector(
    (state) => state.adminPostsManagerReducer.postsState
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (postsState.isActionDone) navigation.goBack()
  }, [postsState])

  return (
    <View
      style={{
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white'
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          height: '100%',
          backgroundColor: '#dbdbdb',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => dispatch(denyPost({post_id: post.post_id}))}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: '800',
            letterSpacing: 1,
            marginLeft: 5,
            color: theme.primaryText,
            textTransform: 'uppercase'
          }}>
          {'Từ chối'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          height: '100%',
          backgroundColor: '#090909',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => dispatch(approvePost({post_id: post.post_id}))}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: '800',
            letterSpacing: 1,
            marginLeft: 5,
            color: 'white',
            textTransform: 'uppercase'
          }}>
          {'Duyệt'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
