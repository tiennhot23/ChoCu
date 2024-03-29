import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  ADMIN_CATEGORY_SCR,
  AUTH_NAV,
  BUY_DEALS_MANAGER_SCR,
  CHAT_BOX_SCR,
  CHAT_SCR,
  CREATE_DEAL_SCR,
  CREATE_POST_SCR,
  DEALS_MANAGER_SCR,
  DEAL_SCR,
  EDIT_INFO_SCR,
  HOME_NAV,
  POSTS_MANAGER_SCR,
  POST_SCR,
  POST_TURN_SERVICES_SCR,
  SEARCH_SCR,
  SELL_DEALS_MANAGER_SCR,
  USER_INFO_SCR,
  USER_PAYMENT_SCR,
  USER_REVENUE_STAT_SCR
} from 'src/constants/constant'
import HomeTabNavigator from './HomeTabNavigator'
import UserInfo from 'src/containers/UserInfo'
import {ThemeConsumer} from 'src/context/ThemeContext'
import EditInfo from 'src/containers/EditInfo'
import Post from 'src/containers/Post'
import {Button, StatusBar} from 'react-native'
import Search from 'src/containers/Search'
import CreatePost from 'src/containers/CreatePost'
import CreateDeal from 'src/containers/CreateDeal'
import SellDealManager from 'src/containers/SellDealManager'
import BuyDealManager from 'src/containers/BuyDealManager'
import Deal from 'src/containers/Deal'
import Chat from 'src/containers/Chat'
import ChatBox from 'src/containers/ChatBox'
import AuthStackNavigator from './AuthStackNavigator'
import UserPayments from 'src/containers/UserPayments'
import PostTurnServices from 'src/containers/PostTurnServices'
import PostsManager from 'src/containers/PostsManager'
import UserRevenueStat from 'src/containers/UserRevenueStat'

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  return (
    <ThemeConsumer>
      {(theme) => {
        return (
          <>
            <StatusBar
              backgroundColor={theme.primaryBackground}
              barStyle="dark-content"
            />
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name={HOME_NAV}
                component={HomeTabNavigator}
              />
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen
                  name={CHAT_SCR}
                  component={Chat}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={CHAT_BOX_SCR}
                  component={ChatBox}
                  initialParams={{theme}}
                  options={{
                    headerShown: true,
                    headerShadowVisible: false
                  }}
                />
                <Stack.Screen
                  name={POST_SCR}
                  component={Post}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={SEARCH_SCR}
                  component={Search}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={CREATE_POST_SCR}
                  component={CreatePost}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={CREATE_DEAL_SCR}
                  component={CreateDeal}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={SELL_DEALS_MANAGER_SCR}
                  component={SellDealManager}
                  initialParams={theme}
                  options={{
                    headerShown: true,
                    headerTitle: 'Giao dịch bán',
                    headerShadowVisible: false
                  }}
                />
                <Stack.Screen
                  name={BUY_DEALS_MANAGER_SCR}
                  component={BuyDealManager}
                  initialParams={theme}
                  options={{
                    headerShown: true,
                    headerTitle: 'Giao dịch mua',
                    headerShadowVisible: false
                  }}
                />
                <Stack.Screen
                  name={DEAL_SCR}
                  component={Deal}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={EDIT_INFO_SCR}
                  component={EditInfo}
                  initialParams={theme}
                />
                <Stack.Screen
                  name={USER_INFO_SCR}
                  component={UserInfo}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={AUTH_NAV}
                  component={AuthStackNavigator}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={USER_PAYMENT_SCR}
                  component={UserPayments}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={POST_TURN_SERVICES_SCR}
                  component={PostTurnServices}
                  initialParams={{theme}}
                />
                <Stack.Screen
                  name={POSTS_MANAGER_SCR}
                  component={PostsManager}
                  initialParams={theme}
                  options={{
                    headerShown: true,
                    headerTitle: 'Quản lí bài đăng',
                    headerShadowVisible: false
                  }}
                />
                <Stack.Screen
                  name={USER_REVENUE_STAT_SCR}
                  component={UserRevenueStat}
                  initialParams={{theme}}
                  options={{
                    headerShown: true,
                    headerTitle: 'Thống kê doanh thu bán hàng',
                    headerShadowVisible: false
                  }}
                />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: theme.primaryForeground
                  }
                }}></Stack.Group>
            </Stack.Navigator>
          </>
        )
      }}
    </ThemeConsumer>
  )
}
