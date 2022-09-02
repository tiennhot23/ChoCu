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
                headerTitle: admin.name,
                headerShadowVisible: false,
                headerRight: () => (
                  <Text
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      marginVertical: 10
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
                />
              </Stack.Group>

              <Stack.Group
                screenOptions={{
                  headerShown: false
                }}>
                <Stack.Screen
                  name={ADMIN_CATEGORY_SCR}
                  component={AdminCategoryManager}
                  initialParams={{theme}}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={ADMIN_DETAILS_SCR}
                  component={AdminDetailsManager}
                  initialParams={{theme}}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={ADMIN_ACCOUNT_SCR}
                  component={AdminAccountManager}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={ADMIN_REPORT_SCR}
                  component={AdminReportManager}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={ADMIN_POST_SCR}
                  component={AdminPostsManager}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={ADMIN_SERVICE_SCR}
                  component={AdminServiceManager}
                  initialParams={{theme}}
                />

                <Stack.Screen
                  name={POST_SCR}
                  component={Post}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={USER_INFO_SCR}
                  component={UserInfo}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={CHAT_BOX_SCR}
                  component={ChatBox}
                  initialParams={{theme}}
                />
              </Stack.Group>
            </Stack.Navigator>
          </>
        )
      }}
    </ThemeConsumer>
  )
}
