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
import * as AppNavigateActionCreator from '../AppNavigate/action'

import {
  removeUser,
  requestLogoutUser,
  requestUserData
} from '../CurrentUser/action'
import {requestUserInfo, requestUserPosts} from './action'
import ActivePosts from './components/ActivePosts'
import ExpiredPosts from './components/ExpiredPosts'
import Info from './components/Info'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.route.params.theme,
      userId: props.route.params.userId
    }
  }

  componentDidMount() {
    const {userId} = this.state
    const {getUserInfo, getUserPosts} = this.props
    getUserInfo({user_id: userId})
    getUserPosts({user_id: userId})
  }

  render() {
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    const {isLoggedIn} = this.props
    return (
      <ScrollView style={style.wrapper}>
        <Info navigate={navigate} />
        <ActivePosts navigate={navigate} />
        <ExpiredPosts navigate={navigate} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer.userData,
  userInfo: state.userInfoReducer.userData
})

const mapDispatchToProps = (dispatch) => ({
  getDataCurrentUser: bindActionCreators(requestUserData, dispatch),
  getUserInfo: bindActionCreators(requestUserInfo, dispatch),
  getUserPosts: bindActionCreators(requestUserPosts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)

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
