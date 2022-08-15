import {BaseText, Icon} from '@components'
import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import {Avatar} from 'react-native-paper'

export default function UserInfo({
  color = 'black',
  backgroundColor = 'white',
  width = '90%',
  user
}) {
  return (
    <>
      <View
        style={{
          width,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          justifyContent: 'space-between',
          borderBottomColor: color,
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          paddingBottom: 10
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Avatar.Image
            source={{
              uri: user?.avatar
            }}
            size={50}
            style={{alignSelf: 'center'}}
          />
          <View style={{marginStart: 10}}>
            <BaseText
              style={[
                {
                  fontSize: 24,
                  fontWeight: '800',
                  letterSpacing: 0.5,
                  marginVertical: 4,
                  color: 'gray',
                  marginEnd: 30
                },
                {fontSize: 20}
              ]}
              text={user?.name}
            />
            <BaseText
              style={{
                fontSize: 12,
                marginVertical: 4,
                color: 'gray'
              }}
              text={'Trạng thái hoạt động'}
            />
          </View>
        </View>
        <TouchableOpacity>
          <Icon
            name="chatbox-outline"
            style={{
              fontSize: 24,
              color: color,
              backgroundColor: color + 20,
              padding: 8,
              borderRadius: 100
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {'Số điện thoại:'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.5,
            marginVertical: 4,
            color
          }}
          ellipsizeMode={'tail'}>
          {user?.phone}
        </Text>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {'Email:'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.5,
            marginVertical: 4,
            color
          }}
          ellipsizeMode={'tail'}>
          {user?.email}
        </Text>
      </View>
      <View style={{flexDirection: 'row', width}}>
        <Text
          style={{
            fontSize: 14,
            letterSpacing: 0.5,
            marginVertical: 4,
            marginEnd: 10,
            color: color
          }}
          ellipsizeMode={'tail'}>
          {'Địa chỉ:'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.5,
            marginVertical: 4,
            color
          }}
          ellipsizeMode={'tail'}>
          {user?.address}
        </Text>
      </View>
    </>
  )
}
