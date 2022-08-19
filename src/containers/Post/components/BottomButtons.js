import {Icon} from '@components'
import React from 'react'
import {Platform, Text, TouchableOpacity, View} from 'react-native'
import {CHAT_BOX_SCR, CREATE_DEAL_SCR} from 'src/constants/constant'
import {Linking} from 'react-native'
import {useSelector} from 'react-redux'

export default function BottomButtons({
  theme,
  navigate,
  postId,
  isLoggedIn,
  seller
}) {
  const post = useSelector((state) => state.postReducer.dataPost.post)
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
        onPress={() => Linking.openURL(`tel:${seller.phone}`)}>
        <Icon name="call-outline" size={20} color={theme.primaryText} />
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
          {'Gọi điện'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          height: '100%',
          backgroundColor: '#9f9f9f',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() =>
          Linking.openURL(
            `sms:${seller.phone}${Platform.OS === 'ios' ? '&' : '?'}body=Ê, ${
              post.title
            } còn hàng không mày`
          )
        }>
        <Icon
          type="MaterialCommunityIcons"
          name="message-text"
          size={20}
          color={theme.primaryText}
        />
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
          {'Gửi SMS'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
          height: '100%',
          backgroundColor: '#565656',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          if (isLoggedIn) navigate(CHAT_BOX_SCR, {user: seller})
        }}>
        <Icon name="chatbox-ellipses-outline" size={20} color={'white'} />
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
          {'Chat'}
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
        onPress={() => {
          if (isLoggedIn) navigate(CREATE_DEAL_SCR, {postId})
        }}>
        <Icon name="wallet-outline" size={20} color={theme.primaryBackground} />
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
          {'Mua ngay'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
