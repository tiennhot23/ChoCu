import {BaseText, Icon, Input} from '@components'
import {dimen} from '@styles'
import moment from 'moment'
import React, {Component, createRef, useEffect, useRef} from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {baseUrl} from 'src/constants/api'
import {
  requestLockAccount,
  requestUnlockAccount
} from 'src/containers/AdminAccountManager/action'
import FormButton from 'src/containers/Post/components/FormButton'

export default function UnlockAccount({onCancel}) {
  const dispatch = useDispatch()
  const accountState = useSelector(
    (state) => state.adminAccountManagerReducer.accountState
  )
  const user = useSelector((state) => state.userInfoReducer.userData)
  function onUnlockAccount() {
    dispatch(
      requestUnlockAccount({
        username: user?.phone
      })
    )
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}>
      <View
        style={{
          width: '90%',
          paddingVertical: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{fontSize: 20, padding: 10}}>Mở khoá đăng bài</Text>
        <Text style={{padding: 10, textAlign: 'center'}}>
          Cho phép người dùng tài khoản này được quyền đăng bài lại
        </Text>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            backgroundColor: 'white'
          }}>
          <FormButton
            styleContainer={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              borderColor: 'black',
              borderWidth: 2,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5
            }}
            color="black"
            backgroundColor="white"
            title={'Huỷ'}
            onPress={onCancel}
          />
          <FormButton
            styleContainer={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              borderColor: 'black',
              borderWidth: 2,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5
            }}
            title={'Mở Khoá'}
            onPress={onUnlockAccount}
          />
        </View>
      </View>
    </View>
  )
}
