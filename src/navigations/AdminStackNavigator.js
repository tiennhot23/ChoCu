import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  ADMIN_ACCOUNT_SCR,
  ADMIN_CATEGORY_SCR,
  ADMIN_DASHBOARD_SCR,
  ADMIN_POST_SCR,
  ADMIN_REPORT_SCR,
  POST_SCR
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
import AdminPostManager from 'src/containers/AdminPostManager'
import Post from 'src/containers/Post'
import AdminCategoryManager from 'src/containers/AdminCategoryManager'

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
                <Stack.Screen
                  name={ADMIN_DASHBOARD_SCR}
                  component={AddminDashboard}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={ADMIN_CATEGORY_SCR}
                  component={AdminCategoryManager}
                  initialParams={{theme}}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={ADMIN_ACCOUNT_SCR}
                  component={AddminDashboard}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={ADMIN_REPORT_SCR}
                  component={AddminDashboard}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={ADMIN_POST_SCR}
                  component={AdminPostManager}
                  initialParams={{theme}}
                />

                <Stack.Screen
                  name={POST_SCR}
                  component={Post}
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
