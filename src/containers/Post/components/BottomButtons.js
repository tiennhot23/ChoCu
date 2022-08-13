import {Icon} from '@components'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

export default function BottomButtons({theme}) {
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
        }}>
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
        }}>
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
        }}>
        <Icon name="wallet-outline" size={20} color={theme.primaryForeground} />
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
