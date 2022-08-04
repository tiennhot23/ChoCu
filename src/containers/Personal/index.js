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
import {AUTH_NAV} from 'src/constants/constant'
import {CURRENT_USER} from 'src/constants/storage'
import * as AppNavigateActionCreator from '../AppNavigate/action'

import {
  removeUser,
  requestLogoutUser,
  requestUserData
} from '../CurrentUser/action'
import Header from './components/Header'

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
        <Header
          theme={theme}
          navigate={navigate}
          style={style}
          isLoggedIn={isLoggedIn}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
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
