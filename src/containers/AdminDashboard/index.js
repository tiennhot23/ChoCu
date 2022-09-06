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
  ADMIN_DETAILS_SCR,
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
          flex: 1,
          backgroundColor: theme.primaryBackground
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_POST_SCR)}>
            <Text style={style.text}>Duyệt tin đăng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_REPORT_SCR)}>
            <Text style={style.text}>Bài đăng bị khiếu nại</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_CATEGORY_SCR)}>
            <Text style={style.text}>Quản lí danh mục</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_DETAILS_SCR)}>
            <Text style={style.text}>Quản lí chi tiết</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_ACCOUNT_SCR)}>
            <Text style={style.text}>Quản lí tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.card]}
            onPress={() => navigation.navigate(ADMIN_SERVICE_SCR)}>
            <Text style={style.text}>Quản lí dịch vụ</Text>
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
    height: 80,
    margin: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d7d9',
    borderRadius: 10,
    borderWidth: 1
  },
  text: {
    color: 'black'
  }
})
