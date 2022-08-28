import {helper} from '@common'
import {BaseLoading, BaseText, Icon} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import React, {Component, useEffect, useState} from 'react'
import {
  Modal,
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
import LockAccount from './components/LockAccount'
import UnlockAccount from './components/UnlockAccount'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.route.params.theme,
      userId: props.route.params.userId,
      showLockModal: false
    }
  }

  componentDidMount() {
    const {userId} = this.state
    const {getUserInfo, getUserPosts} = this.props
    getUserInfo({user_id: userId})
    getUserPosts({user_id: userId})
  }

  componentDidUpdate(prevProps, prevState) {
    const {accountState} = this.props
    if (
      prevProps.accountState.isFetching !== accountState.isFetching &&
      accountState.isActionDone
    ) {
      const {userId} = this.state
      const {getUserInfo, getUserPosts} = this.props
      getUserInfo({user_id: userId})
      getUserPosts({user_id: userId})
      this.setState({showLockModal: false})
    }
  }

  render() {
    const {theme, userId, showLockModal} = this.state
    const {navigate, push} = this.props.navigation
    const style = initStyle(theme)
    const {stateUserPosts, stateUser, userInfo} = this.props
    return (
      <BaseLoading
        isLoading={stateUserPosts.isFetching || stateUser.isFetching}>
        <Modal visible={showLockModal} transparent>
          {userInfo.active ? (
            <LockAccount
              onCancel={() => this.setState({showLockModal: false})}
            />
          ) : (
            <UnlockAccount
              onCancel={() => this.setState({showLockModal: false})}
            />
          )}
        </Modal>
        <ScrollView style={style.wrapper}>
          <Info
            navigate={navigate}
            onLockAccount={() => {
              this.setState({showLockModal: true})
            }}
          />
          <ActivePosts navigate={navigate} push={push} />
          <ExpiredPosts navigate={navigate} push={push} />
        </ScrollView>
      </BaseLoading>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer.userData,
  userInfo: state.userInfoReducer.userData,
  stateUser: state.userInfoReducer.stateUser,
  stateUserPosts: state.userInfoReducer.stateUserPosts,
  accountState: state.adminAccountManagerReducer.accountState
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
