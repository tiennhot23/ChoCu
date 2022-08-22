import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {ADMIN_CATEGORY_SCR, ADMIN_POST_SCR} from 'src/constants/constant'

export default function AddminDashboard({route, navigation, ...props}) {
  const {theme} = route.params
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}
          onPress={() => navigation.navigate(ADMIN_POST_SCR)}>
          <Text>Duyệt tin đăng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}>
          <Text>Báo cáo vi phạm</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}
          onPress={() => navigation.navigate(ADMIN_CATEGORY_SCR)}>
          <Text>Quản lí danh mục</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            aspectRatio: 1,
            margin: 20,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primaryBackground,
            borderRadius: 25
          }}>
          <Text>Quản lí người dùng</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
