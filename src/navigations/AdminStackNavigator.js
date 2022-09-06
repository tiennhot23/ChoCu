import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  ADMIN_ACCOUNT_SCR,
  ADMIN_CATEGORY_SCR,
  ADMIN_DASHBOARD_SCR,
  ADMIN_DETAILS_SCR,
  ADMIN_POST_SCR,
  ADMIN_REPORT_SCR,
  ADMIN_SERVICE_SCR,
  CHAT_BOX_SCR,
  POST_SCR,
  USER_INFO_SCR
} from 'src/constants/constant'
import {ThemeConsumer} from 'src/context/ThemeContext'
import {Button, StatusBar, Text} from 'react-native'
import AddminDashboard from 'src/containers/AdminDashboard'
import {useDispatch, useSelector} from 'react-redux'
import {
  requestLogoutAdmin,
  requestLogoutUser
} from 'src/containers/CurrentUser/action'
import {navigateToLoginScreen} from 'src/containers/AppNavigate/action'
import Post from 'src/containers/Post'
import AdminCategoryManager from 'src/containers/AdminCategoryManager'
import AdminPostsManager from 'src/containers/AdminPostsManager'
import AdminReportManager from 'src/containers/AdminReportManager'
import UserInfo from 'src/containers/UserInfo'
import ChatBox from 'src/containers/ChatBox'
import AdminAccountManager from 'src/containers/AdminAccountManager'
import AdminServiceManager from 'src/containers/AdminServiceManager'
import AdminStatManager from 'src/containers/AdminStatManager'
import AdminDetailsManager from 'src/containers/AdminDetailsManager'

const Stack = createNativeStackNavigator()

export default function AdminStackNavigator() {
  const admin = useSelector((state) => state.currentUserReducer.userData)
  const dispatch = useDispatch()
  return (
    <ThemeConsumer>
      {(theme) => {
        return (
          <>
            <StatusBar
              backgroundColor={theme.primaryBackground}
              barStyle="dark-content"
            />
            <Stack.Navigator
              screenOptions={{
                headerShadowVisible: false,
                headerRight: () => (
                  <Text
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      marginVertical: 10,
                      color: 'black'
                    }}
                    onPress={() => {
                      dispatch(requestLogoutAdmin())
                      dispatch(navigateToLoginScreen())
                    }}>
                    Đăng xuất
                  </Text>
                )
              }}>
              <Stack.Group>
                {/* <Stack.Screen
                  name={ADMIN_DASHBOARD_SCR}
                  component={AdminStatManager}
                  initialParams={{theme}}
                /> */}
                <Stack.Screen
                  name={ADMIN_DASHBOARD_SCR}
                  component={AddminDashboard}
                  initialParams={{theme}}
                  options={{
                    headerTitle: ''
                  }}
                />
              </Stack.Group>

              <Stack.Group>
                <Stack.Screen
                  name={ADMIN_CATEGORY_SCR}
                  component={AdminCategoryManager}
                  initialParams={{theme}}
                  options={{
                    headerTitle: 'Quản lí danh mục'
                  }}
                />
                <Stack.Screen
                  name={ADMIN_DETAILS_SCR}
                  component={AdminDetailsManager}
                  initialParams={{theme}}
                  options={{
                    headerTitle: 'Quản lí chi tiết'
                  }}
                />
                <Stack.Screen
                  name={ADMIN_ACCOUNT_SCR}
                  component={AdminAccountManager}
                  initialParams={{theme}}
                  options={{
                    headerTitle: 'Quản lí tài khoản'
                  }}
                />
                <Stack.Screen
                  name={ADMIN_REPORT_SCR}
                  component={AdminReportManager}
                  initialParams={{theme}}
                  options={{
                    headerTitle: 'Quản lí khiếu nại'
                  }}
                />
                <Stack.Screen
                  name={ADMIN_POST_SCR}
                  component={AdminPostsManager}
                  initialParams={{theme}}
                  options={{
                    headerTitle: 'Quản lí bài đăng'
                  }}
                />
                <Stack.Screen
                  name={ADMIN_SERVICE_SCR}
                  component={AdminServiceManager}
                  initialParams={{theme}}
                  options={{
                    headerTitle: 'Quản lí dịch vụ'
                  }}
                />

                <Stack.Screen
                  name={POST_SCR}
                  component={Post}
                  initialParams={{theme}}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name={USER_INFO_SCR}
                  component={UserInfo}
                  initialParams={{theme}}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name={CHAT_BOX_SCR}
                  component={ChatBox}
                  initialParams={{theme}}
                  options={{
                    headerShown: false
                  }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </>
        )
      }}
    </ThemeConsumer>
  )
}
