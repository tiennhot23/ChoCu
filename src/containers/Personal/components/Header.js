import {BaseText, Icon} from '@components'
import {constant} from '@constants'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Avatar} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {getItem} from 'src/common/storage'
import {CURRENT_USER} from 'src/constants/storage'
import {requestUserData} from 'src/containers/CurrentUser/action'

export default Header = (props) => {
  const {theme, navigate, style, isLoggedIn, handleLogin, handleLogout} = props

  const user = useSelector((state) => state.currentUserReducer?.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestUserData())
  }, [])

  return (
    <View style={style.header}>
      <Avatar.Image
        source={{
          uri: user?.avatar ? user.avatar : constant.default_user
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
          <BaseText text={`${user?.name ? user.name : 'Chua dang nhap'}`} />
          {isLoggedIn ? (
            <BaseText
              color={theme.blue}
              text="Xem trang cá nhân"
              onPress={() => navigate(USER_INFO_SCR)}
            />
          ) : null}
        </View>
        {isLoggedIn ? (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: theme.secondaryBackground,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5
            }}
            onPress={handleLogout}>
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
            onPress={handleLogin}>
            <Icon name="log-in-outline" size={32} color={theme.primaryText} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
