import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  ADMIN_ACCOUNT_SCR,
  ADMIN_CATEGORY_SCR,
  ADMIN_POST_SCR,
  ADMIN_REPORT_SCR,
  ADMIN_SERVICE_SCR
} from 'src/constants/constant'
import AdminStatManager from '../AdminStatManager'

export default function AddminDashboard({route, navigation, ...props}) {
  const {theme} = route.params

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_POST_SCR)}>
            <Text>Duyệt tin đăng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_REPORT_SCR)}>
            <Text>Bài đăng bị khiếu nại</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_CATEGORY_SCR)}>
            <Text>Quản lí danh mục</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_ACCOUNT_SCR)}>
            <Text>Quản lí tài khoản</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_SERVICE_SCR)}>
            <Text>Quản lí dịch vụ</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AdminStatManager />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  card: {
    width: '40%',
    aspectRatio: 1,
    margin: 20,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25
  }
})
