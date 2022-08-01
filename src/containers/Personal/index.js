import {BaseText, Icon} from '@components'
import {constant} from '@constants'
import {dimen} from '@styles'
import React, {Component} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {Avatar} from 'react-native-paper'
import {connect} from 'react-redux'
import {AUTH_NAV, LOGIN_SCR} from 'src/constants/constant'

import {removeUser} from '../CurrentUser/action'

class Personal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.route.params
    }
  }

  render() {
    const {theme} = this.state
    const {navigate} = this.props.navigation
    const style = initStyle(theme)
    const {userData} = this.props
    return (
      <ScrollView style={style.wrapper}>
        <Header
          theme={theme}
          navigate={navigate}
          style={style}
          user={userData}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  userData: state.currentUserReducer.userData
})

const mapDispatchToProps = (dispatch) => ({
  removeCurrentUser: () => dispatch(removeUser)
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

const Header = (props) => {
  const {theme, navigate, style, user} = props
  return (
    <View style={style.header}>
      <Avatar.Image
        source={{
          uri: user ? user.avatar : constant.default_user
        }}
        size={70}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: 10
          }}>
          <BaseText text={`${user ? user.name : 'Chua dang nhap'}`} />
          {user ? (
            <BaseText
              color={theme.blue}
              text="Xem trang cá nhân"
              onPress={() => navigate(USER_INFO_SCR)}
            />
          ) : null}
        </View>
        {user ? (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: theme.secondaryBackground,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5
            }}>
            <Icon name="log-out-outline" size={32} color={theme.primaryText} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: theme.secondaryBackground,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5
            }}
            onPress={() => navigate(AUTH_NAV)}>
            <Icon name="log-in-outline" size={32} color={theme.primaryText} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
