import {helper} from '@common'
import {BaseText, Icon} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import React, {Component, useEffect, useState} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {Avatar} from 'react-native-paper'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getItem} from 'src/common/storage'
import {
  AUTH_NAV,
  BUY_DEALS_MANAGER_SCR,
  SELL_DEALS_MANAGER_SCR
} from 'src/constants/constant'
import {CURRENT_USER} from 'src/constants/storage'
import * as AppNavigateActionCreator from '../AppNavigate/action'

import {
  removeUser,
  requestLogoutUser,
  requestUserData
} from '../CurrentUser/action'
import FooterButton from './components/FooterButton'
import Header from './components/Header'
import PersonalFuncItem from './components/PersonalFuncItem'

class Personal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.route.params
    }
  }

  handleLogin = () => {
    this.props.appNavigate.navigateToLoginScreen()
  }

  handleLogout = () => {
    this.props.removeCurrentUser()
    this.props.appNavigate.navigateToLoginScreen()
  }

  render() {
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    const {isLoggedIn} = this.props
    return (
      <ScrollView style={style.wrapper}>
        {isLoggedIn && (
          <>
            <Header navigate={navigate} />
            <PersonalFuncItem
              title={'Giao dịch bán'}
              icon={'swap-horizontal-outline'}
              theme={theme}
              onPress={() => navigate(SELL_DEALS_MANAGER_SCR)}
            />
            <PersonalFuncItem
              title={'Giao dịch mua'}
              icon={'swap-horizontal-outline'}
              theme={theme}
              onPress={() => navigate(BUY_DEALS_MANAGER_SCR)}
            />
          </>
        )}
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              marginVertical: 20,
              borderTopWidth: 0.5,
              borderTopColor: theme.secondForeground,
              paddingVertical: 20
            }
          ]}>
          <FooterButton
            title={isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
            onPress={isLoggedIn ? this.handleLogout : this.handleLogin}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.currentUserReducer.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
  getDataCurrentUser: bindActionCreators(requestUserData, dispatch),
  removeCurrentUser: bindActionCreators(requestLogoutUser, dispatch),
  appNavigate: bindActionCreators(AppNavigateActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Personal)

const initStyle = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: dimen.wrapper_padding,
      backgroundColor: theme.primaryBackground,
      padding: dimen.wrapper_padding
    },
    header: {
      paddingVertical: dimen.wrapper_padding,
      borderBottomWidth: 0.7,
      borderBottomColor: theme.primaryForeground,
      flex: 1,
      flexDirection: 'row'
    }
  })
}
